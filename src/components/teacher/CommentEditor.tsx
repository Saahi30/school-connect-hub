// ============================================================
// CommentEditor — Editable comment cards with metrics sidebar
// ============================================================

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { RefreshCw, Save, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { ReportComment, CommentTone, StudentMetrics } from '@/types/teacherAssistantTypes';

interface CommentEditorProps {
    comment: ReportComment;
    studentName: string;
    onSave: (commentId: string, editedText: string) => Promise<void>;
    onRegenerate: (
        commentId: string,
        studentId: string,
        studentName: string,
        metrics: StudentMetrics,
        subjectName: string,
        tone?: CommentTone
    ) => Promise<void>;
    subjectName: string;
    loading?: boolean;
}

export function CommentEditor({
    comment,
    studentName,
    onSave,
    onRegenerate,
    subjectName,
    loading,
}: CommentEditorProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(comment.final_comment);
    const [toneOverride, setToneOverride] = useState<CommentTone>(comment.tone);

    const metrics = comment.metrics_snapshot as StudentMetrics | undefined;

    const handleSave = async () => {
        await onSave(comment.id, editText);
        setIsEditing(false);
    };

    const handleRegenerate = async () => {
        if (!metrics) return;
        await onRegenerate(
            comment.id,
            comment.student_id,
            studentName,
            metrics,
            subjectName,
            toneOverride
        );
        setEditText(comment.final_comment);
    };

    const TrendIcon = () => {
        if (!metrics) return null;
        switch (metrics.trend) {
            case 'improving':
                return <TrendingUp className="h-4 w-4 text-green-500" />;
            case 'declining':
                return <TrendingDown className="h-4 w-4 text-red-500" />;
            default:
                return <Minus className="h-4 w-4 text-gray-400" />;
        }
    };

    const trendColor = (trend?: string) => {
        switch (trend) {
            case 'improving': return 'text-green-600 bg-green-50';
            case 'declining': return 'text-red-600 bg-red-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const scoreColor = (score: number) => {
        if (score >= 75) return 'bg-green-500';
        if (score >= 50) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <Card className={`${comment.is_finalized ? 'border-green-300 bg-green-50/30' : ''}`}>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                        {studentName}
                        {comment.is_finalized && (
                            <Badge variant="outline" className="text-green-600 border-green-300 text-xs">
                                Finalized
                            </Badge>
                        )}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <TrendIcon />
                        <Badge className={`text-xs ${trendColor(metrics?.trend)}`}>
                            {metrics?.trend ?? 'N/A'}
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Metrics Sidebar */}
                    {metrics && (
                        <div className="space-y-3">
                            <h4 className="text-xs font-semibold uppercase text-gray-500 tracking-wider">Metrics</h4>
                            {[
                                { label: 'Consistency', value: metrics.consistency },
                                { label: 'Effort', value: metrics.effort },
                                { label: 'Conceptual', value: metrics.conceptual },
                                { label: 'Timeliness', value: metrics.timeliness },
                                { label: 'Participation', value: metrics.participation },
                            ].map((m) => (
                                <div key={m.label} className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-600">{m.label}</span>
                                        <span className="font-medium">{m.value}%</span>
                                    </div>
                                    <Progress value={m.value} className={`h-1.5 ${scoreColor(m.value)}`} />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Comment Area */}
                    <div className="md:col-span-2 space-y-3">
                        {isEditing ? (
                            <Textarea
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="min-h-[120px] text-sm"
                                placeholder="Write or edit the comment..."
                            />
                        ) : (
                            <div className="bg-gray-50 rounded-lg p-3 text-sm leading-relaxed min-h-[80px]">
                                {comment.final_comment}
                            </div>
                        )}

                        {comment.teacher_edited_comment && !isEditing && (
                            <p className="text-xs text-amber-600">✏️ Teacher edited</p>
                        )}

                        <div className="flex items-center gap-2 flex-wrap">
                            {isEditing ? (
                                <>
                                    <Button size="sm" onClick={handleSave} disabled={loading}>
                                        <Save className="h-3 w-3 mr-1" /> Save
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setIsEditing(true)}
                                        disabled={comment.is_finalized}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={handleRegenerate}
                                        disabled={loading || comment.is_finalized}
                                    >
                                        <RefreshCw className={`h-3 w-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
                                        Regenerate
                                    </Button>
                                    <Select
                                        value={toneOverride}
                                        onValueChange={(v) => setToneOverride(v as CommentTone)}
                                        disabled={comment.is_finalized}
                                    >
                                        <SelectTrigger className="w-[140px] h-8 text-xs">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="encouraging">Encouraging</SelectItem>
                                            <SelectItem value="constructive">Constructive</SelectItem>
                                            <SelectItem value="strict">Strict</SelectItem>
                                            <SelectItem value="appreciative">Appreciative</SelectItem>
                                            <SelectItem value="ptm_friendly">PTM Friendly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
