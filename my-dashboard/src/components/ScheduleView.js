import React from 'react';
import { 
  FilePlus, Clock, User, MapPin, UserCheck, 
  AlertTriangle, FileText, CheckCircle, Tag 
} from 'lucide-react';
import { scheduleDays, timetable, attendanceData } from '../data/mockData';

export default function ScheduleView({ selectedDay, setSelectedDay, setIsLeaveModalOpen, leaveRequests }) {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Schedule & Attendance</h1>
          <p className="text-sm text-slate-500 mt-1">Timetable schedule, subject attendance, and duty/medical leave requests.</p>
        </div>

        <button 
          onClick={() => setIsLeaveModalOpen(true)}
          className="flex items-center gap-2 bg-[#E0F780] hover:bg-[#d6f06a] text-slate-900 px-5 py-2.5 rounded-full text-xs font-bold transition shadow-sm border border-slate-900/10 self-start"
        >
          <FilePlus className="w-4 h-4" />
          Apply Duty / Medical Leave
        </button>
      </div>

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
                    req.type === 'Duty Leave' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {req.type}
                  </span>

                  <span className={`text-[10px] font-extrabold flex items-center gap-1 px-2.5 py-0.5 rounded-full ${
                    req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
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
                {req.credited && <span className="font-bold text-emerald-600">Attendance Credited</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}