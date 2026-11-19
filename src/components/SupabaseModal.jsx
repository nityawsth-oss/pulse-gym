import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Database, Check, Copy, Shield, Key, Terminal } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

const SQL_SCHEMA = `-- 🛡️ PULSE GYM SUPABASE POSTGRESQL SCHEMA
-- Paste this into your Supabase Dashboard > SQL Editor > Run

-- 1. Create Workout Logs Table
CREATE TABLE public.workouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise TEXT NOT NULL,
  category TEXT DEFAULT 'Strength',
  sets INTEGER DEFAULT 4,
  reps INTEGER DEFAULT 10,
  weight TEXT DEFAULT '80 kg',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Class Bookings Table
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  class_title TEXT NOT NULL,
  trainer TEXT NOT NULL,
  booking_time TEXT NOT NULL,
  room TEXT DEFAULT 'Arena 1',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies: Athletes only manage their own workouts & bookings
CREATE POLICY "Users can manage own workouts" 
  ON public.workouts 
  FOR ALL 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own bookings" 
  ON public.bookings 
  FOR ALL 
  USING (auth.uid() = user_id);`;

export default function SupabaseModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl rounded-3xl p-[1.5px] bg-gradient-to-b from-emerald-500/30 via-white/10 to-transparent shadow-2xl"
      >
        <div className="rounded-[23px] bg-[#0c0f18] p-6 sm:p-8 border border-white/5 relative max-h-[85vh] overflow-y-auto">
          
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading text-2xl font-bold uppercase tracking-wider text-white">
                Supabase Backend Setup
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-orange-400'}`} />
                <span className="text-xs font-mono text-slate-400">
                  Status: {isSupabaseConfigured ? 'Connected to Live Supabase' : 'Running in Offline Instant Demo Mode'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="font-bold uppercase tracking-wider text-white flex items-center gap-1.5 font-heading">
                <Key className="w-4 h-4 text-orange-400" />
                How to connect your live Supabase project:
              </span>
              <ol className="list-decimal list-inside space-y-1 text-slate-400 font-mono">
                <li>Create a free account at <strong>supabase.com</strong>.</li>
                <li>Create a new project named <strong>"pulse-gym"</strong>.</li>
                <li>Go to <strong>Project Settings &gt; API</strong> and copy your <strong>Project URL</strong> and <strong>anon key</strong>.</li>
                <li>Paste them into your <code className="text-orange-300">.env</code> file in VS Code.</li>
              </ol>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  Supabase Postgres SQL Schema Script
                </span>
                <button
                  onClick={handleCopySql}
                  className="flex items-center gap-1 px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 text-xs border border-white/10 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied SQL!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy SQL</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-emerald-300 leading-relaxed overflow-x-auto max-h-56">
                <pre>{SQL_SCHEMA}</pre>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-heading text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Close
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
