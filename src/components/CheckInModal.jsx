import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  QrCode, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Scan, 
  User, 
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Volume2
} from 'lucide-react';

export default function CheckInModal({ isOpen, onClose, onRecordCheckin }) {
  const [scanState, setScanState] = useState('idle'); // 'idle' | 'valid' | 'invalid' | 'duplicate'
  const [scannedMember, setScannedMember] = useState(null);

  if (!isOpen) return null;

  const simulateScan = (type) => {
    if (type === 'valid') {
      const member = {
        name: 'Aarav Mehta',
        id: 'M-8491',
        plan: 'Annual Elite Pass',
        status: 'Active Pass (Valid till 31 Oct 2027)',
        gate: 'Turnstile A (Main Entrance)',
        time: 'Just now'
      };
      setScannedMember(member);
      setScanState('valid');
      onRecordCheckin({
        memberName: member.name,
        memberId: member.id,
        plan: member.plan,
        status: 'Approved (Gate Unlocked)',
        gate: member.gate
      });
    } else if (type === 'invalid') {
      const member = {
        name: 'Dev Patel',
        id: 'M-7703',
        plan: 'Monthly Strength & Cardio',
        status: 'Expired 2 days ago (Renew Required)',
        gate: 'Turnstile A (Main Entrance)',
        time: 'Just now'
      };
      setScannedMember(member);
      setScanState('invalid');
      onRecordCheckin({
        memberName: member.name,
        memberId: member.id,
        plan: member.plan,
        status: 'Denied - Expired Pass',
        gate: member.gate
      });
    } else if (type === 'duplicate') {
      const member = {
        name: 'Isha Nair',
        id: 'M-8012',
        plan: 'Quarterly All-Access',
        status: 'Already Checked In (14 mins ago at Gate A)',
        gate: 'Turnstile B (Cardio Floor)',
        time: 'Just now'
      };
      setScannedMember(member);
      setScanState('duplicate');
      onRecordCheckin({
        memberName: member.name,
        memberId: member.id,
        plan: member.plan,
        status: 'Denied - Duplicate Attempt',
        gate: member.gate
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl bg-white border border-[#ECE7DC] shadow-2xl relative overflow-hidden">
        
        {/* Top Header */}
        <div className="p-5 border-b border-[#ECE7DC] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FEF3E0] border border-[#D9A441]/30 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-[#D9A441]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#14110B] tracking-tight">
                Live Turnstile Biometric & QR Scanner
              </h3>
              <p className="text-[11px] text-[#7A7367]">
                Iron District Fitness • Real-time hardware integration sync
              </p>
            </div>
          </div>

          <button
            onClick={() => { setScanState('idle'); onClose(); }}
            className="p-1.5 rounded-lg text-[#7A7367] hover:text-[#14110B] hover:bg-[#F8F5EF] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scanner Viewport with Laser Scanning Bar */}
        <div className="p-6 bg-[#0A0906] flex flex-col items-center justify-center relative overflow-hidden text-center min-h-[220px]">
          
          {/* Animated Laser Scanning Line */}
          <motion.div
            animate={{ y: [-70, 70, -70] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-48 h-0.5 bg-gradient-to-r from-transparent via-[#D9A441] to-transparent shadow-[0_0_12px_#D9A441] absolute z-10 pointer-events-none"
          />

          {/* QR Viewfinder Target */}
          <div className="w-44 h-44 rounded-2xl border-2 border-dashed border-[#D9A441]/40 flex flex-col items-center justify-center p-3 relative bg-black/40">
            <div className="w-24 h-24 rounded-lg bg-white p-2 flex items-center justify-center shadow-md">
              <QrCode className="w-20 h-20 text-[#14110B]" />
            </div>
            <span className="text-[10px] text-[#A39C8E] mt-2 font-mono">
              Align member QR code
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-[#D9A441] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Opticon Optical Sensor Active • 120 FPS</span>
          </div>
        </div>

        {/* State Display & Action Buttons */}
        <div className="p-5 space-y-4">
          
          {/* Quick Demo Simulator Buttons */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#14110B]">Simulate Test Access States:</span>
              <span className="text-[10px] text-[#7A7367]">Click any state to test validation</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => simulateScan('valid')}
                className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex flex-col items-center gap-1 transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>1. Valid Pass</span>
                <span className="text-[9px] text-emerald-600 font-normal">Aarav Mehta</span>
              </button>

              <button
                type="button"
                onClick={() => simulateScan('invalid')}
                className="p-2.5 rounded-xl border border-red-300 bg-red-50 hover:bg-red-100 text-red-800 text-xs font-semibold flex flex-col items-center gap-1 transition-all"
              >
                <XCircle className="w-4 h-4 text-red-600" />
                <span>2. Expired Pass</span>
                <span className="text-[9px] text-red-600 font-normal">Dev Patel</span>
              </button>

              <button
                type="button"
                onClick={() => simulateScan('duplicate')}
                className="p-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold flex flex-col items-center gap-1 transition-all"
              >
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>3. Duplicate</span>
                <span className="text-[9px] text-amber-600 font-normal">Isha Nair</span>
              </button>
            </div>
          </div>

          {/* Validation Feedback Result */}
          {scanState !== 'idle' && scannedMember && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border ${
                scanState === 'valid'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : scanState === 'invalid'
                  ? 'bg-red-50 border-red-300 text-red-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white ${
                    scanState === 'valid' ? 'bg-emerald-600' : scanState === 'invalid' ? 'bg-red-600' : 'bg-amber-600'
                  }`}>
                    {scanState === 'valid' ? <CheckCircle2 className="w-6 h-6" /> : scanState === 'invalid' ? <XCircle className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#14110B]">{scannedMember.name} ({scannedMember.id})</h4>
                    <p className="text-xs text-[#7A7367] mt-0.5">{scannedMember.plan}</p>
                    <span className="text-xs font-semibold mt-1 block">
                      {scannedMember.status}
                    </span>
                  </div>
                </div>

                <div className="text-right text-[11px] text-[#7A7367]">
                  <span className="font-mono">{scannedMember.gate}</span>
                </div>
              </div>

              {scanState === 'valid' && (
                <div className="mt-3 pt-2.5 border-t border-emerald-200 text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Turnstile Gate Unlocked — Member Checked In Successfully</span>
                </div>
              )}
            </motion.div>
          )}

        </div>

      </div>
    </div>
  );
}
