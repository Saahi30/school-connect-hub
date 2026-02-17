import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Loader2, User as UserIcon, Save } from 'lucide-react';
import { useAdminUpdateUser } from '@/hooks/useAdminUserManagement';
import { useAllClasses } from '@/hooks/useAdminStats';

interface EditUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: any; // The student/teacher/parent object
    userType: 'student' | 'teacher' | 'parent';
}

export function EditUserDialog({ open, onOpenChange, user, userType }: EditUserDialogProps) {
    const updateUser = useAdminUpdateUser();
    const { data: classes } = useAllClasses();
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState(''); // Read-only for now

    // Student-specific
    const [classId, setClassId] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [admissionNumber, setAdmissionNumber] = useState('');

    // Teacher-specific
    const [employeeId, setEmployeeId] = useState('');
    const [designation, setDesignation] = useState('');
    const [qualification, setQualification] = useState('');

    // Parent-specific
    const [occupation, setOccupation] = useState('');
    const [relationship, setRelationship] = useState('');

    useEffect(() => {
        if (user && open) {
            setFullName(user.profile?.full_name || '');
            setPhone(user.profile?.phone || '');
            setEmail(user.profile?.email || '');

            if (userType === 'student') {
                setClassId(user.class_id || '');
                setRollNumber(user.roll_number || '');
                setAdmissionNumber(user.admission_number || '');
            } else if (userType === 'teacher') {
                setEmployeeId(user.employee_id || '');
                setDesignation(user.designation || '');
                setQualification(user.qualification || '');
            } else if (userType === 'parent') {
                setOccupation(user.occupation || '');
                setRelationship(user.relationship || '');
            }
        }
    }, [user, open, userType]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await updateUser.mutateAsync({
                userId: user.user_id,
                fullName,
                phone,
                classId: classId || null,
                rollNumber: rollNumber || null,
                admissionNumber: admissionNumber || null,
                employeeId: employeeId || null,
                designation: designation || null,
                qualification: qualification || null,
                occupation: occupation || null,
                relationship: relationship || null,
            });
            onOpenChange(false);
        } catch (error) {
            console.error('Error updating user:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <UserIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <DialogTitle>Edit {userType.charAt(0).toUpperCase() + userType.slice(1)}</DialogTitle>
                            <DialogDescription>
                                Update the information for {fullName || 'this user'}.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Email (Cannot be changed)</Label>
                            <Input value={email} disabled className="bg-muted" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter full name"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter phone number"
                            />
                        </div>
                    </div>

                    {userType === 'student' && (
                        <div className="space-y-4 pt-4 border-t">
                            <h4 className="text-sm font-medium text-muted-foreground">Student Details</h4>
                            <div className="space-y-2">
                                <Label>Class</Label>
                                <Select value={classId} onValueChange={setClassId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select class" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {classes?.map((cls) => (
                                            <SelectItem key={cls.id} value={cls.id}>
                                                {cls.name} - {cls.section}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Roll Number</Label>
                                    <Input value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Admission No.</Label>
                                    <Input value={admissionNumber} onChange={(e) => setAdmissionNumber(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    )}

                    {userType === 'teacher' && (
                        <div className="space-y-4 pt-4 border-t">
                            <h4 className="text-sm font-medium text-muted-foreground">Teacher Details</h4>
                            <div className="space-y-2">
                                <Label>Employee ID</Label>
                                <Input value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Designation</Label>
                                <Input value={designation} onChange={(e) => setDesignation(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Qualification</Label>
                                <Input value={qualification} onChange={(e) => setQualification(e.target.value)} />
                            </div>
                        </div>
                    )}

                    {userType === 'parent' && (
                        <div className="space-y-4 pt-4 border-t">
                            <h4 className="text-sm font-medium text-muted-foreground">Parent Details</h4>
                            <div className="space-y-2">
                                <Label>Occupation</Label>
                                <Input value={occupation} onChange={(e) => setOccupation(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Relationship</Label>
                                <Select value={relationship} onValueChange={setRelationship}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select relationship" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="father">Father</SelectItem>
                                        <SelectItem value="mother">Mother</SelectItem>
                                        <SelectItem value="guardian">Guardian</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => onOpenChange(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
