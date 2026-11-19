import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Plus, 
  QrCode, 
  UserPlus, 
  CreditCard, 
  Calendar,
  ChevronDown,
  Menu
} from 'lucide-react';

export default function GmsHeader({ 
  onOpenAddMember, 
  onOpenCheckIn, 
  onOpenRecordPayment, 
  onOpenAddLead, 
  activeTabTitle,
  onToggleMobileMenu 
}) {
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);

  return (
    <header className="h-14 sm:h-16 bg-white border-b border-[#ECE7DC] px-3.5 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      
      {/* Left: Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-xl text-[#14110B] hover:bg-[#F8F5EF] border border-[#ECE7DC] transition-colors flex-shrink-0"
          title="Open Navigation Menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        <h1 className="text-xs sm:text-sm font-bold text-[#14110B] tracking-tight truncate">
          {activeTabTitle}
        </h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
        
        {/* Search (Desktop only) */}
        <div className="relative hidden lg:block w-48 xl:w-56">
          <Search className="w-3.5 h-3.5 text-[#B9B1A0] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search member, phone..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#F8F5EF] border border-[#ECE7DC] text-xs text-[#14110B] placeholder-[#B9B1A0] focus:outline-none focus:border-[#D9A441] transition-colors"
          />
        </div>

        {/* QR Scan Button */}
        <button
          onClick={onOpenCheckIn}
          className="figma-btn-secondary flex items-center gap-1.5 !text-xs !h-8 sm:!h-9 !px-2 sm:!px-3"
          title="QR Check-in Scanner"
        >
          <QrCode className="w-3.5 h-3.5 text-[#D9A441]" />
          <span className="hidden xs:inline sm:inline">QR Check-in</span>
        </button>

        {/* Quick Action Button */}
        <div className="relative">
          <button
            onClick={() => setQuickMenuOpen(!quickMenuOpen)}
            className="figma-btn-primary flex items-center gap-1 !text-xs !h-8 sm:!h-9 !px-2.5 sm:!px-3.5 font-semibold"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Action</span>
            <ChevronDown className="w-3 h-3 ml-0.5" />
          </button>

          {quickMenuOpen && (
            <div 
              onMouseLeave={() => setQuickMenuOpen(false)}
              className="absolute right-0 mt-1.5 w-48 sm:w-52 rounded-xl bg-white border border-[#ECE7DC] shadow-xl p-1.5 z-50 space-y-0.5"
            >
              <button
                onClick={() => { onOpenAddMember(); setQuickMenuOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#14110B] hover:bg-[#F8F5EF] transition-colors text-left"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#D9A441]" />
                <span>Add Member (4 Steps)</span>
              </button>

              <button
                onClick={() => { onOpenRecordPayment(); setQuickMenuOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#14110B] hover:bg-[#F8F5EF] transition-colors text-left"
              >
                <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                <span>Record Payment</span>
              </button>

              <button
                onClick={() => { onOpenAddLead(); setQuickMenuOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#14110B] hover:bg-[#F8F5EF] transition-colors text-left"
              >
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>Book Free Trial</span>
              </button>
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <button className="p-2 rounded-lg bg-[#F8F5EF] border border-[#ECE7DC] text-[#7A7367] hover:text-[#14110B] transition-colors relative">
          <Bell className="w-3.5 h-3.5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#D9A441]" />
        </button>

      </div>

    </header>
  );
}
