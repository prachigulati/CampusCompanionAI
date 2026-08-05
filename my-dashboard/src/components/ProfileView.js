import React from 'react';
import { ShieldCheck, Key, Laptop, LogOut, Camera, CheckCircle2 } from 'lucide-react';

export default function ProfileView({ passwordForm, setPasswordForm, handlePasswordChange, onLogout }) {
  // Retrieve logged-in user profile from localStorage if available
  const savedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const userName = savedUser.name || 'Ava Richardson';
  const userEmail = savedUser.email || 'ava.richardson@university.edu';

  return (
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
                alt={userName} 
                className="w-full h-full rounded-full object-cover border-4 border-slate-50 shadow-md"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-black text-white rounded-full shadow-md hover:bg-slate-800 transition">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <h2 className="text-xl font-bold text-slate-900">{userName}</h2>
            <p className="text-xs text-slate-500 font-medium">{userEmail}</p>

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
                <span className="font-bold text-slate-800">{savedUser.user_id || '2023-CS-089'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-slate-400 font-medium">Department</span>
                <span className="font-bold text-slate-800">{savedUser.department || 'Computer Science & AI'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400 font-medium">CGPA</span>
                <span className="font-bold text-slate-800">{savedUser.cgpa || '3.84'}</span>
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

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Account Action</h3>
              <p className="text-xs text-slate-500 mt-0.5">Logout from your current session.</p>
            </div>

            <button 
              onClick={onLogout}
              className="flex items-center gap-2 px-5 py-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs rounded-full border border-rose-200/60 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}