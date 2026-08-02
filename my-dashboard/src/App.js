import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  Award, 
  Search, 
  Bell, 
  ChevronDown,
  PanelLeftClose,
  PanelLeft,
  Clock,
  Tag,
  ArrowRight,
  FileText,
  Calendar,
  Vote,
  Folder,
  Image,
  Layers,
  Sparkles,
  Pin,
  AlertCircle,
  User,
  Key,
  LogOut,
  ShieldCheck,
  Laptop,
  CheckCircle2,
  Camera,
  BookOpen,
  PlayCircle,
  BarChart3,
  Download,
  GraduationCap,
  MapPin,
  AlertTriangle,
  UserCheck,
  Plus,
  FilePlus,
  CheckCircle,
  XCircle,
  Upload,
  X,
  Send,
  Bot
} from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState('schedule');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedSemester, setSelectedSemester] = useState('Semester 5');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Schedule View States
  const [selectedDay, setSelectedDay] = useState('THU');

  // Timeline Filter State
  const [timelineFilter, setTimelineFilter] = useState('Circulars');

  // Leave Modal & Data State
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([
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
  ]);

  const [leaveForm, setLeaveForm] = useState({
    type: 'Medical Leave',
    reason: '',
    startDate: '',
    endDate: '',
    fileName: ''
  });

  const handleApplyLeave = (e) => {
    e.preventDefault();
    if (!leaveForm.reason || !leaveForm.startDate || !leaveForm.endDate) {
      alert('Please fill out all required fields.');
      return;
    }

    const newRequest = {
      id: Date.now(),
      type: leaveForm.type,
      subject: leaveForm.reason,
      dateRange: `${leaveForm.startDate} to ${leaveForm.endDate}`,
      totalDays: 1,
      status: 'Pending',
      credited: false,
      document: leaveForm.fileName || 'uploaded_doc.pdf'
    };

    setLeaveRequests([newRequest, ...leaveRequests]);
    setIsLeaveModalOpen(false);
    setLeaveForm({ type: 'Medical Leave', reason: '', startDate: '', endDate: '', fileName: '' });
    alert('Leave application submitted successfully for HOD approval!');
  };

  // AI Chat States
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello Ava! I am your Campus Companion AI. Ask me about your attendance, policies, or leave balances.' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleSendChatMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-id': 'U001' // Ava Richardson's ID
        },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { sender: 'bot', text: data.reply || 'No response from agent.' }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { sender: 'bot', text: 'Error connecting to AI backend.' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Password Change Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (e) => {
    e.preventDefault();
    alert('Password updated successfully!');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  // Schedule & Timetable Data (Date & Time-wise)
  const scheduleDays = [
    { day: 'MON', date: '24', fullDate: 'August 24, 2026' },
    { day: 'TUE', date: '25', fullDate: 'August 25, 2026' },
    { day: 'WED', date: '26', fullDate: 'August 26, 2026' },
    { day: 'THU', date: '27', fullDate: 'August 27, 2026', active: true },
    { day: 'FRI', date: '28', fullDate: 'August 28, 2026' },
    { day: 'SAT', date: '29', fullDate: 'August 29, 2026' },
  ];

  const timetable = {
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

  // Subject-wise Attendance Data
  const attendanceData = [
    { code: 'CS501', subject: 'Advanced Machine Learning', attended: 28, total: 30, percentage: 93, status: 'Good' },
    { code: 'CS502', subject: 'Distributed Systems', attended: 24, total: 28, percentage: 85, status: 'Good' },
    { code: 'CS503', subject: 'Cloud Native Engineering', attended: 20, total: 22, percentage: 90, status: 'Good' },
    { code: 'CS504', subject: 'Human-Computer Interaction', attended: 15, total: 21, percentage: 71, status: 'Warning' },
    { code: 'CS505', subject: 'Capstone Project', attended: 12, total: 12, percentage: 100, status: 'Good' },
  ];

  // Circulars Data
  const circulars = [
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

  // Full Set of Courses
  const allCourses = [
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

  // Gradecard / Academic Performance Data
  const gradeCardData = {
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

  const lessons = [
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

  const weeklyData = [
    { day: 'MON', height: 'h-12' },
    { day: 'TUE', height: 'h-24' },
    { day: 'WED', height: 'h-32', active: true },
    { day: 'THU', height: 'h-28' },
    { day: 'FRI', height: 'h-36' },
    { day: 'SAT', height: 'h-36' },
    { day: 'SUN', height: 'h-36' },
  ];

  const filterTabs = [
    { name: 'All', icon: Layers },
    { name: 'Circulars', icon: FileText },
    { name: 'Resources', icon: Folder },
    { name: 'Planners', icon: Calendar },
    { name: 'Polls', icon: Vote },
    { name: 'Events', icon: Sparkles },
    { name: 'Custom Pages', icon: FileText },
    { name: 'Gallery', icon: Image },
  ];

  const filteredCourses = allCourses.filter((course) => {
    if (activeTab === 'All') return true;
    return course.category === activeTab;
  });

  return (
    <div className="flex h-screen bg-[#F8F9FA] font-sans antialiased overflow-hidden w-full relative">
      
      {/* Collapsible Sidebar */}
      <aside 
        className={`bg-[#F8F9FA] border-r border-gray-200/80 flex flex-col justify-between shrink-0 transition-all duration-300 ease-in-out h-full overflow-hidden ${
          isSidebarOpen ? 'w-64 p-6' : 'w-0 p-0 border-none opacity-0'
        }`}
      >
        <div className="w-52">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between mb-10 px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-[#A3E635] rounded-full flex items-center justify-center font-bold text-sm text-slate-800">
                ❖
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">elevate</span>
            </div>
            
            <button 
              onClick={() => setIsSidebarOpen(false)} 
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-gray-100 rounded-lg transition"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <button 
              onClick={() => setActiveNav('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-all ${
                activeNav === 'dashboard' ? 'bg-[#E0F780] text-slate-900 shadow-sm' : 'text-slate-600 hover:bg-gray-100'
              }`}
            >
              <LayoutGrid className="w-4 h-4 shrink-0" />
              <span>Dashboard</span>
            </button>

            <button 
              onClick={() => setActiveNav('courses')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-all ${
                activeNav === 'courses' ? 'bg-[#E0F780] text-slate-900 shadow-sm' : 'text-slate-600 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Courses</span>
            </button>

            <button 
              onClick={() => setActiveNav('performance')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-all ${
                activeNav === 'performance' ? 'bg-[#E0F780] text-slate-900 shadow-sm' : 'text-slate-600 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-4 h-4 shrink-0" />
              <span>Performance</span>
            </button>

            <button 
              onClick={() => setActiveNav('schedule')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-all ${
                activeNav === 'schedule' ? 'bg-[#E0F780] text-slate-900 shadow-sm' : 'text-slate-600 hover:bg-gray-100'
              }`}
            >
              <CalendarIcon className="w-4 h-4 shrink-0" />
              <span>Schedule</span>
            </button>

            <button 
              onClick={() => setActiveNav('timeline')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-all ${
                activeNav === 'timeline' ? 'bg-[#E0F780] text-slate-900 shadow-sm' : 'text-slate-600 hover:bg-gray-100'
              }`}
            >
              <Clock className="w-4 h-4 shrink-0" />
              <span>Timeline</span>
            </button>

            <button 
              onClick={() => setActiveNav('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-all ${
                activeNav === 'profile' ? 'bg-[#E0F780] text-slate-900 shadow-sm' : 'text-slate-600 hover:bg-gray-100'
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span>Profile</span>
            </button>

            <button 
              onClick={() => setActiveNav('chats')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-medium text-sm transition-all ${
                activeNav === 'chats' ? 'bg-[#E0F780] text-slate-900 shadow-sm' : 'text-slate-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>AI Assistant</span>
              </div>
              <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full">AI</span>
            </button>

            <button 
              onClick={() => setActiveNav('certificates')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-all ${
                activeNav === 'certificates' ? 'bg-[#E0F780] text-slate-900 shadow-sm' : 'text-slate-600 hover:bg-gray-100'
              }`}
            >
              <Award className="w-4 h-4 shrink-0" />
              <span>Certificates</span>
            </button>
          </nav>
        </div>

        <div className="w-52 px-2 text-xs text-slate-400 font-medium">
          © 2026 Elevate Systems
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto h-full w-full transition-all duration-300">
        
        {/* Top Header */}
        <header className="flex items-center justify-between mb-8 w-full">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 bg-white border border-gray-200 rounded-xl shadow-sm text-slate-600 hover:text-slate-900 hover:bg-gray-50 transition"
                title="Expand sidebar"
              >
                <PanelLeft className="w-5 h-5" />
              </button>
            )}

            <div className="relative w-80 md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-white border border-gray-200 rounded-full py-2.5 pl-10 pr-12 text-sm text-slate-700 focus:outline-none shadow-sm"
              />
              <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200 font-mono">⌘K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2.5 bg-white rounded-full border border-gray-200 shadow-sm">
              <Bell className="w-4 h-4 text-slate-600" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">4</span>
            </button>

            <div 
              onClick={() => setActiveNav('profile')}
              className="flex items-center gap-3 bg-white p-1.5 pl-2 pr-3 rounded-full border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition"
            >
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="Ava Richardson" 
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="text-xs font-semibold text-slate-800">Ava Richardson</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        </header>

        {/* 1. DASHBOARD VIEW */}
        {activeNav === 'dashboard' ? (
          <div className="w-full">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">Dashboard</h1>

            <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6 w-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-bold text-slate-900">Current Progress</h2>
                </div>
                <button 
                  onClick={() => setActiveNav('courses')} 
                  className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1"
                >
                  View all courses <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                {allCourses.slice(0, 4).map((course) => (
                  <div 
                    key={course.id} 
                    className={`${course.bgColor} p-5 rounded-2xl flex flex-col justify-between min-h-[220px] relative`}
                  >
                    <div>
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 px-2.5 py-1 rounded-full ${course.badgeBg} mb-3 backdrop-blur-sm`}>
                        <CalendarIcon className="w-3 h-3" />
                        {course.dueDate}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm mb-1.5 leading-snug">{course.title}</h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{course.description}</p>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-800 mb-1.5">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/50 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-900 rounded-full" style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
              <div className="lg:col-span-6 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 text-sm">Weekly Progress</h3>
                    <CalendarIcon className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-2xl font-bold text-slate-900">32</span>
                    <span className="text-xs text-slate-500 font-medium">Hours Studied</span>
                    <span className="ml-2 inline-flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      +6% ↑
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">vs last week</span>
                  </div>

                  <div className="flex items-end justify-between h-36 pt-4 border-b border-gray-100 pb-2">
                    {weeklyData.map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                        <div className="w-full flex items-end justify-center h-28">
                          <div className={`w-7 rounded-t-md ${item.active ? 'bg-[#FEDEBE]' : 'bg-gray-100'} ${item.height}`}></div>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400">{item.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-4 text-center">
                  <div className="border-r border-gray-100">
                    <p className="text-[10px] text-slate-400 font-medium">Completed</p>
                    <p className="text-lg font-bold text-slate-800 mt-0.5">8</p>
                  </div>
                  <div className="border-r border-gray-100">
                    <p className="text-[10px] text-slate-400 font-medium">In Progress</p>
                    <p className="text-lg font-bold text-slate-800 mt-0.5">5</p>
                  </div>
                  <div className="border-r border-gray-100">
                    <p className="text-[10px] text-slate-400 font-medium">Tests Passed</p>
                    <p className="text-lg font-bold text-slate-800 mt-0.5">3</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">Avg Score</p>
                    <p className="text-lg font-bold text-slate-800 mt-0.5">82%</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 text-sm">Next Lessons</h3>
                  <button onClick={() => setActiveNav('schedule')} className="text-xs font-semibold text-slate-700 hover:text-slate-900">View schedule</button>
                </div>

                <div className="flex justify-between items-center bg-gray-50/70 p-2 rounded-2xl mb-6">
                  {[
                    { day: 'MON', date: '24' },
                    { day: 'TUE', date: '25' },
                    { day: 'WED', date: '26' },
                    { day: 'THU', date: '27', active: true },
                    { day: 'FRI', date: '28' },
                    { day: 'SAT', date: '29' },
                    { day: 'SUN', date: '30' },
                  ].map((d, i) => (
                    <div 
                      key={i} 
                      className={`flex flex-col items-center justify-center w-9 h-12 rounded-xl text-xs ${
                        d.active ? 'bg-[#E0F780] font-bold text-slate-900 shadow-sm' : 'text-slate-400 font-medium'
                      }`}
                    >
                      <span className="text-[9px] mb-0.5">{d.day}</span>
                      <span className="text-xs">{d.date}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {lessons.map((lesson, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-2xl transition">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 mb-0.5">{lesson.title}</h4>
                        <span className={`text-[10px] font-semibold ${lesson.statusColor}`}>{lesson.status}</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <img src={lesson.avatar} alt={lesson.instructor} className="w-6 h-6 rounded-full object-cover" />
                          <span className="text-xs font-medium text-slate-700">{lesson.instructor}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-slate-800">{lesson.time}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{lesson.duration}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : activeNav === 'courses' ? (

          /* 2. COURSES VIEW */
          <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Courses</h1>
                <p className="text-sm text-slate-500 mt-1">Access all your registered academic modules and learning tracks.</p>
              </div>

              <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-full border border-gray-200 shadow-sm self-start">
                {['All', 'Mandatory', 'Completed', 'Recommended'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      activeTab === tab
                        ? 'bg-black text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id} 
                  className={`${course.bgColor} p-6 rounded-3xl flex flex-col justify-between min-h-[260px] relative border border-black/5 hover:shadow-lg transition-all group`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-800 px-3 py-1 rounded-full ${course.badgeBg} backdrop-blur-sm border border-white/40`}>
                        <CalendarIcon className="w-3 h-3" />
                        {course.dueDate}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-white/40 px-2.5 py-0.5 rounded-md">
                        {course.category}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base mb-2 leading-snug group-hover:text-slate-800 transition">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5 mb-1">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      {course.instructor}
                    </p>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                      {course.lessonsCount} Modules
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-black/5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>

                    <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden mb-4">
                      <div className="h-full bg-slate-900 rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }}></div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 bg-white text-slate-900 font-bold text-xs py-2.5 rounded-2xl hover:bg-black hover:text-white transition-all shadow-sm">
                      <PlayCircle className="w-4 h-4" />
                      {course.progress === 100 ? 'Review Course' : course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeNav === 'performance' ? (

          /* 3. GRADECARD / PERFORMANCE VIEW */
          <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Academic Performance</h1>
                <p className="text-sm text-slate-500 mt-1">Official Student Gradecard & Semester Evaluation Report.</p>
              </div>

              <button 
                onClick={() => alert('Official Gradecard PDF Downloaded!')}
                className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold transition shadow-sm self-start"
              >
                <Download className="w-4 h-4" />
                Download Transcript
              </button>
            </div>

            {/* Performance Overview KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#E0F780] p-5 rounded-3xl border border-black/5">
                <span className="text-xs font-bold text-slate-700">Cumulative GPA (CGPA)</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-extrabold text-slate-900">{gradeCardData.cgpa}</span>
                  <span className="text-xs text-slate-600 font-medium">/ 4.0</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                <span className="text-xs font-bold text-slate-500">Semester GPA (SGPA)</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-extrabold text-slate-900">{gradeCardData.sgpa}</span>
                  <span className="text-xs text-slate-400 font-medium">Semester 5</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                <span className="text-xs font-bold text-slate-500">Credits Completed</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-extrabold text-slate-900">{gradeCardData.totalCredits}</span>
                  <span className="text-xs text-slate-400 font-medium">Earned Units</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                <span className="text-xs font-bold text-slate-500">Academic Standing</span>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-3xl font-extrabold text-slate-900">{gradeCardData.rank}</span>
                  <GraduationCap className="w-6 h-6 text-amber-500" />
                </div>
              </div>
            </div>

            {/* Gradecard Table Section */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="font-bold text-slate-900 text-base">Gradecard Details</h2>
                  <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">2026 Academic Year</span>
                </div>

                {/* Semester Selector */}
                <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-2xl border border-gray-200">
                  {Object.keys(gradeCardData.semesters).map((sem) => (
                    <button
                      key={sem}
                      onClick={() => setSelectedSemester(sem)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                        selectedSemester === sem ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {sem}
                    </button>
                  ))}
                </div>
              </div>

              {/* Course Grade List */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="pb-3 pl-2">Subject Code</th>
                      <th className="pb-3">Course Title</th>
                      <th className="pb-3">Credits</th>
                      <th className="pb-3">Grade</th>
                      <th className="pb-3">Grade Points</th>
                      <th className="pb-3 text-right pr-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-xs font-medium text-slate-700">
                    {gradeCardData.semesters[selectedSemester]?.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/60 transition">
                        <td className="py-4 pl-2 font-bold text-slate-900">{row.code}</td>
                        <td className="py-4 font-semibold text-slate-800">{row.subject}</td>
                        <td className="py-4 text-slate-500">{row.credits}</td>
                        <td className="py-4">
                          <span className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold ${
                            row.grade.startsWith('A') ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {row.grade}
                          </span>
                        </td>
                        <td className="py-4 font-semibold text-slate-800">{row.points}</td>
                        <td className="py-4 text-right pr-2">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" /> {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : activeNav === 'schedule' ? (

          /* 4. SCHEDULE VIEW (TIMETABLE, ATTENDANCE & LEAVE APPLICATION) */
          <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Schedule & Attendance</h1>
                <p className="text-sm text-slate-500 mt-1">Timetable schedule, subject attendance, and duty/medical leave requests.</p>
              </div>

              {/* Apply Leave Trigger Button */}
              <button 
                onClick={() => setIsLeaveModalOpen(true)}
                className="flex items-center gap-2 bg-[#E0F780] hover:bg-[#d6f06a] text-slate-900 px-5 py-2.5 rounded-full text-xs font-bold transition shadow-sm border border-slate-900/10 self-start"
              >
                <FilePlus className="w-4 h-4" />
                Apply Duty / Medical Leave
              </button>
            </div>

            {/* Date Selection Bar */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 mb-6 flex items-center justify-between overflow-x-auto gap-2">
              {scheduleDays.map((item) => (
                <button
                  key={item.day}
                  onClick={() => setSelectedDay(item.day)}
                  className={`flex flex-col items-center justify-center min-w-[90px] py-3 px-4 rounded-2xl transition-all ${
                    selectedDay === item.day 
                      ? 'bg-[#E0F780] text-slate-900 font-bold shadow-sm' 
                      : 'text-slate-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xs font-bold uppercase">{item.day}</span>
                  <span className="text-xl font-black mt-1">{item.date}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full mb-6">
              
              {/* Daily Timetable Timeline (Time-Wise) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                  <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-500" />
                    Day Schedule — {scheduleDays.find(d => d.day === selectedDay)?.fullDate}
                  </h2>
                  <span className="text-xs font-semibold bg-gray-100 text-slate-600 px-3 py-1 rounded-full">
                    {timetable[selectedDay]?.length || 0} Classes Scheduled
                  </span>
                </div>

                <div className="space-y-4">
                  {timetable[selectedDay] && timetable[selectedDay].length > 0 ? (
                    timetable[selectedDay].map((slot) => (
                      <div 
                        key={slot.id} 
                        className={`p-4 rounded-2xl border transition-all ${
                          slot.status === 'Ongoing' 
                            ? 'bg-[#FEDEBE]/40 border-[#FEDEBE] shadow-sm' 
                            : 'bg-gray-50/70 border-gray-100 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                          <span className="text-xs font-bold text-slate-900 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-2xs self-start">
                            {slot.time}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-slate-600 bg-slate-200/60 px-2.5 py-0.5 rounded-md uppercase">
                              {slot.type}
                            </span>
                            {slot.status === 'Ongoing' && (
                              <span className="text-[10px] font-extrabold text-amber-800 bg-amber-200/80 px-2.5 py-0.5 rounded-md animate-pulse">
                                Live Now
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mb-2">
                          <h3 className="font-extrabold text-slate-900 text-sm">{slot.subject}</h3>
                          <span className="text-xs font-semibold text-slate-400">{slot.code}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 pt-2 border-t border-black/5">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-slate-400" /> {slot.instructor}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {slot.location}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-slate-400 font-medium text-xs">
                      No classes or lectures scheduled for this day.
                    </div>
                  )}
                </div>
              </div>

              {/* Subject-Wise Attendance Tracker */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                  <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    Subject-wise Attendance
                  </h2>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Overall 87%
                  </span>
                </div>

                <div className="space-y-4">
                  {attendanceData.map((item, idx) => (
                    <div key={idx} className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-slate-900">{item.subject}</span>
                        <span className={`text-xs font-extrabold ${
                          item.status === 'Warning' ? 'text-rose-600' : 'text-slate-900'
                        }`}>
                          {item.percentage}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-2">
                        <span>{item.code}</span>
                        <span>{item.attended} / {item.total} Attended</span>
                      </div>

                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            item.percentage >= 85 ? 'bg-emerald-500' : item.percentage >= 75 ? 'bg-amber-500' : 'bg-rose-500'
                          }`} 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>

                      {item.status === 'Warning' && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-rose-600 mt-2">
                          <AlertTriangle className="w-3 h-3" /> Attendance below requirement (75%)
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Leave Applications & History Tracker */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 w-full">
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-600" />
                    Duty & Medical Leave Applications
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">Track status of submitted leave certificates and official attendance waivers.</p>
                </div>

                <span className="text-xs font-bold text-slate-700 bg-gray-100 px-3 py-1 rounded-full">
                  {leaveRequests.length} Total Applied
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {leaveRequests.map((req) => (
                  <div key={req.id} className="p-4 bg-gray-50/80 rounded-2xl border border-gray-100 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md ${
                          req.type === 'Duty Leave' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {req.type}
                        </span>

                        <span className={`text-[10px] font-extrabold flex items-center gap-1 px-2.5 py-0.5 rounded-full ${
                          req.status === 'Approved' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : req.status === 'Pending' 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {req.status === 'Approved' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {req.status}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-xs mb-1 line-clamp-1">{req.subject}</h3>
                      <p className="text-[11px] font-semibold text-slate-500 mb-2">{req.dateRange} ({req.totalDays} Days)</p>
                    </div>

                    <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1 font-medium">
                        <Tag className="w-3 h-3 text-slate-400" /> {req.document}
                      </span>
                      {req.credited && (
                        <span className="font-bold text-emerald-600">Attendance Credited</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : activeNav === 'chats' ? (
          
          /* CHAT INTERVIEW / AI ASSISTANT TAB */
          <div className="w-full h-[calc(100vh-140px)] flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E0F780] text-slate-900 flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Campus Companion AI</h3>
                  <p className="text-[10px] text-emerald-400 font-medium">Online • Connected to University Policy RAG & Tools</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#F8F9FA]">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-black text-white rounded-br-none' : 'bg-white text-slate-800 border border-gray-200/80 shadow-sm rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-slate-400 p-3 rounded-2xl text-xs border border-gray-200 animate-pulse">
                    Thinking & querying policy database...
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChatMessage} className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
              <input 
                type="text" 
                value={chatInput} 
                onChange={(e) => setChatInput(e.target.value)} 
                placeholder="Ask about placement CGPA criteria, duty leave, or attendance..." 
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-slate-400"
              />
              <button type="submit" disabled={isChatLoading} className="p-3 bg-black text-white rounded-full hover:bg-slate-800 transition">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : activeNav === 'profile' ? (
          
          /* 5. PROFILE VIEW */
          <div className="w-full">
            <div className="mb-6">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Student Profile</h1>
              <p className="text-sm text-slate-500 mt-1">Manage your account details, academic information, and security options.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center relative">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" 
                      alt="Ava Richardson" 
                      className="w-full h-full rounded-full object-cover border-4 border-slate-50 shadow-md"
                    />
                    <button className="absolute bottom-0 right-0 p-2 bg-black text-white rounded-full shadow-md hover:bg-slate-800 transition">
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900">Ava Richardson</h2>
                  <p className="text-xs text-slate-500 font-medium">ava.richardson@university.edu</p>

                  <div className="mt-4 inline-flex items-center gap-1.5 bg-[#E0F780] text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Active Student
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm border-b border-gray-100 pb-3">Academic Details</h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-slate-400 font-medium">Roll Number</span>
                      <span className="font-bold text-slate-800">2023-CS-089</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-slate-400 font-medium">Department</span>
                      <span className="font-bold text-slate-800">Computer Science & AI</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-slate-400 font-medium">Batch</span>
                      <span className="font-bold text-slate-800">2023 - 2027</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400 font-medium">Semester</span>
                      <span className="font-bold text-slate-800">Semester 6</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
                    <Key className="w-4 h-4 text-slate-500" />
                    Change Password
                  </h3>

                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Current Password</label>
                      <input 
                        type="password" 
                        required
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        placeholder="••••••••"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-slate-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">New Password</label>
                        <input 
                          type="password" 
                          required
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                          placeholder="••••••••"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-slate-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Confirm New Password</label>
                        <input 
                          type="password" 
                          required
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                          placeholder="••••••••"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-slate-400"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit" 
                        className="px-5 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:bg-slate-800 transition"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-slate-500" />
                    Active Session
                  </h3>

                  <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">MacBook Pro — Chrome Browser</p>
                        <p className="text-[10px] text-slate-400">Current Session • New Delhi, India</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Active Now
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Account Action</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Logout from your current session.</p>
                  </div>

                  <button 
                    onClick={() => alert('Logged out successfully.')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs rounded-full border border-rose-200/60 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          
          /* 6. TIMELINE VIEW */
          <div className="w-full">
            <div className="mb-6">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Timeline</h1>
              <p className="text-sm text-slate-500 mt-1">Official announcements, circulars, and campus updates.</p>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
              {filterTabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = timelineFilter === tab.name;
                return (
                  <button
                    key={tab.name}
                    onClick={() => setTimelineFilter(tab.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                      isActive 
                        ? 'bg-black text-white border-black shadow-sm' 
                        : 'bg-white text-slate-600 border-gray-200 hover:bg-gray-100 hover:text-slate-900'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    {tab.name}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
              <div className="lg:col-span-8 space-y-4">
                {circulars.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100/80 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${item.tagColor}`}>
                          <Tag className="w-3 h-3" />
                          {item.tag}
                        </span>
                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {item.date}
                        </span>
                      </div>

                      <h2 className="text-lg font-bold text-slate-900 mb-2 hover:text-indigo-600 cursor-pointer transition">
                        {item.title}
                      </h2>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-slate-400 font-medium">
                        Posted by: <strong className="text-slate-700">{item.author}</strong>
                      </span>

                      <button className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-gray-50 hover:bg-[#E0F780] px-4 py-2 rounded-full border border-gray-200/60 transition-all">
                        View details
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-4">
                    <Pin className="w-4 h-4 text-amber-500 fill-amber-500" />
                    Pinned Announcement
                  </h3>
                  <div className="bg-[#FEDEBE]/40 p-4 rounded-2xl border border-[#FEDEBE]">
                    <span className="text-[10px] font-bold tracking-wide uppercase text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-md">Urgent</span>
                    <h4 className="font-bold text-slate-900 text-sm mt-2">Spring 2026 Registration Deadline</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">Ensure all course add/drop requests are completed by Aug 10.</p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-slate-400" />
                    Important Dates
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                      <div>
                        <p className="text-xs font-bold text-slate-800">Mid-Semester Exam</p>
                        <p className="text-[10px] text-slate-400">All Departments</p>
                      </div>
                      <span className="text-xs font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-gray-200">Aug 15</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                      <div>
                        <p className="text-xs font-bold text-slate-800">Hackathon Submissions</p>
                        <p className="text-[10px] text-slate-400">Tech Council</p>
                      </div>
                      <span className="text-xs font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-gray-200">Aug 22</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* LEAVE APPLICATION MODAL */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Apply for Leave</h3>
                <p className="text-xs text-slate-500">Submit medical certificates or duty leave proof for attendance credit.</p>
              </div>
              <button 
                onClick={() => setIsLeaveModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyLeave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Leave Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setLeaveForm({ ...leaveForm, type: 'Medical Leave' })}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition text-center ${
                      leaveForm.type === 'Medical Leave' 
                        ? 'bg-blue-50 border-blue-500 text-blue-700' 
                        : 'bg-gray-50 border-gray-200 text-slate-600'
                    }`}
                  >
                    Medical Leave
                  </button>
                  <button
                    type="button"
                    onClick={() => setLeaveForm({ ...leaveForm, type: 'Duty Leave' })}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition text-center ${
                      leaveForm.type === 'Duty Leave' 
                        ? 'bg-purple-50 border-purple-500 text-purple-700' 
                        : 'bg-gray-50 border-gray-200 text-slate-600'
                    }`}
                  >
                    Duty Leave (Events / Contests)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Reason / Event Description</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Hackathon Participation / Fever Doctor Rest"
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Start Date</label>
                  <input 
                    type="date" 
                    required
                    value={leaveForm.startDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">End Date</label>
                  <input 
                    type="date" 
                    required
                    value={leaveForm.endDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Upload Proof (Medical Cert / Event Pass)</label>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:bg-gray-50/50 transition cursor-pointer relative">
                  <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                  <p className="text-xs font-semibold text-slate-600">Click to upload document (PDF/PNG)</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Max size 5MB</p>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => setLeaveForm({ ...leaveForm, fileName: e.target.files[0]?.name || '' })}
                    id="leaveDoc"
                  />
                  <label htmlFor="leaveDoc" className="absolute inset-0 cursor-pointer"></label>
                </div>
                {leaveForm.fileName && (
                  <p className="text-[11px] font-bold text-emerald-600 mt-1.5 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Attached: {leaveForm.fileName}
                  </p>
                )}
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsLeaveModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-black hover:bg-slate-800 text-white text-xs font-bold rounded-full transition shadow-sm"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}