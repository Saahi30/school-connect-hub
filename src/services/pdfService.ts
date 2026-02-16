// ============================================================
// PDF Service — Print-ready HTML generation for exam papers
// ============================================================

import type { PaperPreviewData, AnswerKeyEntry } from '@/types/teacherAssistantTypes';

/**
 * Open a print-ready view of the paper in a new window.
 */
export function printPaper(data: PaperPreviewData, schoolName = 'School Connect Hub'): void {
    const html = buildPaperHTML(data, schoolName);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(html);
    printWindow.document.close();

    // Wait for styles to load, then trigger print
    printWindow.onload = () => {
        setTimeout(() => printWindow.print(), 300);
    };
}

/**
 * Open a print-ready view of the answer key.
 */
export function printAnswerKey(data: PaperPreviewData, schoolName = 'School Connect Hub'): void {
    const html = buildAnswerKeyHTML(data, schoolName);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(html);
    printWindow.document.close();

    printWindow.onload = () => {
        setTimeout(() => printWindow.print(), 300);
    };
}

// --- HTML Builders ---

function buildPaperHTML(data: PaperPreviewData, schoolName: string): string {
    const { paper, sections } = data;

    const sectionsHTML = sections
        .map((section) => {
            const questionsHTML = section.questions
                .map((q, i) => {
                    let questionBody = `<p class="question"><strong>Q${i + 1}.</strong> ${q.question_text}</p>`;

                    if (section.type === 'mcq' && q.options) {
                        const opts = (q.options as string[])
                            .map((opt, j) => `<span class="option">${String.fromCharCode(65 + j)}) ${opt}</span>`)
                            .join('');
                        questionBody += `<div class="options">${opts}</div>`;
                    }

                    if (section.type === 'true_false') {
                        questionBody += `<div class="options"><span class="option">A) True</span><span class="option">B) False</span></div>`;
                    }

                    return `<div class="question-block">${questionBody}<span class="marks-badge">[${section.marks_per_question} mark${section.marks_per_question > 1 ? 's' : ''}]</span></div>`;
                })
                .join('\n');

            const sectionMarks = section.marks_per_question * section.questions.length;
            const typeLabel = formatQuestionType(section.type);

            return `
        <div class="section">
          <div class="section-header">
            <h2>${section.name} — ${typeLabel}</h2>
            <span class="section-marks">[${sectionMarks} marks]</span>
          </div>
          ${questionsHTML}
        </div>`;
        })
        .join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${paper.title}</title>
  <style>${PRINT_CSS}</style>
</head>
<body>
  <div class="paper">
    <header class="paper-header">
      <h1>${schoolName}</h1>
      <h2>${paper.title}</h2>
      <div class="paper-meta">
        <span>Total Marks: <strong>${paper.total_marks}</strong></span>
        ${paper.duration_minutes ? `<span>Duration: <strong>${paper.duration_minutes} minutes</strong></span>` : ''}
      </div>
      ${paper.instructions ? `<div class="instructions"><strong>Instructions:</strong> ${paper.instructions}</div>` : ''}
    </header>
    <main>${sectionsHTML}</main>
  </div>
</body>
</html>`;
}

function buildAnswerKeyHTML(data: PaperPreviewData, schoolName: string): string {
    const { paper, answerKey } = data;

    const grouped = answerKey.reduce<Record<string, AnswerKeyEntry[]>>((acc, entry) => {
        if (!acc[entry.section]) acc[entry.section] = [];
        acc[entry.section].push(entry);
        return acc;
    }, {});

    const bodyHTML = Object.entries(grouped)
        .map(
            ([section, entries]) => `
      <div class="section">
        <h2>${section}</h2>
        <table>
          <thead><tr><th>Q#</th><th>Answer</th><th>Marks</th></tr></thead>
          <tbody>
            ${entries.map((e) => `<tr><td>${e.question_number}</td><td>${e.answer}</td><td>${e.marks}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>`
        )
        .join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Answer Key — ${paper.title}</title>
  <style>${PRINT_CSS}</style>
</head>
<body>
  <div class="paper">
    <header class="paper-header">
      <h1>${schoolName}</h1>
      <h2>Answer Key — ${paper.title}</h2>
    </header>
    <main>${bodyHTML}</main>
  </div>
</body>
</html>`;
}

function formatQuestionType(type: string): string {
    const labels: Record<string, string> = {
        mcq: 'Multiple Choice Questions',
        short_answer: 'Short Answer Questions',
        long_answer: 'Long Answer Questions',
        true_false: 'True / False',
        fill_blank: 'Fill in the Blanks',
        match: 'Match the Following',
        assertion_reason: 'Assertion & Reason',
    };
    return labels[type] ?? type;
}

// --- Print Stylesheet ---

const PRINT_CSS = `
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Times New Roman', serif;
    font-size: 12pt;
    line-height: 1.6;
    color: #000;
    padding: 20mm;
  }

  .paper { max-width: 210mm; margin: 0 auto; }

  .paper-header {
    text-align: center;
    border-bottom: 2px solid #000;
    padding-bottom: 12pt;
    margin-bottom: 16pt;
  }

  .paper-header h1 {
    font-size: 18pt;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .paper-header h2 {
    font-size: 14pt;
    margin-top: 4pt;
  }

  .paper-meta {
    display: flex;
    justify-content: space-between;
    margin-top: 8pt;
    font-size: 11pt;
  }

  .instructions {
    margin-top: 8pt;
    padding: 8pt;
    border: 1px solid #ccc;
    font-size: 10pt;
    text-align: left;
  }

  .section {
    margin-top: 20pt;
    page-break-inside: avoid;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #666;
    padding-bottom: 4pt;
    margin-bottom: 12pt;
  }

  .section-header h2 {
    font-size: 13pt;
  }

  .section-marks {
    font-weight: bold;
    font-size: 11pt;
  }

  .question-block {
    margin-bottom: 12pt;
    position: relative;
    padding-right: 60pt;
  }

  .question {
    font-size: 12pt;
  }

  .marks-badge {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 10pt;
    color: #444;
  }

  .options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4pt 24pt;
    margin: 6pt 0 0 20pt;
    font-size: 11pt;
  }

  .option { padding: 2pt 0; }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 8pt;
    font-size: 11pt;
  }

  th, td {
    border: 1px solid #000;
    padding: 6pt 8pt;
    text-align: left;
  }

  th { background: #f0f0f0; font-weight: bold; }

  @media print {
    body { padding: 0; }
    .section { page-break-inside: avoid; }
  }
`;
