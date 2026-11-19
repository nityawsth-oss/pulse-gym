import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-project')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Constant TODAY from Section 1 & 4 (Wednesday, 18 Nov 2026)
export const TODAY = 'Wednesday, 18 Nov 2026';

// Exactly 5 Plans from Page 7 & 8 of Spec
export const INITIAL_PLANS = [
  {
    id: 'plan_1',
    name: 'Monthly',
    duration: '1 month',
    price: 1499,
    interval: 'Monthly',
    tag: 'Standard',
    membersCount: 232,
    description: 'Full gym access, lockers and standard shower suites.',
    status: 'Active',
    benefits: ['Full Gym Floor Access', 'Locker & Shower Usage', 'Free InBody Composition Scan', 'Turnstile Optical Check-in']
  },
  {
    id: 'plan_2',
    name: 'Quarterly',
    duration: '3 months',
    price: 3999,
    interval: '3 Months',
    tag: 'Value',
    membersCount: 268,
    description: 'Quarterly commitment with 2 guest passes included.',
    status: 'Active',
    benefits: ['Standard Gym Floor (All Hours)', '2 Group Fitness Classes', '2 Free Guest Passes', 'Mobile App Check-in']
  },
  {
    id: 'plan_3',
    name: 'Half-Yearly',
    duration: '6 months',
    price: 6999,
    interval: '6 Months',
    tag: 'Most Popular',
    popular: true,
    membersCount: 401,
    description: 'Complete 6-month tier with steam room & sauna recovery.',
    status: 'Active',
    benefits: ['24/7 Biometric Gym Access', 'Unlimited Group Classes', 'Infrared Sauna & Steam Room', 'Free Freeze up to 30 days']
  },
  {
    id: 'plan_4',
    name: 'Annual',
    duration: '12 months',
    price: 11999,
    interval: 'Yearly',
    tag: 'Best Value',
    membersCount: 271,
    description: 'Full year access with personal coach consultation.',
    status: 'Active',
    benefits: ['Everything in Half-Yearly', '2x Monthly 1-on-1 Personal Training', 'Cryotherapy & Cold Plunge', '2 Free Freeze Periods (up to 60 days)']
  },
  {
    id: 'plan_5',
    name: 'Student',
    duration: '1 month',
    price: 999,
    interval: 'Monthly',
    tag: 'Student Pass',
    membersCount: 112,
    description: 'Discounted access for valid college student ID cardholders.',
    status: 'Active',
    benefits: ['Off-peak Gym Floor (11 AM - 05 PM)', 'Locker & Hydration Access', 'Student ID Verified']
  }
];

// Fixed Sample Members from Page 8 of Spec
export const INITIAL_MEMBERS = [
  {
    id: 'GMS-10001',
    name: 'Aarav Mehta',
    planName: 'Annual',
    expiryDate: '11 Jan 2027',
    trainerAssigned: 'Karan Malhotra',
    status: 'Active',
    email: 'aarav.mehta@irondistrict.in',
    phone: '+91 98450 11001',
    joinedDate: '11 Jan 2026',
    gender: 'Male',
    totalSpent: '₹11,999',
    attendanceCount: 142,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    emergencyContact: 'Meera Mehta (+91 98450 99999)',
    bloodGroup: 'O+',
    height: '182 cm',
    weight: '82 kg',
    fitnessGoal: 'Hypertrophy & Strength',
    medicalNotes: 'No restrictions.'
  },
  {
    id: 'GMS-10482',
    name: 'Priya Sharma',
    planName: 'Annual',
    expiryDate: '21 Nov 2026',
    trainerAssigned: 'Simran Kaur',
    status: 'Expiring',
    email: 'priya.sharma@example.com',
    phone: '+91 98450 10482',
    joinedDate: '21 Nov 2025',
    gender: 'Female',
    totalSpent: '₹11,999',
    attendanceCount: 98,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    emergencyContact: 'Raj Sharma (+91 98450 88888)',
    bloodGroup: 'A+',
    height: '165 cm',
    weight: '58 kg',
    fitnessGoal: 'Conditioning',
    medicalNotes: 'None.'
  },
  {
    id: 'GMS-10211',
    name: 'Rohan Verma',
    planName: 'Quarterly',
    expiryDate: '22 Nov 2026',
    trainerAssigned: 'Arjun Das',
    status: 'Expiring',
    email: 'rohan.v@example.com',
    phone: '+91 98450 10211',
    joinedDate: '22 Aug 2026',
    gender: 'Male',
    totalSpent: '₹3,999',
    attendanceCount: 45,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    emergencyContact: 'Sunita Verma (+91 98450 77777)',
    bloodGroup: 'B+',
    height: '175 cm',
    weight: '74 kg',
    fitnessGoal: 'Fat Shred',
    medicalNotes: 'None.'
  },
  {
    id: 'GMS-09877',
    name: 'Ananya Singh',
    planName: 'Monthly',
    expiryDate: '23 Nov 2026',
    trainerAssigned: 'Meera Iyer',
    status: 'Expiring',
    email: 'ananya.s@example.com',
    phone: '+91 98450 09877',
    joinedDate: '23 Oct 2026',
    gender: 'Female',
    totalSpent: '₹1,499',
    attendanceCount: 22,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    emergencyContact: 'Vikram Singh (+91 98450 66666)',
    bloodGroup: 'O+',
    height: '162 cm',
    weight: '72.4 kg',
    fitnessGoal: 'Weight Loss & Toning',
    medicalNotes: 'None.'
  },
  {
    id: 'GMS-10033',
    name: 'Vikram Rao',
    planName: 'Half-Yearly',
    expiryDate: '24 Nov 2026',
    trainerAssigned: 'Karan Malhotra',
    status: 'Expiring',
    email: 'vikram.r@example.com',
    phone: '+91 98450 10033',
    joinedDate: '24 May 2026',
    gender: 'Male',
    totalSpent: '₹6,999',
    attendanceCount: 78,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    emergencyContact: 'Anita Rao (+91 98450 55555)',
    bloodGroup: 'AB+',
    height: '180 cm',
    weight: '85 kg',
    fitnessGoal: 'Powerlifting',
    medicalNotes: 'None.'
  },
  {
    id: 'GMS-10440',
    name: 'Isha Nair',
    planName: 'Quarterly',
    expiryDate: '31 Dec 2026',
    trainerAssigned: 'Meera Iyer',
    status: 'Active',
    email: 'isha.n@example.com',
    phone: '+91 98450 10440',
    joinedDate: '01 Oct 2026',
    gender: 'Female',
    totalSpent: '₹3,999',
    attendanceCount: 36,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    emergencyContact: 'Deepak Nair (+91 98450 44444)',
    bloodGroup: 'A-',
    height: '170 cm',
    weight: '62 kg',
    fitnessGoal: 'Yoga & Flexibility',
    medicalNotes: 'None.'
  },
  {
    id: 'GMS-10514',
    name: 'Kabir Khan',
    planName: 'Annual',
    expiryDate: '05 Nov 2027',
    trainerAssigned: 'Arjun Das',
    status: 'Pending',
    email: 'kabir.k@example.com',
    phone: '+91 98450 10514',
    joinedDate: '05 Nov 2026',
    gender: 'Male',
    totalSpent: '₹11,999',
    attendanceCount: 2,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    emergencyContact: 'Zain Khan (+91 98450 33333)',
    bloodGroup: 'O-',
    height: '178 cm',
    weight: '76 kg',
    fitnessGoal: 'Cardio Endurance',
    medicalNotes: 'Payment clearance pending.'
  },
  {
    id: 'GMS-10390',
    name: 'Neha Gupta',
    planName: 'Monthly',
    expiryDate: '01 Nov 2026',
    trainerAssigned: 'Simran Kaur',
    status: 'Expired',
    email: 'neha.g@example.com',
    phone: '+91 98450 10390',
    joinedDate: '01 Oct 2026',
    gender: 'Female',
    totalSpent: '₹1,499',
    attendanceCount: 14,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    emergencyContact: 'Suresh Gupta (+91 98450 22222)',
    bloodGroup: 'B-',
    height: '158 cm',
    weight: '54 kg',
    fitnessGoal: 'General Tone',
    medicalNotes: 'Plan expired.'
  },
  {
    id: 'GMS-10122',
    name: 'Dev Patel',
    planName: 'Student',
    expiryDate: '18 Oct 2026',
    trainerAssigned: 'Karan Malhotra',
    status: 'Expired',
    email: 'dev.p@example.com',
    phone: '+91 98450 10122',
    joinedDate: '18 Sep 2026',
    gender: 'Male',
    totalSpent: '₹999',
    attendanceCount: 18,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    emergencyContact: 'Manoj Patel (+91 98450 11111)',
    bloodGroup: 'O+',
    height: '172 cm',
    weight: '68 kg',
    fitnessGoal: 'Student Fitness',
    medicalNotes: 'Student card expired.'
  }
];

// Fixed Staff from Page 8 of Spec
export const INITIAL_STAFF = [
  {
    id: 'ST-01',
    name: 'Karan Malhotra',
    role: 'Head Trainer',
    branch: 'Indiranagar',
    clients: 28,
    rating: '4.9',
    phone: '+91 98000 00001',
    email: 'karan@irondistrict.in',
    status: 'On Duty',
    workingHours: '06:00 AM - 02:00 PM',
    avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'ST-02',
    name: 'Simran Kaur',
    role: 'Strength Coach',
    branch: 'Indiranagar',
    clients: 24,
    rating: '4.8',
    phone: '+91 98000 00002',
    email: 'simran@irondistrict.in',
    status: 'On Duty',
    workingHours: '07:00 AM - 03:00 PM',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'ST-03',
    name: 'Arjun Das',
    role: 'Cardio Trainer',
    branch: 'Koramangala',
    clients: 21,
    rating: '4.7',
    phone: '+91 98000 00003',
    email: 'arjun@irondistrict.in',
    status: 'On Duty',
    workingHours: '01:00 PM - 09:00 PM',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'ST-04',
    name: 'Meera Iyer',
    role: 'Yoga Instructor',
    branch: 'Indiranagar',
    clients: 18,
    rating: '4.9',
    phone: '+91 98000 00004',
    email: 'meera@irondistrict.in',
    status: 'On Leave Tomorrow',
    workingHours: '06:00 AM - 12:00 PM',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'ST-05',
    name: 'Rahul Nair',
    role: 'Front Desk',
    branch: 'Indiranagar',
    clients: 0,
    rating: '5.0',
    phone: '+91 98000 00005',
    email: 'rahul@irondistrict.in',
    status: 'On Duty',
    workingHours: '06:00 AM - 03:00 PM',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'ST-06',
    name: 'Tanvi Joshi',
    role: 'Nutritionist',
    branch: 'Indiranagar',
    clients: 31,
    rating: '4.8',
    phone: '+91 98000 00006',
    email: 'tanvi@irondistrict.in',
    status: 'On Duty',
    workingHours: '10:00 AM - 06:00 PM',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
  }
];

// Classes from Page 8 of Spec
export const INITIAL_CLASSES = [
  { id: 'CLS-1', title: 'HIIT Burn', trainer: 'Arjun Das', time: '6:00 AM', capacity: 20, bookedCount: 18, room: 'Arena 1', intensity: 'High' },
  { id: 'CLS-2', title: 'Power Yoga', trainer: 'Meera Iyer', time: '7:30 AM', capacity: 15, bookedCount: 12, room: 'Zen Studio', intensity: 'Low' },
  { id: 'CLS-3', title: 'Spin Ride', trainer: 'Simran Kaur', time: '9:00 AM', capacity: 20, bookedCount: 16, room: 'Spin Studio', intensity: 'High' },
  { id: 'CLS-4', title: 'Strength 101', trainer: 'Karan Malhotra', time: '5:30 PM', capacity: 20, bookedCount: 20, room: 'Iron Platform', intensity: 'Extreme' },
  { id: 'CLS-5', title: 'Zumba', trainer: 'Tanvi Joshi', time: '6:30 PM', capacity: 25, bookedCount: 14, room: 'Dance Studio', intensity: 'Moderate' },
  { id: 'CLS-6', title: 'Boxing', trainer: 'Arjun Das', time: '8:00 PM', capacity: 12, bookedCount: 9, room: 'Combat Ring', intensity: 'High' },
];

export const INITIAL_CHECKINS = [
  { id: 'CHK-1', memberName: 'Rohan Verma', memberId: 'GMS-10211', time: '6:42 AM', status: 'Approved', plan: 'Quarterly', gate: 'Strength Zone' },
  { id: 'CHK-2', memberName: 'Aarav Mehta', memberId: 'GMS-10001', time: '7:15 AM', status: 'Approved', plan: 'Annual', gate: 'Turnstile Gate A' },
  { id: 'CHK-3', memberName: 'Priya Sharma', memberId: 'GMS-10482', time: '7:40 AM', status: 'Approved (Expiring in 3 days)', plan: 'Annual', gate: 'Turnstile Gate A' },
  { id: 'CHK-4', memberName: 'Neha Gupta', memberId: 'GMS-10390', time: '8:02 AM', status: 'Denied - Expired on 01 Nov', plan: 'Monthly', gate: 'Turnstile Gate B' },
];

export const INITIAL_PAYMENTS = [
  { id: 'INV-2041', memberName: 'Kabir Khan', memberId: 'GMS-10514', amount: 11999, method: 'UPI AutoPay', date: 'Today, 09:12 AM', plan: 'Annual', status: 'Paid' },
  { id: 'INV-2040', memberName: 'Aarav Mehta', memberId: 'GMS-10001', amount: 11999, method: 'Credit Card', date: 'Yesterday, 04:30 PM', plan: 'Annual', status: 'Paid' },
  { id: 'INV-2039', memberName: 'Vikram Rao', memberId: 'GMS-10033', amount: 6999, method: 'Card (Mastercard)', date: '16 Nov, 02:15 PM', plan: 'Half-Yearly', status: 'Failed' },
  { id: 'INV-2038', memberName: 'Rohan Verma', memberId: 'GMS-10211', amount: 3999, method: 'UPI', date: '15 Nov, 11:00 AM', plan: 'Quarterly', status: 'Paid' },
  { id: 'INV-2037', memberName: 'Dev Patel', memberId: 'GMS-10122', amount: 999, method: 'Cash', date: '14 Nov, 08:45 AM', plan: 'Student', status: 'Refunded' },
];

export const INITIAL_LEADS = [
  { id: 'LD-1', name: 'Zack Taylor', phone: '+91 98765 11111', email: 'zack.t@gmail.com', source: 'Instagram', trialDate: 'Tomorrow, 10:00 AM', status: 'Trial Booked', interestedPlan: 'Half-Yearly' },
  { id: 'LD-2', name: 'Emily Watson', phone: '+91 98765 22222', email: 'emily.w@yahoo.com', source: 'Walk-in', trialDate: 'Pending Schedule', status: 'New', interestedPlan: 'Quarterly' },
  { id: 'LD-3', name: 'Brandon Cole', phone: '+91 98765 33333', email: 'b.cole@company.com', source: 'Google Ads', trialDate: '16 Nov (Completed)', status: 'Follow-up', interestedPlan: 'Annual' },
  { id: 'LD-4', name: 'Hannah Scott', phone: '+91 98765 44444', email: 'hannah.s@outlook.com', source: 'Referral', trialDate: '15 Nov (Completed)', status: 'Converted', interestedPlan: 'Monthly' },
];

// Persistent LocalStorage Store
const STORAGE_MEMBERS = 'pulse_gms_spec_members';
const STORAGE_PLANS = 'pulse_gms_spec_plans';
const STORAGE_STAFF = 'pulse_gms_spec_staff';
const STORAGE_PAYMENTS = 'pulse_gms_spec_payments';
const STORAGE_CHECKINS = 'pulse_gms_spec_checkins';
const STORAGE_LEADS = 'pulse_gms_spec_leads';

export const gmsStore = {
  getMembers() {
    const data = localStorage.getItem(STORAGE_MEMBERS);
    if (!data) {
      localStorage.setItem(STORAGE_MEMBERS, JSON.stringify(INITIAL_MEMBERS));
      return INITIAL_MEMBERS;
    }
    return JSON.parse(data);
  },
  saveMember(member) {
    const list = this.getMembers();
    const newMember = {
      ...member,
      id: member.id || `GMS-${Math.floor(10515 + Math.random() * 500)}`,
      joinedDate: member.joinedDate || '18 Nov 2026',
      totalSpent: member.totalSpent || '₹1,499',
      attendanceCount: member.attendanceCount || 0
    };
    const updated = [newMember, ...list];
    localStorage.setItem(STORAGE_MEMBERS, JSON.stringify(updated));
    return updated;
  },
  updateMember(id, fields) {
    const list = this.getMembers().map(m => m.id === id ? { ...m, ...fields } : m);
    localStorage.setItem(STORAGE_MEMBERS, JSON.stringify(list));
    return list;
  },

  getPlans() {
    const data = localStorage.getItem(STORAGE_PLANS);
    if (!data) {
      localStorage.setItem(STORAGE_PLANS, JSON.stringify(INITIAL_PLANS));
      return INITIAL_PLANS;
    }
    return JSON.parse(data);
  },
  savePlan(plan) {
    const list = this.getPlans();
    const newPlan = { ...plan, id: plan.id || `plan_${Date.now()}`, membersCount: 0 };
    const updated = [...list, newPlan];
    localStorage.setItem(STORAGE_PLANS, JSON.stringify(updated));
    return updated;
  },
  updatePlan(id, fields) {
    const list = this.getPlans().map(p => p.id === id ? { ...p, ...fields } : p);
    localStorage.setItem(STORAGE_PLANS, JSON.stringify(list));
    return list;
  },
  archivePlan(id) {
    const list = this.getPlans().map(p => p.id === id ? { ...p, status: 'Archived' } : p);
    localStorage.setItem(STORAGE_PLANS, JSON.stringify(list));
    return list;
  },

  getStaff() {
    const data = localStorage.getItem(STORAGE_STAFF);
    if (!data) {
      localStorage.setItem(STORAGE_STAFF, JSON.stringify(INITIAL_STAFF));
      return INITIAL_STAFF;
    }
    return JSON.parse(data);
  },
  addStaff(member) {
    const list = this.getStaff();
    const updated = [{ ...member, id: `ST-0${list.length + 1}` }, ...list];
    localStorage.setItem(STORAGE_STAFF, JSON.stringify(updated));
    return updated;
  },

  getPayments() {
    const data = localStorage.getItem(STORAGE_PAYMENTS);
    if (!data) {
      localStorage.setItem(STORAGE_PAYMENTS, JSON.stringify(INITIAL_PAYMENTS));
      return INITIAL_PAYMENTS;
    }
    return JSON.parse(data);
  },
  recordPayment(payment) {
    const list = this.getPayments();
    const newPayment = {
      ...payment,
      id: `INV-${Math.floor(2042 + Math.random() * 200)}`,
      date: '18 Nov 2026',
      status: payment.status || 'Paid'
    };
    const updated = [newPayment, ...list];
    localStorage.setItem(STORAGE_PAYMENTS, JSON.stringify(updated));
    return updated;
  },

  getCheckins() {
    const data = localStorage.getItem(STORAGE_CHECKINS);
    if (!data) {
      localStorage.setItem(STORAGE_CHECKINS, JSON.stringify(INITIAL_CHECKINS));
      return INITIAL_CHECKINS;
    }
    return JSON.parse(data);
  },
  addCheckin(checkin) {
    const list = this.getCheckins();
    const updated = [{ ...checkin, id: `CHK-${Date.now()}`, time: 'Just now' }, ...list];
    localStorage.setItem(STORAGE_CHECKINS, JSON.stringify(updated));
    return updated;
  },

  getLeads() {
    const data = localStorage.getItem(STORAGE_LEADS);
    if (!data) {
      localStorage.setItem(STORAGE_LEADS, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    return JSON.parse(data);
  },
  addLead(lead) {
    const list = this.getLeads();
    const updated = [{ ...lead, id: `LD-${list.length + 1}` }, ...list];
    localStorage.setItem(STORAGE_LEADS, JSON.stringify(updated));
    return updated;
  },
  updateLeadStatus(id, status) {
    const list = this.getLeads().map(l => l.id === id ? { ...l, status } : l);
    localStorage.setItem(STORAGE_LEADS, JSON.stringify(list));
    return list;
  }
};
