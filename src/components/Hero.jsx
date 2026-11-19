import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Dumbbell, ArrowRight, ShieldCheck, Zap, Award, Activity, CheckCircle2 } from 'lucide-react';

export default function Hero({ onOpenAuth, onScrollToBmi }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-gym-grid">
      {/* High-energy background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-orange-600/18 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/6 w-[400px] h-[400px] bg-red-600/15 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/3 right-1/6 w-[400px] h-[400px] bg-amber-500/12 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-orange-400 group cursor-pointer hover:border-orange-500/60 transition-colors">
            <Flame className="w-3.5 h-3.5 text-orange-400 animate-bounce" />
            <span>Welcome to GYM Pulse — Open 24/7 with Supabase Tech</span>
            <span className="text-orange-400 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mt-7 max-w-4xl mx-auto"
        >
          <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.95] text-white">
            UNLEASH YOUR <br className="hidden sm:inline" />
            <span className="energy-text drop-shadow-[0_10px_35px_rgba(255,87,34,0.35)]">
              INNER BEAST
            </span>
          </h1>
          <p className="mt-7 text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            State-of-the-art iron machines, olympic lifting platforms, dynamic HIIT arenas, and real-time workout tracking powered by React 19 & Supabase.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 87, 34, 0.55)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onOpenAuth('signup')}
            className="flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white font-heading text-lg font-bold uppercase tracking-wider shadow-2xl shadow-orange-600/40 group transition-all"
          >
            <Dumbbell className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            <span>Claim Free 3-Day Pass</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
            whileTap={{ scale: 0.96 }}
            onClick={onScrollToBmi}
            className="flex items-center gap-2 px-7 py-4 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-heading text-base font-semibold uppercase tracking-wider backdrop-blur-md transition-all hover:border-orange-500/30"
          >
            <Activity className="w-4 h-4 text-orange-400" />
            <span>Calculate Your BMI</span>
          </motion.button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { label: 'Active Members', value: '1,500+', icon: Activity, color: 'text-orange-400' },
            { label: 'Elite Coaches', value: '25+', icon: Award, color: 'text-amber-400' },
            { label: 'Workout Arenas', value: '15,000 sq ft', icon: Dumbbell, color: 'text-red-400' },
            { label: 'Member Satisfaction', value: '99.2%', icon: CheckCircle2, color: 'text-emerald-400' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="gym-card rounded-2xl p-5 text-center relative group overflow-hidden"
              >
                <div className="flex justify-center mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </div>
                <div className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                  {stat.value}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
