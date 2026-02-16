// ============================================================
// PaperPreview — Editable structured paper display
// ============================================================

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Check, X } from 'lucide-react';
import type { PaperPreviewData, QuestionBankItem } from '@/types/teacherAssistantTypes';

interface PaperPreviewProps {
    data: PaperPreviewData;
    onUpdateQuestion: (sectionIndex: number, questionIndex: number, updates: Partial<QuestionBankItem>) => void;
}

export function PaperPreview({ data, onUpdateQuestion }: PaperPreviewProps) {
    const [editingCell, setEditingCell] = useState<{ section: number; question: number } | null>(null);
    const [editText, setEditText] = useState('');
    const [editAnswer, setEditAnswer] = useState('');

    const startEdit = (sectionIdx: number, questionIdx: number, question: QuestionBankItem) => {
        setEditingCell({ section: sectionIdx, question: questionIdx });
        setEditText(question.question_text);
        setEditAnswer(question.correct_answer ?? '');
    };

    const saveEdit = () => {
        if (!editingCell) return;
        onUpdateQuestion(editingCell.section, editingCell.question, {
            question_text: editText,
            correct_answer: editAnswer,
        });
        setEditingCell(null);
    };

    const cancelEdit = () => {
        setEditingCell(null);
    };

    const formatType = (type: string) => {
        const labels: Record<string, string> = {
            mcq: 'MCQ',
            short_answer: 'Short Answer',
            long_answer: 'Long Answer',
            true_false: 'True/False',
            fill_blank: 'Fill in the Blanks',
            match: 'Match',
            assertion_reason: 'Assertion & Reason',
        };
        return labels[type] ?? type;
    };

    const cognitiveBadgeColor = (level: string) => {
        const colors: Record<string, string> = {
            remember: 'bg-green-100 text-green-800',
            understand: 'bg-blue-100 text-blue-800',
            apply: 'bg-yellow-100 text-yellow-800',
            analyze: 'bg-orange-100 text-orange-800',
            evaluate: 'bg-red-100 text-red-800',
            create: 'bg-purple-100 text-purple-800',
        };
        return colors[level] ?? 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="space-y-6">
            {/* Paper Header */}
            <div className="text-center border-b-2 border-gray-800 pb-4">
                <h2 className="text-xl font-bold uppercase tracking-wider text-gray-900">
                    {data.paper.title}
                </h2>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>Total Marks: <strong>{data.paper.total_marks}</strong></span>
                    {data.paper.duration_minutes && (
                        <span>Duration: <strong>{data.paper.duration_minutes} min</strong></span>
                    )}
                </div>
                {data.paper.instructions && (
                    <p className="mt-2 text-xs text-gray-500 border rounded p-2">
                        <strong>Instructions:</strong> {data.paper.instructions}
                    </p>
                )}
            </div>

            {/* Sections */}
            {data.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-3">
                    <div className="flex items-center justify-between border-b pb-2">
                        <h3 className="text-lg font-semibold">
                            {section.name} — {formatType(section.type)}
                        </h3>
                        <span className="text-sm font-medium text-gray-500">
                            [{section.marks_per_question * section.questions.length} marks]
                        </span>
                    </div>

                    {section.questions.map((q, qIdx) => {
                        const isEditing = editingCell?.section === sIdx && editingCell?.question === qIdx;

                        return (
                            <Card key={qIdx} className="relative group">
                                <CardContent className="pt-4 pb-3">
                                    {isEditing ? (
                                        <div className="space-y-3">
                                            <Textarea
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                                className="min-h-[80px]"
                                                placeholder="Question text..."
                                            />
                                            <Input
                                                value={editAnswer}
                                                onChange={(e) => setEditAnswer(e.target.value)}
                                                placeholder="Correct answer..."
                                            />
                                            <div className="flex gap-2">
                                                <Button size="sm" onClick={saveEdit}>
                                                    <Check className="h-3 w-3 mr-1" /> Save
                                                </Button>
                                                <Button size="sm" variant="outline" onClick={cancelEdit}>
                                                    <X className="h-3 w-3 mr-1" /> Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-start gap-3">
                                                <span className="font-bold text-sm mt-0.5 min-w-[30px]">
                                                    Q{q.question_order}.
                                                </span>
                                                <div className="flex-1">
                                                    <p className="text-sm">{q.question_text}</p>

                                                    {/* MCQ Options */}
                                                    {section.type === 'mcq' && q.options && (
                                                        <div className="grid grid-cols-2 gap-1 mt-2">
                                                            {(q.options as string[]).map((opt, oIdx) => (
                                                                <span key={oIdx} className="text-xs text-gray-600">
                                                                    {String.fromCharCode(65 + oIdx)}) {opt}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className={`text-xs ${cognitiveBadgeColor(q.cognitive_level)}`}>
                                                        {q.cognitive_level}
                                                    </Badge>
                                                    <span className="text-xs text-gray-400">
                                                        [{section.marks_per_question}m]
                                                    </span>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0"
                                                        onClick={() => startEdit(sIdx, qIdx, q)}
                                                    >
                                                        <Pencil className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            ))}

            {/* Answer Key Preview */}
            <div className="mt-8 border-t-2 pt-4">
                <h3 className="text-lg font-semibold mb-3">Answer Key</h3>
                <div className="grid gap-1">
                    {data.answerKey.map((entry, idx) => (
                        <div key={idx} className="flex items-center gap-4 text-sm py-1 border-b border-gray-100">
                            <span className="text-gray-500 min-w-[100px]">{entry.section}</span>
                            <span className="font-medium min-w-[40px]">Q{entry.question_number}</span>
                            <span className="flex-1">{entry.answer}</span>
                            <span className="text-gray-400">[{entry.marks}m]</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
