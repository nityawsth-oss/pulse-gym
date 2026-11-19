import React, { useState } from 'react';
import { Receipt, CreditCard, Plus, Search, CheckCircle2, XCircle, Clock, RotateCcw, Download, AlertTriangle, X } from 'lucide-react';
import { INITIAL_MEMBERS, INITIAL_PLANS } from '../lib/supabase';

export default function PaymentsView({ payments, onRecordPayment, members = INITIAL_MEMBERS, plans = INITIAL_PLANS }) {
  const [filterStatus, setFilterStatus] = useState('All');
  const [recordModalOpen, setRecordModalOpen] = useState(false);
  const [refundModalPayment, setRefundModalPayment] = useState(null);

  const [formState, setFormState] = useState({
    memberName: members[0]?.name || 'Aarav Mehta',
    amount: 1499,
    plan: 'Monthly — Iron District',
    method: 'UPI / QR Transfer',
    status: 'Paid'
  });

  const handleRecordSubmit = (e) => {
    e.preventDefault();
    onRecordPayment(formState);
    setRecordModalOpen(false);
  };

  const filteredPayments = payments.filter(p =>
    filterStatus === 'All' ? true : p.status === filterStatus
  );

  const totalCollected = payments.filter(p => p.status === 'Paid').reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const STATUS_STYLE = {
    Paid:     { chip: 'bg-emerald-50 text-emerald-700', icon: CheckCircle2, iconClass: 'text-emerald-500' },
    Failed:   { chip: 'bg-red-50 text-red-600',         icon: XCircle,     iconClass: 'text-red-500' },
    Refunded: { chip: 'bg-blue-50 text-blue-600',       icon: RotateCcw,   iconClass: 'text-blue-500' },
    Pending:  { chip: 'bg-amber-50 text-amber-700',     icon: Clock,       iconClass: 'text-amber-500' },
  };

  const METHOD_ICONS = {
    'Credit Card': '💳',
    'UPI / QR Transfer': '📱',
    'Cash / Front Desk': '💵',
    'Bank Direct Debit': '🏦',
  };

  return (
    <div className="space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#14110B] tracking-tight">Payments & Invoices</h2>
          <p className="text-xs text-[#7A7367] mt-0.5">Track all transactions, refunds and subscription renewals</p>
        </div>
        <button
          onClick={() => setRecordModalOpen(true)}
          className="figma-btn-primary flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Record Payment</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="figma-card p-4">
          <span className="text-xs text-[#7A7367] font-medium">Total Collected</span>
          <div className="text-xl font-bold text-[#14110B] mt-1">₹{totalCollected.toLocaleString('en-IN')}</div>
          <span className="text-[11px] text-emerald-600 font-medium">+18.4% this month</span>
        </div>
        <div className="figma-card p-4">
          <span className="text-xs text-[#7A7367] font-medium">Successful</span>
          <div className="text-xl font-bold text-[#14110B] mt-1">{payments.filter(p => p.status === 'Paid').length}</div>
          <span className="text-[11px] text-[#7A7367]">Invoices paid</span>
        </div>
        <div className="figma-card p-4">
          <span className="text-xs text-[#7A7367] font-medium">Failed / Pending</span>
          <div className="text-xl font-bold text-red-600 mt-1">{payments.filter(p => p.status === 'Failed').length}</div>
          <span className="text-[11px] text-red-500">Retries scheduled</span>
        </div>
        <div className="figma-card p-4">
          <span className="text-xs text-[#7A7367] font-medium">Refunds Processed</span>
          <div className="text-xl font-bold text-[#14110B] mt-1">{payments.filter(p => p.status === 'Refunded').length}</div>
          <span className="text-[11px] text-[#7A7367]">7-day guarantee</span>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="figma-card overflow-hidden">
        
        {/* Filter Tabs */}
        <div className="p-4 border-b border-[#ECE7DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 p-1 bg-[#F8F5EF] rounded-xl border border-[#ECE7DC]">
            {['All', 'Paid', 'Failed', 'Refunded'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  filterStatus === status
                    ? 'bg-white text-[#14110B] shadow-sm border border-[#ECE7DC]'
                    : 'text-[#7A7367] hover:text-[#14110B]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <span className="text-xs text-[#7A7367]">{filteredPayments.length} transactions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#FAFAF8]">
                <th className="gms-th">Transaction</th>
                <th className="gms-th">Member</th>
                <th className="gms-th">Plan</th>
                <th className="gms-th">Method</th>
                <th className="gms-th">Amount</th>
                <th className="gms-th">Date</th>
                <th className="gms-th">Status</th>
                <th className="gms-th text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((p, idx) => {
                const sc = STATUS_STYLE[p.status] || STATUS_STYLE.Paid;
                const StatusIcon = sc.icon;
                return (
                  <tr key={p.id || idx} className="hover:bg-[#FDFCFA] transition-colors">
                    <td className="gms-td">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#F8F5EF] border border-[#ECE7DC] flex items-center justify-center">
                          <Receipt className="w-3.5 h-3.5 text-[#D9A441]" />
                        </div>
                        <span className="text-xs font-mono text-[#7A7367]">#{p.id || `TXN-${String(idx+1).padStart(3,'0')}`}</span>
                      </div>
                    </td>
                    <td className="gms-td">
                      <span className="text-xs font-semibold text-[#14110B]">{p.memberName}</span>
                    </td>
                    <td className="gms-td">
                      <span className="text-xs text-[#4A453D]">{p.plan}</span>
                    </td>
                    <td className="gms-td">
                      <span className="text-xs text-[#4A453D]">
                        {METHOD_ICONS[p.method] || '💰'} {p.method}
                      </span>
                    </td>
                    <td className="gms-td">
                      <span className="text-xs font-bold text-[#14110B]">₹{(p.amount || 0).toLocaleString('en-IN')}</span>
                    </td>
                    <td className="gms-td">
                      <span className="text-xs text-[#7A7367]">{p.date}</span>
                    </td>
                    <td className="gms-td">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${sc.chip}`}>
                        <StatusIcon className={`w-3 h-3 ${sc.iconClass}`} />
                        {p.status}
                      </span>
                    </td>
                    <td className="gms-td text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="p-1.5 rounded-lg hover:bg-[#F8F5EF] text-[#7A7367] border border-[#ECE7DC]" title="Download Invoice">
                          <Download className="w-3 h-3" />
                        </button>
                        {p.status === 'Paid' && (
                          <button
                            onClick={() => setRefundModalPayment(p)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 border border-[#ECE7DC]"
                            title="Process Refund"
                          >
                            <RotateCcw className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-sm text-[#7A7367]">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {recordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#ECE7DC] shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#ECE7DC]">
              <h3 className="text-sm font-bold text-[#14110B]">Record New Payment</h3>
              <button onClick={() => setRecordModalOpen(false)} className="p-1.5 rounded-lg hover:bg-[#F8F5EF] text-[#7A7367]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRecordSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#14110B] mb-1">Member *</label>
                <select
                  value={formState.memberName}
                  onChange={(e) => setFormState({ ...formState, memberName: e.target.value })}
                  className="gms-input"
                >
                  {members.map(m => (
                    <option key={m.id} value={m.name}>{m.name} ({m.planName})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Amount (₹) *</label>
                  <input
                    type="number" min="1" required
                    value={formState.amount}
                    onChange={(e) => setFormState({ ...formState, amount: parseFloat(e.target.value) })}
                    className="gms-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#14110B] mb-1">Payment Method</label>
                  <select
                    value={formState.method}
                    onChange={(e) => setFormState({ ...formState, method: e.target.value })}
                    className="gms-input"
                  >
                    <option>UPI / QR Transfer</option>
                    <option>Credit Card</option>
                    <option>Cash / Front Desk</option>
                    <option>Bank Direct Debit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14110B] mb-1">Plan / Memo</label>
                <input
                  type="text"
                  value={formState.plan}
                  onChange={(e) => setFormState({ ...formState, plan: e.target.value })}
                  placeholder="Monthly renewal, joining fee..."
                  className="gms-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14110B] mb-1">Status</label>
                <select
                  value={formState.status}
                  onChange={(e) => setFormState({ ...formState, status: e.target.value })}
                  className="gms-input"
                >
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Failed</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#ECE7DC]">
                <button type="button" onClick={() => setRecordModalOpen(false)} className="figma-btn-secondary !text-xs !h-9 !px-4">Cancel</button>
                <button type="submit" className="figma-btn-primary !text-xs !h-9 !px-5">Record & Issue Receipt</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {refundModalPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 border border-[#ECE7DC] shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
                <AlertTriangle className="w-4.5 h-4.5 text-red-600" />
              </div>
              <h3 className="text-sm font-bold text-[#14110B]">Process Refund?</h3>
            </div>
            <p className="text-xs text-[#7A7367]">
              This will refund <strong>₹{(refundModalPayment.amount || 0).toLocaleString('en-IN')}</strong> to {refundModalPayment.memberName} via {refundModalPayment.method}.
            </p>
            <div className="flex justify-end gap-2 pt-1">
              <button onClick={() => setRefundModalPayment(null)} className="figma-btn-secondary !text-xs !h-9 !px-3">Cancel</button>
              <button
                onClick={() => { refundModalPayment.status = 'Refunded'; setRefundModalPayment(null); }}
                className="h-9 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors"
              >
                Confirm Refund
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
