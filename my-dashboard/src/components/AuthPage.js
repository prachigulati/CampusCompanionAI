import React, { useState } from 'react';
import { Sparkles, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2, Lock, Mail, User } from 'lucide-react';

export default function AuthPage({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    keepSigned: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert('Please fill in all required fields.');
      return;
    }

    if (isRegister && !formData.name) {
      alert('Please enter your full name.');
      return;
    }

    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <div className="flex h-screen bg-[#F4F5F7] font-sans antialiased overflow-hidden w-full items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[88vh] max-h-[640px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] border border-gray-100 flex overflow-hidden">
        
        {/* LEFT SIDE: FORM CONTAINER (No Scroll, Compact & Clean) */}
        <div className="w-full lg:w-1/2 px-8 py-6 md:px-12 md:py-8 flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-[#A3E635] rounded-full flex items-center justify-center font-bold text-xs text-slate-800 shadow-sm">
                ❖
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">elevate</span>
            </div>

            {/* Header info */}
            <div className="mb-5">
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
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name</label>
                  <div className="relative flex items-center">
                    <User className="w-3.5 h-3.5 absolute left-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      placeholder="Ava Richardson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-50/80 border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-400 transition"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Institute email</label>
                <div className="relative flex items-center">
                  <Mail className="w-3.5 h-3.5 absolute left-3.5 text-slate-400" />
                  <input 
                    type="email" 
                    required
                    placeholder="ava.richardson@campus.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-50/80 border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-400 transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-slate-700">Password</label>
                  {!isRegister && (
                    <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[10px] font-bold text-slate-500 hover:text-slate-900 transition">
                      Forgot password?
                    </a>
                  )}
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

              {!isRegister && (
                <div className="flex items-center gap-2 pt-0.5">
                  <input 
                    type="checkbox" 
                    id="keepSigned"
                    checked={formData.keepSigned}
                    onChange={(e) => setFormData({ ...formData, keepSigned: e.target.checked })}
                    className="w-3.5 h-3.5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                  />
                  <label htmlFor="keepSigned" className="text-[11px] font-medium text-slate-600 cursor-pointer select-none">
                    Keep me signed in on this device
                  </label>
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-[#111827] hover:bg-black text-white py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition shadow-md shadow-slate-900/10 flex items-center justify-center gap-2 mt-2"
              >
                <span>{isRegister ? 'Create Account' : 'Sign in'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Toggle between Login and Register footer */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium">
              {isRegister ? 'Already have an account?' : 'New here?'}
            </span>
            <button 
              onClick={() => setIsRegister(!isRegister)}
              className="font-bold text-slate-900 underline underline-offset-4 hover:text-slate-700 transition"
            >
              {isRegister ? 'Sign in instead' : 'Create an account'}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: CHIC & ELEVATED DARK GRAPHIC SHOWCASE PANEL */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#0d1117] text-white p-8 md:p-10 flex-col justify-between relative overflow-hidden rounded-r-[2.5rem] m-2.5">
          
          {/* Subtle Ambient Glowing Gradients */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E0F780]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Tagline */}
          <div className="relative z-10 text-center max-w-md mx-auto pt-4">
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#E0F780] bg-[#E0F780]/10 border border-[#E0F780]/20 px-3 py-0.5 rounded-full mb-3">
              Academic Excellence
            </span>
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight mb-2">
              Focus on what <span className="text-[#E0F780]">matters most.</span>
            </h2>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Join the minimalist workspace engineered for the high-achieving university student.
            </p>
          </div>

          {/* Center Floating Glassmorphism Metric Cards */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center gap-2.5 py-2">
            
            {/* Card 1: Attendance */}
            <div className="w-64 bg-gradient-to-r from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/10 p-3.5 rounded-2xl shadow-xl transform -rotate-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Attendance Status
                </span>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">Safe</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-black text-white">92%</span>
                <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[92%] h-full bg-[#E0F780] rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Card 2: Duty Leaves */}
            <div className="w-72 bg-gradient-to-r from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/10 p-3.5 rounded-2xl shadow-xl transform rotate-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Duty & Event Leaves</span>
                  <p className="text-xs font-extrabold text-white mt-0.5">04 Hackathons Credited</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Card 3: CGPA Standing */}
            <div className="w-64 bg-gradient-to-r from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/10 p-3.5 rounded-2xl shadow-xl transform -rotate-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Academic Standing</span>
                  <p className="text-base font-black text-[#E0F780] mt-0.5">3.84 CGPA <span className="text-[9px] text-slate-400 font-normal">Top 5%</span></p>
                </div>
                <ShieldCheck className="w-5 h-5 text-[#E0F780]" />
              </div>
            </div>

          </div>

          {/* Footer branding inside dark panel */}
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