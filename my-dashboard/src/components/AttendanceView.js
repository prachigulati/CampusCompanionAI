import React, { useState, useEffect } from "react";

export default function AttendanceView() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animateRings, setAnimateRings] = useState(false);

  // Retrieve logged-in user profile from localStorage dynamically
  const savedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const userId = savedUser.user_id || 'U001';

  useEffect(() => {
    console.log("Fetching attendance analytics for user_id:", userId);
    fetch(`http://127.0.0.1:8000/api/attendance/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Attendance API Response:", data);
        setUserData(data || { subjects: [] });
        setLoading(false);
        setTimeout(() => setAnimateRings(true), 100);
      })
      .catch((err) => {
        console.error("Error fetching attendance records:", err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div className="p-8 text-gray-400 text-center font-medium">Loading attendance analytics...</div>;

  const subjects = userData?.subjects || [];

  // Calculate summary stats dynamically from user subjects
  const totalDelivered = subjects.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const totalAttended = subjects.reduce((acc, curr) => acc + (curr.attended || 0), 0);
  const totalAbsences = totalDelivered - totalAttended;
  const overallPercentage = totalDelivered > 0 ? ((totalAttended / totalDelivered) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 bg-[#F8FAF8] min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold mb-2 border border-emerald-100">
            <span>📊 Semester V · Animated Circular Attendance</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Attendance Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Viewing records for <span className="font-semibold text-slate-800">{userData?.name || savedUser.name || 'Student'}</span> ({userId}).
          </p>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-emerald-50">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Overall Percentage</p>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2">{overallPercentage}%</p>
          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold mt-2 inline-block ${
            overallPercentage >= 75 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
          }`}>
            {overallPercentage >= 75 ? "Safe Zone (>75%)" : "Warning Zone (<75%)"}
          </span>
        </div>
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-emerald-50">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Total Delivered</p>
          <p className="text-3xl font-extrabold text-gray-900 mt-2">{totalDelivered}</p>
          <span className="text-[10px] text-gray-400 mt-2 inline-block">Across {subjects.length} subjects</span>
        </div>
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-emerald-50">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Total Attended</p>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2">{totalAttended}</p>
          <span className="text-[10px] text-emerald-600 mt-2 inline-block">Includes validated leaves</span>
        </div>
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-emerald-50">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Total Absences</p>
          <p className="text-3xl font-extrabold text-rose-500 mt-2">{totalAbsences}</p>
          <span className="text-[10px] text-rose-500 mt-2 inline-block">Requires attention</span>
        </div>
      </div>

      {/* Animated Circular Ring Graphs Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-50 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Subject Ring Analytics</h3>
            <p className="text-xs text-gray-400">Smooth animated percentage rings per course code</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-orange-50 text-orange-700 rounded-full border border-orange-100">
            Animated Graphs
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((item, index) => {
            const radius = 36;
            const circumference = 2 * Math.PI * radius;
            
            const strokeDashoffset = animateRings 
              ? circumference - (item.percentage / 100) * circumference 
              : circumference;
              
            const isSafe = item.percentage >= 75;

            return (
              <div key={index} className="p-5 bg-gray-50/60 border border-gray-100 rounded-3xl flex items-center gap-5 transition hover:shadow-sm">
                
                {/* SVG Ring Progress with Animation */}
                <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-gray-200 fill-none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className={`fill-none transition-all duration-1000 ease-in-out ${
                        isSafe ? "text-emerald-500" : "text-rose-500"
                      }`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-sm font-extrabold text-gray-900">{item.percentage}%</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <span className="px-2 py-0.5 bg-gray-200/70 text-gray-800 rounded text-[10px] font-mono font-bold">
                    {item.code}
                  </span>
                  <h4 className="font-bold text-gray-900 text-sm truncate" title={item.subject}>{item.subject}</h4>
                  <p className="text-[10px] text-gray-400 font-medium">
                    Attended: <strong className="text-gray-700">{item.attended}/{item.total}</strong>
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Table Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-emerald-50 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-900 text-lg">Detailed Subject Records</h3>
          <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
            Active Term Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider bg-gray-50/30">
                <th className="p-4 font-semibold">Course & Subject Name</th>
                <th className="p-4 font-semibold text-center">Delivered</th>
                <th className="p-4 font-semibold text-center">Attended</th>
                <th className="p-4 font-semibold text-center">Absent</th>
                <th className="p-4 font-semibold text-center">DL / ML</th>
                <th className="p-4 font-semibold text-right">Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {subjects.map((item, index) => {
                const absentCount = (item.total || 0) - (item.attended || 0);
                return (
                  <tr key={index} className="hover:bg-emerald-50/20 transition text-gray-700">
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{item.subject}</div>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-mono font-semibold">
                        {item.code}
                      </span>
                    </td>
                    <td className="p-4 text-center font-semibold text-gray-800">{item.total}</td>
                    <td className="p-4 text-center font-bold text-emerald-600">{item.attended}</td>
                    <td className="p-4 text-center font-bold text-rose-500">{absentCount}</td>
                    <td className="p-4 text-center text-xs font-semibold text-amber-600">
                      {item.dl || 0} / {item.ml || 0}
                    </td>
                    <td className="p-4 text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                        item.percentage >= 75 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}>
                        {item.percentage}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}