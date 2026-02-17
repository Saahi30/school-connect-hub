import { cn } from '@/lib/utils';
import { format, isToday } from 'date-fns';
import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
    content: string;
    timestamp: string;
    isOwn: boolean;
    isRead: boolean;
    senderName?: string;
}

export function MessageBubble({
    content,
    timestamp,
    isOwn,
    isRead,
    senderName,
}: MessageBubbleProps) {
    const date = new Date(timestamp);
    const formattedTime = isToday(date)
        ? format(date, 'hh:mm a')
        : format(date, 'MMM dd, hh:mm a');

    return (
        <div className={cn('flex', isOwn ? 'justify-end' : 'justify-start')}>
            <div className="max-w-[80%] group">
                {/* Sender name (only for received messages) */}
                {!isOwn && senderName && (
                    <p className="text-xs text-muted-foreground mb-1 ml-3 font-medium">
                        {senderName}
                    </p>
                )}

                {/* Bubble */}
                <div
                    className={cn(
                        'relative rounded-2xl px-4 py-2.5 shadow-sm transition-shadow',
                        isOwn
                            ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-md'
                            : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-foreground rounded-bl-md'
                    )}
                >
                    {/* Message text */}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {content}
                    </p>

                    {/* Timestamp + read receipt */}
                    <div
                        className={cn(
                            'flex items-center justify-end gap-1 mt-1',
                            isOwn ? 'text-blue-200' : 'text-muted-foreground'
                        )}
                    >
                        <span className="text-[10px]">{formattedTime}</span>
                        {isOwn && (
                            isRead ? (
                                <CheckCheck className="h-3 w-3 text-blue-200" />
                            ) : (
                                <Check className="h-3 w-3 text-blue-300/60" />
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
