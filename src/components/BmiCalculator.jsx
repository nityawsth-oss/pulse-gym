import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Activity, Dumbbell, Flame, CheckCircle, ArrowRight } from 'lucide-react';

export default function BmiCalculator({ onOpenAuth }) {
  const [weight, setWeight] = useState(74); // kg
  const [height, setHeight] = useState(175); // cm

  const bmiData = useMemo(() => {
    const heightInMeters = height / 100;
    const bmiVal = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    const num = parseFloat(bmiVal);

    let status = 'Normal Weight';
    let color = 'text-emerald-400';
    let bgColor = 'bg-emerald-500/10 border-emerald-500/30';
    let plan = 'Lean Muscle & Hypertrophy Program';
    let advice = 'Your BMI is optimal. Focus on progressive overload strength training and clean high-protein nutrition.';

    if (num < 18.5) {
      status = 'Underweight';
      color = 'text-cyan-400';
      bgColor = 'bg-cyan-500/10 border-cyan-500/30';
      plan = 'Mass Builder & Caloric Surplus Hypertrophy';
      advice = 'Focus on heavy compound lifts (squat, bench, deadlift) and nutrient-dense caloric surplus meals.';
    } else if (num >= 25 && num < 29.9) {
      status = 'Overweight / Muscular';
      color = 'text-amber-400';
      bgColor = 'bg-amber-500/10 border-amber-500/30';
      plan = 'HIIT Inferno & Body Recomposition';
      advice = 'Target fat loss while preserving muscle density through high-intensity intervals and resistance training.';
    } else if (num >= 30) {
      status = 'High Body Mass';
      color = 'text-red-400';
      bgColor = 'bg-red-500/10 border-red-500/30';
      plan = 'Cardio Shred & Metcon Transformation';
      advice = 'Target metabolic conditioning, active recovery, and low-impact high-calorie burn circuits.';
    }

    return { val: bmiVal, status, color, bgColor, plan, advice };
  }, [weight, height]);

  return (
    <section id="bmi" className="py-24 relative overflow-hidden bg-[#06070a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>Smart Fitness Metric</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white">
            Interactive <span className="energy-text">BMI Calculator</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Adjust your metrics to calculate your Body Mass Index and unlock your custom GYM Pulse training roadmap.
          </p>
        </div>

        {/* Calculator Widget */}
        <div className="max-w-4xl mx-auto rounded-3xl p-[1px] bg-gradient-to-b from-orange-500/30 via-white/5 to-transparent shadow-2xl">
          <div className="rounded-[23px] bg-[#0c0f18] p-6 sm:p-10 border border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Left Controls */}
              <div className="space-y-6">
                {/* Weight slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-heading uppercase tracking-wider text-slate-300 font-bold">
                      Your Weight
                    </span>
                    <span className="font-mono text-orange-400 font-bold text-lg">
                      {weight} <span className="text-xs text-slate-400 font-normal">kg</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="160"
                    value={weight}
                    onChange={(e) => setWeight(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>40 kg</span>
                    <span>100 kg</span>
                    <span>160 kg</span>
                  </div>
                </div>

                {/* Height slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-heading uppercase tracking-wider text-slate-300 font-bold">
                      Your Height
                    </span>
                    <span className="font-mono text-orange-400 font-bold text-lg">
                      {height} <span className="text-xs text-slate-400 font-normal">cm</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="130"
                    max="220"
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>130 cm</span>
                    <span>175 cm</span>
                    <span>220 cm</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <span className="text-xs font-mono uppercase text-slate-400">Recommended GYM Pulse Path:</span>
                  <p className="font-heading text-lg font-bold text-white flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-orange-400" />
                    {bmiData.plan}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {bmiData.advice}
                  </p>
                </div>
              </div>

              {/* Right Gauge / Result Display */}
              <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-[#090b12] border border-white/10 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

                <span className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                  Your Calculated BMI
                </span>

                <motion.div
                  key={bmiData.val}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-heading text-6xl sm:text-7xl font-extrabold text-white tracking-tight my-2"
                >
                  {bmiData.val}
                </motion.div>

                <div className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${bmiData.bgColor} ${bmiData.color} mt-2`}>
                  {bmiData.status}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onOpenAuth('signup')}
                  className="mt-6 flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-heading text-sm font-bold uppercase tracking-wider shadow-lg shadow-orange-600/30 transition-all"
                >
                  <span>Start This Program</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
