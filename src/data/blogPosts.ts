export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "Product Update" | "Guide" | "Case Study" | "Insights";
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  cover: string;
  content: { heading?: string; body: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "automating-fee-reminders",
    title: "How automating fee reminders cut overdue balances by 38%",
    excerpt:
      "Three schools, three setups, one common outcome — when reminders go out automatically over WhatsApp and SMS, parents pay faster.",
    category: "Case Study",
    author: "Anjali Mehta",
    authorRole: "Head of Customer Success",
    date: "Apr 18, 2026",
    readTime: "6 min read",
    cover: "linear-gradient(135deg, #6366F1 0%, #A855F7 100%)",
    content: [
      { body: "Schools have always treated fee follow-ups as a manual ritual — phone calls from the accountant, sticky notes on parent files, last-minute SMS blasts before the term ends. The result is predictable: overdue balances pile up, the office team gets buried, and parents feel ambushed when penalties hit." },
      { heading: "The change", body: "All three schools switched on KnctED's automated reminder workflow: a friendly nudge 7 days before the due date, a second reminder 2 days before, and an escalation 5 days after. Each reminder went over WhatsApp first and SMS as fallback." },
      { heading: "What we measured", body: "Across 12,000+ invoices in a single term, overdue balances fell by 38% on average. Office staff reported saving roughly 9 hours a week — time they redirected to admissions and parent meetings." },
      { heading: "Why it works", body: "Parents don't need a stern reminder; they need the right one at the right time. Automation removes the awkwardness for everyone, and consistent timing trains parents to expect the cycle. The schools that saw the biggest wins also added a one-tap pay link directly to each WhatsApp message." },
    ],
  },
  {
    slug: "transport-tracking-launch",
    title: "Live bus tracking is now live for every KnctED school",
    excerpt: "Drivers, conductors, and parents now share the same real-time view — with route history, ETAs, and pickup confirmations baked in.",
    category: "Product Update",
    author: "KnctED Product",
    authorRole: "Product team",
    date: "Apr 10, 2026",
    readTime: "3 min read",
    cover: "linear-gradient(135deg, #F97316 0%, #EF4444 100%)",
    content: [
      { body: "We've shipped one of our most-requested features this month: live transport tracking for every plan." },
      { heading: "What's included", body: "Driver and conductor PWAs with route assignment, GPS streaming, attendance check-in for boarding/de-boarding, and a parent live map view." },
      { heading: "Setup", body: "Admins can assign buses, routes, and stops from the dashboard. Driver and conductor accounts are created with one click — they sign in on any phone via the dedicated PWA." },
      { heading: "What's next", body: "Geofenced attendance, automated parent alerts on bus arrival, and consolidated transport billing — all rolling out across May." },
    ],
  },
  {
    slug: "ptm-without-the-chaos",
    title: "Running a PTM without the chaos: a 4-step playbook",
    excerpt: "Slot booking, parent reminders, teacher prep, and post-meeting notes — turn parent-teacher meetings from a fire drill into a system.",
    category: "Guide",
    author: "Rohan Iyer",
    authorRole: "Educator-in-Residence",
    date: "Apr 03, 2026",
    readTime: "8 min read",
    cover: "linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)",
    content: [
      { body: "Most schools dread PTM week. The truth is, the meeting itself is rarely the problem — the chaos is in the logistics around it." },
      { heading: "Step 1 — Open slot booking 10 days out", body: "Send parents a link with available slots. Let them pick. No back-and-forth WhatsApp groups, no double-booked teachers." },
      { heading: "Step 2 — Auto-remind 24 hours before", body: "A simple WhatsApp + email reminder reduces no-shows by ~40%. Include the teacher's name and the meeting room." },
      { heading: "Step 3 — Give teachers a 1-page brief", body: "Pull attendance, recent test scores, and any flagged behaviour into a single sheet per student. Hand it to the teacher five minutes before. The conversation gets sharper, faster." },
      { heading: "Step 4 — Capture notes during, not after", body: "A shared note that the parent receives within an hour of the meeting beats a polished one delivered three days later. Speed of follow-up is the new quality." },
    ],
  },
  {
    slug: "data-security-for-schools",
    title: "Data security 101 for school administrators",
    excerpt: "What questions to ask your software vendors — from where data is hosted to what happens when a teacher leaves.",
    category: "Insights",
    author: "Sneha Kapoor",
    authorRole: "Security Lead",
    date: "Mar 27, 2026",
    readTime: "5 min read",
    cover: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    content: [
      { body: "Schools handle some of the most sensitive data in any organisation: minors' identities, parent contact info, medical conditions, fee records. Yet security is rarely a procurement criterion." },
      { heading: "Five questions to ask any vendor", body: "Where is the data hosted? Who can access it internally? What is the backup cadence? What happens to data when an employee leaves? Is there a published incident response process?" },
      { heading: "Red flags", body: "Shared admin logins. Unencrypted exports. No role-based access controls. Backup files emailed around. Vendors that can't tell you where your data physically lives." },
      { heading: "What KnctED does", body: "Region-pinned hosting, role-based access for every action, audit trails on sensitive operations, daily encrypted backups, and a documented offboarding flow that revokes credentials immediately." },
    ],
  },
  {
    slug: "admissions-conversion-tips",
    title: "5 ways to lift your admissions enquiry-to-enrolment rate",
    excerpt: "Most schools lose qualified families between the enquiry form and the offer letter. Here's how to plug the leaks.",
    category: "Guide",
    author: "Karthik R.",
    authorRole: "Growth lead",
    date: "Mar 20, 2026",
    readTime: "7 min read",
    cover: "linear-gradient(135deg, #EAB308 0%, #F97316 100%)",
    content: [
      { body: "Schools obsess over marketing campaigns but ignore the admissions funnel. Conversion isn't lost in advertising — it's lost in the 14 days between enquiry and offer." },
      { heading: "1. Reply within 4 hours", body: "Families compare schools the same week. Speed wins." },
      { heading: "2. Make the form short", body: "Three fields to enquire, full details only at the application stage. Every extra field drops conversion by ~10%." },
      { heading: "3. Stage the journey", body: "Enquiry → guided tour → application → offer. Each step gets its own automated nudge." },
      { heading: "4. Show the parent the next step", body: "Don't make them wonder. After every action, show them what happens next and when." },
      { heading: "5. Track every drop-off", body: "Look at where families fall off. The leak is almost always at the same stage." },
    ],
  },
];

export const getPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
