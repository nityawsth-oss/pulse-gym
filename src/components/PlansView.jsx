import React, { useState } from 'react';
import { Plus, Check, Edit3, Archive, RotateCcw, AlertTriangle, Users, X, Star } from 'lucide-react';

export default function PlansView({ plans, onSavePlan, onUpdatePlan, onArchivePlan }) {
  const [modalMode, setModalMode] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);
  const [archiveConfirmPlan, setArchiveConfirmPlan] = useState(null);

  const [planForm, setPlanForm] = useState({
    name: '',
    price: 1499,
    interval: 'Monthly',
    tag: 'Popular',
    description: '',
    benefits: 'Full Gym Access, Locker usage, Sauna'
  });

  const handleOpenCreate = () => {
    setPlanForm({
      name: '',
      price: 1499,
      interval: 'Monthly',
      tag: 'Custom',
      description: 'Access to select areas and class amenities.',
      benefits: 'Full Gym Access, Free Towels, 2 Fitness Classes'
    });
    setModalMode('create');
  };

  const handleOpenEdit = (plan) => {
    setEditingPlan(plan);
    setPlanForm({
      name: plan.name,
      price: plan.price,
      interval: plan.interval,
      tag: plan.tag,
      description: plan.description,
      benefits: plan.benefits.join(', ')
    });
    setModalMode('edit');
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    const benefitsArray = planForm.benefits.split(',').map(b => b.trim()).filter(Boolean);
    if (modalMode === 'create') {
      onSavePlan({ name: planForm.name, price: parseFloat(planForm.price), interval: planForm.interval, tag: planForm.tag, description: planForm.description, status: 'Active', benefits: benefitsArray });
    } else if (modalMode === 'edit' && editingPlan) {
      onUpdatePlan(editingPlan.id, { name: planForm.name, price: parseFloat(planForm.price), interval: planForm.interval, tag: planForm.tag, description: planForm.description, benefits: benefitsArray });
    }
    setModalMode(null);
    setEditingPlan(null);
  };

  const handleConfirmArchive = () => {
    if (archiveConfirmPlan) { onArchivePlan(archiveConfirmPlan.id); setArchiveConfirmPlan(null); }
  };

  const activePlans = plans.filter(p => p.status !== 'Archived');
  const archivedPlans = plans.filter(p => p.status === 'Archived');

  const TAG_COLORS = {
    Popular:    'bg-[#FEF3E0] text-[#D9A441]',
    'Best Value': 'bg-emerald-50 text-emerald-700',
    Custom:     'bg-blue-50 text-blue-700',
    Budget:     'bg-purple-50 text-purple-700',
  };

  return (
    <div className="space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold text-[#D9A441] bg-[#FEF3E0] px-2 py-0.5 rounded-full">
              {activePlans.length} Active Plans
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#14110B] tracking-tight">Membership Plans</h2>
        </div>
        <button onClick={handleOpenCreate} className="figma-btn-primary flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" />
          <span>Create New Plan</span>
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activePlans.map((plan) => (
          <div
            key={plan.id}
            className={`figma-card p-5 flex flex-col ${plan.popular ? 'border-[#D9A441]/40 ring-1 ring-[#D9A441]/20' : ''}`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${TAG_COLORS[plan.tag] || 'bg-[#F8F5EF] text-[#7A7367]'}`}>
                  {plan.tag}
                </span>
                <span className="text-[11px] text-[#7A7367] flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {plan.membersCount || '—'}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#14110B] tracking-tight">{plan.name}</h3>
              <p className="text-xs text-[#7A7367] mt-1 leading-relaxed line-clamp-2">{plan.description}</p>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-[#14110B]">
                  ₹{(plan.price || 0).toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#7A7367]">/ {plan.interval}</span>
              </div>

              <div className="mt-4 pt-4 border-t border-[#ECE7DC] space-y-1.5">
                {(plan.benefits || []).map((b, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#4A453D]">
                    <Check className="w-3.5 h-3.5 text-[#D9A441] flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#ECE7DC] flex items-center gap-2">
              <button
                onClick={() => handleOpenEdit(plan)}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#F8F5EF] hover:bg-[#ECE7DC] border border-[#ECE7DC] text-xs font-medium text-[#14110B] transition-colors"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setArchiveConfirmPlan(plan)}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs font-medium text-amber-700 transition-colors"
              >
                <Archive className="w-3 h-3" />
                <span>Archive</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Archived Plans */}
      {archivedPlans.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-[#7A7367] mb-3 flex items-center gap-2">
            <Archive className="w-4 h-4" />
            Archived Plans ({archivedPlans.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {archivedPlans.map((plan) => (
              <div key={plan.id} className="figma-card p-4 opacity-60 flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-[#14110B]">{plan.name}</span>
                  <span className="text-xs text-[#7A7367] block">₹{(plan.price || 0).toLocaleString('en-IN')} / {plan.interval}</span>
                </div>
                <button
                  onClick={() => onUpdatePlan(plan.id, { status: 'Active' })}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F8F5EF] hover:bg-[#ECE7DC] text-xs text-[#14110B] font-medium border border-[#ECE7DC]"
                >
                  <RotateCcw className="w-3 h-3" />
                  Restore
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#ECE7DC] shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#ECE7DC]">
              <h3 className="text-sm font-bold text-[#14110B]">
                {modalMode === 'create' ? 'Create New Plan' : `Edit Plan: ${editingPlan?.name}`}
              </h3>
              <button onClick={() => setModalMode(null)} className="p-1.5 rounded-lg hover:bg-[#F8F5EF] text-[#7A7367]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#14110B] mb-1">Plan Name *</label>
                <input
                  type="text"
                  required
                  value={planForm.name}
                  onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
                  placeholder="e.g. Annual Elite"
                  className="gms-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={planForm.price}
                    onChange={(e) => setPlanForm({ ...planForm, price: e.target.value })}
                    className="gms-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Interval</label>
                  <select
                    value={planForm.interval}
                    onChange={(e) => setPlanForm({ ...planForm, interval: e.target.value })}
                    className="gms-input"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Half-Yearly">Half-Yearly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14110B] mb-1">Tag / Badge</label>
                <input
                  type="text"
                  value={planForm.tag}
                  onChange={(e) => setPlanForm({ ...planForm, tag: e.target.value })}
                  className="gms-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14110B] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={planForm.description}
                  onChange={(e) => setPlanForm({ ...planForm, description: e.target.value })}
                  className="gms-input !h-auto py-2"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14110B] mb-1">Benefits (comma separated)</label>
                <input
                  type="text"
                  value={planForm.benefits}
                  onChange={(e) => setPlanForm({ ...planForm, benefits: e.target.value })}
                  className="gms-input"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#ECE7DC]">
                <button type="button" onClick={() => setModalMode(null)} className="figma-btn-secondary !text-xs !h-9 !px-4">Cancel</button>
                <button type="submit" className="figma-btn-primary !text-xs !h-9 !px-5">Save Plan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Archive Confirm Modal */}
      {archiveConfirmPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 border border-[#ECE7DC] shadow-xl space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                <AlertTriangle className="w-4.5 h-4.5 text-amber-600" />
              </div>
              <h3 className="text-sm font-bold text-[#14110B]">Archive "{archiveConfirmPlan.name}"?</h3>
            </div>
            <p className="text-xs text-[#7A7367]">
              This will hide the plan from new registrations. Existing members won't be affected.
            </p>
            <div className="flex justify-end gap-2 pt-1">
              <button onClick={() => setArchiveConfirmPlan(null)} className="figma-btn-secondary !text-xs !h-9 !px-3">Cancel</button>
              <button onClick={handleConfirmArchive} className="h-9 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-colors">
                Confirm Archive
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
