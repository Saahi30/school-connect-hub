import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ConversationList } from '@/components/chat/ConversationList';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { ContactTeacherModal } from '@/components/chat/ContactTeacherModal';
import { useConversations } from '@/hooks/useConversations';
import type { AvailableTeacher } from '@/hooks/useMessages';

export function ParentMessagesPage() {
  const { data: conversations, isLoading: conversationsLoading } = useConversations();

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  // Resolve selected user info from conversations or teachers
  const selectedConversation = conversations?.find(
    (c) => c.other_user_id === selectedUserId
  );
  const selectedName = selectedConversation?.other_user_name || 'Teacher';
  const selectedAvatar = selectedConversation?.other_user_avatar || null;
  const selectedDesignation = selectedConversation?.other_user_designation || null;

  // Track teacher info (for when a new teacher is selected from modal)
  const [selectedTeacherInfo, setSelectedTeacherInfo] = useState<{
    name: string;
    avatar: string | null;
    designation: string | null;
  } | null>(null);

  const displayName =
    selectedConversation?.other_user_name ||
    selectedTeacherInfo?.name ||
    'Teacher';
  const displayAvatar =
    selectedConversation?.other_user_avatar ||
    selectedTeacherInfo?.avatar ||
    null;
  const displayDesignation =
    selectedConversation?.other_user_designation ||
    selectedTeacherInfo?.designation ||
    null;

  const handleSelectTeacher = (teacher: AvailableTeacher) => {
    setSelectedUserId(teacher.user_id);
    setSelectedTeacherInfo({
      name: teacher.full_name,
      avatar: teacher.avatar_url,
      designation: teacher.designation,
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] gap-4">
      {/* Header */}
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground text-sm">
          Communicate with your children&apos;s teachers
        </p>
      </div>

      {/* Chat Layout */}
      <div className="grid md:grid-cols-[320px_1fr] gap-4 flex-1 min-h-0">
        {/* Conversations Sidebar */}
        <Card className="flex flex-col h-full overflow-hidden border-border/60 shadow-sm">
          <ConversationList
            conversations={conversations}
            isLoading={conversationsLoading}
            selectedUserId={selectedUserId}
            onSelectConversation={(userId) => {
              setSelectedUserId(userId);
              setSelectedTeacherInfo(null);
            }}
            onContactTeacher={() => setShowContactModal(true)}
          />
        </Card>

        {/* Chat Window */}
        <Card className="flex flex-col h-full overflow-hidden border-border/60 shadow-sm">
          <ChatWindow
            selectedUserId={selectedUserId}
            selectedUserName={displayName}
            selectedUserAvatar={displayAvatar}
            selectedUserDesignation={displayDesignation}
            onBack={() => setSelectedUserId(null)}
          />
        </Card>
      </div>

      {/* Contact Teacher Modal */}
      <ContactTeacherModal
        open={showContactModal}
        onOpenChange={setShowContactModal}
        onSelectTeacher={handleSelectTeacher}
      />
    </div>
  );
}
