import React, { useState } from 'react';
import GmsSidebar from './components/GmsSidebar';
import GmsHeader from './components/GmsHeader';
import DashboardView from './components/DashboardView';
import MembersListView from './components/MembersListView';
import MemberProfileView from './components/MemberProfileView';
import PlansView from './components/PlansView';
import StaffView from './components/StaffView';
import ClassesView from './components/ClassesView';
import PaymentsView from './components/PaymentsView';
import LeadsView from './components/LeadsView';
import ReportsView from './components/ReportsView';
import AddMemberModal from './components/AddMemberModal';
import CheckInModal from './components/CheckInModal';
import LandingHero from './components/LandingHero';
import AuthPage from './components/AuthPage';
import {
  gmsStore,
  INITIAL_CLASSES,
  isSupabaseConfigured
} from './lib/supabase';

export default function App() {
  // ── View routing ──────────────────────────────────────────────
  // 'landing' → Public hero  |  'auth' → Login/Signup  |  'app' → GMS workspace
  const [viewMode, setViewMode]   = useState('landing');
  const [authRoute, setAuthRoute] = useState('login'); // 'login' | 'signup'

  // ── Authenticated user (null = not logged in) ─────────────────
  const [currentUser, setCurrentUser] = useState(null);

  // ── GMS state ─────────────────────────────────────────────────
  const [currentTab, setCurrentTab]       = useState('dashboard');
  const [selectedMember, setSelectedMember] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [members,  setMembers]  = useState(gmsStore.getMembers());
  const [plans,    setPlans]    = useState(gmsStore.getPlans());
  const [staff,    setStaff]    = useState(gmsStore.getStaff());
  const [classes,  setClasses]  = useState(INITIAL_CLASSES);
  const [checkins, setCheckins] = useState(gmsStore.getCheckins());
  const [payments, setPayments] = useState(gmsStore.getPayments());
  const [leads,    setLeads]    = useState(gmsStore.getLeads());

  // ── Modals ────────────────────────────────────────────────────
  const [addMemberModalOpen,  setAddMemberModalOpen]  = useState(false);
  const [checkInModalOpen,    setCheckInModalOpen]    = useState(false);
  const [logoutConfirmOpen,   setLogoutConfirmOpen]   = useState(false);

  // ── Auth handlers ─────────────────────────────────────────────
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setViewMode('app');
  };

  const handleLogout = () => setLogoutConfirmOpen(true);

  const confirmLogout = () => {
    setLogoutConfirmOpen(false);
    setCurrentUser(null);
    setViewMode('landing');
  };

  // ── Data handlers ─────────────────────────────────────────────
  const handleSaveMember = (newMember) => {
    setMembers(gmsStore.saveMember(newMember));
    setPayments(gmsStore.recordPayment({
      memberName: newMember.name,
      memberId:   newMember.id,
      amount:     newMember.joiningAmount || 1499,
      method:     'Cash / Front Desk',
      date:       'Just now',
      plan:       newMember.planName,
      status:     'Paid'
    }));
  };

  const handleUpdateMemberStatus = (id, newStatus) => {
    setMembers(gmsStore.updateMember(id, { status: newStatus }));
    if (selectedMember?.id === id) {
      setSelectedMember(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleRecordCheckin  = (d) => setCheckins(gmsStore.addCheckin(d));
  const handleRecordPayment  = (d) => setPayments(gmsStore.recordPayment(d));
  const handleSavePlan       = (d) => setPlans(gmsStore.savePlan(d));
  const handleUpdatePlan     = (id, f) => setPlans(gmsStore.updatePlan(id, f));
  const handleArchivePlan    = (id) => setPlans(gmsStore.archivePlan(id));
  const handleAddStaff       = (d) => setStaff(gmsStore.addStaff(d));
  const handleAddLead        = (d) => setLeads(gmsStore.addLead(d));
  const handleUpdateLeadStatus = (id, s) => setLeads(gmsStore.updateLeadStatus(id, s));
  const handleConvertToMember  = (lead) => {
    handleUpdateLeadStatus(lead.id, 'Converted');
    setAddMemberModalOpen(true);
  };

  const TAB_TITLES = {
    dashboard: 'Executive Dashboard & Overview',
    members:   selectedMember ? `Member Profile: ${selectedMember.name}` : 'Member Directory & Management',
    plans:     'Membership Plans & Tiers',
    staff:     'Staff, Trainers & Availability',
    classes:   'Class Schedules & Attendance',
    payments:  'Payments, Invoices & Refunds',
    leads:     'Leads & Free Trial Pipeline',
    reports:   'Business Reports & Analytics'
  };

  // ═══════════════════════════════════════════════════════════════
  // ROUTE: Landing Page (public animated hero)
  // ═══════════════════════════════════════════════════════════════
  if (viewMode === 'landing') {
    return (
      <LandingHero
        onGoToLogin={() => { setAuthRoute('login'); setViewMode('auth'); }}
        onGoToSignup={() => { setAuthRoute('signup'); setViewMode('auth'); }}
        onGoToDashboard={() => setViewMode('app')}
        isAuthenticated={Boolean(currentUser)}
      />
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // ROUTE: Auth — Login / Signup / OTP / Forgot Password
  // ═══════════════════════════════════════════════════════════════
  if (viewMode === 'auth') {
    return (
      <AuthPage
        initialRoute={authRoute}
        onLoginSuccess={handleLoginSuccess}
        onBackToLanding={() => setViewMode('landing')}
      />
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // ROUTE: GMS Workspace (authenticated)
  // ═══════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#14110B] flex flex-row font-sans selection:bg-[#D9A441] selection:text-[#14110B] overflow-x-hidden">

      {/* Dark Sidebar (Desktop static, Mobile slide-out drawer) */}
      <GmsSidebar
        currentTab={currentTab}
        setCurrentTab={(tab) => { setCurrentTab(tab); setSelectedMember(null); }}
        counts={{
          members: `${members.length}`,
          staff:   `${staff.length}`,
          leads:   `${leads.length}`
        }}
        onLogout={handleLogout}
        user={currentUser}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8F5EF] min-h-screen">

        {/* Top Header */}
        <GmsHeader
          activeTabTitle={TAB_TITLES[currentTab]}
          onOpenAddMember={() => setAddMemberModalOpen(true)}
          onOpenCheckIn={() => setCheckInModalOpen(true)}
          onOpenRecordPayment={() => setCurrentTab('payments')}
          onOpenAddLead={() => setCurrentTab('leads')}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        {/* Dynamic Page Panel */}
        <main className="p-3.5 sm:p-5 md:p-7 flex-1 max-w-7xl mx-auto w-full min-w-0">

          {currentTab === 'dashboard' && (
            <DashboardView
              members={members}
              plans={plans}
              checkins={checkins}
              payments={payments}
              onOpenAddMember={() => setAddMemberModalOpen(true)}
              onOpenCheckIn={() => setCheckInModalOpen(true)}
              onOpenRecordPayment={() => setCurrentTab('payments')}
              onOpenAddLead={() => setCurrentTab('leads')}
              onNavigateTab={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'members' && (
            selectedMember ? (
              <MemberProfileView
                member={selectedMember}
                onBack={() => setSelectedMember(null)}
                onUpdateStatus={handleUpdateMemberStatus}
              />
            ) : (
              <MembersListView
                members={members}
                onSelectMember={(m) => setSelectedMember(m)}
                onOpenAddMember={() => setAddMemberModalOpen(true)}
              />
            )
          )}

          {currentTab === 'plans' && (
            <PlansView
              plans={plans}
              onSavePlan={handleSavePlan}
              onUpdatePlan={handleUpdatePlan}
              onArchivePlan={handleArchivePlan}
            />
          )}

          {currentTab === 'staff' && (
            <StaffView
              staff={staff}
              onAddStaff={handleAddStaff}
              members={members}
            />
          )}

          {currentTab === 'classes' && (
            <ClassesView
              classes={classes}
              onOpenCheckIn={() => setCheckInModalOpen(true)}
            />
          )}

          {currentTab === 'payments' && (
            <PaymentsView
              payments={payments}
              onRecordPayment={handleRecordPayment}
              members={members}
              plans={plans}
            />
          )}

          {currentTab === 'leads' && (
            <LeadsView
              leads={leads}
              onAddLead={handleAddLead}
              onUpdateLeadStatus={handleUpdateLeadStatus}
              onConvertToMember={handleConvertToMember}
            />
          )}

          {currentTab === 'reports' && <ReportsView />}

        </main>
      </div>

      {/* ── Global Modals ── */}
      <AddMemberModal
        isOpen={addMemberModalOpen}
        onClose={() => setAddMemberModalOpen(false)}
        onSaveMember={handleSaveMember}
        plans={plans}
      />

      <CheckInModal
        isOpen={checkInModalOpen}
        onClose={() => setCheckInModalOpen(false)}
        onRecordCheckin={handleRecordCheckin}
      />

      {/* Logout Confirmation */}
      {logoutConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 border border-[#ECE7DC] shadow-2xl space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#14110B]">Sign Out of Pulse GMS?</h3>
              <p className="text-xs text-[#7A7367] mt-1">
                You'll be taken back to the landing page. Your data is saved locally.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setLogoutConfirmOpen(false)}
                className="figma-btn-secondary !text-xs !h-9 !px-4"
              >
                Stay Logged In
              </button>
              <button
                onClick={confirmLogout}
                className="h-9 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors"
              >
                Confirm Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
