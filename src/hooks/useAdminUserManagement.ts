import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AdminUpdateUserData {
    userId: string;
    fullName?: string;
    phone?: string | null;
    address?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    // Role specific
    classId?: string | null;
    rollNumber?: string | null;
    admissionNumber?: string | null;
    employeeId?: string | null;
    designation?: string | null;
    qualification?: string | null;
    occupation?: string | null;
    relationship?: string | null;
}

export function useAdminUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: AdminUpdateUserData) => {
            // 1. Update Profile
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    full_name: data.fullName,
                    phone: data.phone,
                    address: data.address,
                    date_of_birth: data.dateOfBirth,
                    gender: data.gender,
                    updated_at: new Date().toISOString(),
                })
                .eq('user_id', data.userId);

            if (profileError) throw profileError;

            // 2. Update Role-specific Table
            // We need to determine the role first if not provided, but usually we know it from the dialog
            // For now, we try to update all relevant ones (RLS will handle or nothing will match)
            // A better way is to pass userType to the hook

            const updateStudents = supabase.from('students').update({
                class_id: data.classId,
                roll_number: data.rollNumber,
                admission_number: data.admissionNumber,
                updated_at: new Date().toISOString(),
            }).eq('user_id', data.userId);

            const updateTeachers = supabase.from('teachers').update({
                employee_id: data.employeeId,
                designation: data.designation,
                qualification: data.qualification,
                updated_at: new Date().toISOString(),
            }).eq('user_id', data.userId);

            const updateParents = supabase.from('parents').update({
                occupation: data.occupation,
                relationship: data.relationship,
                updated_at: new Date().toISOString(),
            }).eq('user_id', data.userId);

            await Promise.all([updateStudents, updateTeachers, updateParents]);

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-students'] });
            queryClient.invalidateQueries({ queryKey: ['all-teachers'] });
            queryClient.invalidateQueries({ queryKey: ['all-parents'] });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            toast.success('User updated successfully');
        },
        onError: (error: Error) => {
            toast.error(`Failed to update user: ${error.message}`);
        },
    });
}

export function useAdminDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (userId: string) => {
            // Since we can't delete from auth.users easily without edge function, 
            // we'll at least delete from profiles and roles which might be enough 
            // if RLS check depends on profile/roles.
            // But ideally we'd want to remove them from Auth.

            // For now, let's try to delete from profiles (which cascades to roles/students if set up)
            const { error } = await supabase
                .from('profiles')
                .delete()
                .eq('user_id', userId);

            if (error) throw error;

            // Note: This won't delete from auth.users unless we have an edge function.
            return userId;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-students'] });
            queryClient.invalidateQueries({ queryKey: ['all-teachers'] });
            queryClient.invalidateQueries({ queryKey: ['all-parents'] });
            toast.success('User deleted successfully (Profile removed)');
        },
        onError: (error: Error) => {
            toast.error(`Failed to delete user: ${error.message}`);
        },
    });
}
