// ============================================================
// Question Paper Service — Generation, dedup, save, reshuffle
// ============================================================

import { supabase } from '@/integrations/supabase/client';
import { generateQuestions } from './aiService';
import type {
    PaperConfig,
    SectionConfig,
    QuestionBankItem,
    GeneratedPaper,
    PaperPreviewData,
    AnswerKeyEntry,
    AIGeneratedQuestion,
    AIGeneratedSection,
    QuestionGenerationRequest,
    CognitiveLevel,
    Difficulty,
    DIFFICULTY_TO_BLOOM,
} from '@/types/teacherAssistantTypes';
import { DIFFICULTY_TO_BLOOM as bloomMap } from '@/types/teacherAssistantTypes';

// --- Public API ---

/**
 * Generate a question paper from config. Returns preview data for editing.
 */
export async function generatePaper(
    config: PaperConfig,
    teacherId: string
): Promise<PaperPreviewData> {
    // 1. Resolve chapter/subject names for AI prompt
    const { subjectName, className, chapterNames, topicNames } = await resolveNames(config);

    // 2. Get existing question hashes for dedup
    const existingHashes = await getExistingHashes(config.subject_id);

    // 3. Map difficulty → cognitive levels
    const cognitiveLevels = getCognitiveLevels(config.difficulty);

    // 4. Build AI request
    const aiRequest: QuestionGenerationRequest = {
        subject: subjectName,
        class_name: className,
        chapters: chapterNames,
        topics: topicNames,
        sections: config.sections,
        cognitive_levels: cognitiveLevels,
        total_marks: config.total_marks,
        existing_hashes: existingHashes,
    };

    // 5. Call AI
    const aiResponse = await generateQuestions(aiRequest);

    // 6. Deduplicate and save to question bank
    const savedSections = await processAndSaveQuestions(aiResponse.sections, config);

    // 7. Create paper record
    const paper = await createPaperRecord(config, teacherId);

    // 8. Link questions to paper
    await linkQuestionsToPaper(paper.id, savedSections);

    // 9. Generate answer key
    const answerKey = generateAnswerKey(savedSections);
    await saveAnswerKey(paper.id, answerKey);

    return {
        paper,
        sections: savedSections.map((s) => ({
            name: s.name,
            type: s.type,
            marks_per_question: s.marks_per_question,
            questions: s.questions,
        })),
        answerKey,
    };
}

/**
 * Reshuffle questions within each section (random reorder).
 */
export function reshuffleQuestions(preview: PaperPreviewData): PaperPreviewData {
    return {
        ...preview,
        sections: preview.sections.map((section) => ({
            ...section,
            questions: shuffleArray([...section.questions]).map((q, i) => ({
                ...q,
                question_order: i + 1,
            })),
        })),
    };
}

/**
 * Save edited paper (after teacher modifications).
 */
export async function savePaperEdits(
    paperId: string,
    sections: PaperPreviewData['sections'],
    answerKey: AnswerKeyEntry[]
): Promise<void> {
    // Delete existing links and recreate
    await supabase.from('paper_questions').delete().eq('paper_id', paperId);

    const savedSections = sections.map((s) => ({
        ...s,
        questions: s.questions.map((q, i) => ({ ...q, question_order: i + 1 })),
    }));

    await linkQuestionsToPaper(paperId, savedSections as ProcessedSection[]);

    // Update answer key
    await supabase
        .from('answer_keys')
        .update({ content: answerKey as unknown as Record<string, unknown>, updated_at: new Date().toISOString() })
        .eq('paper_id', paperId);
}

/**
 * Finalize paper status.
 */
export async function finalizePaper(paperId: string): Promise<void> {
    await supabase
        .from('generated_papers')
        .update({ status: 'finalized', updated_at: new Date().toISOString() })
        .eq('id', paperId);
}

/**
 * Fetch paper history for a teacher.
 */
export async function getPaperHistory(teacherId: string): Promise<GeneratedPaper[]> {
    const { data } = await supabase
        .from('generated_papers')
        .select('*')
        .eq('teacher_id', teacherId)
        .order('created_at', { ascending: false })
        .limit(20);

    return (data as GeneratedPaper[]) ?? [];
}

/**
 * Fetch chapters for a subject.
 */
export async function getChapters(subjectId: string) {
    const { data } = await supabase
        .from('chapters')
        .select('*, chapter_topics(*)')
        .eq('subject_id', subjectId)
        .order('chapter_number', { ascending: true });
    return data ?? [];
}

// --- Internal Helpers ---

interface ProcessedSection {
    name: string;
    type: string;
    marks_per_question: number;
    questions: (QuestionBankItem & { question_order: number })[];
}

async function resolveNames(config: PaperConfig) {
    const { data: subject } = await supabase
        .from('subjects')
        .select('name')
        .eq('id', config.subject_id)
        .single();

    const { data: cls } = await supabase
        .from('classes')
        .select('name, section')
        .eq('id', config.class_id)
        .single();

    const { data: chapters } = await supabase
        .from('chapters')
        .select('name, chapter_topics(name)')
        .in('id', config.chapter_ids);

    const chapterNames = chapters?.map((c: { name: string }) => c.name) ?? [];
    const topicNames = chapters?.flatMap(
        (c: { chapter_topics: { name: string }[] }) => c.chapter_topics?.map((t) => t.name) ?? []
    ) ?? [];

    return {
        subjectName: subject?.name ?? 'Unknown',
        className: cls ? `${cls.name} ${cls.section}` : 'Unknown',
        chapterNames,
        topicNames,
    };
}

async function getExistingHashes(subjectId: string): Promise<string[]> {
    const { data } = await supabase
        .from('question_bank')
        .select('content_hash')
        .eq('subject_id', subjectId);
    return data?.map((q: { content_hash: string }) => q.content_hash) ?? [];
}

function getCognitiveLevels(difficulty: Difficulty): CognitiveLevel[] {
    if (difficulty === 'mixed') {
        return ['remember', 'understand', 'apply', 'analyze', 'evaluate'];
    }
    return bloomMap[difficulty];
}

function hashQuestion(text: string): string {
    // Simple client-side hash (will match server md5 approach conceptually)
    const normalized = text.toLowerCase().trim();
    let hash = 0;
    for (let i = 0; i < normalized.length; i++) {
        const char = normalized.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
}

async function processAndSaveQuestions(
    aiSections: AIGeneratedSection[],
    config: PaperConfig
): Promise<ProcessedSection[]> {
    const processed: ProcessedSection[] = [];

    for (const section of aiSections) {
        const sectionQuestions: (QuestionBankItem & { question_order: number })[] = [];

        for (let i = 0; i < section.questions.length; i++) {
            const q = section.questions[i];
            const contentHash = hashQuestion(q.question);

            // Check if already exists
            const { data: existing } = await supabase
                .from('question_bank')
                .select('*')
                .eq('content_hash', contentHash)
                .maybeSingle();

            let savedQuestion: QuestionBankItem;

            if (existing) {
                // Increment usage counter
                await supabase
                    .from('question_bank')
                    .update({ times_used: (existing.times_used || 0) + 1 })
                    .eq('id', existing.id);
                savedQuestion = existing as QuestionBankItem;
            } else {
                // Save new question
                const { data: newQ } = await supabase
                    .from('question_bank')
                    .insert({
                        subject_id: config.subject_id,
                        chapter_id: config.chapter_ids[0] ?? null,
                        question_text: q.question,
                        question_type: section.type,
                        options: q.options ?? null,
                        correct_answer: q.correct_answer,
                        marks: section.marks_per_question,
                        cognitive_level: q.cognitive_level,
                        content_hash: contentHash,
                        difficulty: mapCognitiveToDifficulty(q.cognitive_level),
                        times_used: 1,
                    })
                    .select()
                    .single();

                savedQuestion = newQ as QuestionBankItem;
            }

            sectionQuestions.push({ ...savedQuestion, question_order: i + 1 });
        }

        processed.push({
            name: section.name,
            type: section.type,
            marks_per_question: section.marks_per_question,
            questions: sectionQuestions,
        });
    }

    return processed;
}

function mapCognitiveToDifficulty(level: CognitiveLevel): 'easy' | 'medium' | 'hard' {
    if (['remember', 'understand'].includes(level)) return 'easy';
    if (level === 'apply') return 'medium';
    return 'hard';
}

async function createPaperRecord(
    config: PaperConfig,
    teacherId: string
): Promise<GeneratedPaper> {
    const { data } = await supabase
        .from('generated_papers')
        .insert({
            teacher_id: teacherId,
            subject_id: config.subject_id,
            class_id: config.class_id,
            title: `Question Paper - ${new Date().toLocaleDateString()}`,
            total_marks: config.total_marks,
            duration_minutes: config.duration_minutes ?? null,
            difficulty: config.difficulty,
            config: config as unknown as Record<string, unknown>,
            status: 'draft',
            instructions: config.instructions ?? null,
        })
        .select()
        .single();

    return data as GeneratedPaper;
}

async function linkQuestionsToPaper(
    paperId: string,
    sections: ProcessedSection[]
): Promise<void> {
    const links = sections.flatMap((section) =>
        section.questions.map((q) => ({
            paper_id: paperId,
            question_id: q.id,
            section_name: section.name,
            section_type: section.type,
            question_order: q.question_order,
            marks: section.marks_per_question,
        }))
    );

    if (links.length > 0) {
        await supabase.from('paper_questions').insert(links);
    }
}

function generateAnswerKey(sections: ProcessedSection[]): AnswerKeyEntry[] {
    const entries: AnswerKeyEntry[] = [];

    for (const section of sections) {
        for (const q of section.questions) {
            entries.push({
                section: section.name,
                question_number: q.question_order,
                answer: q.correct_answer ?? 'Refer to marking scheme',
                marks: section.marks_per_question,
            });
        }
    }

    return entries;
}

async function saveAnswerKey(paperId: string, entries: AnswerKeyEntry[]): Promise<void> {
    await supabase.from('answer_keys').insert({
        paper_id: paperId,
        content: entries as unknown as Record<string, unknown>,
    });
}

function shuffleArray<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
