import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Flame, Zap, Shield, ArrowUpRight, Clock, Target } from 'lucide-react';

const PROGRAMS = [
  {
    id: 'prog_1',
    title: 'HYPERTROPHY & BODYBUILDING',
    desc: 'Targeted muscle isolation, progressive overload splits, and high volume pump protocols.',
    duration: '60 - 75 Mins',
    calories: '650 kcal/hr',
    intensity: 'Extreme',
    level: 'All Levels',
    tag: 'Muscle Growth',
    gradient: 'from-orange-600 to-red-600',
  },
  {
    id: 'prog_2',
    title: 'HIIT INFERNO CONDITIONING',
    desc: 'High-intensity athletic intervals combining battle ropes, sled pushes, ski-ergs, and plyometrics.',
    duration: '45 Mins',
    calories: '850 kcal/hr',
    intensity: 'Maximum Burn',
    level: 'Intermediate - Advanced',
    tag: 'Fat Shred',
    gradient: 'from-red-600 to-amber-600',
  },
  {
    id: 'prog_3',
    title: 'OLYMPIC POWERLIFTING',
    desc: 'Master the Big 3: Squat, Bench Press, and Deadlift with biomechanical bar path analysis.',
    duration: '75 Mins',
    calories: '550 kcal/hr',
    intensity: 'Heavy Load',
    level: 'Advanced',
    tag: 'Pure Strength',
    gradient: 'from-amber-600 to-yellow-500',
  },
  {
    id: 'prog_4',
    title: 'COMBAT BOXING & STRIKING',
    desc: 'Heavy bag rounds, agility footwork drills, speed punching, and core rotational power.',
    duration: '50 Mins',
    calories: '780 kcal/hr',
    intensity: 'High Speed',
    level: 'Beginner Friendly',
    tag: 'Agility & Power',
    gradient: 'from-orange-500 to-red-500',
  }
];

export default function Programs({ onOpenAuth }) {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section id="programs" className="py-24 relative bg-[#08090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-wider mb-3">
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Engineered For Results</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              ELITE WORKOUT <span className="energy-text">PROGRAMS</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            Whether your goal is massive strength, shredded conditioning, or athletic performance, GYM Pulse has you covered.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROGRAMS.map((prog, idx) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="gym-card rounded-3xl p-8 relative group overflow-hidden flex flex-col justify-between"
            >
              {/* Corner hover glow */}
              <div className={`absolute -right-20 -top-20 w-56 h-56 rounded-full bg-gradient-to-br ${prog.gradient} opacity-0 group-hover:opacity-15 blur-3xl transition-opacity duration-500 pointer-events-none`} />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-orange-400 font-bold bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                    {prog.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    <span>{prog.duration}</span>
                  </div>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-wide group-hover:text-orange-400 transition-colors">
                  {prog.title}
                </h3>

                <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                  {prog.desc}
                </p>

                {/* Metric Pills */}
                <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Calorie Burn</span>
                    <span className="font-heading text-base font-bold text-white flex items-center gap-1 mt-0.5">
                      <Flame className="w-3.5 h-3.5 text-red-400" />
                      {prog.calories}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">Intensity</span>
                    <span className="font-heading text-base font-bold text-white flex items-center gap-1 mt-0.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      {prog.intensity}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Level: <strong className="text-slate-200">{prog.level}</strong></span>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="flex items-center gap-1 text-xs font-heading font-bold uppercase tracking-wider text-orange-400 group-hover:text-orange-300 transition-colors"
                >
                  <span>Join Program</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
