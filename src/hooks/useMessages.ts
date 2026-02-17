import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// ──────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────

export interface ChatMessage {
    id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    read_at: string | null;
    created_at: string;
    sender_name: string;
    sender_avatar: string | null;
}

// ──────────────────────────────────────────────────────
// useMessages — fetches messages with a specific user + Realtime
// ──────────────────────────────────────────────────────

export function useMessages(otherUserId: string | null) {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // Realtime subscription for individual conversation
    useEffect(() => {
        if (!user || !otherUserId) return;

        const channel = supabase
            .channel(`messages-${otherUserId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                },
                (payload) => {
                    const newMsg = payload.new as Record<string, unknown>;
                    // Only invalidate if the message is part of this conversation
                    if (
                        (newMsg.sender_id === user.id && newMsg.receiver_id === otherUserId) ||
                        (newMsg.sender_id === otherUserId && newMsg.receiver_id === user.id)
                    ) {
                        queryClient.invalidateQueries({
                            queryKey: ['messages', user.id, otherUserId],
                        });
                        queryClient.invalidateQueries({ queryKey: ['conversations'] });
                    }
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'messages',
                },
                (payload) => {
                    const updatedMsg = payload.new as Record<string, unknown>;
                    if (
                        (updatedMsg.sender_id === user.id && updatedMsg.receiver_id === otherUserId) ||
                        (updatedMsg.sender_id === otherUserId && updatedMsg.receiver_id === user.id)
                    ) {
                        queryClient.invalidateQueries({
                            queryKey: ['messages', user.id, otherUserId],
                        });
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user, otherUserId, queryClient]);

    return useQuery({
        queryKey: ['messages', user?.id, otherUserId],
        queryFn: async (): Promise<ChatMessage[]> => {
            if (!user || !otherUserId) return [];

            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .or(
                    `and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`
                )
                .order('created_at', { ascending: true });

            if (error) throw error;

            // Get profiles for display names
            const { data: profiles } = await supabase
                .from('profiles')
                .select('user_id, full_name, avatar_url')
                .in('user_id', [user.id, otherUserId]);

            const profileMap = new Map(
                profiles?.map((p) => [p.user_id, p]) || []
            );

            return (data || []).map((msg) => ({
                id: msg.id,
                sender_id: msg.sender_id,
                receiver_id: msg.receiver_id,
                content: msg.content,
                read_at: msg.read_at,
                created_at: msg.created_at,
                sender_name: profileMap.get(msg.sender_id)?.full_name || 'Unknown',
                sender_avatar: profileMap.get(msg.sender_id)?.avatar_url || null,
            }));
        },
        enabled: !!user && !!otherUserId,
    });
}

// ──────────────────────────────────────────────────────
// useSendMessage
// ──────────────────────────────────────────────────────

export function useSendMessage() {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        mutationFn: async (data: { receiver_id: string; content: string }) => {
            if (!user) throw new Error('Not authenticated');

            const { error } = await supabase.from('messages').insert({
                sender_id: user.id,
                receiver_id: data.receiver_id,
                subject: 'Message',
                content: data.content,
            });

            if (error) throw error;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
            queryClient.invalidateQueries({
                queryKey: ['messages', user?.id, variables.receiver_id],
            });
        },
        onError: (error: Error) => {
            toast.error('Failed to send message: ' + error.message);
        },
    });
}

// ──────────────────────────────────────────────────────
// useMarkAsRead
// ──────────────────────────────────────────────────────

export function useMarkAsRead() {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        mutationFn: async (otherUserId: string) => {
            if (!user) throw new Error('Not authenticated');

            const { error } = await supabase
                .from('messages')
                .update({ read_at: new Date().toISOString() })
                .eq('sender_id', otherUserId)
                .eq('receiver_id', user.id)
                .is('read_at', null);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
            queryClient.invalidateQueries({ queryKey: ['messages'] });
            queryClient.invalidateQueries({ queryKey: ['unread-count'] });
        },
    });
}

// ──────────────────────────────────────────────────────
// useAvailableTeachers — teachers for parent's children
// ──────────────────────────────────────────────────────

export interface AvailableTeacher {
    user_id: string;
    full_name: string;
    avatar_url: string | null;
    designation: string | null;
    classes: { class_name: string; section: string; subject: string }[];
}

export function useAvailableTeachers() {
    const { user } = useAuth();

    return useQuery({
        queryKey: ['available-teachers', user?.id],
        queryFn: async (): Promise<AvailableTeacher[]> => {
            if (!user) return [];

            // Get parent record
            const { data: parent } = await supabase
                .from('parents')
                .select('id')
                .eq('user_id', user.id)
                .single();

            if (!parent) return [];

            // Get children's class IDs
            const { data: children } = await supabase
                .from('parent_student')
                .select('student:students(class_id)')
                .eq('parent_id', parent.id);

            const classIds = (children || [])
                .map((c) => (c.student as Record<string, unknown>)?.class_id as string)
                .filter(Boolean);

            if (classIds.length === 0) return [];

            // Get teachers for those classes
            const { data: teacherClasses } = await supabase
                .from('teacher_classes')
                .select(
                    `
          teacher:teachers(
            id,
            user_id,
            designation
          ),
          subject:subjects(name),
          class:classes(name, section)
        `
                )
                .in('class_id', classIds);

            if (!teacherClasses) return [];

            // Get unique teacher user IDs
            const teacherUserIds = [
                ...new Set(
                    teacherClasses
                        .map((tc) => (tc.teacher as Record<string, unknown>)?.user_id as string)
                        .filter(Boolean)
                ),
            ];

            // Get profiles
            const { data: profiles } = await supabase
                .from('profiles')
                .select('user_id, full_name, avatar_url')
                .in('user_id', teacherUserIds);

            const profileMap = new Map(
                profiles?.map((p) => [p.user_id, p]) || []
            );

            // Build grouped teachers list
            const teacherMap = new Map<string, AvailableTeacher>();

            teacherClasses.forEach((tc) => {
                const teacher = tc.teacher as Record<string, unknown> | null;
                if (!teacher?.user_id) return;

                const userId = teacher.user_id as string;

                if (!teacherMap.has(userId)) {
                    const profile = profileMap.get(userId);
                    teacherMap.set(userId, {
                        user_id: userId,
                        full_name: profile?.full_name || 'Unknown',
                        avatar_url: profile?.avatar_url || null,
                        designation: (teacher.designation as string) || null,
                        classes: [],
                    });
                }

                const cls = tc.class as Record<string, string> | null;
                const subject = tc.subject as Record<string, string> | null;

                teacherMap.get(userId)!.classes.push({
                    class_name: cls?.name || '',
                    section: cls?.section || '',
                    subject: subject?.name || '',
                });
            });

            return Array.from(teacherMap.values());
        },
        enabled: !!user,
    });
}
