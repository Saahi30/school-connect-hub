import type { FeatureContent } from "@/components/landing/FeatureUseCaseModal";

export const featureUseCases: Record<string, FeatureContent["segments"]> = {
  "Attendance Tracking": {
    k12: {
      headline: "Daily attendance, automated parent alerts",
      scenario: "Class teachers mark attendance during the morning bell. Parents of absentees get a WhatsApp + push notification within minutes — no separate phone calls.",
      bullets: [
        "Roll-call view with photos for quick marking",
        "Auto-SMS/WhatsApp to parents of absentees",
        "Monthly attendance reports for boards & PTMs",
      ],
    },
    international: {
      headline: "Continuous, period-wise attendance",
      scenario: "Each subject teacher marks attendance per period. Pastoral leads see consolidated reports and flag attendance-at-risk students for early intervention.",
      bullets: [
        "Per-period marking with substitute support",
        "Attendance-at-risk dashboards for pastoral teams",
        "IB/Cambridge-compatible export formats",
      ],
    },
    colleges: {
      headline: "Department, semester, elective tracking",
      scenario: "Lecturers mark per-class attendance across departments and electives. Students below 75% are auto-flagged for the exam-eligibility review.",
      bullets: [
        "Multi-department, multi-elective marking",
        "Auto-flag students below attendance thresholds",
        "AICTE/UGC-ready reports with one click",
      ],
    },
    coaching: {
      headline: "Per-batch, per-session marking",
      scenario: "Faculty mark attendance for each batch session. Parents of younger students get instant notifications, and absentees get follow-up calls scheduled.",
      bullets: [
        "Batch-wise attendance with session timings",
        "Drop-off alerts to follow up with parents",
        "Cross-centre views for multi-city institutes",
      ],
    },
  },

  "Marks & Reports": {
    k12: {
      headline: "Term exams, board-style report cards",
      scenario: "Teachers enter marks per subject; the system generates CBSE/ICSE-style report cards with grades, remarks, and a printable layout ready for PTMs.",
      bullets: [
        "Subject-wise mark entry with locking",
        "Auto-grading and remark templates",
        "Printable PDF report cards for parents",
      ],
    },
    international: {
      headline: "Criterion-based, IB-friendly reports",
      scenario: "Continuous assessment with rubrics; teachers grade against criteria, not just numbers. Reports look IB/MYP-ready out of the box.",
      bullets: [
        "Rubric-based grading per criterion",
        "Learner portfolios and progress evidence",
        "Customisable report templates per programme",
      ],
    },
    colleges: {
      headline: "Internal + university exam pipeline",
      scenario: "Internal marks roll up automatically; university exam results import via CSV; transcripts and provisional marksheets generate without manual stitching.",
      bullets: [
        "Internal CCE + external exam consolidation",
        "Auto-generated transcripts and CGPA",
        "Backlog and supplementary tracking",
      ],
    },
    coaching: {
      headline: "Daily tests, instant ranks",
      scenario: "Mock tests publish ranks within minutes. Parents see percentile, weak topics, and a recommended revision plan — same evening.",
      bullets: [
        "Instant rank, percentile, and topic analysis",
        "Auto-generated weak-topic study plan",
        "Branch-wise and cross-batch leaderboards",
      ],
    },
  },

  "Timetable Management": {
    k12: {
      headline: "Class-wise schedules, mobile-first",
      scenario: "One timetable powers the principal's wall, the teacher's phone, and the parent's app. Substitutions update everywhere instantly.",
      bullets: [
        "Drag-and-drop weekly timetable builder",
        "One-tap substitute teacher assignment",
        "Auto-sync to student and parent apps",
      ],
    },
    international: {
      headline: "Block scheduling, multi-track support",
      scenario: "Build A-day/B-day rotations, electives across grades, and split classes — all in one schedule, with conflict detection.",
      bullets: [
        "Rotation patterns and block scheduling",
        "Conflict detection across teachers & rooms",
        "Elective bands across grade levels",
      ],
    },
    colleges: {
      headline: "Department & elective time-tabling",
      scenario: "Generate timetables across programmes, semesters, and electives. Lab and theory rooms balance automatically based on capacity.",
      bullets: [
        "Multi-department, semester-aware schedules",
        "Lab/theory room allocation with capacity",
        "Faculty workload balancing",
      ],
    },
    coaching: {
      headline: "Batch-wise schedules across centres",
      scenario: "Each batch sees only its own slots. Multi-city centres assign faculty to overlapping schedules without conflicts.",
      bullets: [
        "Batch-specific schedule visibility",
        "Multi-centre faculty assignment",
        "Auto-reschedule on faculty leave",
      ],
    },
  },

  "Homework & Assignments": {
    k12: {
      headline: "Daily homework with photo submissions",
      scenario: "Teachers post homework with image/PDF attachments; students submit photos of their work; parents see what was assigned and when it's due.",
      bullets: [
        "Photo and PDF homework submissions",
        "Auto-reminders before the due date",
        "Parent visibility into pending work",
      ],
    },
    international: {
      headline: "Project-based assignments with rubrics",
      scenario: "Long-form assignments with criterion-based rubrics. Plagiarism flags, peer reviews, and inline teacher comments built in.",
      bullets: [
        "Rubric-graded long-form assignments",
        "Plagiarism flags and peer-review options",
        "Inline annotations for teacher feedback",
      ],
    },
    colleges: {
      headline: "Course assignments with deadlines",
      scenario: "Faculty publish assignments per course module; students submit through the LMS; grading rubrics flow into internal-marks tally.",
      bullets: [
        "Course-module assignment publishing",
        "LMS submissions with version history",
        "Rubrics flow into internal CCE marks",
      ],
    },
    coaching: {
      headline: "Daily practice problems, auto-graded",
      scenario: "MCQ practice sets auto-grade instantly. Descriptive submissions queue for faculty review; students see solutions after submitting.",
      bullets: [
        "Auto-graded MCQ practice sets",
        "Descriptive submission queue with feedback",
        "Solutions unlock after attempt",
      ],
    },
  },

  "Fee Management": {
    k12: {
      headline: "Term-wise fees with auto reminders",
      scenario: "Set fee structures per grade. Razorpay handles online payments. Reminders go out 7, 2, and 0 days before due — overdue rates drop ~38%.",
      bullets: [
        "Razorpay online collection with receipts",
        "Auto WhatsApp/SMS payment reminders",
        "Auto-reconciliation with the accounts ledger",
      ],
    },
    international: {
      headline: "Multi-currency tuition, instalment plans",
      scenario: "Tuition in INR, USD, AED — pick what your campus collects. Instalment plans, sibling discounts, and scholarship deductions all rule-based.",
      bullets: [
        "Multi-currency invoicing",
        "Instalment plans with custom schedules",
        "Sibling, scholarship, and merit discounts",
      ],
    },
    colleges: {
      headline: "Tuition + hostel + transport bundling",
      scenario: "Single invoice across tuition, hostel, transport, exam fees. Government scholarships auto-deducted; bank reconciliation matches receipts to ledger.",
      bullets: [
        "Bundled invoices across heads",
        "Government scholarship auto-deductions",
        "Bank statement reconciliation",
      ],
    },
    coaching: {
      headline: "Course fees, refunds, EMI",
      scenario: "Collect course fees, partial refunds on dropouts, EMI plans for high-ticket programmes — all with audit trails and parent receipts.",
      bullets: [
        "EMI plans for high-ticket courses",
        "Partial refund workflow with approvals",
        "Per-batch fee reports for branch heads",
      ],
    },
  },

  "Announcements": {
    k12: {
      headline: "School-wide & class-specific notices",
      scenario: "Principal sends school-wide notices; teachers send class-specific updates. Parents receive via app push, WhatsApp, and SMS — pick the channel.",
      bullets: [
        "Targeted by class, grade, or whole school",
        "Multi-channel delivery (push/WhatsApp/SMS)",
        "Read receipts and acknowledgement tracking",
      ],
    },
    international: {
      headline: "Bilingual & community-wide messaging",
      scenario: "Announcements in two languages auto-toggle for parent preference. Schedule for after-hours, set expiry, and require acknowledgement for legal notices.",
      bullets: [
        "Bilingual auto-toggle by parent locale",
        "Scheduled and expiring announcements",
        "Mandatory acknowledgement for legal notices",
      ],
    },
    colleges: {
      headline: "Department, programme, and cohort notices",
      scenario: "HoDs send notices to specific programmes or batches. Placement cell broadcasts to eligible students only — no spam to first-years.",
      bullets: [
        "Notice targeting by programme & cohort",
        "Eligibility-filtered placement broadcasts",
        "Notice board archive with search",
      ],
    },
    coaching: {
      headline: "Batch alerts, class cancellations",
      scenario: "Last-minute class cancellations or rescheduling reach the right batch within seconds — no group-WhatsApp chaos.",
      bullets: [
        "Batch-only urgent alerts",
        "Class cancellation/rescheduling templates",
        "Confirmation read receipts from parents",
      ],
    },
  },

  "Parent-Teacher Chat": {
    k12: {
      headline: "Direct messaging, on the record",
      scenario: "Parents message the class teacher directly — but inside the platform, with admin moderation and an audit trail. No personal numbers shared.",
      bullets: [
        "1:1 chat without sharing phone numbers",
        "Admin-visible audit log",
        "Quiet hours so teachers aren't pinged at 11pm",
      ],
    },
    international: {
      headline: "Pastoral chat, slot booking, video calls",
      scenario: "Pastoral team and parents schedule video meetings inside the app. Pre-meeting briefs and post-meeting notes sit on the same thread.",
      bullets: [
        "In-app video meetings via Zoom/BBB",
        "Slot booking with calendar sync",
        "Threaded notes pre/post meeting",
      ],
    },
    colleges: {
      headline: "Mentor-mentee channels",
      scenario: "Each student is paired with a faculty mentor; private channels handle academic and personal counselling, with escalation paths to the dean.",
      bullets: [
        "Mentor-mentee private channels",
        "Escalation workflow to dean / counsellor",
        "Confidential conversation tags",
      ],
    },
    coaching: {
      headline: "Doubt-resolution & progress chat",
      scenario: "Students message faculty with doubts; parents see academic progress threads. SLAs ensure doubts get answered within working hours.",
      bullets: [
        "Doubt threads with faculty SLAs",
        "Parent-visible progress threads",
        "Resolved-doubt library for future students",
      ],
    },
  },

  "Transport Management": {
    k12: {
      headline: "Live bus tracking for parents",
      scenario: "Parents see the bus on a live map, get a notification when it's 5 minutes away, and confirm boarding/de-boarding via the conductor app.",
      bullets: [
        "Live GPS map for parents",
        "Pickup/drop-off notifications",
        "Driver and conductor PWAs",
      ],
    },
    international: {
      headline: "Multi-route, geo-fenced safety",
      scenario: "Geo-fenced routes alert pastoral staff if a bus deviates. Parent app supports day-care extensions and ad-hoc pickup changes with admin approval.",
      bullets: [
        "Geo-fenced route deviations",
        "Pickup change requests with approval flow",
        "Day-care and after-school extensions",
      ],
    },
    colleges: {
      headline: "Campus shuttles & city routes",
      scenario: "Shuttle between hostel-academic blocks; city routes for day scholars. Per-route fee collection and passenger rosters for compliance audits.",
      bullets: [
        "Hostel-to-block shuttles + city routes",
        "Per-route fee collection",
        "Passenger rosters for compliance",
      ],
    },
    coaching: {
      headline: "Pick-up & drop logistics",
      scenario: "Coaching centres often run pickup vans for younger batches. Parents track the van; faculty get a roster on each leg.",
      bullets: [
        "Per-batch pickup van schedules",
        "Parent live-tracking app",
        "Roster-based driver checklists",
      ],
    },
  },

  "Library System": {
    k12: {
      headline: "Book catalogue, issue & return",
      scenario: "Library staff issue and return books with a quick search. Overdue auto-reminders to students; lost-book fines roll into the fees ledger.",
      bullets: [
        "Quick search & barcode scanning",
        "Overdue auto-reminders",
        "Lost/damaged fines flow to fee ledger",
      ],
    },
    international: {
      headline: "Reading programmes & e-resources",
      scenario: "Track reading levels, integrate with Lexile/AR programmes, and hand out e-resource access alongside physical books.",
      bullets: [
        "Lexile/AR reading-level tracking",
        "E-resource subscriptions per student",
        "Reading-progress reports for parents",
      ],
    },
    colleges: {
      headline: "Department reserves & journals",
      scenario: "Faculty put books on reserve per course. Journals and digital archives accessible by department; per-day overdue fines automated.",
      bullets: [
        "Course-reserve shelves per faculty",
        "Journal and e-resource access by department",
        "Automated daily overdue fines",
      ],
    },
    coaching: {
      headline: "Resource library for batches",
      scenario: "Test booklets, reference material, and recordings live in a per-batch library — accessible only while enrolled.",
      bullets: [
        "Batch-only resource access",
        "Auto-revoke on enrolment end",
        "Download-track and read-receipt analytics",
      ],
    },
  },

  "Leave Management": {
    k12: {
      headline: "Student & teacher leave, in one place",
      scenario: "Parents apply leave for their child; teachers apply through their dashboard. Class teachers and admins approve in one tap.",
      bullets: [
        "Parent-initiated student leave",
        "One-tap teacher approvals",
        "Auto-update attendance ledger",
      ],
    },
    international: {
      headline: "Pre-approved leave & travel windows",
      scenario: "Term breaks, travel windows, and family commitments — pre-approve longer leaves with documentation and follow-up tasks for catch-up work.",
      bullets: [
        "Multi-day leave with documentation",
        "Catch-up task assignments",
        "Boarding-house leave-out registers",
      ],
    },
    colleges: {
      headline: "Hostel & campus leave passes",
      scenario: "Hostel students apply for leave passes; warden approval, parent intimation, and gate-pass generation in one flow.",
      bullets: [
        "Hostel leave with warden approval",
        "Parent intimation & confirmation",
        "Auto-generated gate passes",
      ],
    },
    coaching: {
      headline: "Batch absence with make-up sessions",
      scenario: "Students missing a class auto-get the recording link and a make-up session option for paid courses.",
      bullets: [
        "Auto-share recording link on absence",
        "Make-up session booking",
        "Refund/credit for cancellations",
      ],
    },
  },

  "Health Records": {
    k12: {
      headline: "Medical history, allergies, vaccinations",
      scenario: "Class teachers see allergy and medical alerts at a glance. Vaccination reminders go to parents; school nurse updates each visit on file.",
      bullets: [
        "Allergy alerts on the class roster",
        "Vaccination schedule reminders",
        "Nurse-visit log per student",
      ],
    },
    international: {
      headline: "Detailed medical with consent flows",
      scenario: "GDPR-style consent for sharing medical info with sports coaches, trip leaders, and infirmary staff. Audit log of every access.",
      bullets: [
        "Granular consent per category",
        "Audit log of medical record access",
        "Trip & sports medical declarations",
      ],
    },
    colleges: {
      headline: "Hostel infirmary integration",
      scenario: "Hostel infirmary visits, ongoing prescriptions, and chronic-condition flags are visible to wardens (with student consent).",
      bullets: [
        "Infirmary visit log",
        "Chronic-condition flags for wardens",
        "Student consent gate for visibility",
      ],
    },
    coaching: {
      headline: "Emergency contacts & day-care vitals",
      scenario: "For younger batches with day-care: emergency contacts, allergy alerts, and basic vitals during long study days.",
      bullets: [
        "Emergency contact quick-dial",
        "Allergy and dietary flags",
        "Hydration / break reminders",
      ],
    },
  },

  "Complaint System": {
    k12: {
      headline: "Anonymous & named grievances",
      scenario: "Parents file grievances with optional anonymity. Routed to the right authority (transport, academics, fees) and SLA-tracked.",
      bullets: [
        "Anonymous or named filing",
        "Auto-routing by category",
        "SLA tracking with escalation",
      ],
    },
    international: {
      headline: "POSH & safeguarding workflow",
      scenario: "Confidential safeguarding reports with restricted-access investigators. Pre-built POSH/safeguarding templates and statutory timelines.",
      bullets: [
        "Confidential investigator-only access",
        "POSH/safeguarding workflow templates",
        "Statutory-timeline reminders",
      ],
    },
    colleges: {
      headline: "Anti-ragging & internal committee",
      scenario: "UGC-mandated anti-ragging and internal-complaints committee workflows pre-configured. Auto-escalations to the dean and external observers.",
      bullets: [
        "Pre-built anti-ragging workflow",
        "Internal Complaints Committee dashboard",
        "External-observer access on escalation",
      ],
    },
    coaching: {
      headline: "Faculty feedback & escalations",
      scenario: "Students rate faculty per session; complaints about coaching quality route to centre heads with anonymised aggregate reports.",
      bullets: [
        "Per-session faculty ratings",
        "Anonymised complaint aggregation",
        "Centre-head escalation path",
      ],
    },
  },
};
