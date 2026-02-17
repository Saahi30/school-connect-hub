import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { format, isToday, isYesterday } from 'date-fns';
import { MessageCircle, UserPlus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import type { ConversationItem } from '@/hooks/useConversations';

interface ConversationListProps {
    conversations: ConversationItem[] | undefined;
    isLoading: boolean;
    selectedUserId: string | null;
    onSelectConversation: (userId: string) => void;
    onContactTeacher: () => void;
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function formatConversationTime(dateStr: string): string {
    const date = new Date(dateStr);
    if (isToday(date)) return format(date, 'hh:mm a');
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMM dd');
}

// Loading skeleton
function ConversationSkeleton() {
    return (
        <div className="space-y-1 p-2">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3">
                    <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function ConversationList({
    conversations,
    isLoading,
    selectedUserId,
    onSelectConversation,
    onContactTeacher,
}: ConversationListProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = conversations?.filter((c) =>
        c.other_user_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-5 pb-4 space-y-4 border-b">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">Chats</h2>
                    <Button
                        size="sm"
                        onClick={onContactTeacher}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm"
                    >
                        <UserPlus className="h-4 w-4 mr-1.5" />
                        New Chat
                    </Button>
                </div>

                {/* Search */}
                {conversations && conversations.length > 0 && (
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-9 bg-muted/50 border-0 focus-visible:ring-1"
                        />
                    </div>
                )}
            </div>

            {/* List */}
            <ScrollArea className="flex-1">
                {isLoading ? (
                    <ConversationSkeleton />
                ) : filtered && filtered.length > 0 ? (
                    <div className="p-1">
                        {filtered.map((conv) => (
                            <button
                                key={conv.other_user_id}
                                className={cn(
                                    'w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-150',
                                    selectedUserId === conv.other_user_id
                                        ? 'bg-blue-50 dark:bg-blue-950/30 ring-1 ring-blue-200 dark:ring-blue-800'
                                        : 'hover:bg-muted/60'
                                )}
                                onClick={() => onSelectConversation(conv.other_user_id)}
                            >
                                {/* Avatar */}
                                <div className="relative shrink-0">
                                    <Avatar className="h-11 w-11">
                                        <AvatarImage src={conv.other_user_avatar || undefined} />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-medium">
                                            {getInitials(conv.other_user_name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <p
                                            className={cn(
                                                'text-sm truncate',
                                                conv.unread_count > 0
                                                    ? 'font-semibold text-foreground'
                                                    : 'font-medium text-foreground'
                                            )}
                                        >
                                            {conv.other_user_name}
                                        </p>
                                        <span className="text-[10px] text-muted-foreground shrink-0 ml-2">
                                            {formatConversationTime(conv.last_message_at)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p
                                            className={cn(
                                                'text-xs truncate pr-2',
                                                conv.unread_count > 0
                                                    ? 'text-foreground font-medium'
                                                    : 'text-muted-foreground'
                                            )}
                                        >
                                            {conv.last_message}
                                        </p>
                                        {conv.unread_count > 0 && (
                                            <Badge className="h-5 min-w-[20px] rounded-full bg-blue-600 hover:bg-blue-600 text-white text-[10px] font-bold px-1.5 shrink-0">
                                                {conv.unread_count}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full py-16 px-6 text-center">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 flex items-center justify-center mb-4">
                            <MessageCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">No conversations yet</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Start chatting with your child&apos;s teachers
                        </p>
                        <Button
                            onClick={onContactTeacher}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                        >
                            <UserPlus className="h-4 w-4 mr-2" />
                            Contact Teacher
                        </Button>
                    </div>
                )}
            </ScrollArea>
        </div>
    );
}
