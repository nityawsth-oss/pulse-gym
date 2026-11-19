import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, User, CheckCircle2, Flame, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockBackend } from '../lib/supabase';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const SCHEDULE_DATA = {
  Monday: [
    { id: 'm1', time: '06:30 AM - 07:30 AM', title: 'HIIT Dawn Shred', trainer: 'Marcus Steel', room: 'Arena 1', spots: 4, intensity: 'High' },
    { id: 'm2', time: '09:00 AM - 10:15 AM', title: 'Hypertrophy Chest & Delts', trainer: 'Jaxson Reed', room: 'Iron Vault', spots: 6, intensity: 'Moderate' },
    { id: 'm3', time: '05:30 PM - 06:45 PM', title: 'CrossFit WOD Metcon', trainer: 'Elena Vance', room: 'Functional Grid', spots: 2, intensity: 'Extreme' },
    { id: 'm4', time: '07:00 PM - 08:00 PM', title: 'Combat Boxing Fundamentals', trainer: 'Tyson Drake', room: 'Striking Ring', spots: 8, intensity: 'High' },
  ],
  Tuesday: [
    { id: 't1', time: '07:00 AM - 08:15 AM', title: 'Deadlift & Barbell Mastery', trainer: 'Elena Vance', room: 'Iron Vault', spots: 5, intensity: 'Extreme' },
    { id: 't2', time: '10:00 AM - 11:00 AM', title: 'Core & Mobility Flow', trainer: 'Maya Lin', room: 'Zen Studio', spots: 12, intensity: 'Low' },
    { id: 't3', time: '06:00 PM - 07:15 PM', title: 'Full Body Kettlebell Hell', trainer: 'Marcus Steel', room: 'Arena 1', spots: 3, intensity: 'High' },
  ],
  Wednesday: [
    { id: 'w1', time: '06:30 AM - 07:30 AM', title: 'Sprint Conditioning & Agility', trainer: 'Jaxson Reed', room: 'Turf Track', spots: 5, intensity: 'Extreme' },
    { id: 'w2', time: '05:30 PM - 06:45 PM', title: 'Back & Biceps Mass Protocol', trainer: 'Elena Vance', room: 'Iron Vault', spots: 7, intensity: 'High' },
    { id: 'w3', time: '07:00 PM - 08:00 PM', title: 'Fighter Conditioning & Sparring', trainer: 'Tyson Drake', room: 'Striking Ring', spots: 4, intensity: 'High' },
  ],
  Thursday: [
    { id: 'th1', time: '07:00 AM - 08:00 AM', title: 'Squat Biomechanics & Glutes', trainer: 'Elena Vance', room: 'Iron Vault', spots: 6, intensity: 'High' },
    { id: 'th2', time: '06:00 PM - 07:00 PM', title: 'HIIT Tabata Blitz', trainer: 'Marcus Steel', room: 'Arena 1', spots: 2, intensity: 'Extreme' },
  ],
  Friday: [
    { id: 'f1', time: '06:30 AM - 07:30 AM', title: 'Arm Farm & Pump Matrix', trainer: 'Jaxson Reed', room: 'Iron Vault', spots: 8, intensity: 'Moderate' },
    { id: 'f2', time: '05:30 PM - 06:45 PM', title: 'Friday Night Fight & Bag Work', trainer: 'Tyson Drake', room: 'Striking Ring', spots: 3, intensity: 'High' },
  ],
  Saturday: [
    { id: 's1', time: '08:00 AM - 09:30 AM', title: 'Weekend Beast Team WOD', trainer: 'Marcus Steel & Elena', room: 'Functional Grid', spots: 10, intensity: 'Extreme' },
    { id: 's2', time: '10:00 AM - 11:15 AM', title: 'Athletic Recovery & Foam Roll', trainer: 'Maya Lin', room: 'Zen Studio', spots: 15, intensity: 'Low' },
  ]
};

export default function Schedule({ onOpenAuth }) {
  const { user } = useAuth();
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [bookedStatus, setBookedStatus] = useState({});

  const handleBookClass = (classItem) => {
    if (!user) {
      onOpenAuth('signup');
      return;
    }

    mockBackend.bookings.book({
      title: classItem.title,
      trainer: classItem.trainer,
      time: `${selectedDay}, ${classItem.time}`,
      room: classItem.room
    });

    setBookedStatus(prev => ({ ...prev, [classItem.id]: true }));
    setTimeout(() => {
      setBookedStatus(prev => ({ ...prev, [classItem.id]: false }));
    }, 4000);
  };

  const currentClasses = SCHEDULE_DATA[selectedDay] || [];

  return (
    <section id="schedule" className="py-24 relative bg-[#06070a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Weekly Timetable</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white">
            LIVE CLASS <span className="energy-text">SCHEDULE</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Reserve your spot in high-demand trainer-led sessions with automatic Supabase calendar syncing.
          </p>
        </div>

        {/* Day Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-5 py-2.5 rounded-xl font-heading text-sm font-bold uppercase tracking-wider transition-all ${
                selectedDay === day
                  ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg shadow-orange-600/30'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {currentClasses.map((item) => {
                const isBooked = bookedStatus[item.id];

                return (
                  <div
                    key={item.id}
                    className="gym-card rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded border border-orange-500/20 font-semibold">
                          {item.intensity} Intensity
                        </span>
                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          {item.room}
                        </span>
                      </div>

                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-wide">
                        {item.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-orange-400" />
                          {item.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          Coach {item.trainer}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                      <span className="text-[11px] font-mono text-slate-400">
                        <strong className="text-orange-400 font-bold">{item.spots}</strong> slots remaining
                      </span>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleBookClass(item)}
                        disabled={isBooked}
                        className={`px-5 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                          isBooked
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                            : 'bg-white/10 hover:bg-orange-500 text-white hover:shadow-lg hover:shadow-orange-500/30 border border-white/10'
                        }`}
                      >
                        {isBooked ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Spot Confirmed!</span>
                          </>
                        ) : (
                          <>
                            <span>Reserve Spot</span>
                            <ArrowRight className="w-3 h-3" />
                          </>
                        )}
                      </motion.button>
                    </div>

                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
