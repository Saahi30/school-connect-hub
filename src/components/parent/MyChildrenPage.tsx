import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Mail, Phone, GraduationCap, User, Calendar } from 'lucide-react';
import { useParentChildren } from '@/hooks/useParentChildren';

export function MyChildrenPage() {
    const { data: children, isLoading, error } = useParentChildren();

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    if (isLoading) {
        return (
            <div className="p-4 md:p-6 space-y-6">
                <Skeleton className="h-8 w-48" />
                <div className="grid md:grid-cols-2 gap-4">
                    {[1, 2].map(i => (
                        <Skeleton key={i} className="h-48 w-full" />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 md:p-6 text-center py-12">
                <Card className="max-w-md mx-auto">
                    <CardContent className="pt-6">
                        <p className="text-muted-foreground">Error loading your children's profiles. Please try again later.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">My Children</h1>
                <p className="text-muted-foreground">Manage and view profiles for your children</p>
            </div>

            {children && children.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {children.map((child) => (
                        <Card key={child.id} className="overflow-hidden hover:shadow-md transition-shadow">
                            <div className="h-24 bg-primary/5 flex items-end px-6 pb-0">
                                <Avatar className="h-20 w-20 border-4 border-background translate-y-4 shadow-sm">
                                    <AvatarImage src={child.avatarUrl || undefined} />
                                    <AvatarFallback className="text-xl bg-primary/10 text-primary">
                                        {getInitials(child.fullName)}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <CardHeader className="pt-8">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl">{child.fullName}</CardTitle>
                                        <CardDescription className="flex items-center gap-1 mt-1 capitalize">
                                            <User className="h-3 w-3" />
                                            {child.relationship}
                                        </CardDescription>
                                    </div>
                                    <Badge variant="secondary">{child.class}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground">Roll Number</p>
                                        <p className="text-sm font-medium">{child.rollNumber || '-'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-muted-foreground">Admission No.</p>
                                        <p className="text-sm font-medium">{child.admissionNumber || '-'}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-2 border-t text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Mail className="h-4 w-4" />
                                        <span>{child.email || 'No email provided'}</span>
                                    </div>
                                    {child.phone && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Phone className="h-4 w-4" />
                                            <span>{child.phone}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4 flex gap-2">
                                    <div className="flex-1 rounded-lg bg-muted/50 p-3 text-center transition-colors hover:bg-muted">
                                        <p className="text-xs text-muted-foreground mb-1">Academic Status</p>
                                        <Badge variant="outline" className="bg-background">Active</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="border-dashed py-12">
                    <CardContent className="flex flex-col items-center justify-center text-center">
                        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                            <GraduationCap className="h-8 w-8 text-muted-foreground opacity-50" />
                        </div>
                        <h3 className="text-lg font-medium">No Children Linked</h3>
                        <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-6">
                            You haven't linked any children to your account yet. Please contact the school administration to link your child.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
