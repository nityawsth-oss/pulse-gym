import React from 'react';
import { Flame, MapPin, Phone, Mail, Clock, Globe, Share2, MessageCircle } from 'lucide-react';

export default function Footer({ onOpenAuth }) {
  return (
    <footer className="bg-[#050608] border-t border-white/5 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading text-2xl font-bold tracking-wider text-white">
                PULSE <span className="energy-text">GYM</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The premier fitness and performance facility dedicated to human strength, metabolic health, and transformation.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-orange-500 hover:text-white transition-colors" title="Website"><Globe className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-orange-500 hover:text-white transition-colors" title="Community"><MessageCircle className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-orange-500 hover:text-white transition-colors" title="Share"><Share2 className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-base font-bold uppercase tracking-wider text-white">Programs</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-mono">
              <li><a href="#programs" className="hover:text-orange-400 transition-colors">Hypertrophy & Splits</a></li>
              <li><a href="#programs" className="hover:text-orange-400 transition-colors">HIIT Inferno Burn</a></li>
              <li><a href="#programs" className="hover:text-orange-400 transition-colors">Olympic Powerlifting</a></li>
              <li><a href="#programs" className="hover:text-orange-400 transition-colors">Combat Boxing & Striking</a></li>
            </ul>
          </div>

          {/* Gym Information */}
          <div className="space-y-3">
            <h4 className="font-heading text-base font-bold uppercase tracking-wider text-white">Facility Info</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-mono">
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                <span>Open 24 Hours / 7 Days</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                <span>742 Iron Boulevard, Metro City</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                <span>+1 (800) 555-PULSE</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                <span>members@gympulse.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Join */}
          <div className="space-y-3">
            <h4 className="font-heading text-base font-bold uppercase tracking-wider text-white">Free Guest Pass</h4>
            <p className="text-xs text-slate-400">
              Claim a complimentary 3-day workout pass delivered right to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your.email@pulse.com"
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500"
              />
              <button
                onClick={() => onOpenAuth('signup')}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-heading text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Claim
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <div>
            &copy; {new Date().getFullYear()} Pulse Gym Inc. Built with React 19 & Supabase.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Security & RLS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
