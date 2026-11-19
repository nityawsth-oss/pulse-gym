import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Flame, ArrowRight } from 'lucide-react';

const PLANS = [
  {
    name: 'Day Beast Pass',
    badge: 'Single Access',
    priceMonthly: 15,
    priceYearly: 15,
    popular: false,
    desc: 'Full 24-hour access to weight room, cardio arena, and locker facilities.',
    features: [
      'Full Gym Floor Access (24h)',
      'Free Locker & Towel Service',
      'Access to Free Weight & Cardio Zone',
      'No Commitment or Registration Fee',
    ],
    cta: 'Get Day Pass',
    tier: 'Day Pass'
  },
  {
    name: 'Iron Muscle Monthly',
    badge: 'Most Popular',
    priceMonthly: 49,
    priceYearly: 39,
    popular: true,
    desc: 'Unrestricted 24/7 access to all arenas, classes, and Supabase workout logging.',
    features: [
      '24/7 All-Access Gym & Turf',
      'Unlimited Live Group Classes',
      'Supabase Realtime Workout Tracker',
      'Monthly InBody Body Fat Scan',
      'Custom Training Split Roadmap',
      'Free Guest Pass Every Month'
    ],
    cta: 'Join Iron Monthly',
    tier: 'Iron Muscle'
  },
  {
    name: 'VIP Elite Black Card',
    badge: 'All-Inclusive Beast',
    priceMonthly: 89,
    priceYearly: 72,
    popular: false,
    desc: 'The ultimate VIP tier with personal training, infrared sauna recovery & shake bar.',
    features: [
      'Everything in Iron Muscle tier',
      '2x Monthly 1-on-1 Personal Training',
      'Unlimited Cryotherapy & Infrared Sauna',
      'Dedicated VIP Locker & Laundry',
      '20% Off Pulse Protein Shake Bar',
      'Priority Class Booking Queue'
    ],
    cta: 'Claim VIP Black Card',
    tier: 'VIP Elite'
  }
];

export default function Pricing({ onOpenAuth }) {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-[#06070a]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-orange-600/10 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>Transparent Memberships</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white">
            CHOOSE YOUR <span className="energy-text">MEMBERSHIP</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            No hidden annual maintenance fees. Cancel anytime directly from your member dashboard.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-xs font-heading uppercase tracking-wider font-bold ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-14 h-7 rounded-full bg-white/10 p-1 border border-white/10 transition-colors cursor-pointer"
            >
              <motion.div
                animate={{ x: billingCycle === 'yearly' ? 26 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-5 h-5 rounded-full bg-gradient-to-r from-red-600 to-orange-500 shadow-md"
              />
            </button>
            <span className={`text-xs font-heading uppercase tracking-wider font-bold flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-500'}`}>
              <span>Annual</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PLANS.map((plan, idx) => {
            const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative rounded-3xl p-[1.5px] transition-all flex flex-col ${
                  plan.popular
                    ? 'bg-gradient-to-b from-red-500 via-orange-500 to-amber-500 shadow-2xl shadow-orange-600/25'
                    : 'bg-gradient-to-b from-white/10 via-white/5 to-transparent'
                }`}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs font-heading font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 animate-pulse" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div className="flex-1 rounded-[22px] bg-[#0c0f18] p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white tracking-wide">
                      {plan.name}
                    </h3>
                    <p className="mt-2 text-slate-400 text-xs sm:text-sm min-h-[38px] leading-relaxed">
                      {plan.desc}
                    </p>

                    <div className="mt-6 flex items-baseline gap-1.5">
                      <span className="font-heading text-5xl font-black text-white">
                        ${price}
                      </span>
                      <span className="text-slate-400 text-xs font-mono uppercase">
                        {plan.priceMonthly === 15 ? '/ single day' : '/ month'}
                      </span>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5 space-y-3.5">
                      {plan.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3 text-sm text-slate-300">
                          <div className="mt-0.5 w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-orange-400" />
                          </div>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onOpenAuth('signup', plan.tier)}
                      className={`w-full py-4 rounded-xl font-heading font-bold uppercase tracking-wider text-sm transition-all flex items-center justify-center gap-2 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white shadow-xl shadow-orange-600/35 hover:shadow-orange-600/50'
                          : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                      }`}
                    >
                      <span>{plan.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
