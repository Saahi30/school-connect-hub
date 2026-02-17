-- =========================================================
-- Migration: Create conversations table + enable Realtime
-- =========================================================

-- 1. Create conversations table
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id UUID NOT NULL,
  teacher_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(parent_id, teacher_id)
);

-- 2. Add conversation_id to messages (nullable for backward compat)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'messages'
      AND column_name = 'conversation_id'
  ) THEN
    ALTER TABLE public.messages
      ADD COLUMN conversation_id UUID REFERENCES public.conversations(id);
  END IF;
END $$;

-- 3. Backfill: create conversations for existing message pairs
INSERT INTO public.conversations (parent_id, teacher_id)
SELECT DISTINCT
  LEAST(m.sender_id, m.receiver_id) AS parent_id,
  GREATEST(m.sender_id, m.receiver_id) AS teacher_id
FROM public.messages m
WHERE m.conversation_id IS NULL
ON CONFLICT (parent_id, teacher_id) DO NOTHING;

-- 4. Backfill: link existing messages to their conversations
UPDATE public.messages m
SET conversation_id = c.id
FROM public.conversations c
WHERE m.conversation_id IS NULL
  AND (
    (m.sender_id = c.parent_id AND m.receiver_id = c.teacher_id)
    OR (m.sender_id = c.teacher_id AND m.receiver_id = c.parent_id)
  );

-- 5. Enable RLS on conversations
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

-- Parents can view their own conversations
CREATE POLICY "Parents can view own conversations"
ON public.conversations
FOR SELECT
USING (auth.uid() = parent_id);

-- Teachers can view their own conversations
CREATE POLICY "Teachers can view own conversations"
ON public.conversations
FOR SELECT
USING (auth.uid() = teacher_id);

-- Users can create conversations where they are a participant
CREATE POLICY "Users can create conversations"
ON public.conversations
FOR INSERT
WITH CHECK (auth.uid() = parent_id OR auth.uid() = teacher_id);

-- Admin can manage all conversations
CREATE POLICY "Admin can manage all conversations"
ON public.conversations
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- 6. Enable Realtime on both tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.conversations;

-- 7. Create index for faster message lookups by conversation
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id
ON public.messages(conversation_id);

CREATE INDEX IF NOT EXISTS idx_messages_created_at
ON public.messages(created_at);

CREATE INDEX IF NOT EXISTS idx_conversations_parent_id
ON public.conversations(parent_id);

CREATE INDEX IF NOT EXISTS idx_conversations_teacher_id
ON public.conversations(teacher_id);
