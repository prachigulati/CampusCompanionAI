import React from 'react';
import { ShieldCheck, Key, LogOut } from 'lucide-react';

export default function ProfileView({ passwordForm, setPasswordForm, handlePasswordChange, onLogout }) {
  const savedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const userName = savedUser.name || 'Prachi';
  const userEmail = savedUser.email || 'prachi@campus.edu';
  const userId = savedUser.user_id || 'U001';
  const userRole = savedUser.role || 'student';
  const userDepartment = savedUser.department || 'Engineering (AIML)';

  // Generate user initials for the dynamic avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const initials = getInitials(userName);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">User Profile</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your account details, academic information, and security options.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center relative">
            
            {/* Dynamic Initials Avatar (No default static image) */}
            <div className="relative w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-[#E0F780] text-slate-900 font-black text-2xl rounded-full shadow-md border-4 border-slate-50">
              {initials}
            </div>

            <h2 className="text-xl font-bold text-slate-900">{userName}</h2>
            <p className="text-xs text-slate-500 font-medium">{userEmail}</p>

            <div className="mt-4 inline-flex items-center gap-1.5 bg-[#E0F780] text-slate-900 px-3 py-1 rounded-full text-xs font-bold capitalize">
              <ShieldCheck className="w-3.5 h-3.5" />
              Active {userRole}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-gray-100 pb-3">Account & Academic Details</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-slate-400 font-medium">User ID</span>
                <span className="font-bold text-slate-800 font-mono">{userId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-slate-400 font-medium">Role</span>
                <span className="font-bold text-slate-800 capitalize">{userRole}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400 font-medium">Department</span>
                <span className="font-bold text-slate-800">{userDepartment}</span>
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
                  className="px-5 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:bg-slate-800 transition cursor-pointer"
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