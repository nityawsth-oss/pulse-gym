import React, { useState } from 'react';
import { 
  CalendarDays, 
  Plus, 
  Clock, 
  Users, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Calendar,
  X,
  AlertCircle,
  QrCode,
  Flame,
  ChevronRight
} from 'lucide-react';
import { INITIAL_STAFF } from '../lib/supabase';

export default function ClassesView({ classes, onOpenCheckIn }) {
  const [classList, setClassList] = useState(classes);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedClassDetails, setSelectedClassDetails] = useState(null);

  // Form State
  const [classForm, setClassForm] = useState({
    title: '',
    trainer: 'Karan Malhotra',
    time: '07:00 AM - 08:15 AM',
    day: 'Monday',
    room: 'Studio A (Strength Floor)',
    capacity: 25,
    intensity: 'High'
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const newClass = {
      ...classForm,
      id: `CLS-${Date.now()}`,
      bookedCount: 0
    };
    setClassList([newClass, ...classList]);
    setCreateModalOpen(false);
    setClassForm({
      title: '',
      trainer: 'Karan Malhotra',
      time: '07:00 AM - 08:15 AM',
      day: 'Monday',
      room: 'Studio A (Strength Floor)',
      capacity: 25,
      intensity: 'High'
    });
  };

  const handleCancelClass = (id) => {
    if (confirm('Cancel this class session? Registered members will receive an automated reschedule notification.')) {
      setClassList(classList.filter(c => c.id !== id));
      setSelectedClassDetails(null);
    }
  };

  const INTENSITY_COLORS = {
    High: 'bg-red-50 text-red-700 border-red-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold text-[#D9A441] bg-[#FEF3E0] px-2.5 py-0.5 rounded-full border border-[#D9A441]/30">
              {classList.length} Scheduled Daily Sessions
            </span>
            <span className="text-xs text-[#7A7367]">Studio & Floor Capacity</span>
          </div>
          <h2 className="text-xl font-bold text-[#14110B] tracking-tight">
            Class Schedules & Capacity Tracking
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenCheckIn}
            className="figma-btn-secondary !text-xs !h-9 !px-3.5 flex items-center gap-1.5"
          >
            <QrCode className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>Class Check-in</span>
          </button>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="figma-btn-primary !text-xs !h-9 !px-4 flex items-center gap-1.5 font-semibold"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Class</span>
          </button>
        </div>
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classList.map((cls) => {
          const booked = cls.bookedCount || 0;
          const capacity = cls.capacity || 20;
          const percentBooked = Math.min(100, Math.round((booked / capacity) * 100));

          return (
            <div
              key={cls.id}
              className="figma-card p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${INTENSITY_COLORS[cls.intensity] || 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                    {cls.intensity} Intensity
                  </span>
                  <span className="text-[11px] text-[#7A7367] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#A39C8E]" />
                    {cls.room || 'Studio A'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#14110B] tracking-tight">
                  {cls.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-[#7A7367] mt-2">
                  <span className="flex items-center gap-1 text-[#D9A441] font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {cls.time}
                  </span>
                  <span>•</span>
                  <span>Coach {cls.trainer}</span>
                </div>

                {/* Capacity Progress Bar */}
                <div className="mt-4 pt-4 border-t border-[#ECE7DC] space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#7A7367]">Capacity Booked</span>
                    <span className="text-[#14110B] font-bold">{booked} / {capacity} ({percentBooked}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#F8F5EF] border border-[#ECE7DC] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        percentBooked >= 90 ? 'bg-amber-500' : percentBooked >= 75 ? 'bg-[#D9A441]' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${percentBooked}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#ECE7DC] flex items-center justify-between">
                <button
                  onClick={() => setSelectedClassDetails(cls)}
                  className="text-xs text-[#D9A441] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Members List ({booked})</span>
                  <ChevronRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => handleCancelClass(cls.id)}
                  className="text-xs text-[#7A7367] hover:text-red-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Class Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 border border-[#ECE7DC] shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b border-[#ECE7DC] pb-3">
              <h3 className="text-base font-bold text-[#14110B]">
                Schedule New Class Session
              </h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-1 rounded-lg text-[#7A7367] hover:bg-[#F8F5EF]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#14110B] mb-1">Class Title *</label>
                <input
                  type="text"
                  required
                  value={classForm.title}
                  onChange={(e) => setClassForm({ ...classForm, title: e.target.value })}
                  placeholder="e.g. HIIT Strength & Conditioning"
                  className="gms-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Instructor</label>
                  <select
                    value={classForm.trainer}
                    onChange={(e) => setClassForm({ ...classForm, trainer: e.target.value })}
                    className="gms-input"
                  >
                    {INITIAL_STAFF.map(st => (
                      <option key={st.id} value={st.name}>{st.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Max Capacity</label>
                  <input
                    type="number"
                    min="5"
                    max="60"
                    value={classForm.capacity}
                    onChange={(e) => setClassForm({ ...classForm, capacity: parseInt(e.target.value) })}
                    className="gms-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Timing</label>
                  <input
                    type="text"
                    value={classForm.time}
                    onChange={(e) => setClassForm({ ...classForm, time: e.target.value })}
                    className="gms-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Intensity</label>
                  <select
                    value={classForm.intensity}
                    onChange={(e) => setClassForm({ ...classForm, intensity: e.target.value })}
                    className="gms-input"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14110B] mb-1">Studio / Room</label>
                <input
                  type="text"
                  value={classForm.room}
                  onChange={(e) => setClassForm({ ...classForm, room: e.target.value })}
                  className="gms-input"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#ECE7DC]">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="figma-btn-secondary !text-xs !h-9 !px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="figma-btn-primary !text-xs !h-9 !px-5 font-semibold"
                >
                  Save & Publish Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booked Attendees Modal */}
      {selectedClassDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 border border-[#ECE7DC] shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-[#ECE7DC] pb-3">
              <div>
                <h3 className="text-base font-bold text-[#14110B]">{selectedClassDetails.title}</h3>
                <p className="text-xs text-[#7A7367]">Booked Member Roster • Coach {selectedClassDetails.trainer}</p>
              </div>
              <button
                onClick={() => setSelectedClassDetails(null)}
                className="p-1 rounded-lg text-[#7A7367] hover:bg-[#F8F5EF]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {[
                { name: 'Priya Sharma', id: 'M-8192', time: 'Booked 2h ago' },
                { name: 'Rohan Verma', id: 'M-8204', time: 'Booked 5h ago' },
                { name: 'Ananya Singh', id: 'M-8341', time: 'Booked Yesterday' },
                { name: 'Vikram Rao', id: 'M-8402', time: 'Booked Yesterday' },
              ].map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#F8F5EF] border border-[#ECE7DC] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#14110B] block">{m.name}</span>
                    <span className="text-[11px] text-[#7A7367]">{m.id} • {m.time}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Confirmed
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#ECE7DC] flex justify-end">
              <button
                onClick={() => setSelectedClassDetails(null)}
                className="figma-btn-secondary !text-xs !h-9 !px-4"
              >
                Close Roster
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
