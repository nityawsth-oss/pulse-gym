import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Calendar, 
  X, 
  Activity, 
  Sparkles,
  Phone,
  User,
  Building,
  Check
} from 'lucide-react';

export default function LandingHero({ onGoToSignup, onGoToLogin, onGoToDashboard, isAuthenticated }) {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [bpm, setBpm] = useState(78);

  // BPM animated counter (72 to 118 and back as requested in spec)
  useEffect(() => {
    let goingUp = true;
    const interval = setInterval(() => {
      setBpm(prev => {
        if (prev >= 118) goingUp = false;
        if (prev <= 72) goingUp = true;
        return goingUp ? prev + 2 : prev - 2;
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setDemoSubmitted(true);
    setTimeout(() => {
      setDemoSubmitted(false);
      setDemoModalOpen(false);
    }, 2200);
  };

  return (
    <div className="min-h-screen hero-gradient text-white flex flex-col justify-between overflow-x-hidden relative selection:bg-[#D9A441] selection:text-[#14110B]">
      
      {/* Background drifting gold glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] rounded-full bg-[#D9A441]/10 blur-[90px] sm:blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[#9A6B12]/15 blur-[100px] sm:blur-[140px] pointer-events-none" />

      {/* Signature Gym Animation #2: Large Translucent Gold Weight Plate */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="hidden sm:flex absolute -bottom-24 -right-24 w-80 sm:w-96 h-80 sm:h-96 rounded-full border-[18px] border-[#D9A441]/15 border-dashed pointer-events-none items-center justify-center opacity-60 z-0"
      >
        <div className="w-56 h-56 rounded-full border-4 border-[#D9A441]/20 flex items-center justify-center">
          <span className="font-mono text-xs font-bold text-[#D9A441]/40 tracking-widest uppercase">20 KG • PULSE</span>
        </div>
      </motion.div>

      {/* Sticky Navbar */}
      <header className="h-16 sm:h-20 border-b border-[#2A2518] px-4 sm:px-6 lg:px-12 flex items-center justify-between sticky top-0 bg-[#0A0906]/90 backdrop-blur-md z-40">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#D9A441] flex items-center justify-center font-bold text-sm sm:text-base text-[#14110B] shadow-sm">
            P
          </div>
          <span className="font-semibold text-sm sm:text-base tracking-tight text-white">
            Pulse <span className="text-[#D9A441]">GMS</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#B9B1A0]">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#plans" className="hover:text-white transition-colors">Pricing</a>
          <a href="#customers" className="hover:text-white transition-colors">Customers</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <button
              onClick={onGoToDashboard}
              className="btn-primary !text-xs !h-8 sm:!h-9 !px-3 sm:!px-4"
            >
              <span>App Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <>
              <button
                onClick={onGoToLogin}
                className="btn-outline-gold !text-xs !h-8 sm:!h-9 !px-2.5 sm:!px-4 font-semibold"
              >
                Log in
              </button>
              <button
                onClick={onGoToSignup}
                className="btn-primary !text-xs !h-8 sm:!h-9 !px-3 sm:!px-4 font-semibold shadow-sm"
              >
                Start free trial
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Hero Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12 pb-16 sm:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Column (Content) */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#2A2315] border border-[#3E341F] text-[11px] sm:text-xs font-medium text-[#D9A441] w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441] animate-ping" />
            <span>New: WhatsApp renewal reminders are live</span>
          </div>

          {/* Headline in Playfair Display Bold */}
          <h1 className="font-serif font-bold text-3xl sm:text-5xl lg:text-[64px] leading-[1.15] sm:leading-[1.1] tracking-tight text-white">
            Run your gym like <br />
            <span className="text-[#D9A441]">the best in the business.</span>
          </h1>

          {/* Subhead */}
          <p className="text-sm sm:text-base text-[#B9B1A0] max-w-xl font-normal leading-relaxed">
            One platform for members, billing, attendance and trainers, built for modern fitness studios.
          </p>

          {/* Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={onGoToSignup}
              className="btn-primary text-sm !h-11 px-7 shadow-lg shadow-[#D9A441]/10 font-semibold justify-center"
            >
              <span>Start free trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setDemoModalOpen(true)}
              className="btn-outline-gold text-sm !h-11 px-6 font-semibold justify-center"
            >
              <span>Book a demo</span>
            </button>
          </div>

          <p className="text-xs text-[#7A7367] font-medium pt-1">
            Trusted by 420+ gyms across India • Iron District Fitness, Indiranagar
          </p>

          {/* Signature Gym Animation #4: Heartbeat ECG Line with BPM */}
          <div className="pt-5 border-t border-[#2A2518]/60 flex items-center justify-between sm:justify-start gap-4 sm:gap-6 max-w-md">
            <div className="flex items-center gap-2 flex-shrink-0">
              <Activity className="w-4 h-4 text-[#D9A441] animate-pulse" />
              <div className="font-mono text-xs">
                <span className="text-[#7A7367] block text-[10px] uppercase">Live Pulse</span>
                <span className="text-white font-bold">{bpm} BPM</span>
              </div>
            </div>

            {/* SVG ECG Line */}
            <svg className="w-36 sm:w-48 h-8 stroke-[#D9A441]" fill="none" viewBox="0 0 160 32">
              <path
                d="M0,16 L35,16 L42,6 L48,26 L55,10 L62,20 L68,16 L160,16"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

        </div>

        {/* Right Column: Signature Visuals & Floating Cards (Responsive) */}
        <div className="lg:col-span-5 relative mt-6 lg:mt-0 min-h-[340px] sm:min-h-[460px] flex flex-col sm:block items-center justify-center gap-3.5 w-full max-w-md mx-auto">
          
          {/* Signature Gym Animation #1: Gold Dumbbell (Desktop only to prevent mobile overlap) */}
          <motion.div
            animate={{ 
              y: [-25, 25, -25],
              rotate: [-14, 6, -14]
            }}
            transition={{ 
              duration: 3.2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="hidden sm:block absolute top-8 left-4 z-20 pointer-events-none drop-shadow-[0_15px_30px_rgba(217,164,65,0.35)]"
          >
            <svg width="76" height="76" viewBox="0 0 24 24" fill="none" stroke="#D9A441" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 5v14M18 5v14M4 8v8M20 8v8M2 10v4M22 10v4M6 12h12" />
            </svg>
          </motion.div>

          {/* Floating Card 1: Active members 1,196 */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full sm:max-w-xs p-4 rounded-xl bg-[#14110B] border border-[#2A2518] shadow-2xl sm:absolute sm:top-16 sm:left-6 z-10"
          >
            <div className="flex items-center justify-between text-xs text-[#B9B1A0]">
              <span>Active members</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>+12.4%</span>
              </span>
            </div>
            <div className="text-2xl font-bold text-white mt-1">1,196</div>
            <span className="text-[11px] text-[#7A7367]">Iron District Fitness, Indiranagar</span>
          </motion.div>

          {/* Floating Card 2: Revenue Nov ₹8,42,300 */}
          <motion.div
            animate={{ y: [6, -6, 6] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full sm:w-64 p-4 rounded-xl bg-[#14110B] border border-[#2A2518] shadow-2xl sm:absolute sm:bottom-16 sm:left-2 z-20"
          >
            <span className="text-[10px] text-[#B9B1A0] uppercase font-mono tracking-wider">Revenue (Nov 2026)</span>
            <div className="text-xl font-bold text-[#D9A441] mt-0.5">₹8,42,300</div>
            {/* 7 Bar Mini Chart */}
            <div className="flex items-end gap-1.5 h-8 mt-2 pt-1 border-t border-[#2A2518]">
              {[12, 16, 20, 18, 24, 22, 28].map((val, idx) => (
                <div
                  key={idx}
                  style={{ height: `${val}px` }}
                  className={`flex-1 rounded-sm ${idx === 6 ? 'bg-[#D9A441]' : 'bg-[#F0DDB0]/30'}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Floating Card 3: Rohan Verma checked in */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="w-full sm:max-w-xs p-3 rounded-xl bg-[#211C13] border border-[#2A2518] shadow-2xl sm:absolute sm:-bottom-4 sm:right-2 z-20 flex items-center gap-2.5"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="font-semibold text-white block">Rohan Verma checked in</span>
              <span className="text-[10px] text-[#B9B1A0]">Turnstile A • 6:42 AM</span>
            </div>
          </motion.div>

        </div>

      </main>

      {/* Book a Demo Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-[#14110B] border border-[#2A2518] p-5 sm:p-6 shadow-2xl relative">
            <button
              onClick={() => setDemoModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#B9B1A0] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif text-xl font-bold text-white mb-1">
              Book a 1-on-1 Product Demo
            </h3>
            <p className="text-xs text-[#B9B1A0] mb-4">
              See how Pulse GMS simplifies billing, turnstile check-ins and member tracking.
            </p>

            {demoSubmitted ? (
              <div className="p-6 text-center space-y-2 bg-[#211C13] rounded-xl border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-semibold text-white">We will call you within 24 hours</h4>
                <p className="text-xs text-[#B9B1A0]">Our onboarding engineer will reach out to schedule your demo.</p>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#B9B1A0] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Aarav Mehta"
                    className="w-full h-10 px-3 rounded-btn bg-[#211C13] border border-[#2A2518] text-white focus:outline-none focus:border-[#D9A441]"
                  />
                </div>

                <div>
                  <label className="block text-[#B9B1A0] mb-1">Mobile Number (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full h-10 px-3 rounded-btn bg-[#211C13] border border-[#2A2518] text-white focus:outline-none focus:border-[#D9A441]"
                  />
                </div>

                <div>
                  <label className="block text-[#B9B1A0] mb-1">Gym / Studio Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Iron District Fitness"
                    className="w-full h-10 px-3 rounded-btn bg-[#211C13] border border-[#2A2518] text-white focus:outline-none focus:border-[#D9A441]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full text-xs font-semibold !h-10 mt-2"
                >
                  Confirm Demo Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Public Footer */}
      <footer className="border-t border-[#2A2518] px-4 sm:px-6 lg:px-12 py-5 text-center sm:flex sm:items-center sm:justify-between text-xs text-[#7A7367]">
        <span>© {new Date().getFullYear()} Pulse GMS by QodeNexus. All rights reserved.</span>
        <div className="flex items-center justify-center gap-4 mt-2 sm:mt-0">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#plans" className="hover:text-white transition-colors">Plans</a>
          <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
          <a href="#terms" className="hover:text-white transition-colors">Terms</a>
        </div>
      </footer>

    </div>
  );
}
