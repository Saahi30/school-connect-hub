import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, Download, Search, BookOpen, ExternalLink, Filter } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

// Mock resources for now, as we'll eventually pull from a 'resources' or 'materials' table
const mockResources = [
    {
        id: '1',
        title: 'Algebra 101 - Core Concepts',
        subject: 'Mathematics',
        type: 'PDF',
        size: '2.4 MB',
        date: '2026-02-10',
        description: 'A comprehensive guide to basic algebraic equations and functions.',
    },
    {
        id: '2',
        title: 'Modern History - World War II',
        subject: 'History',
        type: 'DOCX',
        size: '1.1 MB',
        date: '2026-02-12',
        description: 'Detailed study material covering the major events and impacts of WWII.',
    },
    {
        id: '3',
        title: 'Organic Chemistry Lab Manual',
        subject: 'Chemistry',
        type: 'PDF',
        size: '5.2 MB',
        date: '2026-02-14',
        description: 'Safety guidelines and experiment procedures for organic chemistry labs.',
    },
    {
        id: '4',
        title: 'English Literature - Shakespearian Sonnets',
        subject: 'English',
        type: 'PDF',
        size: '1.8 MB',
        date: '2026-02-08',
        description: 'An analysis of the themes and structure of Shakespeare\'s most famous sonnets.',
    },
];

export function StudentResourcesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Simulate loading

    const filteredResources = mockResources.filter(res =>
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4 md:p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Study Resources</h1>
                    <p className="text-muted-foreground">Download study materials and reference guides</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search resources..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
                {filteredResources.map((resource) => (
                    <Card key={resource.id} className="group hover:border-primary/50 transition-colors">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h3 className="font-semibold truncate">{resource.title}</h3>
                                            <p className="text-sm text-muted-foreground">{resource.subject} • {resource.date}</p>
                                        </div>
                                        <Badge variant="secondary" className="shrink-0">{resource.type}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                        {resource.description}
                                    </p>
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-xs text-muted-foreground">{resource.size}</span>
                                        <Button size="sm" variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
                                            <Download className="h-4 w-4 mr-2" />
                                            Download
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredResources.length === 0 && (
                <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                    <h3 className="text-lg font-medium">No resources found</h3>
                    <p className="text-sm text-muted-foreground">Try adjusting your search query</p>
                </div>
            )}
        </div>
    );
}
