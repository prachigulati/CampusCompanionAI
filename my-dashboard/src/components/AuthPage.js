import React, { useState } from 'react';
import { Sparkles, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2, Lock, Mail, User, Hash, Briefcase } from 'lucide-react';

export default function AuthPage({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_id: '',
    name: '',
    email: '',
    password: '',
    role: 'student',
    keepSigned: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert('Please fill in all required fields.');
      return;
    }

    if (isRegister && (!formData.name || !formData.user_id)) {
      alert('Please fill in your User ID and Full Name.');
      return;
    }

    setIsLoading(true);

    try {
      let endpoint = '';
      let payload = {};

      if (isRegister) {
        endpoint = '/api/auth/register';
        payload = {
          user_id: formData.user_id,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          department: 'Engineering (AIML)',
          cgpa: 3.84
        };
      } else {
        endpoint = '/api/auth/login';
        payload = {
          email: formData.email,
          password: formData.password
        };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.user) {
          localStorage.setItem('currentUser', JSON.stringify(data.user));
        }
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        alert(data.detail || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      console.error("Network or server error:", err);
      alert('Unable to connect to the backend server. Please make sure FastAPI is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F4F5F7] font-sans antialiased overflow-hidden w-full items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[88vh] max-h-[680px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] border border-gray-100 flex overflow-hidden">
        
        {/* LEFT SIDE: FORM CONTAINER */}
        <div className="w-full lg:w-1/2 px-8 py-6 md:px-12 md:py-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-[#A3E635] rounded-full flex items-center justify-center font-bold text-xs text-slate-800 shadow-sm">
                ❖
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">elevate</span>
            </div>

            {/* Header info */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-800 bg-[#E0F780] px-2.5 py-0.5 rounded-full mb-2">
                <Sparkles className="w-2.5 h-2.5" />
                {isRegister ? 'Get started today' : 'Welcome back'}
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-1">
                {isRegister ? 'Create an account' : 'Sign in to elevate'}
              </h1>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {isRegister 
                  ? 'Join the minimalist workspace designed for high-achieving students.' 
                  : "Pick up right where you left off — today's timetable is already waiting."}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {isRegister && (
                <>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">User ID</label>
                    <div className="relative flex items-center">
                      <Hash className="w-3.5 h-3.5 absolute left-3.5 text-slate-400" />
                      <input 
                        type="text" 
                        required
                        placeholder="U001 or STU001"
                        value={formData.user_id}
                        onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                        className="w-full bg-gray-50/80 border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-400 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name</label>
                    <div className="relative flex items-center">
                      <User className="w-3.5 h-3.5 absolute left-3.5 text-slate-400" />
                      <input 
                        type="text" 
                        required
                        placeholder="Prachi"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-gray-50/80 border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-400 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Role</label>
                    <div className="relative flex items-center">
                      <Briefcase className="w-3.5 h-3.5 absolute left-3.5 text-slate-400" />
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full bg-gray-50/80 border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-400 transition"
                      >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Institute Email</label>
                <div className="relative flex items-center">
                  <Mail className="w-3.5 h-3.5 absolute left-3.5 text-slate-400" />
                  <input 
                    type="email" 
                    required
                    placeholder="prachi@campus.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-50/80 border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-400 transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-slate-700">Password</label>
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-3.5 h-3.5 absolute left-3.5 text-slate-400" />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-gray-50/80 border border-gray-200 rounded-xl py-2.5 pl-9 pr-10 text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-400 transition"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-400 hover:text-slate-700 transition"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#111827] hover:bg-black text-white py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition shadow-md shadow-slate-900/10 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
              >
                <span>{isLoading ? 'Processing...' : (isRegister ? 'Create Account' : 'Sign in')}</span>
                {!isLoading && <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </form>
          </div>

          {/* Toggle footer */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium">
              {isRegister ? 'Already have an account?' : 'New here?'}
            </span>
            <button 
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="font-bold text-slate-900 underline underline-offset-4 hover:text-slate-700 transition"
            >
              {isRegister ? 'Sign in instead' : 'Create an account'}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: DARK GRAPHIC SHOWCASE PANEL */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#0d1117] text-white p-8 md:p-10 flex-col justify-between relative overflow-hidden rounded-r-[2.5rem] m-2.5">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E0F780]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 text-center max-w-md mx-auto pt-4">
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#E0F780] bg-[#E0F780]/10 border border-[#E0F780]/20 px-3 py-0.5 rounded-full mb-3">
              Academic Excellence
            </span>
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight mb-2">
              Focus on what <span className="text-[#E0F780]">matters most.</span>
            </h2>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Join the minimalist workspace engineered for university students and faculty.
            </p>
          </div>

          <div className="relative z-10 my-auto flex flex-col items-center justify-center gap-2.5 py-2">
            <div className="w-64 bg-gradient-to-r from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/10 p-3.5 rounded-2xl shadow-xl transform -rotate-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Attendance Status
                </span>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">Safe</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-black text-white">86.7%</span>
                <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[86.7%] h-full bg-[#E0F780] rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="w-72 bg-gradient-to-r from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/10 p-3.5 rounded-2xl shadow-xl transform rotate-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Duty & Event Leaves</span>
                  <p className="text-xs font-extrabold text-white mt-0.5">Validated DL / ML Tracking</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium pt-3 border-t border-white/5">
            <div className="w-3.5 h-3.5 bg-[#A3E635] rounded-full flex items-center justify-center font-bold text-[8px] text-slate-900">
              ❖
            </div>
            <span>elevate platform © 2026</span>
          </div>
        </div>

      </div>
    </div>
  );
}