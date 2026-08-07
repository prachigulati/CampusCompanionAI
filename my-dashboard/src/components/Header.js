import React from 'react';
import { Search, Bell, ChevronDown, PanelLeft } from 'lucide-react';

export default function Header({ isSidebarOpen, setIsSidebarOpen, setActiveNav }) {
  // Retrieve the logged-in user from localStorage, falling back to 'Prachi' if not found
  const savedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const userName = savedUser.name || 'Prachi';

  // Generate user initials for the avatar badge
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
    <header className="flex items-center justify-between mb-8 w-full">
      <div className="flex items-center gap-4">
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-white border border-gray-200 rounded-xl shadow-sm text-slate-600 hover:text-slate-900 hover:bg-gray-50 transition"
            title="Expand sidebar"
          >
            <PanelLeft className="w-5 h-5" />
          </button>
        )}

        <div className="relative w-80 md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-white border border-gray-200 rounded-full py-2.5 pl-10 pr-12 text-sm text-slate-700 focus:outline-none shadow-sm"
          />
          <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200 font-mono">⌘K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2.5 bg-white rounded-full border border-gray-200 shadow-sm">
          <Bell className="w-4 h-4 text-slate-600" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">4</span>
        </button>

        <div 
          onClick={() => setActiveNav('profile')}
          className="flex items-center gap-3 bg-white p-1.5 pl-2 pr-3 rounded-full border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition"
        >
          {/* Dynamic Initials Avatar */}
          <div className="w-7 h-7 bg-[#E0F780] text-slate-900 rounded-full flex items-center justify-center font-bold text-xs shadow-2xs">
            {initials}
          </div>
          <span className="text-xs font-semibold text-slate-800">{userName}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
    </header>
  );
}