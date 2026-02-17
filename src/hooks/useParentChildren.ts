import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export function useParentChildren() {
    const { user } = useAuth();

    return useQuery({
        queryKey: ['parent-children', user?.id],
        queryFn: async () => {
            if (!user?.id) throw new Error('No user logged in');

            // 1. Get parent record for this user
            const { data: parent, error: parentError } = await supabase
                .from('parents')
                .select('id')
                .eq('user_id', user.id)
                .single();

            if (parentError) throw parentError;
            if (!parent) return [];

            // 2. Get links to students
            const { data: links, error: linksError } = await supabase
                .from('parent_student')
                .select(`
          id,
          student_id,
          relationship,
          student:students (
            id,
            user_id,
            roll_number,
            admission_number,
            class:classes (
              name,
              section
            )
          )
        `)
                .eq('parent_id', parent.id);

            if (linksError) throw linksError;
            if (!links || links.length === 0) return [];

            // 3. Get profiles for students
            const studentUserIds = links.map(l => (l.student as any)?.user_id).filter(Boolean);
            const { data: profiles, error: profilesError } = await supabase
                .from('profiles')
                .select('user_id, full_name, avatar_url, phone, email')
                .in('user_id', studentUserIds);

            if (profilesError) throw profilesError;

            return links.map(link => {
                const student = link.student as any;
                const profile = profiles?.find(p => p.user_id === student?.user_id);
                return {
                    id: student?.id,
                    linkId: link.id,
                    relationship: link.relationship,
                    fullName: profile?.full_name || 'Unknown',
                    avatarUrl: profile?.avatar_url,
                    email: profile?.email,
                    phone: profile?.phone,
                    rollNumber: student?.roll_number,
                    admissionNumber: student?.admission_number,
                    class: student?.class ? `${student.class.name} - ${student.class.section}` : 'Not Assigned',
                };
            });
        },
        enabled: !!user?.id,
    });
}
