import { 
  FileText, Folder, Calendar, Vote, Sparkles, Image, Layers 
} from 'lucide-react';

export const initialLeaveRequests = [
  {
    id: 1,
    type: 'Duty Leave',
    subject: 'HackIndia Hackathon Participation',
    dateRange: 'Aug 12 - Aug 14, 2026',
    totalDays: 3,
    status: 'Approved',
    credited: true,
    document: 'hackathon_pass.pdf'
  },
  {
    id: 2,
    type: 'Medical Leave',
    subject: 'Viral Fever & Medical Rest',
    dateRange: 'Jul 20 - Jul 22, 2026',
    totalDays: 3,
    status: 'Approved',
    credited: true,
    document: 'medical_certificate.pdf'
  },
  {
    id: 3,
    type: 'Duty Leave',
    subject: 'GfG Technical Scripter Presentation',
    dateRange: 'Aug 30, 2026',
    totalDays: 1,
    status: 'Pending',
    credited: false,
    document: 'event_invite.pdf'
  }
];

export const scheduleDays = [
  { day: 'MON', date: '24', fullDate: 'August 24, 2026' },
  { day: 'TUE', date: '25', fullDate: 'August 25, 2026' },
  { day: 'WED', date: '26', fullDate: 'August 26, 2026' },
  { day: 'THU', date: '27', fullDate: 'August 27, 2026', active: true },
  { day: 'FRI', date: '28', fullDate: 'August 28, 2026' },
  { day: 'SAT', date: '29', fullDate: 'August 29, 2026' },
];

export const timetable = {
  'THU': [
    {
      id: 1,
      time: '09:00 AM - 10:15 AM',
      subject: 'Advanced Machine Learning',
      code: 'CS501',
      type: 'Lecture',
      instructor: 'Dr. Lucas Moreau',
      location: 'Hall A - Block 3',
      status: 'Upcoming'
    },
    {
      id: 2,
      time: '10:30 AM - 11:45 AM',
      subject: 'Distributed Systems Architecture',
      code: 'CS502',
      type: 'Lecture',
      instructor: 'Prof. Sofia Martinez',
      location: 'Room 402 - Block 1',
      status: 'Ongoing'
    },
    {
      id: 3,
      time: '01:00 PM - 03:00 PM',
      subject: 'Cloud Native Lab',
      code: 'CS503L',
      type: 'Lab Practical',
      instructor: 'Emma Carter',
      location: 'Lab 08 - Tech Center',
      status: 'Upcoming'
    },
    {
      id: 4,
      time: '03:30 PM - 04:45 PM',
      subject: 'Human-Computer Interaction',
      code: 'CS504',
      type: 'Tutorial',
      instructor: 'Mark Vance',
      location: 'Room 205 - Block 2',
      status: 'Upcoming'
    }
  ],
  'FRI': [
    {
      id: 5,
      time: '09:30 AM - 11:00 AM',
      subject: 'Capstone Project Review',
      code: 'CS505',
      type: 'Evaluation',
      instructor: 'Dr. Alex Rivera',
      location: 'Auditorium B',
      status: 'Upcoming'
    },
    {
      id: 6,
      time: '11:30 AM - 01:00 PM',
      subject: 'Distributed Systems Architecture',
      code: 'CS502',
      type: 'Lecture',
      instructor: 'Prof. Sofia Martinez',
      location: 'Room 402 - Block 1',
      status: 'Upcoming'
    }
  ]
};

export const attendanceData = [
  { code: 'CS501', subject: 'Advanced Machine Learning', attended: 28, total: 30, percentage: 93, status: 'Good' },
  { code: 'CS502', subject: 'Distributed Systems', attended: 24, total: 28, percentage: 85, status: 'Good' },
  { code: 'CS503', subject: 'Cloud Native Engineering', attended: 20, total: 22, percentage: 90, status: 'Good' },
  { code: 'CS504', subject: 'Human-Computer Interaction', attended: 15, total: 21, percentage: 71, status: 'Warning' },
  { code: 'CS505', subject: 'Capstone Project', attended: 12, total: 12, percentage: 100, status: 'Good' },
];

export const circulars = [
  {
    id: 1,
    title: 'End Semester Examination Schedule & Guidelines 2026',
    description: 'The finalized date sheet for the upcoming Spring 2026 semester examinations has been published. All students are advised to check their respective subject codes and reporting times carefully.',
    tag: 'Academics',
    tagColor: 'bg-amber-100 text-amber-800',
    date: 'Aug 01, 2026',
    author: 'Academic Block Admin',
    type: 'Circulars'
  },
  {
    id: 2,
    title: 'Mandatory AI Tools Workshop Registration',
    description: 'A hands-on workshop covering advanced prompting techniques and automated workflow integration is scheduled for next Thursday. Attendance is required for final-year students.',
    tag: 'Workshop',
    tagColor: 'bg-purple-100 text-purple-800',
    date: 'Jul 28, 2026',
    author: 'Tech Department',
    type: 'Circulars'
  },
  {
    id: 3,
    title: 'Updated Campus Library Operating Hours',
    description: 'Starting August 5th, the central library will remain open 24/7 to support students preparing for upcoming mid-term assessments and capstone projects.',
    tag: 'Notice',
    tagColor: 'bg-blue-100 text-blue-800',
    date: 'Jul 25, 2026',
    author: 'Library Admin',
    type: 'Circulars'
  }
];

export const allCourses = [
  {
    id: 1,
    title: 'Mastering AI Tools & Workflows',
    category: 'Mandatory',
    instructor: 'Dr. Lucas Moreau',
    lessonsCount: 12,
    dueDate: 'Due Jun 25',
    progress: 75,
    bgColor: 'bg-[#FEDEBE]',
    badgeBg: 'bg-white/60',
    description: 'Boost productivity with modern AI workflows.'
  },
  {
    id: 2,
    title: 'Creative Thinking for Innovation',
    category: 'Mandatory',
    instructor: 'Prof. Sofia Martinez',
    lessonsCount: 8,
    dueDate: 'Due Jul 05',
    progress: 40,
    bgColor: 'bg-[#E9D5FF]',
    badgeBg: 'bg-white/60',
    description: 'Develop creative problem-solving skills to approach challenges from new perspectives.'
  },
  {
    id: 3,
    title: 'Data Storytelling & Visualization',
    category: 'Recommended',
    instructor: 'Emma Carter',
    lessonsCount: 15,
    dueDate: 'Due Jul 12',
    progress: 20,
    bgColor: 'bg-[#DCFCE7]',
    badgeBg: 'bg-white/60',
    description: 'Transform complex information into compelling visual stories.'
  },
  {
    id: 4,
    title: 'The Art of Negotiation Skills',
    category: 'Recommended',
    instructor: 'Mark Vance',
    lessonsCount: 6,
    dueDate: 'Due Aug 15',
    progress: 0,
    bgColor: 'bg-[#E0F2FE]',
    badgeBg: 'bg-white/60',
    description: 'Master negotiation strategies and achieve better outcomes.'
  },
  {
    id: 5,
    title: 'Advanced Machine Learning Architectures',
    category: 'Completed',
    instructor: 'Dr. Alex Rivera',
    lessonsCount: 20,
    dueDate: 'Completed',
    progress: 100,
    bgColor: 'bg-[#FEDEBE]',
    badgeBg: 'bg-white/60',
    description: 'Deep dive into modern neural network implementations.'
  },
  {
    id: 6,
    title: 'Full-Stack Web Engineering',
    category: 'Completed',
    instructor: 'Sarah Jenkins',
    lessonsCount: 18,
    dueDate: 'Completed',
    progress: 100,
    bgColor: 'bg-[#E0F2FE]',
    badgeBg: 'bg-white/60',
    description: 'Build modern scalable web architectures from scratch.'
  }
];

export const gradeCardData = {
  cgpa: '3.84',
  sgpa: '3.90',
  totalCredits: '112',
  rank: ' Top 5%',
  semesters: {
    'Semester 5': [
      { code: 'CS501', subject: 'Advanced Machine Learning', credits: 4, grade: 'A+', points: '10.0', status: 'Passed' },
      { code: 'CS502', subject: 'Distributed Systems Architecture', credits: 4, grade: 'A', points: '9.0', status: 'Passed' },
      { code: 'CS503', subject: 'Cloud Native Engineering', credits: 3, grade: 'A+', points: '10.0', status: 'Passed' },
      { code: 'CS504', subject: 'Human-Computer Interaction', credits: 3, grade: 'B+', points: '8.0', status: 'Passed' },
      { code: 'CS505', subject: 'Capstone Project - Phase I', credits: 4, grade: 'A+', points: '10.0', status: 'Passed' },
    ],
    'Semester 4': [
      { code: 'CS401', subject: 'Data Structures & Algorithms', credits: 4, grade: 'A', points: '9.0', status: 'Passed' },
      { code: 'CS402', subject: 'Database Management Systems', credits: 4, grade: 'A+', points: '10.0', status: 'Passed' },
      { code: 'CS403', subject: 'Software Engineering Principles', credits: 3, grade: 'A', points: '9.0', status: 'Passed' },
      { code: 'CS404', subject: 'Computer Networks', credits: 3, grade: 'B+', points: '8.0', status: 'Passed' },
    ],
  }
};

export const lessons = [
  {
    title: 'From Prompt to Workflow',
    status: 'Completed',
    statusColor: 'text-emerald-600',
    instructor: 'Lucas Moreau',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    time: '10:30 AM',
    duration: '25 min',
  },
  {
    title: 'Idea Generation Systems',
    status: 'Completed',
    statusColor: 'text-emerald-600',
    instructor: 'Sofia Martinez',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    time: '12:30 AM',
    duration: '15 min',
  },
  {
    title: 'Visual Narratives That Persuade',
    status: 'Mandatory',
    statusColor: 'text-slate-600',
    instructor: 'Emma Carter',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    time: '3:30 PM',
    duration: '30 min',
  },
];

export const weeklyData = [
  { day: 'MON', height: 'h-12' },
  { day: 'TUE', height: 'h-24' },
  { day: 'WED', height: 'h-32', active: true },
  { day: 'THU', height: 'h-28' },
  { day: 'FRI', height: 'h-36' },
  { day: 'SAT', height: 'h-36' },
  { day: 'SUN', height: 'h-36' },
];

export const filterTabs = [
  { name: 'All', icon: Layers },
  { name: 'Circulars', icon: FileText },
  { name: 'Resources', icon: Folder },
  { name: 'Planners', icon: Calendar },
  { name: 'Polls', icon: Vote },
  { name: 'Events', icon: Sparkles },
  { name: 'Custom Pages', icon: FileText },
  { name: 'Gallery', icon: Image },
];