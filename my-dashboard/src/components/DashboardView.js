import React from 'react';
import { Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { allCourses, weeklyData, lessons } from '../data/mockData';

export default function DashboardView({ setActiveNav }) {
  return (
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
  );
}