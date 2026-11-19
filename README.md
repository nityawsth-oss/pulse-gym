# 🏆 Pulse GMS — Enterprise Gym Management System (Gold & Dark Edition)

Built for **QodeNexus** | Designed by **Nitya Sharma** | Powered by **React 19 + Supabase + Tailwind CSS**

---

## 🎨 Theme & Design Language
- **Palette:** Luxury Gold (`#D4AF37`, `#F5D061`, `#AA820A`) on Deep Obsidian Canvas (`#08090C`, `#0E1017`, `#141722`)
- **Aesthetic:** High-end SaaS B2B dashboard with micro-interactions, subtle gold glows, status pills, and turnstile check-in animations.

---

## 🚀 Key Modules & User Flows Implemented

### 1. 👥 Member Management
- **Connected 4-Step Add Member Flow Wizard:**
  - **Step 1:** Personal & Contact details (Phone, Email, Residential address, Emergency contact).
  - **Step 2:** Health & Fitness metrics (Blood group, Height, Weight, Fitness goal, Lifting experience, Medical clearance notes).
  - **Step 3:** Membership Plan selection (All 5 plans with pricing & coach assignment).
  - **Step 4:** Joining fee & payment confirmation (Fee breakdown, Payment methods: Card/Cash/UPI/Wire, Auto-renew toggle & instant credential pass generation).
- **Comprehensive Member Profile:**
  - 4 Dynamic Tabs: *Overview & Contact*, *Membership & Renewal*, *Invoices & Payment History*, *Turnstile Attendance Logs*.
  - Member actions: **Freeze Membership**, **Resume Access**, and **Cancel Plan** with warning confirmation dialogs.
  - Downloadable Turnstile Digital Pass Card with QR code.

### 2. 💳 Membership Plans (All 5 Active Plans Visible!)
- **Fixed Display:** All 5 active plans now visible in the grid (Day Beast Pass, Silver Fitness, Gold Muscle Pro, Platinum Beast VIP, Corporate Annual Elite).
- **Create Plan Modal:** Configure plan name, price, interval, marketing description, and custom benefits.
- **Edit Plan Configuration:** Modify existing active plans.
- **Archive / Restore:** Archive plans with safety confirmation dialog and restore functionality.

### 3. 🏋️ Staff & Trainers
- **Coach Directory:** Specialization badges, assigned member counters, star ratings, and contact info.
- **Invite Staff Modal:** Onboard new trainers with role & shift hours assignment.
- **Assign Member to Coach:** 1-click modal to pair athletes with certified trainers.

### 4. 📅 Classes & Turnstile Attendance
- **Live Class Schedules:** Capacity meters (booked vs max slots), room assignments, and intensity tags.
- **Create & Cancel Class:** Schedule new sessions or reschedule with athlete notifications.
- **Interactive QR Scanner Modal:**
  - 🟢 **Valid Member Check-in:** Turnstile unlocked, approval badge.
  - 🔴 **Expired Member Check-in:** Access denied alert with expired date.
  - 🟡 **Duplicate Check-in:** Fraud prevention warning for already-scanned badges.

### 5. 💰 Payments & Subscriptions
- **Financial Ledger:** Filter transactions by Paid, Failed, and Refunded.
- **Record New Payment:** Cash, Card, UPI, and Bank Wire processing.
- **Gateway Retry Flow:** One-click retry on declined cards.
- **Refund Confirmation:** Process compliant refunds with audit logs.

### 6. 🎯 Leads & Free Trial Pipeline
- **Lead Funnel:** Track prospects from Instagram, Walk-ins, Google Maps, and Referrals.
- **Schedule Free Trial:** Date and time slot booking confirmation.
- **Convert to Paid Member:** 1-click conversion directly launching the 4-step wizard.

### 7. 📈 Reports & Analytics
- **KPI Metrics:** Monthly MRR ($42,850), 1,420 Active Members, 284 Daily Check-ins.
- **Branch & Date Filters:** Filter analytics across branch locations and quarters.
- **Export Engine:** Download PDF, CSV, or Excel audit reports.

---

## ⚡ How to Run
```bash
# In VS Code terminal:
npm run dev
```
Open **http://localhost:5173** in your browser!
