import React, { useState } from 'react';
import { UserCheck, Plus, Phone, Mail, Clock, Users, Star, Check, X, Award, ChevronRight } from 'lucide-react';
import { INITIAL_MEMBERS } from '../lib/supabase';

export default function StaffView({ staff, onAddStaff, members = INITIAL_MEMBERS }) {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [assignModalTrainer, setAssignModalTrainer] = useState(null);
  const [selectedMemberToAssign, setSelectedMemberToAssign] = useState('');

  const [inviteForm, setInviteForm] = useState({
    name: '',
    role: 'CrossFit Trainer',
    specialty: 'Olympic Barbell & Mobility',
    email: '',
    phone: '',
    workingHours: '06:00 AM – 02:00 PM'
  });

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    onAddStaff({
      ...inviteForm,
      assignedMembers: 0,
      status: 'On Duty',
      rating: '5.0',
      avatar: null
    });
    setInviteModalOpen(false);
    setInviteForm({ name: '', role: 'CrossFit Trainer', specialty: '', email: '', phone: '', workingHours: '06:00 AM – 02:00 PM' });
  };

  const ROLE_COLORS = {
    'Head Trainer': 'bg-[#FEF3E0] text-[#D9A441]',
    'CrossFit Trainer': 'bg-blue-50 text-blue-700',
    'Yoga Instructor': 'bg-purple-50 text-purple-700',
    'Front Desk': 'bg-emerald-50 text-emerald-700',
    'Manager': 'bg-[#FEF3E0] text-[#D9A441]',
  };

  return (
    <div className="space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold text-[#D9A441] bg-[#FEF3E0] px-2 py-0.5 rounded-full">
              {staff.length} Staff on Roster
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#14110B] tracking-tight">Staff & Trainer Management</h2>
        </div>
        <button
          onClick={() => setInviteModalOpen(true)}
          className="figma-btn-primary flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Invite / Add Staff</span>
        </button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staff.map((coach) => {
          const initials = coach.name.split(' ').map(n => n[0]).join('').slice(0,2);
          return (
            <div key={coach.id || coach.name} className="figma-card p-5 hover:shadow-md transition-shadow">
              {/* Top Row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F8F5EF] border border-[#ECE7DC] flex items-center justify-center font-bold text-base text-[#D9A441] flex-shrink-0">
                    {coach.avatar ? (
                      <img src={coach.avatar} alt={coach.name} className="w-12 h-12 rounded-xl object-cover" />
                    ) : initials}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#14110B] leading-tight">{coach.name}</h3>
                    <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${
                      ROLE_COLORS[coach.role] || 'bg-[#F8F5EF] text-[#7A7367]'
                    }`}>
                      {coach.role}
                    </span>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  coach.status === 'On Duty'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700'
                }`}>
                  {coach.status}
                </span>
              </div>

              {/* Specialty */}
              {coach.specialty && (
                <p className="text-xs text-[#7A7367] mb-4 leading-relaxed">{coach.specialty}</p>
              )}

              {/* Meta Info */}
              <div className="space-y-2 border-t border-[#ECE7DC] pt-3">
                <div className="flex items-center gap-2 text-xs text-[#4A453D]">
                  <Clock className="w-3.5 h-3.5 text-[#D9A441] flex-shrink-0" />
                  <span>{coach.workingHours}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#4A453D]">
                  <Users className="w-3.5 h-3.5 text-[#7A7367] flex-shrink-0" />
                  <span><strong className="text-[#14110B]">{coach.assignedMembers}</strong> members assigned</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#4A453D]">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 flex-shrink-0" />
                  <span>Rating: <strong className="text-[#14110B]">{coach.rating}</strong> / 5.0</span>
                </div>
                {coach.email && (
                  <div className="flex items-center gap-2 text-xs text-[#4A453D]">
                    <Mail className="w-3.5 h-3.5 text-[#7A7367] flex-shrink-0" />
                    <span className="truncate">{coach.email}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-4 pt-3 border-t border-[#ECE7DC] flex gap-2">
                <button
                  onClick={() => setAssignModalTrainer(coach)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#F8F5EF] hover:bg-[#ECE7DC] border border-[#ECE7DC] text-xs font-semibold text-[#14110B] transition-colors"
                >
                  <Users className="w-3 h-3" />
                  Assign Member
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#FEF3E0] hover:bg-[#FDEFC5] border border-[#F5D78C] text-xs font-semibold text-[#D9A441] transition-colors">
                  <Award className="w-3 h-3" />
                  View Profile
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Invite Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#ECE7DC] shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#ECE7DC]">
              <h3 className="text-sm font-bold text-[#14110B]">Invite / Add New Staff</h3>
              <button onClick={() => setInviteModalOpen(false)} className="p-1.5 rounded-lg hover:bg-[#F8F5EF] text-[#7A7367]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#14110B] mb-1">Full Name *</label>
                <input type="text" required value={inviteForm.name}
                  onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                  placeholder="e.g. Priya Sharma" className="gms-input" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Role *</label>
                  <select value={inviteForm.role}
                    onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                    className="gms-input">
                    <option>Head Trainer</option>
                    <option>CrossFit Trainer</option>
                    <option>Yoga Instructor</option>
                    <option>Front Desk</option>
                    <option>Manager</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Shift Hours</label>
                  <input type="text" value={inviteForm.workingHours}
                    onChange={(e) => setInviteForm({ ...inviteForm, workingHours: e.target.value })}
                    className="gms-input" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14110B] mb-1">Specialty</label>
                <input type="text" value={inviteForm.specialty}
                  onChange={(e) => setInviteForm({ ...inviteForm, specialty: e.target.value })}
                  placeholder="e.g. Hypertrophy & Barbell" className="gms-input" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Work Email *</label>
                  <input type="email" required value={inviteForm.email}
                    onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                    placeholder="trainer@gym.in" className="gms-input" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Phone</label>
                  <input type="text" value={inviteForm.phone}
                    onChange={(e) => setInviteForm({ ...inviteForm, phone: e.target.value })}
                    placeholder="+91 98765 43210" className="gms-input" />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#ECE7DC]">
                <button type="button" onClick={() => setInviteModalOpen(false)} className="figma-btn-secondary !text-xs !h-9 !px-4">Cancel</button>
                <button type="submit" className="figma-btn-primary !text-xs !h-9 !px-5">Send Invite</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {assignModalTrainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 border border-[#ECE7DC] shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#14110B]">Assign Member to {assignModalTrainer.name}</h3>
              <button onClick={() => setAssignModalTrainer(null)} className="p-1 rounded-lg hover:bg-[#F8F5EF] text-[#7A7367]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#7A7367] mb-4">
              The selected member will receive training splits and 1-on-1 check-ins from {assignModalTrainer.name}.
            </p>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#14110B] mb-1">Select Member</label>
              <select
                value={selectedMemberToAssign}
                onChange={(e) => setSelectedMemberToAssign(e.target.value)}
                className="gms-input"
              >
                <option value="">— Choose Member —</option>
                {members.map(m => (
                  <option key={m.id} value={m.name}>{m.name} ({m.planName})</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setAssignModalTrainer(null)} className="figma-btn-secondary !text-xs !h-9 !px-3">Cancel</button>
              <button
                onClick={() => { alert(`Assigned ${selectedMemberToAssign || 'member'} to ${assignModalTrainer.name}!`); setAssignModalTrainer(null); }}
                className="figma-btn-primary !text-xs !h-9 !px-4"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
