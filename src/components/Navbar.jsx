import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Dumbbell, Database, User, Menu, X, ChevronRight, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenAuth, onGoToDashboard, currentView, onGoToLanding, onOpenSupabaseModal }) {
  const { user, signOut, isSupabaseConfigured } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#08090d]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5 shadow-orange-950/20' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={onGoToLanding}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-red-600 via-orange-500 to-amber-400 p-[1.5px] shadow-lg shadow-orange-600/30 group-hover:shadow-orange-600/50 transition-all duration-300">
              <div className="w-full h-full bg-[#0d1017] rounded-[10px] flex items-center justify-center group-hover:bg-[#121622] transition-colors">
                <Flame className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="font-heading text-2xl tracking-wider text-white font-bold leading-none flex items-center gap-1">
                GYM <span className="energy-text">PULSE</span>
              </span>
              <span className="text-[10px] tracking-[0.25em] text-orange-400/90 uppercase font-mono font-semibold">
                ELITE FITNESS LAB
              </span>
            </div>
          </div>

          {/* Center Navigation (Landing View) */}
          {currentView === 'landing' && (
            <div className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <a href="#programs" className="px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold text-slate-300 hover:text-orange-400 transition-colors">
                Programs
              </a>
              <a href="#bmi" className="px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold text-slate-300 hover:text-orange-400 transition-colors">
                BMI Calculator
              </a>
              <a href="#schedule" className="px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold text-slate-300 hover:text-orange-400 transition-colors">
                Class Schedule
              </a>
              <a href="#trainers" className="px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold text-slate-300 hover:text-orange-400 transition-colors">
                Trainers
              </a>
              <a href="#pricing" className="px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold text-slate-300 hover:text-orange-400 transition-colors">
                Memberships
              </a>
            </div>
          )}

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-3">
            {/* Supabase Status Pill */}
            <button
              onClick={onOpenSupabaseModal}
              title="Click to view Supabase connection details"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border transition-all duration-300 ${
                isSupabaseConfigured
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 shadow-sm shadow-emerald-500/20'
                  : 'bg-orange-500/10 text-orange-300 border-orange-500/30 hover:bg-orange-500/20'
              }`}
            >
              <Database className="w-3.5 h-3.5 animate-pulse" />
              <span>{isSupabaseConfigured ? 'Supabase Live' : 'Supabase Demo'}</span>
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                {currentView === 'landing' ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onGoToDashboard}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 transition-all"
                  >
                    <Activity className="w-4 h-4" />
                    <span>Member Portal</span>
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onGoToLanding}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider border border-white/10 transition-all"
                  >
                    Main Website
                  </motion.button>
                )}

                <button
                  onClick={signOut}
                  className="text-xs text-slate-400 hover:text-red-400 px-2 py-1 transition-colors uppercase tracking-wider"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 text-xs uppercase tracking-wider font-bold text-slate-300 hover:text-white transition-colors"
                >
                  Member Sign In
                </button>
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 0 25px rgba(255, 107, 0, 0.45)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onOpenAuth('signup')}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 transition-all"
                >
                  <span>Join Gym Pulse</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0d1017]/95 backdrop-blur-2xl border-b border-white/10 px-6 pt-4 pb-6 mt-3 space-y-3"
          >
            <a href="#programs" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm uppercase tracking-wider font-semibold text-slate-300 hover:text-orange-400">
              Workout Programs
            </a>
            <a href="#bmi" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm uppercase tracking-wider font-semibold text-slate-300 hover:text-orange-400">
              BMI Calculator
            </a>
            <a href="#schedule" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm uppercase tracking-wider font-semibold text-slate-300 hover:text-orange-400">
              Class Schedule
            </a>
            <a href="#trainers" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm uppercase tracking-wider font-semibold text-slate-300 hover:text-orange-400">
              Elite Trainers
            </a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm uppercase tracking-wider font-semibold text-slate-300 hover:text-orange-400">
              Membership Plans
            </a>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              {user ? (
                <>
                  <button
                    onClick={() => {
                      currentView === 'landing' ? onGoToDashboard() : onGoToLanding();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white text-xs uppercase tracking-wider font-bold"
                  >
                    {currentView === 'landing' ? 'Open Member Portal' : 'View Main Website'}
                  </button>
                  <button
                    onClick={() => { signOut(); setMobileMenuOpen(false); }}
                    className="w-full py-2 text-xs uppercase tracking-wider text-slate-400 hover:text-red-400"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }}
                    className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs uppercase tracking-wider font-bold"
                  >
                    Member Login
                  </button>
                  <button
                    onClick={() => { onOpenAuth('signup'); setMobileMenuOpen(false); }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs uppercase tracking-wider font-bold"
                  >
                    Join Gym Pulse Today
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
