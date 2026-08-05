import React from 'react';
import { Download, GraduationCap, CheckCircle2 } from 'lucide-react';
import { gradeCardData } from '../data/mockData';

export default function PerformanceView({ selectedSemester, setSelectedSemester }) {
  return (
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

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-slate-900 text-base">Gradecard Details</h2>
            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">2026 Academic Year</span>
          </div>

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
  );
}