import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Send, Loader2, ArrowLeft, MessageCircle } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { useMessages, useSendMessage, useMarkAsRead } from '@/hooks/useMessages';
import { useAuth } from '@/contexts/AuthContext';

interface ChatWindowProps {
    selectedUserId: string | null;
    selectedUserName: string;
    selectedUserAvatar: string | null;
    selectedUserDesignation: string | null;
    onBack?: () => void;
    className?: string;
}

function MessageSkeleton() {
    return (
        <div className="space-y-4 p-4">
            {/* Received messages skeleton */}
            <div className="flex justify-start">
                <div className="max-w-[60%] space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-16 w-64 rounded-2xl" />
                </div>
            </div>
            <div className="flex justify-end">
                <Skeleton className="h-12 w-48 rounded-2xl" />
            </div>
            <div className="flex justify-start">
                <div className="max-w-[60%] space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-56 rounded-2xl" />
                </div>
            </div>
            <div className="flex justify-end">
                <Skeleton className="h-14 w-52 rounded-2xl" />
            </div>
            <div className="flex justify-start">
                <div className="max-w-[60%] space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-12 w-72 rounded-2xl" />
                </div>
            </div>
        </div>
    );
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

export function ChatWindow({
    selectedUserId,
    selectedUserName,
    selectedUserAvatar,
    selectedUserDesignation,
    onBack,
    className,
}: ChatWindowProps) {
    const { user } = useAuth();
    const { data: messages, isLoading: messagesLoading } = useMessages(selectedUserId);
    const sendMessage = useSendMessage();
    const markAsRead = useMarkAsRead();

    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    // Mark messages as read when conversation opens
    useEffect(() => {
        if (selectedUserId) {
            markAsRead.mutate(selectedUserId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedUserId]);

    // Scroll to bottom on new messages
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSend = async () => {
        if (!selectedUserId || !newMessage.trim()) return;

        const content = newMessage.trim();
        setNewMessage('');

        try {
            await sendMessage.mutateAsync({
                receiver_id: selectedUserId,
                content,
            });
        } catch {
            setNewMessage(content); // Restore on error
        }
    };

    // No conversation selected — show empty state
    if (!selectedUserId) {
        return (
            <div
                className={cn(
                    'flex flex-col items-center justify-center h-full text-center',
                    className
                )}
            >
                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 flex items-center justify-center mb-5">
                    <MessageCircle className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                    Your Messages
                </h3>
                <p className="text-sm text-muted-foreground max-w-[250px]">
                    Select a conversation or contact a teacher to start messaging
                </p>
            </div>
        );
    }

    return (
        <div className={cn('flex flex-col h-full', className)}>
            {/* Chat Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                {onBack && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden shrink-0"
                        onClick={onBack}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                )}

                <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage src={selectedUserAvatar || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-medium">
                        {getInitials(selectedUserName)}
                    </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                        {selectedUserName}
                    </h3>
                    {selectedUserDesignation && (
                        <p className="text-xs text-muted-foreground truncate">
                            {selectedUserDesignation}
                        </p>
                    )}
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-hidden" ref={scrollAreaRef}>
                <ScrollArea className="h-full">
                    {messagesLoading ? (
                        <MessageSkeleton />
                    ) : messages && messages.length > 0 ? (
                        <div className="space-y-3 p-4">
                            {messages.map((msg) => {
                                const isOwn = msg.sender_id === user?.id;
                                return (
                                    <MessageBubble
                                        key={msg.id}
                                        content={msg.content}
                                        timestamp={msg.created_at}
                                        isOwn={isOwn}
                                        isRead={!!msg.read_at}
                                        senderName={isOwn ? undefined : msg.sender_name}
                                    />
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 flex items-center justify-center mb-4">
                                <MessageCircle className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                            </div>
                            <p className="font-medium text-foreground">No messages yet</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Send a message to start the conversation
                            </p>
                        </div>
                    )}
                </ScrollArea>
            </div>

            {/* Message Input */}
            <div className="border-t p-3 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                <div className="flex items-end gap-2">
                    <Textarea
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="min-h-[44px] max-h-[120px] resize-none rounded-xl bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    />
                    <Button
                        size="icon"
                        className={cn(
                            'h-11 w-11 rounded-xl shrink-0 transition-all duration-200',
                            newMessage.trim()
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md'
                                : 'bg-muted text-muted-foreground cursor-not-allowed'
                        )}
                        onClick={handleSend}
                        disabled={!newMessage.trim() || sendMessage.isPending}
                    >
                        {sendMessage.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Send className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
