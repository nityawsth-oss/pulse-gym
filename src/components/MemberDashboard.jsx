import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Dumbbell, Calendar, Plus, Trash2, Award, QrCode, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockBackend, isSupabaseConfigured } from '../lib/supabase';

export default function MemberDashboard({ onOpenSupabaseModal }) {
  const { user, signOut } = useAuth();
  const [workouts, setWorkouts] = useState(mockBackend.workouts.getAll());
  const [bookings, setBookings] = useState(mockBackend.bookings.getAll());

  // Form state
  const [exercise, setExercise] = useState('');
  const [category, setCategory] = useState('Chest');
  const [sets, setSets] = useState(4);
  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState('80 kg');
  const [logSuccess, setLogSuccess] = useState(false);

  const handleAddWorkout = (e) => {
    e.preventDefault();
    if (!exercise.trim()) return;

    const updated = mockBackend.workouts.add({
      exercise,
      category,
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight
    });
    setWorkouts(updated);
    setExercise('');
    setLogSuccess(true);
    setTimeout(() => setLogSuccess(false), 2500);
  };

  const handleDeleteWorkout = (id) => {
    const updated = mockBackend.workouts.delete(id);
    setWorkouts(updated);
  };

  const handleCancelBooking = (id) => {
    const updated = mockBackend.bookings.cancel(id);
    setBookings(updated);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Welcome Banner */}
      <div className="gym-card rounded-3xl p-6 sm:p-8 mb-8 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            <span>Active Member Profile</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            WELCOME BACK, <span className="energy-text">{user?.name || user?.email?.split('@')[0] || 'ATHLETE'}</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-mono">
            Member ID: <strong className="text-white">{user?.memberId || 'GP-928192'}</strong> • Tier: <strong className="text-orange-400">{user?.membershipTier || 'Iron Muscle Monthly'}</strong>
          </p>
        </div>

        {/* Digital Gym Pulse Card */}
        <div className="w-full md:w-auto p-5 rounded-2xl bg-gradient-to-br from-[#1c2233] via-[#0d1017] to-black border border-white/15 shadow-2xl relative overflow-hidden sm:min-w-[300px]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="font-heading text-lg font-bold tracking-wider text-white">PULSE <span className="text-orange-400">GYM</span></span>
              <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">24/7 Digital Pass</span>
            </div>
            <Flame className="w-5 h-5 text-orange-500" />
          </div>

          <div className="my-3 font-mono text-xs text-slate-300">
            <div>NAME: <span className="text-white font-bold">{user?.name || user?.email?.split('@')[0]}</span></div>
            <div className="text-[10px] text-slate-400">STATUS: <span className="text-emerald-400">● ACTIVE ACCESS</span></div>
          </div>

          {/* Barcode graphic */}
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
            <div className="h-6 flex items-center gap-0.5 opacity-80">
              {[3, 1, 2, 4, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2].map((w, i) => (
                <div key={i} className="bg-white h-full" style={{ width: `${w * 1.5}px` }} />
              ))}
            </div>
            <span className="text-[10px] font-mono text-slate-400">{user?.memberId || 'GP-892104'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Workout Logger & History */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Workout Logger Form */}
          <div className="gym-card rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold uppercase tracking-wide text-white">
                    Log Today's Workout
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">Syncs directly to Supabase Postgres</span>
                </div>
              </div>

              {logSuccess && (
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Logged!</span>
                </span>
              )}
            </div>

            <form onSubmit={handleAddWorkout} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Exercise Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Incline Dumbbell Press"
                    value={exercise}
                    onChange={(e) => setExercise(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Muscle Group</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090b12] border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  >
                    <option value="Chest">Chest</option>
                    <option value="Back">Back</option>
                    <option value="Legs">Legs & Quads</option>
                    <option value="Shoulders">Shoulders</option>
                    <option value="Arms">Arms (Biceps/Triceps)</option>
                    <option value="Core & Abs">Core & Abs</option>
                    <option value="Cardio / HIIT">Cardio / HIIT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Sets</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={sets}
                    onChange={(e) => setSets(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm text-center"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Reps / Set</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm text-center"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Weight / Load</label>
                  <input
                    type="text"
                    placeholder="e.g. 90 kg"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm text-center"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-heading font-bold uppercase tracking-wider text-xs shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Save Workout to Supabase DB</span>
              </motion.button>
            </form>
          </div>

          {/* Workout History */}
          <div className="gym-card rounded-3xl p-6 sm:p-8">
            <h3 className="font-heading text-2xl font-bold uppercase tracking-wide text-white mb-4">
              Recent Workout Logs ({workouts.length})
            </h3>

            <div className="space-y-3">
              {workouts.map((w) => (
                <div
                  key={w.id}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between hover:bg-white/[0.04] transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded font-semibold">
                        {w.category}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">{w.date}</span>
                    </div>
                    <div className="font-heading text-lg font-bold text-white tracking-wide">
                      {w.exercise}
                    </div>
                    <div className="text-xs font-mono text-slate-300">
                      {w.sets} Sets × {w.reps} Reps @ <strong className="text-orange-400">{w.weight}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteWorkout(w.id)}
                    className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Class Reservations & Supabase Status */}
        <div className="space-y-8">
          
          {/* Reserved Classes */}
          <div className="gym-card rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-400" />
                <span>Booked Classes</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">{bookings.length} Active</span>
            </div>

            <div className="space-y-3">
              {bookings.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center font-mono">No active class bookings. Go to schedule to reserve!</p>
              ) : (
                bookings.map((b) => (
                  <div key={b.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <div className="font-heading text-base font-bold text-white">{b.classTitle}</div>
                    <div className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-orange-400" />
                      <span>{b.time}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-slate-400 font-mono">{b.room} • Coach {b.trainer}</span>
                      <button
                        onClick={() => handleCancelBooking(b.id)}
                        className="text-[11px] text-red-400 hover:text-red-300 font-mono underline"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Supabase Technical Information Card */}
          <div className="gym-card rounded-3xl p-6 border border-orange-500/20 bg-gradient-to-b from-[#10131d] to-[#0a0d14]">
            <h4 className="font-heading text-lg font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Backend Architecture</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every workout log and membership profile is structured to synchronize with your Supabase PostgreSQL cluster.
            </p>

            <button
              onClick={onOpenSupabaseModal}
              className="mt-4 w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs border border-white/10 transition-colors"
            >
              View Supabase SQL Schema
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
