import React, { useState, useEffect } from "react";

export default function ScheduleView() {
  const [timetable, setTimetable] = useState({});
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 6)); // Default to August 6, 2026
  const [selectedDateStr, setSelectedDateStr] = useState("August 6, 2026");
  const [loading, setLoading] = useState(true);

  // Retrieve logged-in user profile from localStorage dynamically
  const savedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const userId = savedUser.user_id || 'U001';

  useEffect(() => {
    console.log("Fetching schedule and attendance for user_id:", userId);
    Promise.all([
      fetch("http://127.0.0.1:8000/api/timetable").then((res) => res.json()),
      fetch(`http://127.0.0.1:8000/api/datewise-attendance?user_id=${userId}`).then((res) => res.json())
    ])
      .then(([timetableData, attendanceData]) => {
        console.log("Timetable loaded:", timetableData);
        console.log("Attendance records loaded for user:", attendanceData);
        setTimetable(timetableData || {});
        setAttendanceLogs(Array.isArray(attendanceData) ? attendanceData : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading schedule and attendance:", err);
        setLoading(false);
      });
  }, [userId]);

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
  
  // Safe filtering for user-specific logs matching the selected date string
  const safeLogs = Array.isArray(attendanceLogs) ? attendanceLogs : [];
  const logsForDate = safeLogs.filter((log) => {
    return log.date && log.date.trim().toLowerCase() === selectedDateStr.trim().toLowerCase();
  });

  // Compare selected date against today's date (August 8, 2026)
  const todayDate = new Date(2026, 7, 8);
  todayDate.setHours(0, 0, 0, 0);
  
  const isFutureDate = selectedDateObj > todayDate;
  const isPastOrToday = selectedDateObj <= todayDate;
  const hasRecords = logsForDate.length > 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Academic Schedule</h2>
          <p className="text-sm text-gray-500">
            Personal schedule and attendance records for <span className="font-semibold text-slate-800">{savedUser.name || 'Student'}</span> ({userId}).
          </p>
        </div>
        <button 
          onClick={() => {
            const today = new Date();
            setCurrentDate(today);
            setSelectedDateStr(`${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`);
          }}
          className="px-5 py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-700 font-semibold rounded-2xl transition text-sm shadow-sm cursor-pointer"
        >
          Today
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Calendar Widget */}
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
            <button onClick={prevMonth} className="p-2 hover:bg-white rounded-xl transition shadow-xs cursor-pointer">◀</button>
            <span className="font-bold text-gray-800">{monthNames[month]} {year}</span>
            <button onClick={nextMonth} className="p-2 hover:bg-white rounded-xl transition shadow-xs cursor-pointer">▶</button>
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
                  className={`p-2.5 rounded-2xl font-medium transition text-sm cursor-pointer ${
                    isSelected ? "bg-emerald-500 text-white font-bold shadow-md shadow-emerald-200" : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                  }`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>
        </div>

        {/* Timetable Area */}
        <div className="lg:col-span-8 bg-white rounded-3xl shadow-sm border border-emerald-50 overflow-hidden flex flex-col">
          <div className="p-6 bg-gradient-to-r from-emerald-50/50 via-orange-50/30 to-white border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{selectedDateStr}</h3>
              <p className="text-xs text-emerald-700 font-medium">Day Schedule: {dayOfWeek}</p>
            </div>
            {isPastOrToday && (
              <span className={`text-xs font-bold px-4 py-2 rounded-full border ${
                hasRecords 
                  ? "bg-orange-50 text-orange-700 border-orange-100" 
                  : "bg-gray-100 text-gray-600 border-gray-200"
              }`}>
                {hasRecords ? "Attendance Recorded" : "Attendance Not Recorded"}
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
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {baseClasses.map((item, index) => {
                    const matchedLog = logsForDate.find((log) => log.code === item.code && log.time === item.time);
                    return (
                      <tr key={index} className={item.code === "BREAK" ? "bg-orange-50/50 font-semibold text-orange-900" : "hover:bg-emerald-50/30 transition text-gray-700"}>
                        <td className="p-4 font-medium">{item.time}</td>
                        <td className="p-4 font-bold text-gray-900">{item.subject}</td>
                        <td className="p-4 text-gray-600">{item.teacher}</td>
                        <td className="p-4 text-gray-600">{item.room}</td>
                        {item.code !== "BREAK" ? (
                          <td className="p-4">
                            {isFutureDate ? (
                              <span className="text-xs text-gray-400 font-medium">Upcoming Class</span>
                            ) : (
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                                !matchedLog 
                                  ? "bg-gray-100 text-gray-500 border border-gray-200" 
                                  : matchedLog.status === "Absent" 
                                  ? "bg-red-50 text-red-700 border border-red-100" 
                                  : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              }`}>
                                {!matchedLog ? "Pending" : matchedLog.status === "Absent" ? "❌ Absent" : "✅ Present"}
                              </span>
                            )}
                          </td>
                        ) : (
                          <td className="p-4">-</td>
                        )}
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