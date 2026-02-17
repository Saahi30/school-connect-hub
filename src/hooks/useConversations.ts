import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// ──────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────

export interface ConversationItem {
    id: string;
    other_user_id: string;
    other_user_name: string;
    other_user_avatar: string | null;
    other_user_designation: string | null;
    last_message: string;
    last_message_at: string;
    unread_count: number;
}

// ──────────────────────────────────────────────────────
// useConversations — fetches all conversations with previews
// ──────────────────────────────────────────────────────

export function useConversations() {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // Realtime subscription for conversations + messages changes
    useEffect(() => {
        if (!user) return;

        const channel = supabase
            .channel('conversations-realtime')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'messages',
                },
                () => {
                    queryClient.invalidateQueries({ queryKey: ['conversations'] });
                }
            )
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'conversations',
                },
                () => {
                    queryClient.invalidateQueries({ queryKey: ['conversations'] });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user, queryClient]);

    return useQuery({
        queryKey: ['conversations', user?.id],
        queryFn: async (): Promise<ConversationItem[]> => {
            if (!user) return [];

            // Get all messages involving this user
            const { data: messages, error } = await supabase
                .from('messages')
                .select('*')
                .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Group by conversation partner
            const conversationMap = new Map<
                string,
                {
                    other_user_id: string;
                    last_message: string;
                    last_message_at: string;
                    unread_count: number;
                }
            >();

            messages?.forEach((msg) => {
                const otherId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;

                if (!conversationMap.has(otherId)) {
                    conversationMap.set(otherId, {
                        other_user_id: otherId,
                        last_message:
                            msg.content.substring(0, 60) + (msg.content.length > 60 ? '…' : ''),
                        last_message_at: msg.created_at,
                        unread_count: 0,
                    });
                }

                // Count unread messages
                if (msg.receiver_id === user.id && !msg.read_at) {
                    const conv = conversationMap.get(otherId)!;
                    conv.unread_count++;
                }
            });

            // Get profiles for all conversation partners
            const otherUserIds = Array.from(conversationMap.keys());
            if (otherUserIds.length === 0) return [];

            const { data: profiles } = await supabase
                .from('profiles')
                .select('user_id, full_name, avatar_url')
                .in('user_id', otherUserIds);

            const profileMap = new Map(profiles?.map((p) => [p.user_id, p]) || []);

            return Array.from(conversationMap.values()).map((conv) => ({
                id: conv.other_user_id,
                ...conv,
                other_user_name:
                    profileMap.get(conv.other_user_id)?.full_name || 'Unknown User',
                other_user_avatar:
                    profileMap.get(conv.other_user_id)?.avatar_url || null,
                other_user_designation: null,
            }));
        },
        enabled: !!user,
    });
}

// ──────────────────────────────────────────────────────
// useCreateConversation — upserts a conversation row
// ──────────────────────────────────────────────────────

export function useCreateConversation() {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        mutationFn: async (teacherUserId: string) => {
            if (!user) throw new Error('Not authenticated');

            // Check if conversation already exists in messages
            const { data: existing } = await supabase
                .from('messages')
                .select('id')
                .or(
                    `and(sender_id.eq.${user.id},receiver_id.eq.${teacherUserId}),and(sender_id.eq.${teacherUserId},receiver_id.eq.${user.id})`
                )
                .limit(1);

            // Also try to create in conversations table (if migration ran)
            try {
                await supabase.from('conversations').upsert(
                    { parent_id: user.id, teacher_id: teacherUserId },
                    { onConflict: 'parent_id,teacher_id' }
                );
            } catch {
                // Conversations table may not exist yet — that's fine
            }

            return {
                isExisting: (existing?.length ?? 0) > 0,
                teacherUserId,
            };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
        },
        onError: (error: Error) => {
            toast.error('Failed to start conversation: ' + error.message);
        },
    });
}

// ──────────────────────────────────────────────────────
// useUnreadCount — total unread for sidebar badge
// ──────────────────────────────────────────────────────

export function useUnreadCount() {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // Realtime subscription for unread count
    useEffect(() => {
        if (!user) return;

        const channel = supabase
            .channel('unread-count-realtime')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'messages',
                    filter: `receiver_id=eq.${user.id}`,
                },
                () => {
                    queryClient.invalidateQueries({ queryKey: ['unread-count'] });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user, queryClient]);

    return useQuery({
        queryKey: ['unread-count', user?.id],
        queryFn: async (): Promise<number> => {
            if (!user) return 0;

            const { count, error } = await supabase
                .from('messages')
                .select('id', { count: 'exact', head: true })
                .eq('receiver_id', user.id)
                .is('read_at', null);

            if (error) return 0;
            return count ?? 0;
        },
        enabled: !!user,
        refetchInterval: 30000, // Fallback poll every 30s
    });
}
