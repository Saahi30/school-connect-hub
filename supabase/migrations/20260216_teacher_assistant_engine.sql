-- ============================================================
-- Teacher Assistant Engine — Database Schema
-- Migration: 20260216_teacher_assistant_engine
-- ============================================================

-- 1. CHAPTERS (per subject)
CREATE TABLE IF NOT EXISTS public.chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  chapter_number INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(subject_id, chapter_number)
);

-- 2. CHAPTER TOPICS (per chapter)
CREATE TABLE IF NOT EXISTS public.chapter_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(chapter_id, name)
);

-- 3. QUESTION BANK (reusable, deduplicated)
CREATE TABLE IF NOT EXISTS public.question_bank (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  chapter_id UUID REFERENCES public.chapters(id) ON DELETE SET NULL,
  topic_id UUID REFERENCES public.chapter_topics(id) ON DELETE SET NULL,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('mcq', 'short_answer', 'long_answer', 'true_false', 'fill_blank', 'match', 'assertion_reason')),
  options JSONB, -- for MCQ: ["A","B","C","D"]
  correct_answer TEXT,
  marks INTEGER NOT NULL DEFAULT 1,
  cognitive_level TEXT NOT NULL CHECK (cognitive_level IN ('remember', 'understand', 'apply', 'analyze', 'evaluate', 'create')),
  content_hash TEXT NOT NULL, -- md5(lower(trim(question_text))) for dedup
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  times_used INTEGER NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_question_bank_content_hash ON public.question_bank(content_hash);
CREATE INDEX IF NOT EXISTS idx_question_bank_subject ON public.question_bank(subject_id);
CREATE INDEX IF NOT EXISTS idx_question_bank_chapter ON public.question_bank(chapter_id);
CREATE INDEX IF NOT EXISTS idx_question_bank_topic ON public.question_bank(topic_id);
CREATE INDEX IF NOT EXISTS idx_question_bank_cognitive ON public.question_bank(cognitive_level);
CREATE INDEX IF NOT EXISTS idx_question_bank_type ON public.question_bank(question_type);

-- 4. GENERATED PAPERS (metadata)
CREATE TABLE IF NOT EXISTS public.generated_papers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES public.teachers(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  total_marks INTEGER NOT NULL,
  duration_minutes INTEGER,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard', 'mixed')),
  config JSONB NOT NULL, -- full generation config: chapters, question types, marks distribution
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'finalized', 'archived')),
  instructions TEXT, -- exam instructions header text
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_generated_papers_teacher ON public.generated_papers(teacher_id);
CREATE INDEX IF NOT EXISTS idx_generated_papers_subject ON public.generated_papers(subject_id);
CREATE INDEX IF NOT EXISTS idx_generated_papers_class ON public.generated_papers(class_id);

-- 5. PAPER QUESTIONS (junction: paper ↔ question with ordering)
CREATE TABLE IF NOT EXISTS public.paper_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_id UUID NOT NULL REFERENCES public.generated_papers(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.question_bank(id) ON DELETE CASCADE,
  section_name TEXT NOT NULL, -- e.g. "Section A"
  section_type TEXT NOT NULL, -- e.g. "mcq", "short_answer"
  question_order INTEGER NOT NULL,
  marks INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(paper_id, section_name, question_order)
);

CREATE INDEX IF NOT EXISTS idx_paper_questions_paper ON public.paper_questions(paper_id);

-- 6. ANSWER KEYS (per paper)
CREATE TABLE IF NOT EXISTS public.answer_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_id UUID NOT NULL REFERENCES public.generated_papers(id) ON DELETE CASCADE,
  content JSONB NOT NULL, -- [{section, question_number, answer, marks}]
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(paper_id)
);

-- 7. STUDENT METRICS CACHE (computed analytics)
CREATE TABLE IF NOT EXISTS public.student_metrics_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  academic_year TEXT NOT NULL DEFAULT '2025-2026',
  term TEXT NOT NULL DEFAULT 'Term 1',
  consistency_score NUMERIC(5,2), -- 0-100
  effort_score NUMERIC(5,2),
  conceptual_understanding NUMERIC(5,2),
  submission_timeliness NUMERIC(5,2),
  improvement_trend TEXT CHECK (improvement_trend IN ('improving', 'stable', 'declining')),
  participation_index NUMERIC(5,2),
  raw_data JSONB, -- underlying data snapshots for auditability
  computed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, subject_id, class_id, academic_year, term)
);

CREATE INDEX IF NOT EXISTS idx_student_metrics_student ON public.student_metrics_cache(student_id);
CREATE INDEX IF NOT EXISTS idx_student_metrics_class ON public.student_metrics_cache(class_id);
CREATE INDEX IF NOT EXISTS idx_student_metrics_computed ON public.student_metrics_cache(computed_at);

-- 8. REPORT COMMENTS (comment history per student per term)
CREATE TABLE IF NOT EXISTS public.report_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES public.teachers(id) ON DELETE CASCADE,
  academic_year TEXT NOT NULL DEFAULT '2025-2026',
  term TEXT NOT NULL DEFAULT 'Term 1',
  tone TEXT NOT NULL CHECK (tone IN ('encouraging', 'constructive', 'strict', 'appreciative', 'ptm_friendly')),
  ai_generated_comment TEXT NOT NULL,
  teacher_edited_comment TEXT, -- NULL until teacher edits
  final_comment TEXT NOT NULL, -- the one that gets exported
  metrics_snapshot JSONB, -- frozen metrics at time of generation
  is_finalized BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, subject_id, class_id, academic_year, term)
);

CREATE INDEX IF NOT EXISTS idx_report_comments_student ON public.report_comments(student_id);
CREATE INDEX IF NOT EXISTS idx_report_comments_class ON public.report_comments(class_id);
CREATE INDEX IF NOT EXISTS idx_report_comments_teacher ON public.report_comments(teacher_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paper_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answer_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_metrics_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_comments ENABLE ROW LEVEL SECURITY;

-- Chapters & Topics: readable by all authenticated, writable by teachers/admins
CREATE POLICY "chapters_read" ON public.chapters FOR SELECT TO authenticated USING (true);
CREATE POLICY "chapters_write" ON public.chapters FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('teacher', 'admin'))
  );

CREATE POLICY "chapter_topics_read" ON public.chapter_topics FOR SELECT TO authenticated USING (true);
CREATE POLICY "chapter_topics_write" ON public.chapter_topics FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('teacher', 'admin'))
  );

-- Question Bank: readable by teachers/admins, writable by teachers/admins
CREATE POLICY "question_bank_access" ON public.question_bank FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('teacher', 'admin'))
  );

-- Generated Papers: teachers see own papers, admins see all
CREATE POLICY "generated_papers_teacher" ON public.generated_papers FOR ALL TO authenticated
  USING (
    teacher_id IN (SELECT id FROM public.teachers WHERE user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- Paper Questions: same access as generated_papers via paper_id
CREATE POLICY "paper_questions_access" ON public.paper_questions FOR ALL TO authenticated
  USING (
    paper_id IN (
      SELECT gp.id FROM public.generated_papers gp
      JOIN public.teachers t ON gp.teacher_id = t.id
      WHERE t.user_id = auth.uid()
    )
    OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- Answer Keys: same access as generated_papers
CREATE POLICY "answer_keys_access" ON public.answer_keys FOR ALL TO authenticated
  USING (
    paper_id IN (
      SELECT gp.id FROM public.generated_papers gp
      JOIN public.teachers t ON gp.teacher_id = t.id
      WHERE t.user_id = auth.uid()
    )
    OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- Student Metrics Cache: teachers see their classes, admins see all
CREATE POLICY "student_metrics_access" ON public.student_metrics_cache FOR ALL TO authenticated
  USING (
    class_id IN (
      SELECT tc.class_id FROM public.teacher_classes tc
      JOIN public.teachers t ON tc.teacher_id = t.id
      WHERE t.user_id = auth.uid()
    )
    OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- Report Comments: teachers see own comments, admins see all
CREATE POLICY "report_comments_access" ON public.report_comments FOR ALL TO authenticated
  USING (
    teacher_id IN (SELECT id FROM public.teachers WHERE user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );
