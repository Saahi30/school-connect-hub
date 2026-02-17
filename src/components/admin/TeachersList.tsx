import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAllTeachers } from '@/hooks/useAdminStats';
import { format } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { EditUserDialog } from './EditUserDialog';
import { useAdminDeleteUser } from '@/hooks/useAdminUserManagement';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface TeachersListProps {
  searchQuery: string;
}

export function TeachersList({ searchQuery }: TeachersListProps) {
  const { data: teachers, isLoading, error } = useAllTeachers();
  const deleteUser = useAdminDeleteUser();
  const [editingTeacher, setEditingTeacher] = useState<any>(null);
  const [deletingTeacherId, setDeletingTeacherId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          Error loading teachers. Please try again.
        </CardContent>
      </Card>
    );
  }

  const filteredTeachers = teachers?.filter((teacher) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      teacher.profile?.full_name?.toLowerCase().includes(query) ||
      teacher.profile?.email?.toLowerCase().includes(query) ||
      teacher.employee_id?.toLowerCase().includes(query) ||
      teacher.designation?.toLowerCase().includes(query)
    );
  });

  if (!filteredTeachers?.length) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          {searchQuery ? 'No teachers found matching your search.' : 'No teachers registered yet.'}
        </CardContent>
      </Card>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Teacher</TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Qualification</TableHead>
              <TableHead>Joining Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={teacher.profile?.avatar_url || undefined} />
                      <AvatarFallback className="text-xs">
                        {teacher.profile?.full_name ? getInitials(teacher.profile.full_name) : 'T'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{teacher.profile?.full_name || 'Unknown'}</p>
                      <p className="text-sm text-muted-foreground">{teacher.profile?.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {teacher.employee_id ? (
                    <Badge variant="outline">{teacher.employee_id}</Badge>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>{teacher.designation || '-'}</TableCell>
                <TableCell>{teacher.qualification || '-'}</TableCell>
                <TableCell>
                  {teacher.joining_date
                    ? format(new Date(teacher.joining_date), 'MMM d, yyyy')
                    : '-'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingTeacher(teacher)}
                      className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeletingTeacherId(teacher.user_id)}
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <EditUserDialog
        open={!!editingTeacher}
        onOpenChange={(open) => !open && setEditingTeacher(null)}
        user={editingTeacher}
        userType="teacher"
      />

      <AlertDialog open={!!deletingTeacherId} onOpenChange={(open) => !open && setDeletingTeacherId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the teacher's profile and data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingTeacherId) {
                  deleteUser.mutate(deletingTeacherId);
                  setDeletingTeacherId(null);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
