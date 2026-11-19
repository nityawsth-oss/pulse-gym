import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  Filter, 
  FileText, 
  Check, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  CreditCard,
  ArrowUpRight,
  Printer,
  Sparkles
} from 'lucide-react';

export default function ReportsView() {
  const [dateRange, setDateRange] = useState('This Month (Nov 2026)');
  const [branch, setBranch] = useState('Indiranagar Club (HQ)');
  const [exportModal, setExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('PDF');
  const [exportedSuccess, setExportedSuccess] = useState(false);

  const handleExport = () => {
    setExportedSuccess(true);
    setTimeout(() => {
      setExportedSuccess(false);
      setExportModal(false);
    }, 1500);
  };

  const MONTHLY_REVENUE_DATA = [
    { month: 'Jun', amount: 590000, height: '62%' },
    { month: 'Jul', amount: 640000, height: '70%' },
    { month: 'Aug', amount: 710000, height: '78%' },
    { month: 'Sep', amount: 780000, height: '86%' },
    { month: 'Oct', amount: 810000, height: '91%' },
    { month: 'Nov', amount: 842300, height: '96%', active: true },
  ];

  const HOURLY_PEAKS = [
    { time: '06 AM', count: 18, pct: 40 },
    { time: '07 AM', count: 38, pct: 85 },
    { time: '08 AM', count: 42, pct: 95 },
    { time: '09 AM', count: 24, pct: 55 },
    { time: '05 PM', count: 32, pct: 72 },
    { time: '06 PM', count: 46, pct: 100 },
    { time: '07 PM', count: 41, pct: 90 },
    { time: '08 PM', count: 22, pct: 50 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold text-[#D9A441] bg-[#FEF3E0] px-2.5 py-0.5 rounded-full border border-[#D9A441]/30">
              Q4 Financial & Operating Audit
            </span>
            <span className="text-xs text-[#7A7367]">Deterministic Data Sheet</span>
          </div>
          <h2 className="text-xl font-bold text-[#14110B] tracking-tight">
            Executive Reports & Analytics
          </h2>
        </div>

        <button
          onClick={() => setExportModal(true)}
          className="figma-btn-primary !text-xs !h-9 !px-4 flex items-center gap-1.5 font-semibold"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Club Report</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="figma-card p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-[#7A7367]">
            <Calendar className="w-4 h-4 text-[#D9A441]" />
            <span className="font-semibold text-[#14110B]">Date Range:</span>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="gms-input !w-auto !h-8 py-1 text-xs"
            >
              <option value="This Month (Nov 2026)">This Month (Nov 2026)</option>
              <option value="Last Month (Oct 2026)">Last Month (Oct 2026)</option>
              <option value="Current Quarter (Q4)">Current Quarter (Q4)</option>
              <option value="Full Year 2026">Full Year 2026</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#7A7367]">
            <Filter className="w-4 h-4 text-[#D9A441]" />
            <span className="font-semibold text-[#14110B]">Branch:</span>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="gms-input !w-auto !h-8 py-1 text-xs"
            >
              <option value="Indiranagar Club (HQ)">Iron District Fitness (Indiranagar HQ)</option>
              <option value="Koramangala Branch">Iron District Fitness (Koramangala)</option>
              <option value="HSR Layout Arena">Iron District Fitness (HSR Layout)</option>
            </select>
          </div>
        </div>

        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Ledger Verified</span>
        </span>
      </div>

      {/* Top Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="figma-card p-4">
          <span className="text-xs text-[#7A7367] font-medium">Verified Monthly Collections</span>
          <div className="text-2xl font-bold text-[#14110B] mt-1">₹8,42,300</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 mt-1 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12.4% vs previous month</span>
          </div>
        </div>

        <div className="figma-card p-4">
          <span className="text-xs text-[#7A7367] font-medium">Total Registered Athletes</span>
          <div className="text-2xl font-bold text-[#14110B] mt-1">1,284</div>
          <div className="text-[11px] text-[#7A7367] mt-1">
            Active: 1,102 • Expiring: 94 • Expired: 88
          </div>
        </div>

        <div className="figma-card p-4">
          <span className="text-xs text-[#7A7367] font-medium">Average Revenue per Member</span>
          <div className="text-2xl font-bold text-[#14110B] mt-1">₹6,840</div>
          <div className="text-[11px] text-[#7A7367] mt-1">
            Annual & Quarterly plans mix
          </div>
        </div>

        <div className="figma-card p-4">
          <span className="text-xs text-[#7A7367] font-medium">Today's Check-ins & Utilization</span>
          <div className="text-2xl font-bold text-[#14110B] mt-1">236 Visits</div>
          <div className="text-[11px] text-[#D9A441] mt-1 font-semibold">
            Peak footfall: 06:30 PM
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Revenue Growth Bar Chart */}
        <div className="lg:col-span-2 figma-card p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-[#14110B]">Monthly Revenue Trend (INR)</h3>
              <p className="text-xs text-[#7A7367]">Consistent revenue growth over the last 6 months</p>
            </div>
            <span className="text-xs font-bold text-[#D9A441]">H2 2026 Performance</span>
          </div>

          <div className="h-56 flex items-end justify-between gap-4 pt-6 px-2 border-b border-[#ECE7DC]">
            {MONTHLY_REVENUE_DATA.map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-bold text-[#14110B] opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹{(item.amount / 1000).toFixed(0)}k
                </span>
                <div
                  className={`w-full max-w-[48px] rounded-t-lg transition-all ${
                    item.active
                      ? 'bg-[#D9A441] shadow-md shadow-[#D9A441]/20'
                      : 'bg-[#ECE7DC] group-hover:bg-[#DDD6C7]'
                  }`}
                  style={{ height: item.height }}
                />
                <span className={`text-xs font-semibold mt-1 ${item.active ? 'text-[#D9A441]' : 'text-[#7A7367]'}`}>
                  {item.month}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-[#7A7367]">
            <span>Minimum: ₹5.9L (Jun)</span>
            <span>Current: <strong>₹8,42,300 (Nov)</strong></span>
          </div>
        </div>

        {/* Peak Hours Heatmap breakdown */}
        <div className="figma-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#14110B]">Peak Footfall Distribution</h3>
              <p className="text-xs text-[#7A7367]">Gym floor hourly density</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {HOURLY_PEAKS.map((hp) => (
              <div key={hp.time} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#14110B]">{hp.time}</span>
                  <span className="text-[#7A7367]">{hp.count} check-ins</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#F8F5EF] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      hp.pct >= 90 ? 'bg-[#D9A441]' : hp.pct >= 60 ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${hp.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Export Report Modal */}
      {exportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 border border-[#ECE7DC] shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-[#ECE7DC] pb-3">
              <h3 className="text-base font-bold text-[#14110B]">Export Operational Report</h3>
              <button onClick={() => setExportModal(false)} className="p-1 rounded-lg text-[#7A7367]">
                <X className="w-4 h-4" />
              </button>
            </div>

            {exportedSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-950">Report Exported Successfully!</h4>
                <p className="text-xs text-emerald-800">
                  Pulse_GMS_{branch.split(' ')[0]}_Audit_{dateRange.replace(/\s+/g, '_')}.pdf has been downloaded.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#14110B] mb-1">Export Document Format</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setExportFormat('PDF')}
                        className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                          exportFormat === 'PDF'
                            ? 'border-[#D9A441] bg-[#FEF3E0] text-[#14110B]'
                            : 'border-[#ECE7DC] text-[#7A7367]'
                        }`}
                      >
                        Official PDF Executive Deck
                      </button>
                      <button
                        type="button"
                        onClick={() => setExportFormat('XLSX')}
                        className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                          exportFormat === 'XLSX'
                            ? 'border-[#D9A441] bg-[#FEF3E0] text-[#14110B]'
                            : 'border-[#ECE7DC] text-[#7A7367]'
                        }`}
                      >
                        Excel / CSV Raw Ledger
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F8F5EF] border border-[#ECE7DC] text-xs text-[#7A7367] space-y-1">
                    <p>• Includes Member list, Plan revenue breakdown, and Staff hours.</p>
                    <p>• Verified with GST 18% tax ledger compliance.</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#ECE7DC] flex justify-end gap-2">
                  <button
                    onClick={() => setExportModal(false)}
                    className="figma-btn-secondary !text-xs !h-9 !px-4"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleExport}
                    className="figma-btn-primary !text-xs !h-9 !px-5 font-semibold"
                  >
                    Download {exportFormat}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
