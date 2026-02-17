import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Users } from 'lucide-react';
import { useAvailableTeachers } from '@/hooks/useMessages';
import type { AvailableTeacher } from '@/hooks/useMessages';

interface ContactTeacherModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelectTeacher: (teacher: AvailableTeacher) => void;
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function TeacherListSkeleton() {
    return (
        <div className="space-y-2 p-1">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl">
                    <Skeleton className="h-11 w-11 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                        <div className="flex gap-1">
                            <Skeleton className="h-5 w-20 rounded-full" />
                            <Skeleton className="h-5 w-24 rounded-full" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function ContactTeacherModal({
    open,
    onOpenChange,
    onSelectTeacher,
}: ContactTeacherModalProps) {
    const { data: teachers, isLoading } = useAvailableTeachers();
    const [search, setSearch] = useState('');

    const filtered = teachers?.filter(
        (t) =>
            t.full_name.toLowerCase().includes(search.toLowerCase()) ||
            t.designation?.toLowerCase().includes(search.toLowerCase()) ||
            t.classes.some(
                (c) =>
                    c.subject.toLowerCase().includes(search.toLowerCase()) ||
                    c.class_name.toLowerCase().includes(search.toLowerCase())
            )
    );

    const handleSelect = (teacher: AvailableTeacher) => {
        onSelectTeacher(teacher);
        onOpenChange(false);
        setSearch('');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        Contact Teacher
                    </DialogTitle>
                    <DialogDescription>
                        Select a teacher to start or continue a conversation
                    </DialogDescription>
                </DialogHeader>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, subject, or class..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 bg-muted/50 border-0 focus-visible:ring-1"
                    />
                </div>

                {/* Teachers List */}
                <ScrollArea className="max-h-[400px]">
                    {isLoading ? (
                        <TeacherListSkeleton />
                    ) : filtered && filtered.length > 0 ? (
                        <div className="space-y-1 p-1">
                            {filtered.map((teacher) => (
                                <button
                                    key={teacher.user_id}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-150 hover:bg-blue-50 dark:hover:bg-blue-950/30 group"
                                    onClick={() => handleSelect(teacher)}
                                >
                                    {/* Avatar */}
                                    <Avatar className="h-11 w-11 shrink-0">
                                        <AvatarImage src={teacher.avatar_url || undefined} />
                                        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xs font-medium">
                                            {getInitials(teacher.full_name)}
                                        </AvatarFallback>
                                    </Avatar>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-foreground truncate group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                                            {teacher.full_name}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {teacher.designation || 'Teacher'}
                                        </p>
                                        <div className="flex flex-wrap gap-1 mt-1.5">
                                            {teacher.classes.slice(0, 3).map((cls, i) => (
                                                <Badge
                                                    key={i}
                                                    variant="secondary"
                                                    className="text-[10px] py-0 px-1.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-0"
                                                >
                                                    {cls.class_name}-{cls.section} · {cls.subject}
                                                </Badge>
                                            ))}
                                            {teacher.classes.length > 3 && (
                                                <Badge
                                                    variant="outline"
                                                    className="text-[10px] py-0 px-1.5 rounded-full"
                                                >
                                                    +{teacher.classes.length - 3}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <Users className="h-10 w-10 mx-auto mb-3 text-muted-foreground/50" />
                            <p className="text-sm text-muted-foreground">
                                {search
                                    ? 'No teachers match your search'
                                    : 'No teachers found for your children'}
                            </p>
                        </div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
