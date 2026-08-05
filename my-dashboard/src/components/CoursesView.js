import React from 'react';
import { Calendar as CalendarIcon, User, BookOpen, PlayCircle } from 'lucide-react';
import { allCourses } from '../data/mockData';

export default function CoursesView({ activeTab, setActiveTab }) {
  const filteredCourses = allCourses.filter((course) => {
    if (activeTab === 'All') return true;
    return course.category === activeTab;
  });

  return (
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
  );
}