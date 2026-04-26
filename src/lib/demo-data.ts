// Demo data for the School Management System
// Uses realistic Indian school context

export const demoStudent = {
  id: 'demo-student-1',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@school.edu',
  phone: '+91 98765 43210',
  class: '8B',
  rollNumber: '15',
  admissionNumber: 'ADM2023001',
  dateOfBirth: '2011-05-15',
  gender: 'Male',
  bloodGroup: 'B+',
  address: '123, Shanti Nagar, New Delhi - 110001',
  emergencyContact: '+91 98765 43211',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav',
  attendance: {
    present: 142,
    absent: 8,
    total: 150,
    percentage: 94.67,
  },
  upcomingExams: 3,
  pendingHomework: 2,
  recentMarks: [
    { subject: 'Mathematics', marks: 92, total: 100, grade: 'A+' },
    { subject: 'Science', marks: 88, total: 100, grade: 'A' },
    { subject: 'English', marks: 85, total: 100, grade: 'A' },
    { subject: 'Hindi', marks: 90, total: 100, grade: 'A+' },
    { subject: 'Social Studies', marks: 82, total: 100, grade: 'A' },
  ],
  timetable: [
    { day: 'Monday', periods: ['English', 'Mathematics', 'Science', 'Hindi', 'Social Studies', 'PE', 'Computer'] },
    { day: 'Tuesday', periods: ['Mathematics', 'English', 'Hindi', 'Science', 'Art', 'Social Studies', 'Library'] },
    { day: 'Wednesday', periods: ['Science', 'Hindi', 'English', 'Mathematics', 'Computer', 'Music', 'Social Studies'] },
    { day: 'Thursday', periods: ['Hindi', 'Science', 'Mathematics', 'English', 'Social Studies', 'PE', 'Art'] },
    { day: 'Friday', periods: ['Mathematics', 'Science', 'English', 'Hindi', 'Music', 'Social Studies', 'Computer'] },
    { day: 'Saturday', periods: ['English', 'Mathematics', 'Science', 'Hindi', 'PE', 'Library', '-'] },
  ],
  homework: [
    { id: 1, subject: 'Mathematics', title: 'Chapter 5 - Quadratic Equations', dueDate: '2024-01-15', status: 'pending' },
    { id: 2, subject: 'Science', title: 'Lab Report - Chemical Reactions', dueDate: '2024-01-18', status: 'pending' },
    { id: 3, subject: 'English', title: 'Essay on Climate Change', dueDate: '2024-01-10', status: 'submitted' },
  ],
};

export const demoParent = {
  id: 'demo-parent-1',
  name: 'Priya Sharma',
  email: 'priya.sharma@email.com',
  phone: '+91 98765 43211',
  occupation: 'Software Engineer',
  address: '123, Shanti Nagar, New Delhi - 110001',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
  children: [
    {
      id: 'demo-student-1',
      name: 'Aarav Sharma',
      class: '8B',
      rollNumber: '15',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav',
      attendance: { percentage: 94.67 },
      recentGrade: 'A',
    },
    {
      id: 'demo-student-2',
      name: 'Ananya Sharma',
      class: '5A',
      rollNumber: '8',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
      attendance: { percentage: 97.5 },
      recentGrade: 'A+',
    },
  ],
  announcements: [
    { id: 1, title: 'Parent-Teacher Meeting', date: '2024-01-20', type: 'event' },
    { id: 2, title: 'Annual Sports Day', date: '2024-01-25', type: 'event' },
    { id: 3, title: 'Fee Payment Reminder', date: '2024-01-15', type: 'reminder' },
  ],
};

export const demoTeacher = {
  id: 'demo-teacher-1',
  name: 'Mrs. Sunita Gupta',
  email: 'sunita.gupta@school.edu',
  phone: '+91 98765 43212',
  employeeId: 'TCH2020015',
  designation: 'Senior Mathematics Teacher',
  qualification: 'M.Sc. Mathematics, B.Ed.',
  joiningDate: '2020-07-01',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita',
  assignedClasses: [
    { class: '8A', subject: 'Mathematics', students: 35, isClassTeacher: false },
    { class: '8B', subject: 'Mathematics', students: 32, isClassTeacher: true },
    { class: '9A', subject: 'Mathematics', students: 38, isClassTeacher: false },
  ],
  todaySchedule: [
    { period: 1, class: '8A', subject: 'Mathematics', time: '8:00 - 8:45' },
    { period: 2, class: '8B', subject: 'Mathematics', time: '8:45 - 9:30' },
    { period: 3, class: '9A', subject: 'Mathematics', time: '9:30 - 10:15' },
    { period: 5, class: '8B', subject: 'Extra Class', time: '11:00 - 11:45' },
  ],
  pendingTasks: {
    attendanceToMark: 2,
    homeworkToReview: 5,
    leaveRequests: 3,
  },
  recentStudents: [
    { name: 'Aarav Sharma', class: '8B', performance: 'Excellent' },
    { name: 'Rohan Patel', class: '8A', performance: 'Good' },
    { name: 'Ishita Verma', class: '9A', performance: 'Average' },
  ],
};

export const demoAdmin = {
  id: 'demo-admin-1',
  name: 'Dr. Rajesh Kumar',
  email: 'principal@school.edu',
  phone: '+91 98765 43200',
  designation: 'Principal',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
  schoolStats: {
    totalStudents: 1250,
    totalTeachers: 65,
    totalParents: 980,
    totalClasses: 24,
    attendanceToday: 94.2,
    feeCollected: 85,
  },
  recentActivities: [
    { type: 'enrollment', message: 'New student enrolled in Class 5A', time: '2 hours ago' },
    { type: 'fee', message: 'Fee payment received from 15 parents', time: '4 hours ago' },
    { type: 'leave', message: '3 teacher leave requests pending', time: '5 hours ago' },
    { type: 'event', message: 'Annual Day preparation started', time: '1 day ago' },
  ],
  pendingApprovals: {
    teacherLeaves: 3,
    studentAdmissions: 5,
    feeWaivers: 2,
  },
  upcomingEvents: [
    { name: 'Parent-Teacher Meeting', date: '2024-01-20' },
    { name: 'Republic Day Celebration', date: '2024-01-26' },
    { name: 'Annual Sports Day', date: '2024-02-05' },
  ],
};

export const demoClasses = [
  { id: 1, name: '1', section: 'A', students: 30, classTeacher: 'Mrs. Kavita Singh' },
  { id: 2, name: '1', section: 'B', students: 28, classTeacher: 'Mr. Amit Sharma' },
  { id: 3, name: '2', section: 'A', students: 32, classTeacher: 'Mrs. Rekha Patel' },
  { id: 4, name: '5', section: 'A', students: 35, classTeacher: 'Mrs. Meera Joshi' },
  { id: 5, name: '8', section: 'A', students: 35, classTeacher: 'Mr. Vikram Singh' },
  { id: 6, name: '8', section: 'B', students: 32, classTeacher: 'Mrs. Sunita Gupta' },
  { id: 7, name: '9', section: 'A', students: 38, classTeacher: 'Mr. Rahul Verma' },
  { id: 8, name: '10', section: 'A', students: 40, classTeacher: 'Mrs. Anita Sharma' },
];

export const demoSubjects = [
  'English',
  'Hindi',
  'Mathematics',
  'Science',
  'Social Studies',
  'Computer Science',
  'Physical Education',
  'Art',
  'Music',
  'Sanskrit',
];

export const demoAnnouncements = [
  {
    id: 1,
    title: 'Winter Vacation Notice',
    content: 'School will remain closed from Dec 25 to Jan 5 for winter vacation.',
    date: '2024-01-02',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Annual Sports Day',
    content: 'Annual Sports Day will be held on February 5th. All students are requested to participate.',
    date: '2024-01-10',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Fee Payment Reminder',
    content: 'Last date for fee payment for Quarter 4 is January 15th.',
    date: '2024-01-08',
    priority: 'high',
  },
];

// ============================================================
// Helper utilities for date-based mock data
// ============================================================
const isoDay = (offsetDays: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

const isoTime = (offsetDays: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString();
};

// ============================================================
// STUDENT — Marks, Attendance, Timetable, Homework, Announcements, Leave, Fees
// ============================================================

export const demoStudentMarks = [
  // Mid-Term Mathematics
  { id: 'm1', marks_obtained: 92, max_marks: 100, grade: 'A+', subject: { name: 'Mathematics', code: 'MATH' }, exam_type: { name: 'Mid-Term', weightage: 30 } },
  { id: 'm2', marks_obtained: 88, max_marks: 100, grade: 'A', subject: { name: 'Science', code: 'SCI' }, exam_type: { name: 'Mid-Term', weightage: 30 } },
  { id: 'm3', marks_obtained: 85, max_marks: 100, grade: 'A', subject: { name: 'English', code: 'ENG' }, exam_type: { name: 'Mid-Term', weightage: 30 } },
  { id: 'm4', marks_obtained: 90, max_marks: 100, grade: 'A+', subject: { name: 'Hindi', code: 'HIN' }, exam_type: { name: 'Mid-Term', weightage: 30 } },
  { id: 'm5', marks_obtained: 82, max_marks: 100, grade: 'A', subject: { name: 'Social Studies', code: 'SST' }, exam_type: { name: 'Mid-Term', weightage: 30 } },
  // Unit Test 1
  { id: 'm6', marks_obtained: 18, max_marks: 20, grade: 'A+', subject: { name: 'Mathematics', code: 'MATH' }, exam_type: { name: 'Unit Test 1', weightage: 10 } },
  { id: 'm7', marks_obtained: 17, max_marks: 20, grade: 'A', subject: { name: 'Science', code: 'SCI' }, exam_type: { name: 'Unit Test 1', weightage: 10 } },
  { id: 'm8', marks_obtained: 16, max_marks: 20, grade: 'A', subject: { name: 'English', code: 'ENG' }, exam_type: { name: 'Unit Test 1', weightage: 10 } },
  { id: 'm9', marks_obtained: 19, max_marks: 20, grade: 'A+', subject: { name: 'Hindi', code: 'HIN' }, exam_type: { name: 'Unit Test 1', weightage: 10 } },
  { id: 'm10', marks_obtained: 15, max_marks: 20, grade: 'A', subject: { name: 'Social Studies', code: 'SST' }, exam_type: { name: 'Unit Test 1', weightage: 10 } },
  // Quarterly
  { id: 'm11', marks_obtained: 86, max_marks: 100, grade: 'A', subject: { name: 'Mathematics', code: 'MATH' }, exam_type: { name: 'Quarterly', weightage: 25 } },
  { id: 'm12', marks_obtained: 84, max_marks: 100, grade: 'A', subject: { name: 'Science', code: 'SCI' }, exam_type: { name: 'Quarterly', weightage: 25 } },
  { id: 'm13', marks_obtained: 80, max_marks: 100, grade: 'A', subject: { name: 'English', code: 'ENG' }, exam_type: { name: 'Quarterly', weightage: 25 } },
  { id: 'm14', marks_obtained: 88, max_marks: 100, grade: 'A', subject: { name: 'Hindi', code: 'HIN' }, exam_type: { name: 'Quarterly', weightage: 25 } },
  { id: 'm15', marks_obtained: 78, max_marks: 100, grade: 'B+', subject: { name: 'Social Studies', code: 'SST' }, exam_type: { name: 'Quarterly', weightage: 25 } },
];

export const demoExamTypes = [
  { id: 'et1', name: 'Unit Test 1', weightage: 10 },
  { id: 'et2', name: 'Mid-Term', weightage: 30 },
  { id: 'et3', name: 'Quarterly', weightage: 25 },
  { id: 'et4', name: 'Final', weightage: 35 },
];

export const demoStudentRanks = [
  { id: 'r1', exam_type_name: 'Mid-Term', rank: 4, class_size: 32, percentage: 87, total_obtained: 437, total_max: 500 },
  { id: 'r2', exam_type_name: 'Quarterly', rank: 6, class_size: 32, percentage: 83, total_obtained: 416, total_max: 500 },
];

// Generate ~3 months of attendance (working days only)
export const demoStudentAttendance = (() => {
  const records: Array<{
    id: string;
    student_id: string;
    class_id: string;
    date: string;
    status: 'present' | 'absent' | 'late' | 'excused';
    remarks: string | null;
  }> = [];
  const today = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 90);
  let i = 0;
  for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
    const dow = d.getDay();
    if (dow === 0) continue; // Sunday holiday
    const r = Math.random();
    let status: 'present' | 'absent' | 'late' | 'excused' = 'present';
    let remarks: string | null = null;
    if (r < 0.04) {
      status = 'absent';
      remarks = i % 2 === 0 ? 'No information provided' : null;
    } else if (r < 0.06) {
      status = 'late';
      remarks = 'Arrived 15 minutes late';
    } else if (r < 0.07) {
      status = 'excused';
      remarks = 'Medical appointment';
    }
    records.push({
      id: `att-${i++}`,
      student_id: 'demo-student-1',
      class_id: 'demo-class-8b',
      date: d.toISOString().split('T')[0],
      status,
      remarks,
    });
  }
  return records.reverse();
})();

export const demoStudentTimetableSlots = (() => {
  const subjects = [
    { name: 'Mathematics', teacher: 'Mrs. Sunita Gupta', room: 'Room 201' },
    { name: 'Science', teacher: 'Mr. Rakesh Khanna', room: 'Lab 1' },
    { name: 'English', teacher: 'Ms. Pooja Nair', room: 'Room 105' },
    { name: 'Hindi', teacher: 'Mr. Manoj Tiwari', room: 'Room 108' },
    { name: 'Social Studies', teacher: 'Mrs. Kavita Singh', room: 'Room 112' },
    { name: 'Computer Science', teacher: 'Mr. Arjun Mehta', room: 'Computer Lab' },
    { name: 'Physical Education', teacher: 'Mr. Vikram Singh', room: 'Playground' },
    { name: 'Art', teacher: 'Mrs. Meera Joshi', room: 'Art Room' },
    { name: 'Music', teacher: 'Mr. Sanjay Rao', room: 'Music Room' },
    { name: 'Library', teacher: 'Mrs. Anita Sharma', room: 'Library' },
  ];
  const periods = [
    { slot: 1, start: '08:00', end: '08:45' },
    { slot: 2, start: '08:45', end: '09:30' },
    { slot: 3, start: '09:30', end: '10:15' },
    { slot: 4, start: '10:30', end: '11:15' },
    { slot: 5, start: '11:15', end: '12:00' },
    { slot: 6, start: '12:45', end: '13:30' },
    { slot: 7, start: '13:30', end: '14:15' },
  ];
  // 6 days (Monday=0 .. Saturday=5 in our DAYS array but supabase uses 0=Sun..6=Sat)
  const layout: Record<number, number[]> = {
    1: [0, 1, 2, 3, 4, 6, 5], // Mon
    2: [2, 0, 3, 1, 7, 4, 9], // Tue
    3: [1, 3, 0, 2, 5, 8, 4], // Wed
    4: [3, 1, 2, 0, 4, 6, 7], // Thu
    5: [0, 2, 1, 3, 8, 4, 5], // Fri
    6: [2, 0, 1, 3, 6, 9, 7], // Sat
  };
  const slots: any[] = [];
  let id = 1;
  for (let day = 1; day <= 6; day++) {
    layout[day].forEach((subIdx, i) => {
      const sub = subjects[subIdx];
      const p = periods[i];
      slots.push({
        id: `slot-${id++}`,
        day_of_week: day,
        slot_number: p.slot,
        start_time: p.start + ':00',
        end_time: p.end + ':00',
        room: sub.room,
        subject: { id: `sub-${subIdx}`, name: sub.name, code: sub.name.slice(0, 3).toUpperCase() },
        teacher: { id: `t-${subIdx}`, profile: { full_name: sub.teacher } },
      });
    });
  }
  return slots;
})();

export const demoStudentClassSessions = [
  { id: 'cs1', session_date: isoDay(0), topic: 'Quadratic Equations — Word Problems', description: 'Solve real-life problems using quadratic equations', subject_id: 'sub-0' },
  { id: 'cs2', session_date: isoDay(0), topic: 'Chemical Reactions', description: 'Types of reactions and balancing equations', subject_id: 'sub-1' },
  { id: 'cs3', session_date: isoDay(1), topic: 'Modern Indian History', description: 'Independence movement and key leaders', subject_id: 'sub-4' },
];

export const demoStudentHomework = [
  {
    id: 'hw1',
    title: 'Chapter 5: Quadratic Equations Worksheet',
    description: 'Solve all problems from exercise 5.3 and 5.4. Show your steps clearly.',
    due_date: isoDay(2),
    assigned_date: isoDay(-3),
    attachment_url: null,
    subject: { name: 'Mathematics' },
  },
  {
    id: 'hw2',
    title: 'Lab Report — Chemical Reactions',
    description: 'Write a detailed lab report based on yesterday\'s experiment. Include observations, hypothesis and conclusion.',
    due_date: isoDay(5),
    assigned_date: isoDay(-1),
    attachment_url: null,
    subject: { name: 'Science' },
  },
  {
    id: 'hw3',
    title: 'Essay: Climate Change and Its Impact',
    description: 'Write a 500-word essay covering causes, effects and solutions.',
    due_date: isoDay(-2),
    assigned_date: isoDay(-9),
    attachment_url: null,
    subject: { name: 'English' },
  },
  {
    id: 'hw4',
    title: 'Hindi Vyakaran — Sandhi Practice',
    description: 'Complete exercises 12, 13 and 14 from Vyakaran textbook.',
    due_date: isoDay(0),
    assigned_date: isoDay(-4),
    attachment_url: null,
    subject: { name: 'Hindi' },
  },
  {
    id: 'hw5',
    title: 'Map Work — Indian Subcontinent',
    description: 'Mark major rivers, mountain ranges and capitals on the outline map provided.',
    due_date: isoDay(-7),
    assigned_date: isoDay(-12),
    attachment_url: null,
    subject: { name: 'Social Studies' },
  },
];

export const demoStudentHomeworkSubmissions = [
  { id: 'hs1', homework_id: 'hw3', student_id: 'demo-student-1', submission_text: 'Submitted essay covering all required points.', attachment_url: null, status: 'graded', grade: 'A', feedback: 'Well-structured essay. Strong arguments and good vocabulary.', submitted_at: isoTime(-2) },
  { id: 'hs2', homework_id: 'hw5', student_id: 'demo-student-1', submission_text: 'Map work attached.', attachment_url: null, status: 'submitted', grade: null, feedback: null, submitted_at: isoTime(-7) },
];

export const demoStudentAnnouncementsList = [
  { id: 'a1', title: 'Annual Sports Day — February 5th', content: 'Our Annual Sports Day will be held on February 5th. All students are required to participate in at least one event. Practice sessions begin next week.', priority: 'high', created_at: isoTime(-1), end_date: isoDay(15), audience: 'all' },
  { id: 'a2', title: 'Mid-Term Examination Schedule Released', content: 'The mid-term examination schedule has been published. Please check the exam tab for details. Best of luck!', priority: 'high', created_at: isoTime(-3), end_date: isoDay(20), audience: 'students' },
  { id: 'a3', title: 'Library Books Return Reminder', content: 'Students who have borrowed books are requested to return them by Friday to avoid late fees.', priority: 'normal', created_at: isoTime(-5), end_date: isoDay(7), audience: 'students' },
  { id: 'a4', title: 'New Cafeteria Menu', content: 'The school cafeteria has updated its menu with healthier options. Check it out!', priority: 'low', created_at: isoTime(-7), end_date: null, audience: 'all' },
  { id: 'a5', title: 'Republic Day Celebration', content: 'School will host Republic Day celebrations on January 26th at 9:00 AM. Parents are cordially invited.', priority: 'normal', created_at: isoTime(-10), end_date: isoDay(2), audience: 'all' },
  { id: 'a6', title: 'Parent-Teacher Meeting', content: 'PTM scheduled for January 20th between 10:00 AM and 1:00 PM. Slot booking opens tomorrow.', priority: 'high', created_at: isoTime(-12), end_date: isoDay(8), audience: 'parents' },
];

export const demoStudentLeaveRequests = [
  { id: 'lr1', user_id: 'demo-student-1', leave_type: 'sick', start_date: isoDay(-15), end_date: isoDay(-13), reason: 'Viral fever — doctor advised 3 days bed rest.', status: 'approved', review_notes: 'Approved. Get well soon.', created_at: isoTime(-16) },
  { id: 'lr2', user_id: 'demo-student-1', leave_type: 'family', start_date: isoDay(7), end_date: isoDay(9), reason: 'Sister\'s wedding — out of station with family.', status: 'pending', review_notes: null, created_at: isoTime(-1) },
  { id: 'lr3', user_id: 'demo-student-1', leave_type: 'personal', start_date: isoDay(-30), end_date: isoDay(-30), reason: 'Passport renewal appointment.', status: 'approved', review_notes: 'Approved.', created_at: isoTime(-32) },
  { id: 'lr4', user_id: 'demo-student-1', leave_type: 'other', start_date: isoDay(-45), end_date: isoDay(-45), reason: 'Inter-school cricket tournament.', status: 'rejected', review_notes: 'Tournament not registered with school. Please coordinate with PE department.', created_at: isoTime(-47) },
];

export const demoStudentInvoices = [
  {
    id: 'inv1',
    invoice_number: 'INV-2025-0234',
    due_date: isoDay(15),
    total_amount: 18500,
    paid_amount: 0,
    status: 'pending',
    items: [
      { id: 'it1', description: 'Tuition Fee — Q4', amount: 12000 },
      { id: 'it2', description: 'Computer Lab Fee', amount: 1500 },
      { id: 'it3', description: 'Sports & Activity Fee', amount: 2000 },
      { id: 'it4', description: 'Library Fee', amount: 1000 },
      { id: 'it5', description: 'Annual Day Contribution', amount: 2000 },
    ],
    payments: [],
  },
  {
    id: 'inv2',
    invoice_number: 'INV-2024-0188',
    due_date: isoDay(-90),
    total_amount: 17500,
    paid_amount: 17500,
    status: 'paid',
    items: [
      { id: 'it6', description: 'Tuition Fee — Q3', amount: 12000 },
      { id: 'it7', description: 'Transport Fee', amount: 4500 },
      { id: 'it8', description: 'Examination Fee', amount: 1000 },
    ],
    payments: [
      { id: 'pay1', amount: 17500, payment_date: isoDay(-88), payment_method: 'upi' },
    ],
  },
  {
    id: 'inv3',
    invoice_number: 'INV-2024-0142',
    due_date: isoDay(-180),
    total_amount: 16000,
    paid_amount: 16000,
    status: 'paid',
    items: [
      { id: 'it9', description: 'Tuition Fee — Q2', amount: 12000 },
      { id: 'it10', description: 'Transport Fee', amount: 4000 },
    ],
    payments: [
      { id: 'pay2', amount: 8000, payment_date: isoDay(-178), payment_method: 'card' },
      { id: 'pay3', amount: 8000, payment_date: isoDay(-150), payment_method: 'netbanking' },
    ],
  },
];

// ============================================================
// PARENT — Children, Marks, Homework, Messages, Leave, Fees, Meetings
// ============================================================

export const demoParentChildren = [
  {
    student_id: 'demo-student-1',
    relationship: 'father',
    roll_number: '15',
    admission_number: 'ADM2023001',
    admission_date: '2023-04-12',
    blood_group: 'B+',
    emergency_contact: '+91 98765 43211',
    class: { id: 'demo-class-8b', name: '8', section: 'B' },
    profile: {
      full_name: 'Aarav Sharma',
      email: 'aarav.sharma@school.edu',
      phone: '+91 98765 43210',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav',
      date_of_birth: '2011-05-15',
      gender: 'male',
    },
  },
  {
    student_id: 'demo-student-2',
    relationship: 'father',
    roll_number: '8',
    admission_number: 'ADM2020027',
    admission_date: '2020-04-10',
    blood_group: 'A+',
    emergency_contact: '+91 98765 43211',
    class: { id: 'demo-class-5a', name: '5', section: 'A' },
    profile: {
      full_name: 'Ananya Sharma',
      email: 'ananya.sharma@school.edu',
      phone: '+91 98765 43210',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
      date_of_birth: '2014-09-22',
      gender: 'female',
    },
  },
];

export const demoLinkedChildren = demoParentChildren.map((c) => ({
  student_id: c.student_id,
  relationship: c.relationship,
  student: {
    id: c.student_id,
    roll_number: c.roll_number,
    profile: c.profile,
    class: c.class,
  },
}));

export const demoParentLeaveRequests = [
  { id: 'plr1', user_id: 'demo-parent-1', leave_type: 'sick', start_date: isoDay(-7), end_date: isoDay(-6), reason: 'Aarav had stomach flu — kept him home for two days.', status: 'approved', review_notes: 'Approved. Hope he recovers.', created_at: isoTime(-8) },
  { id: 'plr2', user_id: 'demo-parent-1', leave_type: 'family', start_date: isoDay(10), end_date: isoDay(12), reason: 'Family wedding in Jaipur. Both children will attend.', status: 'pending', review_notes: null, created_at: isoTime(-1) },
];

export const demoParentMessages = {
  conversations: [
    { other_user_id: 't-0', other_user_name: 'Mrs. Sunita Gupta', other_user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita', last_message: 'Aarav showed great improvement in the recent test. Keep encouraging him!', last_message_at: isoTime(-1), unread_count: 1 },
    { other_user_id: 't-1', other_user_name: 'Mr. Rakesh Khanna', other_user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rakesh', last_message: 'Lab report is due Friday. Please ensure Aarav completes the observations table.', last_message_at: isoTime(-3), unread_count: 0 },
    { other_user_id: 't-2', other_user_name: 'Ms. Pooja Nair', other_user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pooja', last_message: 'Thank you for the timely submission of the essay.', last_message_at: isoTime(-5), unread_count: 0 },
  ],
  teachers: [
    { user_id: 't-0', full_name: 'Mrs. Sunita Gupta', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita', designation: 'Senior Mathematics Teacher', classes: [{ class_name: '8', section: 'B', subject: 'Mathematics' }] },
    { user_id: 't-1', full_name: 'Mr. Rakesh Khanna', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rakesh', designation: 'Science Teacher', classes: [{ class_name: '8', section: 'B', subject: 'Science' }] },
    { user_id: 't-2', full_name: 'Ms. Pooja Nair', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pooja', designation: 'English Teacher', classes: [{ class_name: '8', section: 'B', subject: 'English' }] },
    { user_id: 't-3', full_name: 'Mr. Manoj Tiwari', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Manoj', designation: 'Hindi Teacher', classes: [{ class_name: '8', section: 'B', subject: 'Hindi' }] },
  ],
  threadByUser: {
    't-0': [
      { id: 'msg1', sender_id: 't-0', content: 'Hello! I wanted to share that Aarav has been doing exceptionally well in algebra.', created_at: isoTime(-2) },
      { id: 'msg2', sender_id: 'demo-parent-1', content: 'Thank you so much for letting me know! He really enjoys your class.', created_at: isoTime(-2) },
      { id: 'msg3', sender_id: 't-0', content: 'Aarav showed great improvement in the recent test. Keep encouraging him!', created_at: isoTime(-1) },
    ],
    't-1': [
      { id: 'msg4', sender_id: 't-1', content: 'Lab report is due Friday. Please ensure Aarav completes the observations table.', created_at: isoTime(-3) },
    ],
    't-2': [
      { id: 'msg5', sender_id: 't-2', content: 'Thank you for the timely submission of the essay.', created_at: isoTime(-5) },
    ],
  } as Record<string, Array<{ id: string; sender_id: string; content: string; created_at: string }>>,
};

export const demoParentMeetingRequests = [
  {
    id: 'ptm1',
    parent_id: 'demo-parent-1',
    teacher_id: 't-0',
    student_id: 'demo-student-1',
    subject_id: 'sub-0',
    topic: 'Discuss Aarav\'s progress in Mathematics',
    preferred_date: isoDay(5),
    preferred_slot: '10:00 - 10:30',
    meeting_mode: 'in_person',
    parent_notes: 'Would like to know how to help him at home.',
    status: 'accepted',
    created_at: isoTime(-2),
    student: { profile: { full_name: 'Aarav Sharma' } },
    teacher: { profile: { full_name: 'Mrs. Sunita Gupta' } },
  },
  {
    id: 'ptm2',
    parent_id: 'demo-parent-1',
    teacher_id: 't-1',
    student_id: 'demo-student-1',
    subject_id: 'sub-1',
    topic: 'Concerns about science lab safety',
    preferred_date: isoDay(8),
    preferred_slot: '14:00 - 14:30',
    meeting_mode: 'video',
    parent_notes: 'Quick chat please.',
    status: 'requested',
    created_at: isoTime(-1),
    student: { profile: { full_name: 'Aarav Sharma' } },
    teacher: { profile: { full_name: 'Mr. Rakesh Khanna' } },
  },
  {
    id: 'ptm3',
    parent_id: 'demo-parent-1',
    teacher_id: 't-x',
    student_id: 'demo-student-2',
    subject_id: null,
    topic: 'Ananya\'s social interaction at school',
    preferred_date: isoDay(-10),
    preferred_slot: '11:00 - 11:30',
    meeting_mode: 'in_person',
    parent_notes: 'Resolved.',
    status: 'completed',
    created_at: isoTime(-15),
    student: { profile: { full_name: 'Ananya Sharma' } },
    teacher: { profile: { full_name: 'Mrs. Kavita Singh' } },
  },
];

// ============================================================
// TEACHER — Classes, Schedule, Attendance roster, Marks entry, Homework, Announcements, Leave
// ============================================================

export const demoTeacherClasses = [
  { classId: 'demo-class-8b', className: '8', section: 'B', subjectName: 'Mathematics', studentCount: 32, isClassTeacher: true },
  { classId: 'demo-class-8a', className: '8', section: 'A', subjectName: 'Mathematics', studentCount: 35, isClassTeacher: false },
  { classId: 'demo-class-9a', className: '9', section: 'A', subjectName: 'Mathematics', studentCount: 38, isClassTeacher: false },
];

const indianStudentNames = [
  'Aarav Sharma', 'Vivaan Kapoor', 'Aditya Patel', 'Vihaan Reddy', 'Arjun Nair',
  'Sai Krishnan', 'Reyansh Agarwal', 'Ayaan Khan', 'Krishna Iyer', 'Ishaan Verma',
  'Saanvi Gupta', 'Aanya Joshi', 'Aadhya Mehta', 'Diya Choudhary', 'Pari Singh',
  'Anika Bhatt', 'Navya Rao', 'Kavya Menon', 'Myra Bansal', 'Sara Pillai',
  'Rohan Patel', 'Ishita Verma', 'Karthik Subramanian', 'Tanvi Desai', 'Aryan Malhotra',
  'Riya Chatterjee', 'Vedant Shah', 'Anushka Bose', 'Dhruv Saxena', 'Meera Kulkarni',
  'Atharv Mishra', 'Siya Ahuja',
];

export const demoTeacherClassRoster = indianStudentNames.map((name, i) => ({
  id: `stu-8b-${i + 1}`,
  roll_number: String(i + 1),
  profile: {
    full_name: name,
    avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
  },
}));

export const demoTeacherSchedule = (() => {
  const slots: any[] = [];
  const layout = [
    // Mon
    { day: 1, start: '08:00', end: '08:45', class: '8A', subject: 'Mathematics', room: 'Room 201' },
    { day: 1, start: '08:45', end: '09:30', class: '8B', subject: 'Mathematics', room: 'Room 202' },
    { day: 1, start: '10:30', end: '11:15', class: '9A', subject: 'Mathematics', room: 'Room 305' },
    // Tue
    { day: 2, start: '08:00', end: '08:45', class: '8B', subject: 'Mathematics', room: 'Room 202' },
    { day: 2, start: '09:30', end: '10:15', class: '8A', subject: 'Mathematics', room: 'Room 201' },
    { day: 2, start: '11:15', end: '12:00', class: '9A', subject: 'Mathematics', room: 'Room 305' },
    // Wed
    { day: 3, start: '08:00', end: '08:45', class: '9A', subject: 'Mathematics', room: 'Room 305' },
    { day: 3, start: '08:45', end: '09:30', class: '8A', subject: 'Mathematics', room: 'Room 201' },
    { day: 3, start: '13:30', end: '14:15', class: '8B', subject: 'Mathematics — Extra Class', room: 'Room 202' },
    // Thu
    { day: 4, start: '08:45', end: '09:30', class: '9A', subject: 'Mathematics', room: 'Room 305' },
    { day: 4, start: '09:30', end: '10:15', class: '8B', subject: 'Mathematics', room: 'Room 202' },
    { day: 4, start: '11:15', end: '12:00', class: '8A', subject: 'Mathematics', room: 'Room 201' },
    // Fri
    { day: 5, start: '08:00', end: '08:45', class: '8A', subject: 'Mathematics', room: 'Room 201' },
    { day: 5, start: '08:45', end: '09:30', class: '8B', subject: 'Mathematics', room: 'Room 202' },
    { day: 5, start: '10:30', end: '11:15', class: '9A', subject: 'Mathematics', room: 'Room 305' },
    // Sat
    { day: 6, start: '09:30', end: '10:15', class: '8B', subject: 'Class Teacher Period', room: 'Room 202' },
    { day: 6, start: '10:30', end: '11:15', class: '8A', subject: 'Mathematics', room: 'Room 201' },
  ];
  layout.forEach((s, i) => {
    const [cName, cSection] = [s.class.replace(/[A-Z]$/, ''), s.class.slice(-1)];
    slots.push({
      id: `tsch-${i + 1}`,
      day_of_week: s.day,
      start_time: s.start + ':00',
      end_time: s.end + ':00',
      room: s.room,
      subject: { name: s.subject },
      class: { name: cName, section: cSection },
    });
  });
  return slots;
})();

export const demoTeacherHomework = [
  {
    id: 'thw1',
    title: 'Chapter 5: Quadratic Equations Worksheet',
    description: 'Solve all problems from exercise 5.3 and 5.4.',
    due_date: isoDay(2),
    assigned_date: isoDay(-3),
    class_id: 'demo-class-8b',
    subject_id: 'sub-0',
    attachment_url: null,
    class: { name: '8', section: 'B' },
    subject: { name: 'Mathematics' },
    submissionsCount: 18,
    pendingCount: 14,
  },
  {
    id: 'thw2',
    title: 'Chapter 6: Triangles — Practice Set',
    description: 'Complete the practice set on similarity of triangles.',
    due_date: isoDay(7),
    assigned_date: isoDay(-1),
    class_id: 'demo-class-9a',
    subject_id: 'sub-0',
    attachment_url: null,
    class: { name: '9', section: 'A' },
    subject: { name: 'Mathematics' },
    submissionsCount: 5,
    pendingCount: 33,
  },
  {
    id: 'thw3',
    title: 'Algebra Revision Sheet',
    description: 'Solve mixed problems on linear and quadratic equations.',
    due_date: isoDay(-2),
    assigned_date: isoDay(-9),
    class_id: 'demo-class-8a',
    subject_id: 'sub-0',
    attachment_url: null,
    class: { name: '8', section: 'A' },
    subject: { name: 'Mathematics' },
    submissionsCount: 32,
    pendingCount: 3,
  },
];

export const demoTeacherAnnouncements = [
  { id: 'tan1', title: 'Class 8B Math Test Next Friday', content: 'A unit test on Quadratic Equations will be held next Friday. Cover chapters 4 and 5.', announcement_type: 'student', priority: 'high', is_active: true, created_at: isoTime(-2) },
  { id: 'tan2', title: 'Parent-Teacher Meeting Slots Open', content: 'Parents of class 8B can book their PTM slots for January 20th from the parent portal.', announcement_type: 'parent', priority: 'normal', is_active: true, created_at: isoTime(-5) },
  { id: 'tan3', title: 'Reminder: Submit Lab Report', content: 'All students who haven\'t submitted last week\'s lab report — please do so by Thursday.', announcement_type: 'student', priority: 'normal', is_active: true, created_at: isoTime(-7) },
  { id: 'tan4', title: 'Old: Diwali Holiday Notice', content: 'School will be closed for Diwali break from Nov 10-15.', announcement_type: 'both', priority: 'low', is_active: false, created_at: isoTime(-90) },
];

export const demoTeacherLeaveRequests = [
  { id: 'tlr1', user_id: 'demo-teacher-1', leave_type: 'sick', start_date: isoDay(-30), end_date: isoDay(-29), reason: 'Migraine — required full rest.', status: 'approved', review_notes: 'Approved by Principal', created_at: isoTime(-32) },
  { id: 'tlr2', user_id: 'demo-teacher-1', leave_type: 'personal', start_date: isoDay(20), end_date: isoDay(20), reason: 'Daughter\'s school annual function.', status: 'pending', review_notes: null, created_at: isoTime(-1) },
];

export const demoStudentSubmissionRows = (homeworkId: string) =>
  demoTeacherClassRoster.slice(0, 32).map((s, i) => ({
    student: s,
    submission:
      i % 4 === 0
        ? null
        : {
            id: `sub-${homeworkId}-${i}`,
            student_id: s.id,
            homework_id: homeworkId,
            submission_text: 'Submitted via portal.',
            attachment_url: null,
            status: i % 7 === 0 ? 'graded' : 'submitted',
            grade: i % 7 === 0 ? ['A+', 'A', 'B+'][i % 3] : null,
            feedback: i % 7 === 0 ? 'Good work!' : null,
            submitted_at: isoTime(-(i % 5 + 1)),
          },
  }));

// ============================================================
// ADMIN — Students/Teachers/Parents lists, Classes, Attendance,
// Announcements, Exams, Fees, Library, Transport, Timetable
// ============================================================

const lastNames = ['Sharma', 'Patel', 'Gupta', 'Singh', 'Verma', 'Iyer', 'Nair', 'Rao', 'Kapoor', 'Joshi', 'Mehta', 'Khan', 'Choudhary', 'Reddy', 'Pillai', 'Bose', 'Bansal', 'Bhat', 'Saxena', 'Malhotra'];
const firstNamesM = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan', 'Atharv', 'Dhruv', 'Vedant', 'Karthik', 'Aryan', 'Rohan'];
const firstNamesF = ['Saanvi', 'Aanya', 'Aadhya', 'Diya', 'Pari', 'Anika', 'Navya', 'Kavya', 'Myra', 'Sara', 'Ishita', 'Tanvi', 'Riya', 'Anushka', 'Meera', 'Siya'];

export const demoAdminStudentsList = (() => {
  const list: any[] = [];
  const classes = ['1A', '2B', '3A', '4B', '5A', '6B', '7A', '8A', '8B', '9A', '10A'];
  for (let i = 0; i < 60; i++) {
    const isMale = i % 2 === 0;
    const first = (isMale ? firstNamesM : firstNamesF)[i % 16];
    const last = lastNames[i % 20];
    const cls = classes[i % classes.length];
    list.push({
      id: `astu-${i + 1}`,
      admission_number: `ADM2023${String(i + 1).padStart(4, '0')}`,
      roll_number: String((i % 35) + 1),
      class: { id: `cl-${cls}`, name: cls.replace(/[A-Z]$/, ''), section: cls.slice(-1) },
      profile: {
        full_name: `${first} ${last}`,
        email: `${first.toLowerCase()}.${last.toLowerCase()}@school.edu`,
        phone: `+91 9${String(Math.floor(Math.random() * 1000000000)).padStart(9, '0')}`,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(first + last)}`,
        gender: isMale ? 'male' : 'female',
        date_of_birth: `20${10 + (i % 8)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 27) + 1).padStart(2, '0')}`,
      },
      status: i % 25 === 0 ? 'inactive' : 'active',
      created_at: isoTime(-(i * 7)),
    });
  }
  return list;
})();

export const demoAdminTeachersList = (() => {
  const designations = ['Senior Teacher', 'Subject Teacher', 'Head of Department', 'PE Teacher', 'Music Teacher', 'Lab Coordinator', 'Vice Principal'];
  const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer Science', 'Physical Education', 'Art', 'Music', 'Sanskrit'];
  const list: any[] = [];
  for (let i = 0; i < 25; i++) {
    const isMale = i % 2 === 1;
    const first = (isMale ? firstNamesM : firstNamesF)[i % 16];
    const last = lastNames[i % 20];
    list.push({
      id: `ate-${i + 1}`,
      employee_id: `TCH2020${String(i + 10).padStart(3, '0')}`,
      designation: designations[i % designations.length],
      subject: subjects[i % subjects.length],
      qualification: i % 3 === 0 ? 'M.A., B.Ed.' : i % 3 === 1 ? 'M.Sc., B.Ed.' : 'M.Phil., B.Ed.',
      joining_date: `20${15 + (i % 9)}-0${(i % 9) + 1}-15`,
      profile: {
        full_name: `${isMale ? 'Mr.' : 'Mrs.'} ${first} ${last}`,
        email: `${first.toLowerCase()}.${last.toLowerCase()}@school.edu`,
        phone: `+91 98${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(first + last)}T`,
      },
      status: i === 24 ? 'on_leave' : 'active',
      created_at: isoTime(-(i * 30)),
    });
  }
  return list;
})();

export const demoAdminParentsList = (() => {
  const occupations = ['Software Engineer', 'Doctor', 'Business Owner', 'Government Officer', 'Architect', 'Chartered Accountant', 'Teacher', 'Bank Manager', 'Consultant', 'Designer'];
  const list: any[] = [];
  for (let i = 0; i < 40; i++) {
    const isMale = i % 2 === 0;
    const first = (isMale ? firstNamesM : firstNamesF)[i % 16];
    const last = lastNames[i % 20];
    list.push({
      id: `apa-${i + 1}`,
      occupation: occupations[i % occupations.length],
      relationship: isMale ? 'father' : 'mother',
      profile: {
        full_name: `${isMale ? 'Mr.' : 'Mrs.'} ${first} ${last}`,
        email: `${first.toLowerCase()}.${last.toLowerCase()}@email.com`,
        phone: `+91 9${String(Math.floor(Math.random() * 1000000000)).padStart(9, '0')}`,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(first + last)}P`,
      },
      children_count: 1 + (i % 3),
      status: 'active',
      created_at: isoTime(-(i * 20)),
    });
  }
  return list;
})();

export const demoAdminClasses = [
  { id: 'cl-1A', name: '1', section: 'A', students: 30, classTeacher: 'Mrs. Kavita Singh', subjects: 5 },
  { id: 'cl-1B', name: '1', section: 'B', students: 28, classTeacher: 'Mr. Amit Sharma', subjects: 5 },
  { id: 'cl-2A', name: '2', section: 'A', students: 32, classTeacher: 'Mrs. Rekha Patel', subjects: 5 },
  { id: 'cl-2B', name: '2', section: 'B', students: 30, classTeacher: 'Mrs. Sneha Iyer', subjects: 5 },
  { id: 'cl-3A', name: '3', section: 'A', students: 33, classTeacher: 'Mr. Suresh Rao', subjects: 6 },
  { id: 'cl-4A', name: '4', section: 'A', students: 34, classTeacher: 'Mrs. Lakshmi Menon', subjects: 6 },
  { id: 'cl-5A', name: '5', section: 'A', students: 35, classTeacher: 'Mrs. Meera Joshi', subjects: 7 },
  { id: 'cl-6A', name: '6', section: 'A', students: 36, classTeacher: 'Mr. Pradeep Khanna', subjects: 8 },
  { id: 'cl-7A', name: '7', section: 'A', students: 38, classTeacher: 'Mrs. Geeta Bose', subjects: 9 },
  { id: 'cl-8A', name: '8', section: 'A', students: 35, classTeacher: 'Mr. Vikram Singh', subjects: 9 },
  { id: 'cl-8B', name: '8', section: 'B', students: 32, classTeacher: 'Mrs. Sunita Gupta', subjects: 9 },
  { id: 'cl-9A', name: '9', section: 'A', students: 38, classTeacher: 'Mr. Rahul Verma', subjects: 10 },
  { id: 'cl-9B', name: '9', section: 'B', students: 36, classTeacher: 'Ms. Pooja Nair', subjects: 10 },
  { id: 'cl-10A', name: '10', section: 'A', students: 40, classTeacher: 'Mrs. Anita Sharma', subjects: 10 },
  { id: 'cl-10B', name: '10', section: 'B', students: 38, classTeacher: 'Mr. Sanjay Mehta', subjects: 10 },
];

export const demoAdminAttendanceToday = {
  date: isoDay(0),
  totalMarked: 1180,
  totalStudents: 1250,
  present: 1112,
  absent: 52,
  late: 16,
  excused: 0,
  percentage: 94.2,
  byClass: demoAdminClasses.map((c) => ({
    class: `${c.name}${c.section}`,
    classId: c.id,
    total: c.students,
    present: Math.round(c.students * (0.88 + Math.random() * 0.10)),
    absent: 0,
    late: 0,
    percentage: 0,
  })).map((row) => {
    row.absent = Math.max(0, row.total - row.present - 1);
    row.late = Math.max(0, row.total - row.present - row.absent);
    row.percentage = Math.round((row.present / row.total) * 100);
    return row;
  }),
};

export const demoAdminAnnouncements = [
  { id: 'aan1', title: 'Annual Sports Day — February 5th', content: 'Annual Sports Day on February 5th. All classes will participate.', priority: 'high', announcement_type: 'all', target: 'all', is_active: true, created_at: isoTime(-1), end_date: isoDay(15), created_by: 'Dr. Rajesh Kumar' },
  { id: 'aan2', title: 'Mid-Term Exam Schedule Released', content: 'Mid-term schedule published. Check exam tab.', priority: 'high', announcement_type: 'student', target: 'students', is_active: true, created_at: isoTime(-3), end_date: isoDay(20), created_by: 'Dr. Rajesh Kumar' },
  { id: 'aan3', title: 'Parent-Teacher Meeting', content: 'PTM on January 20th. Slot booking open.', priority: 'high', announcement_type: 'parent', target: 'parents', is_active: true, created_at: isoTime(-5), end_date: isoDay(8), created_by: 'Dr. Rajesh Kumar' },
  { id: 'aan4', title: 'Library Membership Drive', content: 'New books arrived. Membership cards available at counter.', priority: 'normal', announcement_type: 'all', target: 'all', is_active: true, created_at: isoTime(-7), end_date: isoDay(30), created_by: 'Mrs. Anita Sharma' },
  { id: 'aan5', title: 'Cafeteria Menu Update', content: 'Healthier options now available.', priority: 'low', announcement_type: 'all', target: 'all', is_active: true, created_at: isoTime(-10), end_date: null, created_by: 'Admin' },
  { id: 'aan6', title: 'Republic Day Celebrations', content: 'Flag hoisting at 9 AM on January 26th.', priority: 'normal', announcement_type: 'all', target: 'all', is_active: true, created_at: isoTime(-12), end_date: isoDay(2), created_by: 'Dr. Rajesh Kumar' },
  { id: 'aan7', title: 'Old: Winter Break Notice', content: 'School closed Dec 25 - Jan 5.', priority: 'normal', announcement_type: 'all', target: 'all', is_active: false, created_at: isoTime(-60), end_date: isoDay(-50), created_by: 'Admin' },
];

export const demoAdminExams = [
  { id: 'ex1', exam_type: 'Mid-Term', subject: 'Mathematics', class: '8A', exam_date: isoDay(2), start_time: '09:00', end_time: '12:00', max_marks: 100, room: 'Hall A', status: 'scheduled' },
  { id: 'ex2', exam_type: 'Mid-Term', subject: 'Science', class: '8A', exam_date: isoDay(4), start_time: '09:00', end_time: '12:00', max_marks: 100, room: 'Hall A', status: 'scheduled' },
  { id: 'ex3', exam_type: 'Mid-Term', subject: 'English', class: '8A', exam_date: isoDay(6), start_time: '09:00', end_time: '12:00', max_marks: 100, room: 'Hall A', status: 'scheduled' },
  { id: 'ex4', exam_type: 'Mid-Term', subject: 'Mathematics', class: '8B', exam_date: isoDay(2), start_time: '09:00', end_time: '12:00', max_marks: 100, room: 'Hall B', status: 'scheduled' },
  { id: 'ex5', exam_type: 'Mid-Term', subject: 'Science', class: '8B', exam_date: isoDay(4), start_time: '09:00', end_time: '12:00', max_marks: 100, room: 'Hall B', status: 'scheduled' },
  { id: 'ex6', exam_type: 'Mid-Term', subject: 'Mathematics', class: '9A', exam_date: isoDay(3), start_time: '09:00', end_time: '12:30', max_marks: 100, room: 'Hall C', status: 'scheduled' },
  { id: 'ex7', exam_type: 'Mid-Term', subject: 'Mathematics', class: '10A', exam_date: isoDay(5), start_time: '09:00', end_time: '12:30', max_marks: 100, room: 'Hall C', status: 'scheduled' },
  { id: 'ex8', exam_type: 'Unit Test 1', subject: 'Hindi', class: '8A', exam_date: isoDay(-30), start_time: '09:00', end_time: '10:30', max_marks: 30, room: 'Room 201', status: 'completed' },
  { id: 'ex9', exam_type: 'Unit Test 1', subject: 'Hindi', class: '8B', exam_date: isoDay(-30), start_time: '09:00', end_time: '10:30', max_marks: 30, room: 'Room 202', status: 'completed' },
];

export const demoAdminFeeInvoices = (() => {
  const list: any[] = [];
  for (let i = 0; i < 30; i++) {
    const status = i % 5 === 0 ? 'overdue' : i % 4 === 0 ? 'pending' : i % 3 === 0 ? 'partial' : 'paid';
    const total = 18000 + (i % 5) * 1000;
    const paid = status === 'paid' ? total : status === 'partial' ? Math.round(total * 0.5) : 0;
    list.push({
      id: `ainv-${i + 1}`,
      invoice_number: `INV-2025-${String(1000 + i).padStart(4, '0')}`,
      student: {
        id: `astu-${i + 1}`,
        profile: { full_name: demoAdminStudentsList[i % demoAdminStudentsList.length].profile.full_name },
        class: demoAdminStudentsList[i % demoAdminStudentsList.length].class,
        roll_number: demoAdminStudentsList[i % demoAdminStudentsList.length].roll_number,
      },
      due_date: isoDay(15 - i * 2),
      total_amount: total,
      paid_amount: paid,
      status,
      created_at: isoTime(-(i * 3)),
    });
  }
  return list;
})();

export const demoAdminFeeStats = {
  totalExpected: 1875000,
  totalCollected: 1593750,
  pendingAmount: 281250,
  overdueAmount: 92500,
  collectionPercentage: 85,
  recentPayments: demoAdminFeeInvoices.filter((i) => i.paid_amount > 0).slice(0, 8),
  monthlyCollection: [
    { month: 'Jul', collected: 245000, pending: 30000 },
    { month: 'Aug', collected: 268000, pending: 22000 },
    { month: 'Sep', collected: 262000, pending: 35000 },
    { month: 'Oct', collected: 280000, pending: 18000 },
    { month: 'Nov', collected: 273000, pending: 28000 },
    { month: 'Dec', collected: 265750, pending: 42000 },
  ],
};

export const demoAdminLibraryBooks = [
  { id: 'bk1', title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', isbn: '9788173711466', category: 'Biography', total_copies: 8, available: 3, issued: 5, language: 'English' },
  { id: 'bk2', title: 'Malgudi Days', author: 'R.K. Narayan', isbn: '9780140185430', category: 'Fiction', total_copies: 6, available: 2, issued: 4, language: 'English' },
  { id: 'bk3', title: 'The Discovery of India', author: 'Jawaharlal Nehru', isbn: '9780143031031', category: 'History', total_copies: 5, available: 5, issued: 0, language: 'English' },
  { id: 'bk4', title: 'Panchatantra Tales', author: 'Vishnu Sharma', isbn: '9788175994508', category: 'Children', total_copies: 12, available: 8, issued: 4, language: 'English' },
  { id: 'bk5', title: 'NCERT Mathematics Class 8', author: 'NCERT', isbn: '9788174506450', category: 'Textbook', total_copies: 35, available: 12, issued: 23, language: 'English' },
  { id: 'bk6', title: 'NCERT Science Class 8', author: 'NCERT', isbn: '9788174506467', category: 'Textbook', total_copies: 35, available: 10, issued: 25, language: 'English' },
  { id: 'bk7', title: 'Premchand Ki Kahaniyan', author: 'Premchand', isbn: '9788170283515', category: 'Fiction', total_copies: 6, available: 4, issued: 2, language: 'Hindi' },
  { id: 'bk8', title: 'Wonder', author: 'R.J. Palacio', isbn: '9780552565974', category: 'Children', total_copies: 4, available: 1, issued: 3, language: 'English' },
  { id: 'bk9', title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '9780553380163', category: 'Science', total_copies: 3, available: 0, issued: 3, language: 'English' },
  { id: 'bk10', title: 'The Diary of a Young Girl', author: 'Anne Frank', isbn: '9780553296983', category: 'Biography', total_copies: 5, available: 3, issued: 2, language: 'English' },
];

export const demoAdminLibraryStats = {
  totalBooks: 1248,
  totalCopies: 3420,
  availableCopies: 2680,
  issuedCopies: 740,
  overdueCopies: 28,
  membersActive: 980,
  recentIssues: demoAdminLibraryBooks.slice(0, 5).map((b, i) => ({
    id: `iss-${i + 1}`,
    book: { title: b.title, author: b.author },
    student: { full_name: demoAdminStudentsList[i].profile.full_name, class: `${demoAdminStudentsList[i].class.name}${demoAdminStudentsList[i].class.section}` },
    issued_at: isoDay(-i - 1),
    due_date: isoDay(14 - i),
  })),
};

export const demoAdminTransport = {
  buses: [
    { id: 'bus-1', route_name: 'Route 1 — Shanti Nagar', vehicle_no: 'DL 1C 2345', driver: 'Mr. Ramesh Kumar', driver_phone: '+91 98123 45670', conductor: 'Mr. Suresh Yadav', capacity: 40, allocated: 36, stops: 8 },
    { id: 'bus-2', route_name: 'Route 2 — Karol Bagh', vehicle_no: 'DL 1C 6789', driver: 'Mr. Bhupinder Singh', driver_phone: '+91 98123 45671', conductor: 'Mr. Mukesh Gupta', capacity: 40, allocated: 38, stops: 10 },
    { id: 'bus-3', route_name: 'Route 3 — Vasant Vihar', vehicle_no: 'DL 1C 9012', driver: 'Mr. Vinod Sharma', driver_phone: '+91 98123 45672', conductor: 'Mr. Rakesh Pal', capacity: 35, allocated: 30, stops: 7 },
    { id: 'bus-4', route_name: 'Route 4 — Dwarka', vehicle_no: 'DL 1C 3456', driver: 'Mr. Manoj Yadav', driver_phone: '+91 98123 45673', conductor: 'Mr. Deepak Verma', capacity: 45, allocated: 42, stops: 12 },
    { id: 'bus-5', route_name: 'Route 5 — Rohini', vehicle_no: 'DL 1C 7890', driver: 'Mr. Anil Kumar', driver_phone: '+91 98123 45674', conductor: 'Mr. Sanjay Yadav', capacity: 40, allocated: 32, stops: 9 },
  ],
  stats: {
    totalBuses: 5,
    totalStudents: 178,
    totalCapacity: 200,
    utilization: 89,
    monthlyRevenue: 712000,
    incidentsThisMonth: 0,
  },
};

export const demoAdminTimetable = (() => {
  const slots: any[] = [];
  const classGrid: Record<string, string[]> = {
    '8A': ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer', 'Art'],
    '8B': ['English', 'Mathematics', 'Science', 'Hindi', 'Social Studies', 'PE', 'Computer'],
    '9A': ['Science', 'Mathematics', 'English', 'Hindi', 'Social Studies', 'Computer', 'Music'],
    '10A': ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer', 'PE'],
  };
  let id = 1;
  Object.entries(classGrid).forEach(([cls, subjects]) => {
    for (let day = 1; day <= 6; day++) {
      subjects.forEach((sub, i) => {
        slots.push({
          id: `at-${id++}`,
          class_name: cls,
          day_of_week: day,
          slot_number: i + 1,
          start_time: `0${8 + i}:00`,
          end_time: `0${8 + i}:45`,
          subject: { name: subjects[(i + day) % subjects.length] },
          teacher: { full_name: 'Assigned Teacher' },
          room: `Room ${100 + i}`,
        });
      });
    }
  });
  return slots;
})();

// ============================================================
// Additional STUDENT datasets
// ============================================================

export const demoStudentBadges = [
  { id: 'bd1', badge_type: 'subject_topper', title: 'Subject Topper — Mathematics', description: 'Highest marks in Mathematics for Mid-Term examination.', awarded_at: isoTime(-10), exam_type: { name: 'Mid-Term' }, subject: { name: 'Mathematics' } },
  { id: 'bd2', badge_type: 'improved_10pct', title: 'Most Improved', description: 'Improved by more than 10% compared to previous term.', awarded_at: isoTime(-25), exam_type: { name: 'Quarterly' }, subject: { name: 'Hindi' } },
  { id: 'bd3', badge_type: 'consistent_high', title: 'Consistent Performer', description: 'Maintained above 85% across three consecutive assessments.', awarded_at: isoTime(-40), exam_type: { name: 'Quarterly' }, subject: null },
  { id: 'bd4', badge_type: 'perfect_score', title: 'Perfect Score', description: 'Scored full marks in Unit Test 1 — Hindi.', awarded_at: isoTime(-55), exam_type: { name: 'Unit Test 1' }, subject: { name: 'Hindi' } },
  { id: 'bd5', badge_type: 'section_topper', title: 'Section Topper — Class 8B', description: 'Ranked 1st in section overall for Mid-Term.', awarded_at: isoTime(-12), exam_type: { name: 'Mid-Term' }, subject: null },
];

export const demoStudentReevaluations = [
  {
    id: 're1',
    marks_id: 'm5',
    status: 'in_review',
    original_marks: 82,
    revised_marks: null,
    reason: 'I believe Q3 was wrongly marked — I had cited the correct example.',
    teacher_notes: null,
    created_at: isoTime(-3),
    mark: {
      subject: { name: 'Social Studies' },
      exam_type: { name: 'Mid-Term' },
      max_marks: 100,
      student: { profile: { full_name: 'Aarav Sharma' }, roll_number: '15' },
    },
  },
  {
    id: 're2',
    marks_id: 'm12',
    status: 'approved',
    original_marks: 84,
    revised_marks: 88,
    reason: 'Q5 has 4 marks but only 2 were given. Please recheck.',
    teacher_notes: 'Verified — corrected marks awarded.',
    created_at: isoTime(-25),
    mark: {
      subject: { name: 'Science' },
      exam_type: { name: 'Quarterly' },
      max_marks: 100,
      student: { profile: { full_name: 'Aarav Sharma' }, roll_number: '15' },
    },
  },
  {
    id: 're3',
    marks_id: 'm14',
    status: 'rejected',
    original_marks: 88,
    revised_marks: null,
    reason: 'Felt I deserved more on Q2.',
    teacher_notes: 'Re-checked — original marks are correct.',
    created_at: isoTime(-50),
    mark: {
      subject: { name: 'Hindi' },
      exam_type: { name: 'Quarterly' },
      max_marks: 100,
      student: { profile: { full_name: 'Aarav Sharma' }, roll_number: '15' },
    },
  },
];

export const demoStudentTopicMastery = [
  { id: 'tm1', topic: 'Quadratic Equations', subject_id: 'sub-0', subject: { name: 'Mathematics' }, mastery_pct: 45, correct_count: 9, total_count: 20, attempts_count: 3 },
  { id: 'tm2', topic: 'Trigonometry — Basics', subject_id: 'sub-0', subject: { name: 'Mathematics' }, mastery_pct: 55, correct_count: 11, total_count: 20, attempts_count: 2 },
  { id: 'tm3', topic: 'Chemical Reactions', subject_id: 'sub-1', subject: { name: 'Science' }, mastery_pct: 50, correct_count: 10, total_count: 20, attempts_count: 2 },
  { id: 'tm4', topic: 'Modern Indian History', subject_id: 'sub-4', subject: { name: 'Social Studies' }, mastery_pct: 88, correct_count: 22, total_count: 25, attempts_count: 2 },
  { id: 'tm5', topic: 'Reading Comprehension', subject_id: 'sub-2', subject: { name: 'English' }, mastery_pct: 92, correct_count: 23, total_count: 25, attempts_count: 3 },
  { id: 'tm6', topic: 'Vyakaran (Grammar)', subject_id: 'sub-3', subject: { name: 'Hindi' }, mastery_pct: 85, correct_count: 17, total_count: 20, attempts_count: 2 },
  { id: 'tm7', topic: 'Algebra Linear Equations', subject_id: 'sub-0', subject: { name: 'Mathematics' }, mastery_pct: 95, correct_count: 19, total_count: 20, attempts_count: 4 },
];

export const demoStudentRemedialResources = [
  { id: 'res1', title: 'Quadratic Equations — Practice Problems (PDF)', file_url: '#', external_url: null, type: 'worksheet', subject: { name: 'Mathematics' }, topic: 'Quadratic Equations' },
  { id: 'res2', title: 'Khan Academy: Quadratic Equations Video Series', file_url: null, external_url: 'https://www.khanacademy.org', type: 'video', subject: { name: 'Mathematics' }, topic: 'Quadratic Equations' },
  { id: 'res3', title: 'Trigonometry Cheat Sheet', file_url: '#', external_url: null, type: 'reference', subject: { name: 'Mathematics' }, topic: 'Trigonometry — Basics' },
  { id: 'res4', title: 'Chemical Reactions Lab Notes', file_url: '#', external_url: null, type: 'notes', subject: { name: 'Science' }, topic: 'Chemical Reactions' },
];

export const demoStudentOnlineExams = [
  {
    id: 'oe1',
    exam_id: 'ex1',
    duration_minutes: 60,
    attempts_allowed: 2,
    opens_at: isoTime(-1),
    closes_at: isoTime(2),
    instructions: 'Read all questions carefully. Calculator not allowed.',
    shuffle_questions: true,
    show_results: false,
    exam: {
      id: 'ex1',
      class_id: 'demo-class-8b',
      subject_id: 'sub-0',
      subject: { name: 'Mathematics' },
      exam_type: { name: 'Online Mock — Mid-Term' },
    },
  },
  {
    id: 'oe2',
    exam_id: 'ex2',
    duration_minutes: 45,
    attempts_allowed: 1,
    opens_at: isoTime(2),
    closes_at: isoTime(5),
    instructions: 'You may use rough sheets but no external help.',
    shuffle_questions: true,
    show_results: true,
    exam: {
      id: 'ex2',
      class_id: 'demo-class-8b',
      subject_id: 'sub-1',
      subject: { name: 'Science' },
      exam_type: { name: 'Online Quiz' },
    },
  },
  {
    id: 'oe3',
    exam_id: 'ex8',
    duration_minutes: 30,
    attempts_allowed: 2,
    opens_at: isoTime(-30),
    closes_at: isoTime(-20),
    instructions: 'Closed test.',
    shuffle_questions: false,
    show_results: true,
    exam: {
      id: 'ex8',
      class_id: 'demo-class-8b',
      subject_id: 'sub-3',
      subject: { name: 'Hindi' },
      exam_type: { name: 'Unit Test 1' },
    },
  },
];

export const demoStudentOnlineAttempts = [
  { id: 'oa1', online_exam_id: 'oe3', student_id: 'demo-student-1', status: 'submitted', submitted_at: isoTime(-25), score: 24, total_marks: 30 },
  { id: 'oa2', online_exam_id: 'oe3', student_id: 'demo-student-1', status: 'submitted', submitted_at: isoTime(-22), score: 27, total_marks: 30 },
];

export const demoStudentSeatAllocations = [
  { id: 'sa1', exam_type_id: 'et2', exam_type: { name: 'Mid-Term' }, hall_ticket_no: 'HT-2025-MID-1015', room: 'Hall A', seat_no: 'A-23' },
  { id: 'sa2', exam_type_id: 'et4', exam_type: { name: 'Final' }, hall_ticket_no: 'HT-2025-FIN-1015', room: 'Hall B', seat_no: 'B-08' },
];

export const demoSchoolInfo = {
  name: 'KnctED Demo Public School',
  address: '123 School Lane, New Delhi - 110001',
  phone: '+91 11 2345 6789',
  email: 'info@knctED.app',
  principal: 'Dr. Rajesh Kumar',
  established: 1985,
  affiliation: 'CBSE',
  affiliation_no: 'CBSE/2731654',
};

export const demoGradingScales = [
  { id: 'g1', label: 'A+', min_pct: 90, max_pct: 100, description: 'Outstanding' },
  { id: 'g2', label: 'A', min_pct: 80, max_pct: 89.99, description: 'Excellent' },
  { id: 'g3', label: 'B+', min_pct: 70, max_pct: 79.99, description: 'Very Good' },
  { id: 'g4', label: 'B', min_pct: 60, max_pct: 69.99, description: 'Good' },
  { id: 'g5', label: 'C', min_pct: 50, max_pct: 59.99, description: 'Satisfactory' },
  { id: 'g6', label: 'D', min_pct: 40, max_pct: 49.99, description: 'Needs Improvement' },
  { id: 'g7', label: 'F', min_pct: 0, max_pct: 39.99, description: 'Fail' },
];

export const demoStudentMessages = {
  conversations: [
    { other_user_id: 't-0', other_user_name: 'Mrs. Sunita Gupta', other_user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita', last_message: 'Great work on the algebra test, Aarav!', last_message_at: isoTime(-1), unread_count: 1 },
    { other_user_id: 't-1', other_user_name: 'Mr. Rakesh Khanna', other_user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rakesh', last_message: 'Don\'t forget your lab coat tomorrow.', last_message_at: isoTime(-3), unread_count: 0 },
    { other_user_id: 't-2', other_user_name: 'Ms. Pooja Nair', other_user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pooja', last_message: 'Your essay was very well-written.', last_message_at: isoTime(-7), unread_count: 0 },
  ],
  teachers: [
    { user_id: 't-0', full_name: 'Mrs. Sunita Gupta', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita', classes: [{ class_name: '8', section: 'B', subject: 'Mathematics' }] },
    { user_id: 't-1', full_name: 'Mr. Rakesh Khanna', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rakesh', classes: [{ class_name: '8', section: 'B', subject: 'Science' }] },
    { user_id: 't-2', full_name: 'Ms. Pooja Nair', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pooja', classes: [{ class_name: '8', section: 'B', subject: 'English' }] },
    { user_id: 't-3', full_name: 'Mr. Manoj Tiwari', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Manoj', classes: [{ class_name: '8', section: 'B', subject: 'Hindi' }] },
    { user_id: 't-4', full_name: 'Mrs. Kavita Singh', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavita', classes: [{ class_name: '8', section: 'B', subject: 'Social Studies' }] },
  ],
  threadByUser: {
    't-0': [
      { id: 'sm1', sender_id: 't-0', content: 'Aarav, your work on quadratic equations is impressive.', created_at: isoTime(-2) },
      { id: 'sm2', sender_id: 'demo-student-1', content: 'Thank you Ma\'am! I really enjoyed the topic.', created_at: isoTime(-2) },
      { id: 'sm3', sender_id: 't-0', content: 'Great work on the algebra test, Aarav!', created_at: isoTime(-1) },
    ],
    't-1': [
      { id: 'sm4', sender_id: 't-1', content: 'Don\'t forget your lab coat tomorrow.', created_at: isoTime(-3) },
    ],
    't-2': [
      { id: 'sm5', sender_id: 't-2', content: 'Your essay was very well-written.', created_at: isoTime(-7) },
    ],
  } as Record<string, Array<{ id: string; sender_id: string; content: string; created_at: string }>>,
};

// ============================================================
// Additional TEACHER datasets
// ============================================================

export const demoTeacherJustifications = [
  { id: 'j1', student_id: 'stu-8b-3', class_id: 'demo-class-8b', date: isoDay(-2), status: 'pending', request_type: 'excuse', reason: 'Was sick with viral fever — doctor\'s note attached.', review_notes: null, created_at: isoTime(-1) },
  { id: 'j2', student_id: 'stu-8b-7', class_id: 'demo-class-8b', date: isoDay(-3), status: 'pending', request_type: 'correction', reason: 'I was actually present that day — please verify with classmates.', review_notes: null, created_at: isoTime(-2) },
  { id: 'j3', student_id: 'stu-8b-12', class_id: 'demo-class-8b', date: isoDay(-5), status: 'pending', request_type: 'excuse', reason: 'Family emergency — grandfather hospitalized.', review_notes: null, created_at: isoTime(-4) },
  { id: 'j4', student_id: 'stu-8b-4', class_id: 'demo-class-8b', date: isoDay(-10), status: 'approved', request_type: 'excuse', reason: 'Inter-school cricket tournament representation.', review_notes: 'Approved — sport activity verified by PE teacher.', created_at: isoTime(-9) },
  { id: 'j5', student_id: 'stu-8b-9', class_id: 'demo-class-8b', date: isoDay(-15), status: 'rejected', request_type: 'excuse', reason: 'Forgot to submit on time.', review_notes: 'Insufficient justification.', created_at: isoTime(-14) },
];

export const demoTeacherStudentSummaries: Record<string, {
  id: string; roll_number: string | null; class_name: string; class_section: string; full_name: string; avatar_url: string | null;
}> = (() => {
  const m: Record<string, any> = {};
  demoTeacherClassRoster.forEach((s) => {
    m[s.id] = {
      id: s.id,
      roll_number: s.roll_number,
      class_name: '8',
      class_section: 'B',
      full_name: s.profile.full_name,
      avatar_url: s.profile.avatar_url,
    };
  });
  return m;
})();

export const demoTeacherReevaluations = demoStudentReevaluations;

export const demoTeacherPtmRequests = [
  {
    id: 'tptm1',
    parent_id: 'demo-parent-1',
    teacher_id: 'demo-teacher-1',
    student_id: 'demo-student-1',
    subject_id: 'sub-0',
    topic: 'Discuss Aarav\'s progress in Mathematics',
    preferred_date: isoDay(5),
    preferred_slot: '10:00 - 10:30',
    meeting_mode: 'in_person',
    parent_notes: 'Would like to know how to help him at home.',
    teacher_notes: null,
    scheduled_at: null,
    meeting_link: null,
    status: 'requested',
    created_at: isoTime(-2),
    student: { profile: { full_name: 'Aarav Sharma' }, class: { name: '8', section: 'B' } },
    teacher: { profile: { full_name: 'Mrs. Sunita Gupta' } },
  },
  {
    id: 'tptm2',
    parent_id: 'apa-3',
    teacher_id: 'demo-teacher-1',
    student_id: 'stu-8b-5',
    subject_id: 'sub-0',
    topic: 'Concerns about declining test scores',
    preferred_date: isoDay(7),
    preferred_slot: '14:00 - 14:30',
    meeting_mode: 'video',
    parent_notes: 'Need urgent discussion.',
    teacher_notes: null,
    scheduled_at: null,
    meeting_link: null,
    status: 'requested',
    created_at: isoTime(-1),
    student: { profile: { full_name: 'Arjun Nair' }, class: { name: '8', section: 'B' } },
    teacher: { profile: { full_name: 'Mrs. Sunita Gupta' } },
  },
  {
    id: 'tptm3',
    parent_id: 'apa-5',
    teacher_id: 'demo-teacher-1',
    student_id: 'stu-8b-11',
    subject_id: 'sub-0',
    topic: 'PT meeting follow-up',
    preferred_date: isoDay(-3),
    preferred_slot: '11:00 - 11:30',
    meeting_mode: 'in_person',
    parent_notes: 'Routine catch-up.',
    teacher_notes: 'Met for 30 minutes. Discussed homework habits.',
    scheduled_at: isoTime(-3),
    meeting_link: null,
    status: 'completed',
    created_at: isoTime(-7),
    student: { profile: { full_name: 'Saanvi Gupta' }, class: { name: '8', section: 'B' } },
    teacher: { profile: { full_name: 'Mrs. Sunita Gupta' } },
  },
  {
    id: 'tptm4',
    parent_id: 'apa-9',
    teacher_id: 'demo-teacher-1',
    student_id: 'stu-8b-15',
    subject_id: 'sub-0',
    topic: 'Discuss extra coaching options',
    preferred_date: isoDay(2),
    preferred_slot: '15:00 - 15:30',
    meeting_mode: 'video',
    parent_notes: '',
    teacher_notes: 'Confirmed via video call.',
    scheduled_at: isoTime(2),
    meeting_link: 'https://meet.example.com/aarav-coaching',
    status: 'accepted',
    created_at: isoTime(-2),
    student: { profile: { full_name: 'Aanya Joshi' }, class: { name: '8', section: 'B' } },
    teacher: { profile: { full_name: 'Mrs. Sunita Gupta' } },
  },
];

export const demoTeacherSessions = (() => {
  const today = new Date();
  const monday = new Date(today);
  const dow = today.getDay();
  monday.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1));

  const list: any[] = [];
  const base = [
    { offset: 0, class_id: 'demo-class-8b', subject_id: 'sub-0', topic: 'Quadratic Equations — Word Problems', description: 'Solve real-life problems using quadratic equations.', prerequisites: 'Factorization basics', resources: 'NCERT Ch.5, exercises 5.3 & 5.4', learning_objectives: 'Form and solve quadratic equations from word problems.', class: { name: '8', section: 'B' }, subject: { name: 'Mathematics' } },
    { offset: 0, class_id: 'demo-class-9a', subject_id: 'sub-0', topic: 'Triangles — Similarity', description: 'Introduction to similarity criteria.', prerequisites: 'Congruence', resources: 'NCERT Ch.6', learning_objectives: 'Identify similar triangles using AA, SAS criteria.', class: { name: '9', section: 'A' }, subject: { name: 'Mathematics' } },
    { offset: 1, class_id: 'demo-class-8b', subject_id: 'sub-0', topic: 'Quadratic Equations — Practice', description: 'Practice session on word problems.', prerequisites: '', resources: 'Worksheet handout', learning_objectives: 'Apply concepts to varied problems.', class: { name: '8', section: 'B' }, subject: { name: 'Mathematics' } },
    { offset: 2, class_id: 'demo-class-8a', subject_id: 'sub-0', topic: 'Linear Equations Recap', description: 'Quick recap before unit test.', prerequisites: '', resources: '', learning_objectives: 'Review key concepts.', class: { name: '8', section: 'A' }, subject: { name: 'Mathematics' } },
    { offset: 3, class_id: 'demo-class-9a', subject_id: 'sub-0', topic: 'Trigonometry Introduction', description: 'Sin, cos, tan ratios.', prerequisites: 'Right-angle triangle', resources: 'NCERT Ch.8', learning_objectives: 'Define and use trig ratios.', class: { name: '9', section: 'A' }, subject: { name: 'Mathematics' } },
    { offset: 4, class_id: 'demo-class-8b', subject_id: 'sub-0', topic: 'Algebra — Mixed Practice', description: 'Mixed problem solving.', prerequisites: '', resources: '', learning_objectives: 'Build problem-solving fluency.', class: { name: '8', section: 'B' }, subject: { name: 'Mathematics' } },
  ];
  base.forEach((b, i) => {
    const d = new Date(monday);
    d.setDate(d.getDate() + b.offset);
    list.push({
      id: `sess-${i + 1}`,
      session_date: d.toISOString().split('T')[0],
      ...b,
    });
  });
  return list;
})();

export const demoTeacherMessages = {
  conversations: [
    { other_user_id: 'demo-parent-1', other_user_name: 'Mrs. Priya Sharma', other_user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', last_message: 'Thank you so much for letting me know!', last_message_at: isoTime(-1), unread_count: 0 },
    { other_user_id: 'demo-student-1', other_user_name: 'Aarav Sharma', other_user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav', last_message: 'Thank you Ma\'am! I really enjoyed the topic.', last_message_at: isoTime(-2), unread_count: 0 },
    { other_user_id: 'apa-3', other_user_name: 'Mr. Aditya Patel', other_user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya', last_message: 'Will pick him up at 3 PM.', last_message_at: isoTime(-3), unread_count: 1 },
    { other_user_id: 'demo-admin-1', other_user_name: 'Dr. Rajesh Kumar (Principal)', other_user_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh', last_message: 'Please submit the term plan by Friday.', last_message_at: isoTime(-5), unread_count: 1 },
  ],
  parents: [
    { user_id: 'demo-parent-1', full_name: 'Mrs. Priya Sharma', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya', children: [{ class: '8B', roll_number: '15' }] },
    { user_id: 'apa-3', full_name: 'Mr. Aditya Patel', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya', children: [{ class: '8B', roll_number: '5' }] },
    { user_id: 'apa-5', full_name: 'Mrs. Pari Singh', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pari', children: [{ class: '8B', roll_number: '11' }] },
    { user_id: 'apa-9', full_name: 'Mr. Anika Bhatt', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anika', children: [{ class: '8B', roll_number: '15' }] },
  ],
  students: [
    { user_id: 'demo-student-1', full_name: 'Aarav Sharma', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav', class_label: 'Class 8B', roll_number: '15' },
    { user_id: 'stu-8b-3', full_name: 'Aditya Patel', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya', class_label: 'Class 8B', roll_number: '3' },
    { user_id: 'stu-8b-7', full_name: 'Reyansh Agarwal', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Reyansh', class_label: 'Class 8B', roll_number: '7' },
    { user_id: 'stu-8b-11', full_name: 'Saanvi Gupta', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Saanvi', class_label: 'Class 8B', roll_number: '11' },
  ],
  admins: [
    { user_id: 'demo-admin-1', full_name: 'Dr. Rajesh Kumar', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh' },
  ],
  threadByUser: {
    'demo-parent-1': [
      { id: 'tm1', sender_id: 'demo-teacher-1', content: 'Hello! Aarav has been doing exceptionally well in algebra.', created_at: isoTime(-2) },
      { id: 'tm2', sender_id: 'demo-parent-1', content: 'Thank you so much for letting me know!', created_at: isoTime(-1) },
    ],
    'demo-student-1': [
      { id: 'tm3', sender_id: 'demo-teacher-1', content: 'Aarav, your work on quadratic equations is impressive.', created_at: isoTime(-2) },
      { id: 'tm4', sender_id: 'demo-student-1', content: 'Thank you Ma\'am! I really enjoyed the topic.', created_at: isoTime(-2) },
    ],
    'apa-3': [
      { id: 'tm5', sender_id: 'apa-3', content: 'Will pick him up at 3 PM.', created_at: isoTime(-3) },
    ],
    'demo-admin-1': [
      { id: 'tm6', sender_id: 'demo-admin-1', content: 'Please submit the term plan by Friday.', created_at: isoTime(-5) },
    ],
  } as Record<string, Array<{ id: string; sender_id: string; content: string; created_at: string }>>,
};

export const demoTeacherLeaveApprovals = [
  {
    id: 'tla1', user_id: 'stu-8b-3-user', user_type: 'student',
    leave_type: 'sick', start_date: isoDay(-2), end_date: isoDay(-1),
    reason: 'Down with flu — doctor advised rest.',
    status: 'pending', reviewed_by: null, reviewed_at: null, review_notes: null,
    created_at: isoTime(-3), updated_at: isoTime(-3),
    profile: { full_name: 'Aditya Patel', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya' },
    student: { class: { name: '8', section: 'B' } },
  },
  {
    id: 'tla2', user_id: 'stu-8b-7-user', user_type: 'student',
    leave_type: 'family', start_date: isoDay(3), end_date: isoDay(5),
    reason: 'Cousin\'s wedding out of station.',
    status: 'pending', reviewed_by: null, reviewed_at: null, review_notes: null,
    created_at: isoTime(-1), updated_at: isoTime(-1),
    profile: { full_name: 'Reyansh Agarwal', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Reyansh' },
    student: { class: { name: '8', section: 'B' } },
  },
  {
    id: 'tla3', user_id: 'stu-8b-11-user', user_type: 'student',
    leave_type: 'sick', start_date: isoDay(-15), end_date: isoDay(-13),
    reason: 'Viral fever — full bed rest.',
    status: 'approved', reviewed_by: 'demo-teacher-1', reviewed_at: isoTime(-14), review_notes: 'Approved. Get well soon.',
    created_at: isoTime(-16), updated_at: isoTime(-14),
    profile: { full_name: 'Saanvi Gupta', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Saanvi' },
    student: { class: { name: '8', section: 'B' } },
  },
  {
    id: 'tla4', user_id: 'stu-8b-9-user', user_type: 'student',
    leave_type: 'personal', start_date: isoDay(-30), end_date: isoDay(-30),
    reason: 'Forgot to submit assignment, needed extra day.',
    status: 'rejected', reviewed_by: 'demo-teacher-1', reviewed_at: isoTime(-29), review_notes: 'Insufficient reason. Submit on time next time.',
    created_at: isoTime(-31), updated_at: isoTime(-29),
    profile: { full_name: 'Krishna Iyer', avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Krishna' },
    student: { class: { name: '8', section: 'B' } },
  },
];

export const demoQuestionBanks = [
  { id: 'qb1', name: 'Class 8 Mathematics — Quadratic Equations', subject_id: 'sub-0', class_id: 'demo-class-8b', subject: { name: 'Mathematics' }, class: { name: '8', section: 'B' }, description: 'Question pool for quadratic equations chapter.', created_at: isoTime(-30) },
  { id: 'qb2', name: 'Class 8 Mathematics — Triangles', subject_id: 'sub-0', class_id: 'demo-class-8b', subject: { name: 'Mathematics' }, class: { name: '8', section: 'B' }, description: 'Triangle properties and theorems.', created_at: isoTime(-25) },
  { id: 'qb3', name: 'Class 9 Mathematics — Algebra', subject_id: 'sub-0', class_id: 'demo-class-9a', subject: { name: 'Mathematics' }, class: { name: '9', section: 'A' }, description: 'Linear and quadratic algebra.', created_at: isoTime(-20) },
];

export const demoBankQuestions: Record<string, any[]> = {
  qb1: [
    { id: 'q1', type: 'mcq', text: 'What is the discriminant of x² - 5x + 6 = 0?', difficulty: 'easy', bloom_level: 'remember', marks: 1, topic: 'Discriminant', explanation: 'b² - 4ac = 25 - 24 = 1', options: [{ key: 'A', text: '1' }, { key: 'B', text: '0' }, { key: 'C', text: '-1' }, { key: 'D', text: '5' }], correct_answer: 'A' },
    { id: 'q2', type: 'mcq', text: 'The roots of x² - 4 = 0 are:', difficulty: 'easy', bloom_level: 'understand', marks: 1, topic: 'Roots', explanation: 'x² = 4 → x = ±2', options: [{ key: 'A', text: '2 and 2' }, { key: 'B', text: '2 and -2' }, { key: 'C', text: '4 and -4' }, { key: 'D', text: '0 and 4' }], correct_answer: 'B' },
    { id: 'q3', type: 'short_answer', text: 'Find the roots of x² + 5x + 6 = 0 by factorization.', difficulty: 'medium', bloom_level: 'apply', marks: 3, topic: 'Factorization', explanation: '(x+2)(x+3)=0 → x = -2, -3', options: null, correct_answer: 'x = -2 and x = -3' },
    { id: 'q4', type: 'true_false', text: 'A quadratic equation always has two real roots.', difficulty: 'medium', bloom_level: 'understand', marks: 1, topic: 'Nature of Roots', explanation: 'False — depends on discriminant.', options: null, correct_answer: 'false' },
    { id: 'q5', type: 'long_answer', text: 'A train travels 360 km at uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less. Find the speed.', difficulty: 'hard', bloom_level: 'analyze', marks: 5, topic: 'Word Problems', explanation: 'Speed = 40 km/h via quadratic.', options: null, correct_answer: '40 km/h' },
  ],
  qb2: [
    { id: 'q6', type: 'mcq', text: 'In two similar triangles, corresponding sides are in the ratio:', difficulty: 'easy', bloom_level: 'remember', marks: 1, topic: 'Similarity', explanation: 'Equal ratio.', options: [{ key: 'A', text: 'Different ratio' }, { key: 'B', text: 'Equal ratio' }, { key: 'C', text: 'Inverse ratio' }, { key: 'D', text: 'Sum equal' }], correct_answer: 'B' },
    { id: 'q7', type: 'mcq', text: 'The criterion for similarity is:', difficulty: 'easy', bloom_level: 'understand', marks: 1, topic: 'Similarity Criteria', explanation: 'AAA / AA / SAS / SSS.', options: [{ key: 'A', text: 'AAA' }, { key: 'B', text: 'SSS' }, { key: 'C', text: 'SAS' }, { key: 'D', text: 'All of these' }], correct_answer: 'D' },
  ],
  qb3: [
    { id: 'q8', type: 'short_answer', text: 'Solve: 3x + 5 = 20', difficulty: 'easy', bloom_level: 'apply', marks: 2, topic: 'Linear Equations', explanation: 'x = 5', options: null, correct_answer: 'x = 5' },
  ],
};

export const demoOnlineExamsBuilder = [
  {
    id: 'oe1',
    exam_id: 'ex1',
    duration_minutes: 60,
    attempts_allowed: 2,
    shuffle_questions: true,
    allow_tab_switch: false,
    show_results: false,
    opens_at: isoTime(-1),
    closes_at: isoTime(2),
    instructions: 'Read carefully. Calculator not allowed.',
    exam: {
      id: 'ex1', class_id: 'demo-class-8b', subject_id: 'sub-0',
      subject: { name: 'Mathematics' }, exam_type: { name: 'Mid-Term' }, class: { name: '8', section: 'B' },
    },
  },
  {
    id: 'oe2',
    exam_id: 'ex2',
    duration_minutes: 45,
    attempts_allowed: 1,
    shuffle_questions: true,
    allow_tab_switch: false,
    show_results: true,
    opens_at: isoTime(2),
    closes_at: isoTime(5),
    instructions: 'No external help.',
    exam: {
      id: 'ex2', class_id: 'demo-class-8b', subject_id: 'sub-1',
      subject: { name: 'Science' }, exam_type: { name: 'Online Quiz' }, class: { name: '8', section: 'B' },
    },
  },
];

export const demoOnlineExamQuestions: Record<string, any[]> = {
  oe1: [
    { id: 'oeq1', online_exam_id: 'oe1', question_id: 'q1', order_index: 1, question: demoBankQuestions.qb1[0] },
    { id: 'oeq2', online_exam_id: 'oe1', question_id: 'q2', order_index: 2, question: demoBankQuestions.qb1[1] },
    { id: 'oeq3', online_exam_id: 'oe1', question_id: 'q3', order_index: 3, question: demoBankQuestions.qb1[2] },
  ],
  oe2: [],
};

export const demoTeacherAnalyticsRows = (() => {
  const rows: any[] = [];
  const subjects = ['Mathematics'];
  demoTeacherClassRoster.forEach((s, i) => {
    subjects.forEach((sub) => {
      const pct = 50 + Math.floor(Math.random() * 45);
      rows.push({
        student_id: s.id,
        student_name: s.profile.full_name,
        class_id: 'demo-class-8b',
        class_name: '8',
        class_section: 'B',
        subject_id: 'sub-0',
        subject_name: sub,
        exam_type_id: 'et2',
        exam_type_name: 'Mid-Term',
        marks_obtained: Math.round(pct * 1.0),
        max_marks: 100,
        percentage: pct,
        grade: pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B+' : pct >= 60 ? 'B' : pct >= 50 ? 'C' : pct >= 40 ? 'D' : 'F',
        passed: pct >= 40,
        submission_status: 'submitted',
      });
    });
  });
  return rows;
})();
