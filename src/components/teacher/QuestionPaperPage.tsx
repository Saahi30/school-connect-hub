// ============================================================
// QuestionPaperPage — Multi-step wizard for paper generation
// ============================================================

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
    FileText,
    Wand2,
    Loader2,
    Shuffle,
    Download,
    Save,
    Plus,
    Trash2,
    ArrowLeft,
    History,
    BookOpen,
    Key,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuestionPaper } from '@/hooks/useQuestionPaper';
import { useTeacherData } from '@/hooks/useTeacherData';
import { PaperPreview } from './PaperPreview';
import type { PaperConfig, SectionConfig, Difficulty, QuestionType } from '@/types/teacherAssistantTypes';

const QUESTION_TYPES: { value: QuestionType; label: string }[] = [
    { value: 'mcq', label: 'Multiple Choice' },
    { value: 'short_answer', label: 'Short Answer' },
    { value: 'long_answer', label: 'Long Answer' },
    { value: 'true_false', label: 'True / False' },
    { value: 'fill_blank', label: 'Fill in the Blanks' },
    { value: 'match', label: 'Match the Following' },
    { value: 'assertion_reason', label: 'Assertion & Reason' },
];

const DIFFICULTIES: { value: Difficulty; label: string; desc: string }[] = [
    { value: 'easy', label: 'Easy', desc: 'Remember & Understand' },
    { value: 'medium', label: 'Medium', desc: 'Apply' },
    { value: 'hard', label: 'Hard', desc: 'Analyze & Evaluate' },
    { value: 'mixed', label: 'Mixed', desc: 'All Levels' },
];

export function QuestionPaperPage() {
    const { teacherData } = useTeacherData();
    const teacherId = teacherData?.id;

    const {
        step,
        loading,
        preview,
        history,
        chapters,
        fetchChapters,
        generate,
        reshuffle,
        updateQuestion,
        save,
        exportPDF,
        exportAnswerKey,
        fetchHistory,
        reset,
    } = useQuestionPaper(teacherId);

    // Form state
    const [subjects, setSubjects] = useState<{ id: string; name: string }[]>([]);
    const [classes, setClasses] = useState<{ id: string; name: string; section: string }[]>([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
    const [difficulty, setDifficulty] = useState<Difficulty>('mixed');
    const [totalMarks, setTotalMarks] = useState(80);
    const [duration, setDuration] = useState(180);
    const [instructions, setInstructions] = useState('Answer all questions. All questions are compulsory.');
    const [sections, setSections] = useState<SectionConfig[]>([
        { name: 'Section A', type: 'mcq', count: 10, marks_per_question: 1 },
        { name: 'Section B', type: 'short_answer', count: 5, marks_per_question: 2 },
        { name: 'Section C', type: 'long_answer', count: 5, marks_per_question: 5 },
    ]);

    // Load subjects and classes
    useEffect(() => {
        const loadData = async () => {
            const { data: subjectsData } = await supabase.from('subjects').select('id, name').order('name');
            const { data: classesData } = await supabase.from('classes').select('id, name, section').order('name');
            setSubjects(subjectsData ?? []);
            setClasses(classesData ?? []);
        };
        loadData();
        if (teacherId) fetchHistory();
    }, [teacherId, fetchHistory]);

    // Load chapters when subject changes
    useEffect(() => {
        if (selectedSubject) {
            fetchChapters(selectedSubject);
            setSelectedChapters([]);
        }
    }, [selectedSubject, fetchChapters]);

    const handleAddSection = () => {
        const letter = String.fromCharCode(65 + sections.length);
        setSections([
            ...sections,
            { name: `Section ${letter}`, type: 'short_answer', count: 5, marks_per_question: 2 },
        ]);
    };

    const handleRemoveSection = (index: number) => {
        setSections(sections.filter((_, i) => i !== index));
    };

    const updateSection = (index: number, updates: Partial<SectionConfig>) => {
        setSections(sections.map((s, i) => (i === index ? { ...s, ...updates } : s)));
    };

    const calculatedMarks = sections.reduce((sum, s) => sum + s.count * s.marks_per_question, 0);

    const handleGenerate = () => {
        const config: PaperConfig = {
            subject_id: selectedSubject,
            class_id: selectedClass,
            chapter_ids: selectedChapters,
            difficulty,
            total_marks: totalMarks,
            duration_minutes: duration,
            sections,
            instructions,
        };
        generate(config);
    };

    const canGenerate =
        selectedSubject && selectedClass && selectedChapters.length > 0 && sections.length > 0;

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Question Paper Generator</h1>
                        <p className="text-sm text-muted-foreground">
                            AI-powered exam paper creation with Bloom's taxonomy mapping
                        </p>
                    </div>
                </div>
                {step !== 'configure' && (
                    <Button variant="outline" onClick={reset}>
                        <ArrowLeft className="h-4 w-4 mr-2" /> New Paper
                    </Button>
                )}
            </div>

            {/* Step: Configure */}
            {step === 'configure' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Config */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Paper Configuration</CardTitle>
                                <CardDescription>Select subject, class, and chapters</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Subject</Label>
                                        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select subject" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {subjects.map((s) => (
                                                    <SelectItem key={s.id} value={s.id}>
                                                        {s.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Class</Label>
                                        <Select value={selectedClass} onValueChange={setSelectedClass}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select class" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {classes.map((c) => (
                                                    <SelectItem key={c.id} value={c.id}>
                                                        {c.name} {c.section}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Chapters */}
                                {chapters.length > 0 && (
                                    <div className="space-y-2">
                                        <Label>Chapters</Label>
                                        <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto border rounded-lg p-3">
                                            {chapters.map((ch) => (
                                                <label key={ch.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                                                    <Checkbox
                                                        checked={selectedChapters.includes(ch.id)}
                                                        onCheckedChange={(checked) => {
                                                            setSelectedChapters(
                                                                checked
                                                                    ? [...selectedChapters, ch.id]
                                                                    : selectedChapters.filter((id) => id !== ch.id)
                                                            );
                                                        }}
                                                    />
                                                    <span>Ch {ch.chapter_number}: {ch.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label>Difficulty</Label>
                                        <Select value={difficulty} onValueChange={(v) => setDifficulty(v as Difficulty)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {DIFFICULTIES.map((d) => (
                                                    <SelectItem key={d.value} value={d.value}>
                                                        <div>
                                                            <span>{d.label}</span>
                                                            <span className="text-xs text-gray-400 ml-2">({d.desc})</span>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Total Marks</Label>
                                        <Input
                                            type="number"
                                            value={totalMarks}
                                            onChange={(e) => setTotalMarks(parseInt(e.target.value) || 0)}
                                            min={10}
                                            max={200}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Duration (min)</Label>
                                        <Input
                                            type="number"
                                            value={duration}
                                            onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                                            min={30}
                                            max={300}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Instructions</Label>
                                    <Textarea
                                        value={instructions}
                                        onChange={(e) => setInstructions(e.target.value)}
                                        placeholder="Exam instructions..."
                                        className="min-h-[60px]"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Sections Config */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg">Sections</CardTitle>
                                        <CardDescription>Define question types and marks distribution</CardDescription>
                                    </div>
                                    <Button size="sm" variant="outline" onClick={handleAddSection}>
                                        <Plus className="h-3 w-3 mr-1" /> Add Section
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {sections.map((section, idx) => (
                                    <div key={idx} className="flex items-end gap-3 p-3 border rounded-lg bg-gray-50/50">
                                        <div className="space-y-1 flex-1">
                                            <Label className="text-xs">Name</Label>
                                            <Input
                                                value={section.name}
                                                onChange={(e) => updateSection(idx, { name: e.target.value })}
                                                className="h-8 text-sm"
                                            />
                                        </div>
                                        <div className="space-y-1 flex-1">
                                            <Label className="text-xs">Type</Label>
                                            <Select
                                                value={section.type}
                                                onValueChange={(v) => updateSection(idx, { type: v as QuestionType })}
                                            >
                                                <SelectTrigger className="h-8 text-sm">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {QUESTION_TYPES.map((t) => (
                                                        <SelectItem key={t.value} value={t.value}>
                                                            {t.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-1 w-20">
                                            <Label className="text-xs">Count</Label>
                                            <Input
                                                type="number"
                                                value={section.count}
                                                onChange={(e) => updateSection(idx, { count: parseInt(e.target.value) || 1 })}
                                                min={1}
                                                max={50}
                                                className="h-8 text-sm"
                                            />
                                        </div>
                                        <div className="space-y-1 w-24">
                                            <Label className="text-xs">Marks/Q</Label>
                                            <Input
                                                type="number"
                                                value={section.marks_per_question}
                                                onChange={(e) => updateSection(idx, { marks_per_question: parseInt(e.target.value) || 1 })}
                                                min={1}
                                                max={20}
                                                className="h-8 text-sm"
                                            />
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 w-8 p-0 text-red-500"
                                            onClick={() => handleRemoveSection(idx)}
                                            disabled={sections.length <= 1}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}

                                {/* Marks summary */}
                                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
                                    <span className="text-sm font-medium">Calculated Total</span>
                                    <Badge
                                        variant={calculatedMarks === totalMarks ? 'default' : 'destructive'}
                                        className="text-sm"
                                    >
                                        {calculatedMarks} / {totalMarks} marks
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Generate Button */}
                        <Button
                            size="lg"
                            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                            onClick={handleGenerate}
                            disabled={!canGenerate || loading}
                        >
                            <Wand2 className="h-5 w-5 mr-2" />
                            Generate Question Paper
                        </Button>
                    </div>

                    {/* History Sidebar */}
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <History className="h-4 w-4" /> Recent Papers
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {history.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">No papers generated yet.</p>
                                ) : (
                                    <div className="space-y-2">
                                        {history.slice(0, 5).map((paper) => (
                                            <div
                                                key={paper.id}
                                                className="p-2 border rounded-lg text-sm hover:bg-gray-50 cursor-pointer"
                                            >
                                                <p className="font-medium truncate">{paper.title}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant="outline" className="text-xs">
                                                        {paper.total_marks}m
                                                    </Badge>
                                                    <Badge variant="outline" className="text-xs">
                                                        {paper.difficulty}
                                                    </Badge>
                                                    <Badge
                                                        variant="outline"
                                                        className={`text-xs ${paper.status === 'finalized' ? 'border-green-300 text-green-600' : ''}`}
                                                    >
                                                        {paper.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Bloom's Taxonomy Guide */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <BookOpen className="h-4 w-4" /> Bloom's Taxonomy
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs space-y-2">
                                {[
                                    { level: 'Easy', bloom: 'Remember / Understand', color: 'bg-green-100 text-green-800' },
                                    { level: 'Medium', bloom: 'Apply', color: 'bg-yellow-100 text-yellow-800' },
                                    { level: 'Hard', bloom: 'Analyze / Evaluate', color: 'bg-red-100 text-red-800' },
                                ].map((item) => (
                                    <div key={item.level} className="flex items-center gap-2">
                                        <Badge className={`${item.color} text-xs`}>{item.level}</Badge>
                                        <span className="text-gray-600">{item.bloom}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {/* Step: Generating */}
            {step === 'generating' && (
                <Card className="p-12 text-center">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto text-purple-600" />
                    <h3 className="text-lg font-semibold mt-4">Generating Question Paper...</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        AI is crafting questions based on Bloom's taxonomy cognitive levels.
                        <br />
                        This may take 15-30 seconds.
                    </p>
                </Card>
            )}

            {/* Step: Preview & Edit */}
            {step === 'preview' && preview && (
                <div className="space-y-4">
                    {/* Action Bar */}
                    <Card>
                        <CardContent className="flex items-center gap-3 py-3">
                            <Button variant="outline" onClick={reshuffle}>
                                <Shuffle className="h-4 w-4 mr-2" /> Reshuffle
                            </Button>
                            <Button variant="outline" onClick={exportPDF}>
                                <Download className="h-4 w-4 mr-2" /> Print Paper
                            </Button>
                            <Button variant="outline" onClick={exportAnswerKey}>
                                <Key className="h-4 w-4 mr-2" /> Print Answer Key
                            </Button>
                            <div className="flex-1" />
                            <Button onClick={save} disabled={loading} className="bg-green-600 hover:bg-green-700">
                                <Save className="h-4 w-4 mr-2" /> Finalize & Save
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Paper Preview */}
                    <Card>
                        <CardContent className="py-6">
                            <PaperPreview data={preview} onUpdateQuestion={updateQuestion} />
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Step: Saved */}
            {step === 'saved' && (
                <Card className="p-12 text-center">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                        <Save className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold mt-4">Paper Saved Successfully!</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        Your question paper has been finalized and saved to the question bank.
                    </p>
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <Button variant="outline" onClick={exportPDF}>
                            <Download className="h-4 w-4 mr-2" /> Print Paper
                        </Button>
                        <Button variant="outline" onClick={exportAnswerKey}>
                            <Key className="h-4 w-4 mr-2" /> Print Answer Key
                        </Button>
                        <Button onClick={reset}>
                            <Plus className="h-4 w-4 mr-2" /> Create New
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
}
