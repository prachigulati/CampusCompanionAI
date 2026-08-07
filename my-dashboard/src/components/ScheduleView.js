// import React from 'react';
// import { 
//   FilePlus, Clock, User, MapPin, UserCheck, 
//   AlertTriangle, FileText, CheckCircle, Tag 
// } from 'lucide-react';
// import { scheduleDays, timetable, attendanceData } from '../data/mockData';

// export default function ScheduleView({ selectedDay, setSelectedDay, setIsLeaveModalOpen, leaveRequests }) {
//   return (
//     <div className="w-full">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Schedule & Attendance</h1>
//           <p className="text-sm text-slate-500 mt-1">Timetable schedule, subject attendance, and duty/medical leave requests.</p>
//         </div>

//         <button 
//           onClick={() => setIsLeaveModalOpen(true)}
//           className="flex items-center gap-2 bg-[#E0F780] hover:bg-[#d6f06a] text-slate-900 px-5 py-2.5 rounded-full text-xs font-bold transition shadow-sm border border-slate-900/10 self-start"
//         >
//           <FilePlus className="w-4 h-4" />
//           Apply Duty / Medical Leave
//         </button>
//       </div>

//       <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 mb-6 flex items-center justify-between overflow-x-auto gap-2">
//         {scheduleDays.map((item) => (
//           <button
//             key={item.day}
//             onClick={() => setSelectedDay(item.day)}
//             className={`flex flex-col items-center justify-center min-w-[90px] py-3 px-4 rounded-2xl transition-all ${
//               selectedDay === item.day 
//                 ? 'bg-[#E0F780] text-slate-900 font-bold shadow-sm' 
//                 : 'text-slate-500 hover:bg-gray-50'
//             }`}
//           >
//             <span className="text-xs font-bold uppercase">{item.day}</span>
//             <span className="text-xl font-black mt-1">{item.date}</span>
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full mb-6">
//         <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
//             <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
//               <Clock className="w-4 h-4 text-slate-500" />
//               Day Schedule — {scheduleDays.find(d => d.day === selectedDay)?.fullDate}
//             </h2>
//             <span className="text-xs font-semibold bg-gray-100 text-slate-600 px-3 py-1 rounded-full">
//               {timetable[selectedDay]?.length || 0} Classes Scheduled
//             </span>
//           </div>

//           <div className="space-y-4">
//             {timetable[selectedDay] && timetable[selectedDay].length > 0 ? (
//               timetable[selectedDay].map((slot) => (
//                 <div 
//                   key={slot.id} 
//                   className={`p-4 rounded-2xl border transition-all ${
//                     slot.status === 'Ongoing' 
//                       ? 'bg-[#FEDEBE]/40 border-[#FEDEBE] shadow-sm' 
//                       : 'bg-gray-50/70 border-gray-100 hover:bg-gray-50'
//                   }`}
//                 >
//                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
//                     <span className="text-xs font-bold text-slate-900 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-2xs self-start">
//                       {slot.time}
//                     </span>
//                     <div className="flex items-center gap-2">
//                       <span className="text-[10px] font-bold text-slate-600 bg-slate-200/60 px-2.5 py-0.5 rounded-md uppercase">
//                         {slot.type}
//                       </span>
//                       {slot.status === 'Ongoing' && (
//                         <span className="text-[10px] font-extrabold text-amber-800 bg-amber-200/80 px-2.5 py-0.5 rounded-md animate-pulse">
//                           Live Now
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="mb-2">
//                     <h3 className="font-extrabold text-slate-900 text-sm">{slot.subject}</h3>
//                     <span className="text-xs font-semibold text-slate-400">{slot.code}</span>
//                   </div>

//                   <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 pt-2 border-t border-black/5">
//                     <span className="flex items-center gap-1">
//                       <User className="w-3.5 h-3.5 text-slate-400" /> {slot.instructor}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <MapPin className="w-3.5 h-3.5 text-slate-400" /> {slot.location}
//                     </span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-12 text-slate-400 font-medium text-xs">
//                 No classes or lectures scheduled for this day.
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
//             <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
//               <UserCheck className="w-4 h-4 text-emerald-600" />
//               Subject-wise Attendance
//             </h2>
//             <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
//               Overall 87%
//             </span>
//           </div>

//           <div className="space-y-4">
//             {attendanceData.map((item, idx) => (
//               <div key={idx} className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
//                 <div className="flex items-center justify-between mb-1.5">
//                   <span className="text-xs font-bold text-slate-900">{item.subject}</span>
//                   <span className={`text-xs font-extrabold ${
//                     item.status === 'Warning' ? 'text-rose-600' : 'text-slate-900'
//                   }`}>
//                     {item.percentage}%
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-2">
//                   <span>{item.code}</span>
//                   <span>{item.attended} / {item.total} Attended</span>
//                 </div>

//                 <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                   <div 
//                     className={`h-full rounded-full ${
//                       item.percentage >= 85 ? 'bg-emerald-500' : item.percentage >= 75 ? 'bg-amber-500' : 'bg-rose-500'
//                     }`} 
//                     style={{ width: `${item.percentage}%` }}
//                   ></div>
//                 </div>

//                 {item.status === 'Warning' && (
//                   <div className="flex items-center gap-1 text-[10px] font-bold text-rose-600 mt-2">
//                     <AlertTriangle className="w-3 h-3" /> Attendance below requirement (75%)
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 w-full">
//         <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
//           <div>
//             <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
//               <FileText className="w-4 h-4 text-slate-600" />
//               Duty & Medical Leave Applications
//             </h2>
//             <p className="text-xs text-slate-400 mt-0.5">Track status of submitted leave certificates and official attendance waivers.</p>
//           </div>

//           <span className="text-xs font-bold text-slate-700 bg-gray-100 px-3 py-1 rounded-full">
//             {leaveRequests.length} Total Applied
//           </span>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {leaveRequests.map((req) => (
//             <div key={req.id} className="p-4 bg-gray-50/80 rounded-2xl border border-gray-100 flex flex-col justify-between">
//               <div>
//                 <div className="flex items-center justify-between mb-3">
//                   <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md ${
//                     req.type === 'Duty Leave' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
//                   }`}>
//                     {req.type}
//                   </span>

//                   <span className={`text-[10px] font-extrabold flex items-center gap-1 px-2.5 py-0.5 rounded-full ${
//                     req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
//                   }`}>
//                     {req.status === 'Approved' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
//                     {req.status}
//                   </span>
//                 </div>

//                 <h3 className="font-bold text-slate-900 text-xs mb-1 line-clamp-1">{req.subject}</h3>
//                 <p className="text-[11px] font-semibold text-slate-500 mb-2">{req.dateRange} ({req.totalDays} Days)</p>
//               </div>

//               <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between text-[11px] text-slate-500">
//                 <span className="flex items-center gap-1 font-medium">
//                   <Tag className="w-3 h-3 text-slate-400" /> {req.document}
//                 </span>
//                 {req.credited && <span className="font-bold text-emerald-600">Attendance Credited</span>}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";

export default function ScheduleView() {
  const [timetable, setTimetable] = useState({});
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 7)); 
  const [selectedDateStr, setSelectedDateStr] = useState("August 7, 2026");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://127.0.0.1:8000/api/timetable").then((res) => res.json()),
      fetch("http://127.0.0.1:8000/api/datewise-attendance").then((res) => res.json())
    ])
      .then(([timetableData, attendanceData]) => {
        setTimetable(timetableData || {});
        setAttendanceLogs(attendanceData || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading schedule and attendance:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-gray-400 text-center font-medium">Loading your academic schedule...</div>;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const selectedDateObj = new Date(year, month, currentDate.getDate());
  const dayNamesFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeek = dayNamesFull[selectedDateObj.getDay()];

  const baseClasses = timetable[dayOfWeek] || [];
  const logsForDate = attendanceLogs.filter((log) => log.date === selectedDateStr);
  const isPastDate = logsForDate.length > 0 || selectedDateObj < new Date(2026, 7, 7);

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Academic Schedule</h2>
          <p className="text-sm text-gray-500">View your daily lectures and historical attendance status.</p>
        </div>
        <button 
          onClick={() => {
            const today = new Date();
            setCurrentDate(today);
            setSelectedDateStr(`${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`);
          }}
          className="px-5 py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-700 font-semibold rounded-2xl transition text-sm shadow-sm"
        >
          Today
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Pastel Sage Green Calendar Widget */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl shadow-sm border border-emerald-50 space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-800 text-base">Select Date</h3>
            <span className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl text-sm font-bold">📅</span>
          </div>

          <div className="flex gap-3">
            <select 
              value={month} 
              onChange={(e) => setCurrentDate(new Date(year, parseInt(e.target.value), 1))}
              className="w-1/2 bg-gray-50 border border-gray-100 text-gray-700 text-sm rounded-2xl p-3 outline-none focus:ring-2 focus:ring-emerald-200"
            >
              {monthNames.map((m, idx) => <option key={idx} value={idx}>{m}</option>)}
            </select>
            <select 
              value={year} 
              onChange={(e) => setCurrentDate(new Date(parseInt(e.target.value), month, 1))}
              className="w-1/2 bg-gray-50 border border-gray-100 text-gray-700 text-sm rounded-2xl p-3 outline-none focus:ring-2 focus:ring-emerald-200"
            >
              {[2024, 2025, 2026, 2027].map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className="flex justify-between items-center px-1 text-sm bg-gray-50 p-2 rounded-2xl">
            <button onClick={prevMonth} className="p-2 hover:bg-white rounded-xl transition shadow-xs">◀</button>
            <span className="font-bold text-gray-800">{monthNames[month]} {year}</span>
            <button onClick={nextMonth} className="p-2 hover:bg-white rounded-xl transition shadow-xs">▶</button>
          </div>

          <div className="grid grid-cols-7 text-center text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
            <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center text-sm">
            {Array.from({ length: firstDayIndex }).map((_, i) => <div key={i} className="p-2"></div>)}
            {Array.from({ length: totalDays }).map((_, i) => {
              const dayNum = i + 1;
              const isSelected = currentDate.getDate() === dayNum;
              return (
                <button
                  key={dayNum}
                  onClick={() => {
                    setCurrentDate(new Date(year, month, dayNum));
                    setSelectedDateStr(`${monthNames[month]} ${dayNum}, ${year}`);
                  }}
                  className={`p-2.5 rounded-2xl font-medium transition text-sm ${
                    isSelected ? "bg-emerald-500 text-white font-bold shadow-md shadow-emerald-200" : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                  }`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>
        </div>

        {/* Timetable Area (Span 8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl shadow-sm border border-emerald-50 overflow-hidden flex flex-col">
          <div className="p-6 bg-gradient-to-r from-emerald-50/50 via-orange-50/30 to-white border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{selectedDateStr}</h3>
              <p className="text-xs text-emerald-700 font-medium">Day Schedule: {dayOfWeek}</p>
            </div>
            {isPastDate && (
              <span className="text-xs font-bold px-4 py-2 bg-orange-50 text-orange-700 border border-orange-100 rounded-full">
                Attendance Recorded
              </span>
            )}
          </div>

          {dayOfWeek === "Saturday" || dayOfWeek === "Sunday" ? (
            <div className="p-16 text-center space-y-3 my-auto">
              <div className="text-5xl">🌴</div>
              <h3 className="text-xl font-bold text-gray-900">Weekend Mode</h3>
              <p className="text-gray-400 text-sm">Enjoy your break on {selectedDateStr}!</p>
            </div>
          ) : (
            <div className="overflow-x-auto p-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 text-[10px] uppercase tracking-wider bg-gray-50/40">
                    <th className="p-4">Time</th>
                    <th className="p-4">Subject</th>
                    <th className="p-4">Teacher</th>
                    <th className="p-4">Hall</th>
                    {isPastDate && <th className="p-4">Status</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {baseClasses.map((item, index) => {
                    const matchedLog = logsForDate.find((log) => log.time === item.time || log.code === item.code);
                    return (
                      <tr key={index} className={item.code === "BREAK" ? "bg-orange-50/50 font-semibold text-orange-900" : "hover:bg-emerald-50/30 transition text-gray-700"}>
                        <td className="p-4 font-medium">{item.time}</td>
                        <td className="p-4 font-bold text-gray-900">{item.subject}</td>
                        <td className="p-4 text-gray-600">{item.teacher}</td>
                        <td className="p-4 text-gray-600">{item.room}</td>
                        {isPastDate && item.code !== "BREAK" && (
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${matchedLog?.status === "Absent" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>
                              {matchedLog?.status === "Absent" ? "❌ Absent" : "✅ Present"}
                            </span>
                          </td>
                        )}
                        {isPastDate && item.code === "BREAK" && <td className="p-4">-</td>}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}