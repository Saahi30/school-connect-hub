// ============================================================
// Teacher Assistant Engine — TypeScript Types
// ============================================================

// --- Bloom's Taxonomy Mapping ---
export type CognitiveLevel = 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed';
export type QuestionType = 'mcq' | 'short_answer' | 'long_answer' | 'true_false' | 'fill_blank' | 'match' | 'assertion_reason';
export type CommentTone = 'encouraging' | 'constructive' | 'strict' | 'appreciative' | 'ptm_friendly';
export type PaperStatus = 'draft' | 'finalized' | 'archived';
export type ImprovementTrend = 'improving' | 'stable' | 'declining';

export const DIFFICULTY_TO_BLOOM: Record<Exclude<Difficulty, 'mixed'>, CognitiveLevel[]> = {
  easy: ['remember', 'understand'],
  medium: ['apply'],
  hard: ['analyze', 'evaluate'],
};

// --- Database Row Types ---

export interface Chapter {
  id: string;
  subject_id: string;
  name: string;
  chapter_number: number;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface ChapterTopic {
  id: string;
  chapter_id: string;
  name: string;
  description?: string;
  created_at: string;
}

export interface QuestionBankItem {
  id: string;
  subject_id: string;
  chapter_id?: string;
  topic_id?: string;
  question_text: string;
  question_type: QuestionType;
  options?: string[];
  correct_answer?: string;
  marks: number;
  cognitive_level: CognitiveLevel;
  content_hash: string;
  difficulty: Exclude<Difficulty, 'mixed'>;
  times_used: number;
  created_by?: string;
  created_at: string;
  updated_at: string;
  // Joined fields
  chapter?: Chapter;
  topic?: ChapterTopic;
}

export interface GeneratedPaper {
  id: string;
  teacher_id: string;
  subject_id: string;
  class_id: string;
  title: string;
  total_marks: number;
  duration_minutes?: number;
  difficulty: Difficulty;
  config: PaperConfig;
  status: PaperStatus;
  instructions?: string;
  created_at: string;
  updated_at: string;
}

export interface PaperQuestion {
  id: string;
  paper_id: string;
  question_id: string;
  section_name: string;
  section_type: QuestionType;
  question_order: number;
  marks: number;
  created_at: string;
  // Joined
  question?: QuestionBankItem;
}

export interface AnswerKey {
  id: string;
  paper_id: string;
  content: AnswerKeyEntry[];
  created_at: string;
  updated_at: string;
}

export interface AnswerKeyEntry {
  section: string;
  question_number: number;
  answer: string;
  marks: number;
}

export interface StudentMetricsCache {
  id: string;
  student_id: string;
  subject_id: string;
  class_id: string;
  academic_year: string;
  term: string;
  consistency_score?: number;
  effort_score?: number;
  conceptual_understanding?: number;
  submission_timeliness?: number;
  improvement_trend?: ImprovementTrend;
  participation_index?: number;
  raw_data?: Record<string, unknown>;
  computed_at: string;
  created_at: string;
}

export interface ReportComment {
  id: string;
  student_id: string;
  subject_id: string;
  class_id: string;
  teacher_id: string;
  academic_year: string;
  term: string;
  tone: CommentTone;
  ai_generated_comment: string;
  teacher_edited_comment?: string;
  final_comment: string;
  metrics_snapshot?: StudentMetrics;
  is_finalized: boolean;
  created_at: string;
  updated_at: string;
}

// --- Service Types ---

export interface PaperConfig {
  subject_id: string;
  class_id: string;
  chapter_ids: string[];
  difficulty: Difficulty;
  total_marks: number;
  duration_minutes?: number;
  sections: SectionConfig[];
  instructions?: string;
}

export interface SectionConfig {
  name: string;
  type: QuestionType;
  count: number;
  marks_per_question: number;
}

export interface StudentMetrics {
  consistency: number;
  effort: number;
  conceptual: number;
  timeliness: number;
  trend: ImprovementTrend;
  participation: number;
}

// --- AI Request/Response Types ---

export interface QuestionGenerationRequest {
  subject: string;
  class_name: string;
  chapters: string[];
  topics?: string[];
  sections: SectionConfig[];
  cognitive_levels: CognitiveLevel[];
  total_marks: number;
  existing_hashes: string[]; // to avoid duplicates
}

export interface AIGeneratedSection {
  name: string;
  type: QuestionType;
  marks_per_question: number;
  questions: AIGeneratedQuestion[];
}

export interface AIGeneratedQuestion {
  question: string;
  options?: string[];
  correct_answer: string;
  topic: string;
  cognitive_level: CognitiveLevel;
}

export interface QuestionGenerationResponse {
  sections: AIGeneratedSection[];
}

export interface CommentGenerationRequest {
  students: CommentStudentInput[];
  subject: string;
  tone: CommentTone;
}

export interface CommentStudentInput {
  student_id: string;
  student_name: string;
  metrics: StudentMetrics;
}

export interface CommentGenerationResponse {
  comments: { student_id: string; comment: string }[];
}

// --- UI State Types ---

export type PaperGenerationStep = 'configure' | 'generating' | 'preview' | 'saved';
export type CommentGenerationStep = 'select' | 'metrics' | 'generating' | 'review' | 'saved';

export interface PaperPreviewData {
  paper: GeneratedPaper;
  sections: {
    name: string;
    type: QuestionType;
    marks_per_question: number;
    questions: (QuestionBankItem & { question_order: number })[];
  }[];
  answerKey: AnswerKeyEntry[];
}
