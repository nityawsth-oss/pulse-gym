import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Heart, 
  CreditCard, 
  ShieldCheck, 
  QrCode,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { INITIAL_PLANS, INITIAL_STAFF } from '../lib/supabase';

export default function AddMemberModal({ isOpen, onClose, onSaveMember, plans = INITIAL_PLANS }) {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '1998-04-12',
    gender: 'Female',
    address: '142 Indiranagar 100ft Road, Bengaluru',
    emergencyContact: 'Suresh Sharma',
    emergencyPhone: '+91 98450 11223',
    
    fitnessGoal: 'Strength & Hypertrophy',
    bloodGroup: 'B+',
    height: '168 cm',
    weight: '62 kg',
    medicalNotes: 'Cleared for high-intensity training, no joint issues.',
    experienceLevel: 'Intermediate',
    
    selectedPlanId: plans[0]?.id || 'plan_1',
    startDate: new Date().toISOString().split('T')[0],
    assignedTrainer: INITIAL_STAFF[0]?.name || 'Karan Malhotra',
    
    paymentMethod: 'UPI / QR Transfer',
    joiningFee: 500,
    discountAmount: 0,
    autoRenew: true
  });

  if (!isOpen) return null;

  const selectedPlan = plans.find(p => p.id === formData.selectedPlanId) || plans[0];
  const subtotal = (selectedPlan?.price || 1499) + Number(formData.joiningFee) - Number(formData.discountAmount);
  const gstAmount = Math.round(subtotal * 0.18);
  const totalAmount = subtotal + gstAmount;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMember = {
      id: `M-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.fullName || 'Pooja Hegde',
      email: formData.email || 'pooja.h@example.com',
      phone: formData.phone || '+91 98860 55443',
      gender: formData.gender,
      dob: formData.dob,
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      status: 'Active',
      joinedDate: formData.startDate,
      expiryDate: '2027-11-18',
      address: formData.address,
      emergencyContact: `${formData.emergencyContact} (${formData.emergencyPhone})`,
      bloodGroup: formData.bloodGroup,
      height: formData.height,
      weight: formData.weight,
      fitnessGoal: formData.fitnessGoal,
      medicalNotes: formData.medicalNotes,
      trainerAssigned: formData.assignedTrainer,
      joiningAmount: totalAmount,
      totalSpent: `₹${totalAmount.toLocaleString('en-IN')}`,
      attendanceCount: 1,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };

    onSaveMember(newMember);
    onClose();
    setStep(1);
  };

  const STEPS_NAV = [
    { num: 1, title: 'Personal Info', sub: 'Contact details' },
    { num: 2, title: 'Health & Medical', sub: 'Fitness stats' },
    { num: 3, title: 'Plan & Coach', sub: 'Tier selection' },
    { num: 4, title: 'Payment & Pass', sub: 'GST billing' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-white border border-[#ECE7DC] shadow-2xl relative max-h-[92vh] overflow-y-auto flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-[#ECE7DC] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#14110B] bg-[#FEF3E0] text-[#D9A441] px-2.5 py-0.5 rounded-full border border-[#D9A441]/30">
                Step {step} of 4
              </span>
              <span className="text-xs text-[#7A7367]">New Member Registration Wizard</span>
            </div>
            <h2 className="text-lg font-bold text-[#14110B] tracking-tight mt-1">
              {STEPS_NAV[step - 1].title} — <span className="text-xs font-normal text-[#7A7367]">{STEPS_NAV[step - 1].sub}</span>
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#7A7367] hover:text-[#14110B] hover:bg-[#F8F5EF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-4 gap-2">
            {STEPS_NAV.map((s) => (
              <div key={s.num} className="space-y-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    step >= s.num ? 'bg-[#D9A441]' : 'bg-[#ECE7DC]'
                  }`}
                />
                <span className={`text-[10px] font-semibold block truncate ${
                  step === s.num ? 'text-[#D9A441]' : 'text-[#A39C8E]'
                }`}>
                  {s.num}. {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} className="p-6 flex-1 space-y-4">
          
          {/* STEP 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pooja Hegde"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="gms-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98860 55443"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="gms-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="pooja.h@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="gms-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="gms-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="gms-input"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other / Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Residential Address</label>
                  <input
                    type="text"
                    placeholder="Street, locality, city"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="gms-input"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8F5EF] border border-[#ECE7DC] space-y-2">
                <span className="text-[11px] font-bold text-[#14110B] uppercase tracking-wider block">
                  Emergency Contact Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Emergency Contact Name"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="gms-input"
                  />
                  <input
                    type="tel"
                    placeholder="Emergency Phone"
                    value={formData.emergencyPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                    className="gms-input"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Health & Medical */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="gms-input"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Height</label>
                  <input
                    type="text"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    placeholder="e.g. 175 cm"
                    className="gms-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Weight</label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="e.g. 70 kg"
                    className="gms-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Fitness Level</label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                    className="gms-input"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced / Athlete">Advanced / Athlete</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14110B] mb-1">Primary Fitness Goal</label>
                <select
                  value={formData.fitnessGoal}
                  onChange={(e) => setFormData({ ...formData, fitnessGoal: e.target.value })}
                  className="gms-input"
                >
                  <option value="Hypertrophy & Strength">Hypertrophy & Muscle Building</option>
                  <option value="Weight Loss & Fat Reduction">Weight Loss & Fat Reduction</option>
                  <option value="Endurance & Cardiovascular">Endurance & Cardiovascular</option>
                  <option value="Flexibility & Yoga">Mobility, Flexibility & Yoga</option>
                  <option value="CrossFit & Functional Fitness">CrossFit & Functional Fitness</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14110B] mb-1">Medical History & Physical Limitations</label>
                <textarea
                  rows={3}
                  value={formData.medicalNotes}
                  onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
                  placeholder="Mention previous surgeries, heart conditions, asthma, or lower back considerations..."
                  className="gms-input !h-auto py-2.5"
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Physical Activity Readiness (PAR-Q) questionnaire signed digitally on reception tablet.</span>
              </div>
            </div>
          )}

          {/* STEP 3: Plan & Coach Selection */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <label className="block text-xs font-semibold text-[#14110B]">Select Active Membership Plan *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {plans.map((p) => {
                  const isSelected = formData.selectedPlanId === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setFormData({ ...formData, selectedPlanId: p.id })}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#D9A441] bg-[#FEF3E0] shadow-sm ring-1 ring-[#D9A441]'
                          : 'border-[#ECE7DC] bg-white hover:border-[#DDD6C7]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#14110B]">{p.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#D9A441]" />}
                      </div>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-base font-bold text-[#14110B]">₹{(p.price || 0).toLocaleString('en-IN')}</span>
                        <span className="text-[11px] text-[#7A7367]">/ {p.interval}</span>
                      </div>
                      <p className="text-[11px] text-[#7A7367] mt-1 line-clamp-1">{p.description}</p>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Membership Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="gms-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Assign Primary Trainer / Coach</label>
                  <select
                    value={formData.assignedTrainer}
                    onChange={(e) => setFormData({ ...formData, assignedTrainer: e.target.value })}
                    className="gms-input"
                  >
                    {INITIAL_STAFF.map(st => (
                      <option key={st.id} value={st.name}>{st.name} — {st.role}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Payment Confirmation & Pass Generation */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              
              {/* Invoice Breakdown */}
              <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#ECE7DC] space-y-2.5">
                <div className="flex items-center justify-between text-xs text-[#7A7367]">
                  <span>{selectedPlan.name} ({selectedPlan.interval})</span>
                  <span className="font-semibold text-[#14110B]">₹{(selectedPlan.price || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#7A7367]">
                  <span>One-time RFID & Joining Fee</span>
                  <span className="font-semibold text-[#14110B]">₹{Number(formData.joiningFee).toLocaleString('en-IN')}</span>
                </div>
                {Number(formData.discountAmount) > 0 && (
                  <div className="flex items-center justify-between text-xs text-emerald-700">
                    <span>Promotional Discount</span>
                    <span>-₹{Number(formData.discountAmount).toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-[#7A7367]">
                  <span>Applicable GST (18%)</span>
                  <span className="font-semibold text-[#14110B]">₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-[#ECE7DC] pt-2 flex items-center justify-between text-sm font-bold text-[#14110B]">
                  <span>Total Payable Today</span>
                  <span className="text-base text-[#D9A441]">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-semibold text-[#14110B] mb-1">Payment Method *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {['UPI / QR Transfer', 'Credit Card', 'Cash / Front Desk', 'Bank Debit'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: method })}
                      className={`p-2.5 rounded-xl border text-center font-medium transition-all ${
                        formData.paymentMethod === method
                          ? 'border-[#D9A441] bg-[#FEF3E0] text-[#14110B] font-bold'
                          : 'border-[#ECE7DC] bg-white text-[#7A7367] hover:border-[#DDD6C7]'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Digital Pass Preview */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#14110B] to-[#2B2110] text-white flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#D9A441] font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Instant Biometric Turnstile Pass Generated</span>
                  </div>
                  <h4 className="text-sm font-bold mt-1 text-white">{formData.fullName || 'New Member'}</h4>
                  <p className="text-[11px] text-[#A39C8E]">Valid at: Iron District Fitness, Indiranagar</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-white p-1 flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-black" />
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="pt-4 border-t border-[#ECE7DC] flex items-center justify-between sticky bottom-0 bg-white">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="figma-btn-secondary !text-xs !h-10 !px-4 flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="submit"
                className="figma-btn-primary !text-xs !h-10 !px-5 flex items-center gap-1"
              >
                <span>Continue to {STEPS_NAV[step].title}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="figma-btn-primary !text-xs !h-10 !px-6 flex items-center gap-1.5 shadow-md shadow-[#D9A441]/20 font-bold"
              >
                <Check className="w-4 h-4" />
                <span>Confirm & Issue Membership</span>
              </button>
            )}
          </div>

        </form>

      </div>
    </div>
  );
}
