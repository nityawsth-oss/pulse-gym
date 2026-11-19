import React, { useState } from 'react';
import { 
  ArrowLeft, User, CreditCard, Receipt, CalendarDays,
  Phone, Mail, MapPin, PauseCircle, PlayCircle, XCircle,
  Download, CheckCircle2, QrCode, Heart, Activity
} from 'lucide-react';

const STATUS_CHIP = {
  Active:    'bg-emerald-50 text-emerald-700',
  Frozen:    'bg-blue-50 text-blue-600',
  Expiring:  'bg-amber-50 text-amber-700',
  Expired:   'bg-red-50 text-red-600',
  Cancelled: 'bg-red-50 text-red-600',
};

const TABS = [
  { id: 'overview',    label: 'Personal Info',      icon: User },
  { id: 'membership', label: 'Membership',           icon: CreditCard },
  { id: 'payments',   label: 'Payment History',      icon: Receipt },
  { id: 'attendance', label: 'Attendance',           icon: CalendarDays },
];

export default function MemberProfileView({ member, onBack, onUpdateStatus }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [confirmModal, setConfirmModal] = useState(null);

  if (!member) return null;

  const handleStatusChange = (newStatus) => {
    onUpdateStatus(member.id, newStatus);
    setConfirmModal(null);
  };

  const initials = member.name.split(' ').map(n => n[0]).join('').slice(0,2);

  return (
    <div className="space-y-5">
      
      {/* Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-[#7A7367] hover:text-[#14110B] transition-colors w-fit font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Members</span>
        </button>

        <div className="flex items-center gap-2">
          {member.status === 'Active' ? (
            <button
              onClick={() => setConfirmModal('freeze')}
              className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-semibold transition-colors"
            >
              Freeze Account
            </button>
          ) : (
            <button
              onClick={() => handleStatusChange('Active')}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold transition-colors"
            >
              Resume Active
            </button>
          )}
          <button
            onClick={() => setConfirmModal('cancel')}
            className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-semibold transition-colors"
          >
            Cancel Plan
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-[#F8F5EF] hover:bg-[#ECE7DC] text-[#14110B] border border-[#ECE7DC] text-xs font-semibold transition-colors flex items-center gap-1">
            <Download className="w-3 h-3" />
            Export
          </button>
        </div>
      </div>

      {/* Member Header Card */}
      <div className="figma-card overflow-hidden">
        {/* Top section with dark bg */}
        <div className="bg-gradient-to-r from-[#14110B] to-[#2B2110] p-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#D9A441]/20 border border-[#D9A441]/30 flex items-center justify-center font-bold text-xl text-[#D9A441] flex-shrink-0">
                {initials}
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-lg font-bold text-white tracking-tight">{member.name}</h1>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${STATUS_CHIP[member.status] || 'bg-[#F8F5EF] text-[#14110B]'}`}>
                    {member.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#A39C8E] mt-1 flex-wrap">
                  <span>{member.id}</span>
                  <span>·</span>
                  <span className="text-[#D9A441] font-semibold">{member.planName}</span>
                  {member.trainerAssigned && (<><span>·</span><span>Coach: {member.trainerAssigned}</span></>)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-center">
              <div>
                <span className="text-[11px] text-[#A39C8E] block">Attendance</span>
                <span className="text-lg font-bold text-white">{member.attendanceCount || 42}</span>
                <span className="text-[10px] text-[#A39C8E] block">Days</span>
              </div>
              <div>
                <span className="text-[11px] text-[#A39C8E] block">Total Spent</span>
                <span className="text-lg font-bold text-[#D9A441]">{member.totalSpent || '₹8,970'}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#A39C8E] block">Expiry</span>
                <span className="text-sm font-semibold text-white">{member.expiryDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-0.5 px-4 pt-3 pb-0 overflow-x-auto border-b border-[#ECE7DC]">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-xs font-semibold transition-colors whitespace-nowrap border-b-2 ${
                  isTabActive
                    ? 'text-[#D9A441] border-[#D9A441] bg-[#FEF3E0]'
                    : 'text-[#7A7367] border-transparent hover:text-[#14110B] hover:bg-[#F8F5EF]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Panels */}
        <div className="p-5">
          
          {/* OVERVIEW Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#14110B]">Personal Information</h3>
                <div className="space-y-3">
                  {[
                    { icon: Mail,    label: 'Email',    value: member.email },
                    { icon: Phone,   label: 'Phone',    value: member.phone },
                    { icon: MapPin,  label: 'Address',  value: member.address || '42 Skyline Blvd, Apt 4B' },
                  ].map((row) => {
                    const Icon = row.icon;
                    return (
                      <div key={row.label} className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F5EF] border border-[#ECE7DC]">
                        <Icon className="w-4 h-4 text-[#D9A441] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-[11px] text-[#7A7367] block">{row.label}</span>
                          <span className="text-xs font-semibold text-[#14110B]">{row.value}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#14110B]">Health & Fitness</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Blood Group', value: member.bloodGroup || 'O+' },
                    { label: 'Height',      value: member.height || '178 cm' },
                    { label: 'Weight',      value: member.weight || '76 kg' },
                    { label: 'Level',       value: member.experienceLevel || 'Intermediate' },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-xl bg-[#F8F5EF] border border-[#ECE7DC]">
                      <span className="text-[11px] text-[#7A7367] block">{item.label}</span>
                      <span className="text-xs font-bold text-[#14110B] mt-0.5 block">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-[#F8F5EF] border border-[#ECE7DC]">
                  <span className="text-[11px] text-[#7A7367] block mb-1">Fitness Goal</span>
                  <span className="text-xs font-semibold text-[#D9A441]">{member.fitnessGoal || 'Hypertrophy & Strength'}</span>
                </div>
              </div>
            </div>
          )}

          {/* MEMBERSHIP Tab */}
          {activeTab === 'membership' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#14110B]">Subscription Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Current Plan',    value: member.planName,       color: 'text-[#D9A441]' },
                  { label: 'Start Date',      value: member.joinedDate,     color: 'text-[#14110B]' },
                  { label: 'Next Renewal',    value: member.expiryDate,     color: 'text-[#14110B]' },
                  { label: 'Auto-Renew',      value: 'Active',              color: 'text-emerald-700' },
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-xl bg-[#F8F5EF] border border-[#ECE7DC]">
                    <span className="text-[11px] text-[#7A7367] block">{item.label}</span>
                    <span className={`text-xs font-bold mt-1 block ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#ECE7DC]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#14110B]">QR Access Pass</span>
                  <QrCode className="w-4 h-4 text-[#D9A441]" />
                </div>
                <div className="w-24 h-24 bg-white border border-[#ECE7DC] rounded-xl flex items-center justify-center">
                  <QrCode className="w-14 h-14 text-[#14110B]" />
                </div>
                <p className="text-[11px] text-[#7A7367] mt-2">Member ID: {member.id}</p>
              </div>
            </div>
          )}

          {/* PAYMENTS Tab */}
          {activeTab === 'payments' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#14110B]">Payment History</h3>
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="gms-th">Invoice</th>
                    <th className="gms-th">Date</th>
                    <th className="gms-th">Plan</th>
                    <th className="gms-th">Amount</th>
                    <th className="gms-th">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'INV-9021', date: '10 Nov 2026', plan: member.planName, amount: '₹1,499', status: 'Paid' },
                    { id: 'INV-8714', date: '10 Oct 2026', plan: member.planName, amount: '₹1,499', status: 'Paid' },
                    { id: 'INV-7801', date: '10 Sep 2026', plan: member.planName, amount: '₹1,499', status: 'Paid' },
                  ].map((inv) => (
                    <tr key={inv.id} className="hover:bg-[#FDFCFA]">
                      <td className="gms-td font-mono text-xs text-[#D9A441]">{inv.id}</td>
                      <td className="gms-td text-xs">{inv.date}</td>
                      <td className="gms-td text-xs">{inv.plan}</td>
                      <td className="gms-td text-xs font-bold">{inv.amount}</td>
                      <td className="gms-td">
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{inv.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ATTENDANCE Tab */}
          {activeTab === 'attendance' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#14110B]">Recent Attendance</h3>
              <div className="space-y-2">
                {[
                  { date: 'Today, 8:14 AM',       gate: 'Turnstile A', status: 'Approved' },
                  { date: 'Yesterday, 6:30 PM',   gate: 'Turnstile B', status: 'Approved' },
                  { date: '16 Nov, 7:10 AM',       gate: 'Turnstile A', status: 'Approved' },
                  { date: '15 Nov, 5:50 PM',       gate: 'Turnstile A', status: 'Approved' },
                  { date: '14 Nov, 8:00 AM',       gate: 'Turnstile B', status: 'Approved' },
                ].map((log, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#F8F5EF] border border-[#ECE7DC] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <div>
                        <span className="text-xs font-semibold text-[#14110B] block">{log.date}</span>
                        <span className="text-[11px] text-[#7A7367]">{log.gate}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{log.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Confirm Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 border border-[#ECE7DC] shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-[#14110B]">
              {confirmModal === 'freeze' ? 'Freeze Account?' : 'Cancel Membership?'}
            </h3>
            <p className="text-xs text-[#7A7367]">
              {confirmModal === 'freeze'
                ? `Freezing will suspend ${member.name}'s access and pause automated renewals.`
                : `This will cancel ${member.name}'s active membership. This cannot be undone easily.`}
            </p>
            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => setConfirmModal(null)}
                className="figma-btn-secondary !text-xs !h-9 !px-3"
              >
                Dismiss
              </button>
              <button
                onClick={() => handleStatusChange(confirmModal === 'freeze' ? 'Frozen' : 'Cancelled')}
                className="h-9 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
