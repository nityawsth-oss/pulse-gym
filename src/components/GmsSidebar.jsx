import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  UserCheck, 
  CalendarDays, 
  Receipt, 
  Target, 
  BarChart3, 
  Crown,
  ChevronDown,
  LogOut,
  X
} from 'lucide-react';

export default function GmsSidebar({ 
  currentTab, 
  setCurrentTab, 
  counts, 
  onLogout,
  user,
  isOpen = false,
  onClose
}) {
  const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard',           icon: LayoutDashboard },
    { id: 'members',   label: 'Members',             icon: Users,       badge: counts.members },
    { id: 'plans',     label: 'Membership Plans',    icon: CreditCard,  badge: '5' },
    { id: 'staff',     label: 'Staff & Trainers',    icon: UserCheck,   badge: counts.staff },
    { id: 'classes',   label: 'Classes & Attendance',icon: CalendarDays },
    { id: 'payments',  label: 'Payments & Invoices', icon: Receipt },
    { id: 'leads',     label: 'Leads & Trials',      icon: Target,      badge: counts.leads },
    { id: 'reports',   label: 'Reports & Analytics', icon: BarChart3 },
  ];

  const initials = (user?.name || 'AU').split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();

  const handleSelectTab = (tabId) => {
    setCurrentTab(tabId);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Drawer */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#14110B] border-r border-[#2A2315] flex flex-col justify-between select-none
        transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:w-60 md:h-screen md:sticky md:top-0 md:flex-shrink-0 md:z-30
        ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* TOP SECTION */}
        <div className="flex flex-col min-h-0">
          
          {/* Logo / Brand Header */}
          <div className="px-5 py-4 border-b border-[#2A2315] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#D9A441]/15 border border-[#D9A441]/30 flex items-center justify-center">
                <Crown className="w-4 h-4 text-[#D9A441]" />
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1">
                  Pulse <span className="text-[#D9A441]">GMS</span>
                </span>
                <span className="text-[10px] text-[#7A7055] block -mt-0.5 font-medium">
                  Gym Management System
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="md:hidden p-1.5 rounded-lg text-[#7A7055] hover:text-white hover:bg-[#1E1A12]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Branch Selector */}
          <div className="p-3">
            <div className="px-3 py-2 rounded-lg bg-[#1E1A12] border border-[#2A2315] flex items-center justify-between cursor-pointer hover:border-[#3A3220] transition-colors group">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-white truncate max-w-[130px] block">Iron District Fitness</span>
                  <span className="text-[10px] text-[#7A7055]">Indiranagar, Bengaluru</span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#7A7055] group-hover:text-[#D9A441] transition-colors" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="px-2 pb-2 space-y-0.5 flex-1 overflow-y-auto">
            <div className="px-3 py-1.5 text-[10px] font-semibold text-[#5A5540] uppercase tracking-widest mt-1">
              Menu
            </div>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                    isActive
                      ? 'bg-[#2A2315] text-white border-l-2 border-[#D9A441] rounded-l-none pl-[10px]'
                      : 'text-[#9A9075] hover:text-white hover:bg-[#1E1A12]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#D9A441]' : 'text-[#6A6450]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                      isActive 
                        ? 'bg-[#D9A441] text-[#14110B]' 
                        : 'bg-[#1E1A12] text-[#7A7055]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM SECTION: User Profile + Logout */}
        <div className="border-t border-[#2A2315] p-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#D9A441]/20 border border-[#D9A441]/30 flex items-center justify-center font-bold text-xs text-[#D9A441] flex-shrink-0">
              {initials}
            </div>
            <div className="flex flex-col text-left min-w-0 flex-1">
              <span className="text-xs font-semibold text-white leading-tight truncate">{user?.name || 'Aarav Mehta'}</span>
              <span className="text-[10px] text-[#7A7055] truncate">{user?.role || 'Owner'}</span>
            </div>
            <button
              onClick={onLogout}
              title="Sign out of Pulse GMS"
              className="p-1.5 rounded-lg text-[#7A7055] hover:text-red-400 hover:bg-[#1E1A12] transition-colors flex-shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </aside>
    </>
  );
}
