import React from 'react';
import { motion } from 'framer-motion';
import { Award, Check } from 'lucide-react';

const TRAINERS = [
  {
    name: 'Marcus Steel',
    role: 'Head of Strength & Conditioning',
    specialty: 'Powerlifting, Hypertrophy & Athletic Speed',
    experience: '12+ Years Exp',
    achievements: 'National Powerlifting Champion, CSCS Certified',
    avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Elena Vance',
    role: 'Olympic Lifting & CrossFit Director',
    specialty: 'Barbell Mechanics, Mobility & Explosive Power',
    experience: '9+ Years Exp',
    achievements: 'CrossFit Games Competitor, USAW Level 2',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Tyson Drake',
    role: 'Combat & Kickboxing Coach',
    specialty: 'Striking, Bag Conditioning & Fight Endurance',
    experience: '14+ Years Exp',
    achievements: 'Former Pro Kickboxer, Golden Gloves',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Maya Lin',
    role: 'Metabolic Conditioning & Recovery',
    specialty: 'Body Recomp, Mobility & Functional Anatomy',
    experience: '8+ Years Exp',
    achievements: 'DPT Physical Therapy & Performance Nutritionist',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80'
  }
];

export default function Trainers({ onOpenAuth }) {
  return (
    <section id="trainers" className="py-24 relative bg-[#08090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>World-Class Coaching</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white">
            MEET THE <span className="energy-text">PULSE COACHES</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Train alongside certified masters of biomechanics, strength records, and body transformations.
          </p>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRAINERS.map((coach, idx) => (
            <motion.div
              key={coach.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="gym-card rounded-3xl overflow-hidden group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={coach.avatar}
                    alt={coach.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10131d] via-[#10131d]/40 to-transparent" />
                  
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 font-bold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded">
                      {coach.experience}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-white tracking-wide mt-1">
                      {coach.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-orange-400/90 font-semibold">
                    {coach.role}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {coach.specialty}
                  </p>

                  <div className="pt-2 flex items-center gap-1.5 text-[11px] text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{coach.achievements}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-orange-500 text-white font-heading text-xs font-bold uppercase tracking-wider transition-all border border-white/10 hover:border-orange-500"
                >
                  Book 1-on-1 Coaching
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
