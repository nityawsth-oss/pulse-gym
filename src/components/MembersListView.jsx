import React, { useState } from 'react';
import { Plus, Search, ArrowUpRight, Users, Filter } from 'lucide-react';

const STATUS_COLORS = {
  Active:   { chip: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
  Frozen:   { chip: 'bg-blue-50 text-blue-600',       dot: 'bg-blue-400' },
  Expiring: { chip: 'bg-amber-50 text-amber-700',     dot: 'bg-amber-500' },
  Expired:  { chip: 'bg-red-50 text-red-600',         dot: 'bg-red-500' },
};

export default function MembersListView({ members, onSelectMember, onOpenAddMember }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredMembers = members.filter(m => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = m.name.toLowerCase().includes(q) ||
                          m.email.toLowerCase().includes(q) ||
                          m.phone.includes(q) ||
                          m.id.toLowerCase().includes(q);
    if (selectedStatus === 'All') return matchesSearch;
    return matchesSearch && m.status === selectedStatus;
  });

  const counts = {
    All: members.length,
    Active: members.filter(m => m.status === 'Active').length,
    Frozen: members.filter(m => m.status === 'Frozen').length,
    Expiring: members.filter(m => m.status === 'Expiring').length,
    Expired: members.filter(m => m.status === 'Expired').length,
  };

  return (
    <div className="space-y-5">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#14110B] tracking-tight">Member Management</h2>
          <p className="text-xs text-[#7A7367] mt-0.5">
            {members.length} total members · {counts.Active} active
          </p>
        </div>
        <button
          onClick={onOpenAddMember}
          className="figma-btn-primary flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Member</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="figma-card overflow-hidden">
        
        {/* Filters */}
        <div className="p-4 border-b border-[#ECE7DC] flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          <div className="flex items-center gap-1 p-1 bg-[#F8F5EF] rounded-xl border border-[#ECE7DC]">
            {['All', 'Active', 'Frozen', 'Expiring', 'Expired'].map(status => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                  selectedStatus === status
                    ? 'bg-white text-[#14110B] shadow-sm border border-[#ECE7DC]'
                    : 'text-[#7A7367] hover:text-[#14110B]'
                }`}
              >
                {status}
                <span className={`text-[10px] font-semibold ml-0.5 ${
                  selectedStatus === status ? 'text-[#D9A441]' : 'text-[#B9B1A0]'
                }`}>
                  {counts[status]}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-60">
            <Search className="w-3.5 h-3.5 text-[#B9B1A0] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name, ID, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-lg bg-[#F8F5EF] border border-[#ECE7DC] text-xs text-[#14110B] placeholder-[#B9B1A0] focus:outline-none focus:border-[#D9A441]"
            />
          </div>
        </div>

        {/* Members Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#FAFAF8]">
                <th className="gms-th">Member</th>
                <th className="gms-th">Contact</th>
                <th className="gms-th">Plan</th>
                <th className="gms-th">Trainer</th>
                <th className="gms-th">Expiry</th>
                <th className="gms-th">Status</th>
                <th className="gms-th text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((m) => {
                const sc = STATUS_COLORS[m.status] || STATUS_COLORS.Active;
                return (
                  <tr 
                    key={m.id} 
                    onClick={() => onSelectMember(m)}
                    className="hover:bg-[#FDFCFA] transition-colors cursor-pointer"
                  >
                    <td className="gms-td">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#F8F5EF] border border-[#ECE7DC] flex items-center justify-center font-semibold text-sm text-[#D9A441] flex-shrink-0">
                          {m.name[0]}
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-[#14110B] block">{m.name}</span>
                          <span className="text-[11px] text-[#B9B1A0]">{m.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="gms-td">
                      <div className="text-xs text-[#4A453D]">{m.email}</div>
                      <div className="text-[11px] text-[#7A7367]">{m.phone}</div>
                    </td>

                    <td className="gms-td">
                      <span className="text-xs font-semibold text-[#D9A441]">{m.planName}</span>
                    </td>

                    <td className="gms-td">
                      <span className="text-xs text-[#4A453D]">{m.trainerAssigned || '—'}</span>
                    </td>

                    <td className="gms-td">
                      <span className="text-xs text-[#4A453D]">{m.expiryDate}</span>
                    </td>

                    <td className="gms-td">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${sc.chip}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        {m.status}
                      </span>
                    </td>

                    <td className="gms-td text-right">
                      <button
                        onClick={(e) => { e.stopPropagation(); onSelectMember(m); }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F8F5EF] hover:bg-[#ECE7DC] text-xs text-[#14110B] font-medium transition-colors border border-[#ECE7DC]"
                      >
                        <span>View</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-[#7A7367]">
                    No members match your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-[#ECE7DC] flex items-center justify-between">
          <span className="text-xs text-[#7A7367]">
            Showing {filteredMembers.length} of {members.length} members
          </span>
          <div className="flex items-center gap-2 text-xs text-[#7A7367]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Active: {counts.Active}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Expiring: {counts.Expiring}</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Expired: {counts.Expired}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
