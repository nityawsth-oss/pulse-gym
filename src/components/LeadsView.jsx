import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  Calendar, 
  Phone, 
  Mail, 
  UserCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  X,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  UserPlus
} from 'lucide-react';

export default function LeadsView({ leads, onAddLead, onUpdateLeadStatus, onConvertToMember }) {
  const [addLeadModalOpen, setAddLeadModalOpen] = useState(false);
  const [scheduleTrialLead, setScheduleTrialLead] = useState(null);
  const [trialTime, setTrialTime] = useState('Tomorrow, 10:00 AM');

  // Form State
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    source: 'Instagram Ad',
    interestedPlan: 'Annual Elite Pass'
  });

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    onAddLead({
      ...leadForm,
      trialDate: 'Pending Schedule',
      status: 'New'
    });
    setAddLeadModalOpen(false);
    setLeadForm({
      name: '',
      phone: '',
      email: '',
      source: 'Instagram Ad',
      interestedPlan: 'Annual Elite Pass'
    });
  };

  const handleConfirmTrialSchedule = () => {
    if (scheduleTrialLead) {
      onUpdateLeadStatus(scheduleTrialLead.id, 'Trial Booked');
      scheduleTrialLead.trialDate = trialTime;
      setScheduleTrialLead(null);
    }
  };

  const STATUS_CHIPS = {
    'Trial Booked': 'bg-blue-50 text-blue-700 border-blue-200',
    'Ready to Join': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Follow-up': 'bg-amber-50 text-amber-700 border-amber-200',
    'New': 'bg-purple-50 text-purple-700 border-purple-200',
    'Converted': 'bg-emerald-100 text-emerald-800 border-emerald-300'
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold text-[#D9A441] bg-[#FEF3E0] px-2.5 py-0.5 rounded-full border border-[#D9A441]/30">
              {leads.length} Active Prospects in Funnel
            </span>
            <span className="text-xs text-[#7A7367]">Conversion Pipeline</span>
          </div>
          <h2 className="text-xl font-bold text-[#14110B] tracking-tight">
            Leads & Free Trial Management
          </h2>
        </div>

        <button
          onClick={() => setAddLeadModalOpen(true)}
          className="figma-btn-primary !text-xs !h-9 !px-4 flex items-center gap-1.5 font-semibold"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Lead</span>
        </button>
      </div>

      {/* KPI Funnel Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="figma-card p-4">
          <span className="text-xs text-[#7A7367] font-medium">Total Inquiries</span>
          <div className="text-xl font-bold text-[#14110B] mt-1">{leads.length}</div>
          <span className="text-[11px] text-emerald-600 font-medium">Meta & Walk-in leads</span>
        </div>
        <div className="figma-card p-4">
          <span className="text-xs text-[#7A7367] font-medium">Trials Booked</span>
          <div className="text-xl font-bold text-[#14110B] mt-1">
            {leads.filter(l => l.status === 'Trial Booked').length}
          </div>
          <span className="text-[11px] text-blue-600 font-medium">Free workout session</span>
        </div>
        <div className="figma-card p-4">
          <span className="text-xs text-[#7A7367] font-medium">Ready to Join</span>
          <div className="text-xl font-bold text-amber-600 mt-1">
            {leads.filter(l => l.status === 'Ready to Join').length}
          </div>
          <span className="text-[11px] text-amber-600 font-medium">Follow-up due today</span>
        </div>
        <div className="figma-card p-4">
          <span className="text-xs text-[#7A7367] font-medium">Conversion Rate</span>
          <div className="text-xl font-bold text-emerald-600 mt-1">38.4%</div>
          <span className="text-[11px] text-emerald-600 font-medium">+4.2% vs last month</span>
        </div>
      </div>

      {/* Leads Table */}
      <div className="figma-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#FAFAF8]">
                <th className="gms-th">Prospect Name</th>
                <th className="gms-th">Contact Info</th>
                <th className="gms-th">Source</th>
                <th className="gms-th">Interested Plan</th>
                <th className="gms-th">Trial Session</th>
                <th className="gms-th">Status</th>
                <th className="gms-th text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-[#FDFCFA] transition-colors">
                  <td className="gms-td">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#F8F5EF] border border-[#ECE7DC] flex items-center justify-center font-bold text-xs text-[#D9A441]">
                        {lead.name[0]}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#14110B] block">{lead.name}</span>
                        <span className="text-[11px] text-[#A39C8E]">{lead.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="gms-td">
                    <div className="text-xs font-medium text-[#14110B]">{lead.phone}</div>
                    <div className="text-[11px] text-[#7A7367]">{lead.email}</div>
                  </td>

                  <td className="gms-td">
                    <span className="text-xs px-2 py-0.5 rounded-md bg-[#F8F5EF] border border-[#ECE7DC] text-[#4A453D]">
                      {lead.source}
                    </span>
                  </td>

                  <td className="gms-td">
                    <span className="text-xs font-semibold text-[#D9A441]">{lead.interestedPlan}</span>
                  </td>

                  <td className="gms-td">
                    <div className="flex items-center gap-1.5 text-xs text-[#4A453D]">
                      <Clock className="w-3.5 h-3.5 text-[#D9A441]" />
                      <span>{lead.trialDate}</span>
                    </div>
                  </td>

                  <td className="gms-td">
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${STATUS_CHIPS[lead.status] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                      {lead.status}
                    </span>
                  </td>

                  <td className="gms-td text-right">
                    <div className="flex items-center justify-end gap-2">
                      {lead.status !== 'Trial Booked' && lead.status !== 'Converted' && (
                        <button
                          onClick={() => setScheduleTrialLead(lead)}
                          className="px-2.5 py-1 rounded-lg bg-[#F8F5EF] hover:bg-[#ECE7DC] border border-[#ECE7DC] text-xs font-semibold text-[#14110B] transition-colors"
                        >
                          Book Trial
                        </button>
                      )}
                      
                      {lead.status !== 'Converted' ? (
                        <button
                          onClick={() => onConvertToMember(lead)}
                          className="px-2.5 py-1 rounded-lg bg-[#FEF3E0] hover:bg-[#FDEFC5] border border-[#F5D78C] text-xs font-semibold text-[#D9A441] transition-colors flex items-center gap-1"
                        >
                          <UserPlus className="w-3 h-3" />
                          <span>Convert</span>
                        </button>
                      ) : (
                        <span className="text-xs text-emerald-700 font-bold">Active Member</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Lead Modal */}
      {addLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 border border-[#ECE7DC] shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b border-[#ECE7DC] pb-3">
              <h3 className="text-base font-bold text-[#14110B]">Add New Prospective Lead</h3>
              <button onClick={() => setAddLeadModalOpen(false)} className="p-1 rounded-lg text-[#7A7367] hover:bg-[#F8F5EF]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#14110B] mb-1">Prospect Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sameer Kapoor"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  className="gms-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 11000"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    className="gms-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="sameer@example.com"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="gms-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Acquisition Source</label>
                  <select
                    value={leadForm.source}
                    onChange={(e) => setLeadForm({ ...leadForm, source: e.target.value })}
                    className="gms-input"
                  >
                    <option value="Instagram Ad">Instagram Ad</option>
                    <option value="Walk-in">Walk-in Inquiry</option>
                    <option value="Google Search">Google Search</option>
                    <option value="Friend Referral">Friend Referral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Target Plan</label>
                  <select
                    value={leadForm.interestedPlan}
                    onChange={(e) => setLeadForm({ ...leadForm, interestedPlan: e.target.value })}
                    className="gms-input"
                  >
                    <option value="Annual Elite Pass">Annual Elite Pass</option>
                    <option value="Monthly Strength & Cardio">Monthly Strength & Cardio</option>
                    <option value="Quarterly All-Access">Quarterly All-Access</option>
                    <option value="Student Flex Pass">Student Flex Pass</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#ECE7DC]">
                <button
                  type="button"
                  onClick={() => setAddLeadModalOpen(false)}
                  className="figma-btn-secondary !text-xs !h-9 !px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="figma-btn-primary !text-xs !h-9 !px-5 font-semibold"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Trial Modal */}
      {scheduleTrialLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 border border-[#ECE7DC] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#ECE7DC] pb-3">
              <h3 className="text-base font-bold text-[#14110B]">Schedule Free Trial</h3>
              <button onClick={() => setScheduleTrialLead(null)} className="p-1 rounded-lg text-[#7A7367]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#7A7367]">
              Select trial date and slot for <strong>{scheduleTrialLead.name}</strong>. An automated WhatsApp invite will be dispatched.
            </p>

            <div>
              <label className="block text-xs font-semibold text-[#14110B] mb-1">Trial Session Time Slot</label>
              <select
                value={trialTime}
                onChange={(e) => setTrialTime(e.target.value)}
                className="gms-input"
              >
                <option value="Tomorrow, 07:00 AM">Tomorrow, 07:00 AM (Morning Slot)</option>
                <option value="Tomorrow, 10:00 AM">Tomorrow, 10:00 AM (Midday Slot)</option>
                <option value="Tomorrow, 06:30 PM">Tomorrow, 06:30 PM (Evening Prime Slot)</option>
                <option value="Saturday, 09:00 AM">Saturday, 09:00 AM (Weekend Workshop)</option>
              </select>
            </div>

            <div className="pt-2 border-t border-[#ECE7DC] flex justify-end gap-2">
              <button
                onClick={() => setScheduleTrialLead(null)}
                className="figma-btn-secondary !text-xs !h-9 !px-3"
              >
                Dismiss
              </button>
              <button
                onClick={handleConfirmTrialSchedule}
                className="figma-btn-primary !text-xs !h-9 !px-4 font-semibold"
              >
                Confirm Slot
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
