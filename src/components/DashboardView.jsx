import React from 'react';
import { 
  Users, TrendingUp, CreditCard, AlertCircle, QrCode, UserPlus,
  Calendar, CheckCircle2, XCircle, ArrowUpRight, ArrowRight, Zap
} from 'lucide-react';

export default function DashboardView({ 
  members, plans, checkins, payments,
  onOpenAddMember, onOpenCheckIn, onOpenRecordPayment, onOpenAddLead, onNavigateTab
}) {
  const activeMembersCount = members.filter(m => m.status === 'Active').length;
  const expiringCount = members.filter(m => m.status === 'Expiring').length;

  const STAT_CARDS = [
    {
      label: 'Total Active Members',
      value: '1,196',
      sub: '+12% this month',
      subColor: 'text-emerald-600',
      icon: Users,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      label: "Today's Check-ins",
      value: '236',
      sub: 'Peak: 6:30 PM',
      subColor: 'text-[#7A7367]',
      icon: QrCode,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      label: 'Monthly Revenue (MRR)',
      value: '₹8,42,300',
      sub: '+8.6% vs last month',
      subColor: 'text-emerald-600',
      icon: CreditCard,
      iconBg: 'bg-[#FEF3E0]',
      iconColor: 'text-[#D9A441]'
    },
    {
      label: 'Expiring Renewals',
      value: '94',
      sub: 'Due in next 7 days',
      subColor: 'text-amber-600',
      icon: AlertCircle,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#14110B] to-[#2B2110] rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg shadow-black/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#D9A441] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold text-[#D9A441] uppercase tracking-wider">
              Iron District Fitness — Indiranagar
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Good afternoon, Aarav 👋
          </h2>
          <p className="text-xs sm:text-sm text-[#A39C8E] mt-0.5">
            Wednesday, 18 Nov 2026 • Here's your branch operational overview
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onOpenAddMember}
            className="figma-btn-primary flex items-center gap-1.5 !text-xs !h-9 flex-1 sm:flex-none justify-center"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Member</span>
          </button>

          <button
            onClick={onOpenCheckIn}
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold transition-colors flex-1 sm:flex-none justify-center"
          >
            <QrCode className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>Check-in Scanner</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards (Responsive grid: 2 cols on mobile, 4 on desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="figma-card p-3.5 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] sm:text-xs font-medium text-[#7A7367] truncate">{card.label}</span>
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${card.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${card.iconColor}`} />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[#14110B] tracking-tight">
                {card.value}
              </div>
              <div className={`text-[10px] sm:text-[11px] mt-1 font-semibold ${card.subColor} truncate`}>
                {card.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Live Check-ins + Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        
        {/* Live Attendance Log */}
        <div className="lg:col-span-2 figma-card p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-xs sm:text-sm font-bold text-[#14110B] tracking-tight">
                Live Attendance & Turnstile Log
              </h3>
            </div>
            <button
              onClick={onOpenCheckIn}
              className="text-xs font-bold text-[#D9A441] hover:underline flex items-center gap-1"
            >
              <span>Scan QR</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {checkins.slice(0, 6).map((chk) => (
              <div
                key={chk.id}
                className="p-3 rounded-xl bg-[#F8F5EF] border border-[#ECE7DC] flex items-center justify-between gap-2 hover:border-[#DDD6C7] transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {chk.status.includes('Approved') ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-[#14110B] block truncate">
                      {chk.memberName}
                    </span>
                    <span className="text-[11px] text-[#7A7367] block truncate">
                      {chk.plan} • {chk.gate}
                    </span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    chk.status.includes('Approved')
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-red-50 text-red-600'
                  }`}>
                    {chk.status.includes('Approved') ? 'Approved' : 'Denied'}
                  </span>
                  <span className="text-[10px] text-[#A39C8E] block mt-0.5">{chk.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Plans Summary */}
        <div className="figma-card p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs sm:text-sm font-bold text-[#14110B] tracking-tight">
                Active Membership Plans
              </h3>
              <span className="text-[11px] font-bold text-[#D9A441] bg-[#FEF3E0] px-2 py-0.5 rounded-full">
                5 Active
              </span>
            </div>

            <div className="space-y-2">
              {plans.slice(0, 5).map((p) => (
                <div
                  key={p.id}
                  className="p-2.5 rounded-xl bg-[#F8F5EF] border border-[#ECE7DC] flex items-center justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-xs font-bold text-[#14110B] block truncate">{p.name}</span>
                    <span className="text-[10px] text-[#7A7367]">{p.membersCount || '—'} members</span>
                  </div>
                  <span className="text-xs font-bold text-[#14110B] whitespace-nowrap">
                    ₹{(p.price || 0).toLocaleString('en-IN')}
                    <span className="text-[10px] font-normal text-[#7A7367]">/{p.interval[0]}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('plans')}
            className="mt-4 w-full py-2 rounded-xl bg-[#F8F5EF] hover:bg-[#ECE7DC] text-xs font-bold text-[#D9A441] border border-[#ECE7DC] transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Manage All 5 Plans</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
        {[
          { label: 'Add Member', icon: UserPlus, color: 'text-[#D9A441]', bg: 'bg-[#FEF3E0]', action: onOpenAddMember },
          { label: 'QR Scanner', icon: QrCode, color: 'text-emerald-600', bg: 'bg-emerald-50', action: onOpenCheckIn },
          { label: 'Record Payment', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50', action: onOpenRecordPayment },
          { label: 'Add Lead', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50', action: onOpenAddLead },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={item.action}
              className="figma-card p-3 flex items-center gap-2.5 sm:gap-3 hover:border-[#DDD6C7] hover:shadow-sm transition-all text-left w-full"
            >
              <div className={`w-8 h-8 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <span className="text-xs font-bold text-[#14110B] truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
