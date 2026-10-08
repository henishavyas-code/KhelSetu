import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Globe } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-lg">
                K
              </div>
              <span className="font-display font-black text-2xl tracking-wider text-white">
                KHEL<span className="text-emerald-400">SETU</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              AI-powered sports talent assessment platform bridging grassroots potential with digital sports technology infrastructure across India.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>MEASURE. IMPROVE. GET DISCOVERED.</span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">Platform</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><Link to="/how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</Link></li>
              <li><Link to="/assessments" className="hover:text-emerald-400 transition-colors">Assessments Library</Link></li>
              <li><Link to="/sports" className="hover:text-emerald-400 transition-colors">Sports Disciplines</Link></li>
              <li><Link to="/leaderboard" className="hover:text-emerald-400 transition-colors">National Leaderboard</Link></li>
            </ul>
          </div>

          {/* Audiences */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">Solutions</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><Link to="/athletes" className="hover:text-emerald-400 transition-colors">For Grassroots Athletes</Link></li>
              <li><Link to="/organizations" className="hover:text-emerald-400 transition-colors">Sports Authorities & Academies</Link></li>
              <li><Link to="/organizations" className="hover:text-emerald-400 transition-colors">Talent Scouts & Programs</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About KhelSetu</Link></li>
            </ul>
          </div>

          {/* Commercial & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">Support & Legal</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><Link to="/faq" className="hover:text-emerald-400 transition-colors">Help & FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact Support</Link></li>
              <li><Link to="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} KhelSetu Sports Technology Platform. All rights reserved.</p>
          <div className="flex items-center gap-6 font-semibold">
            <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> India</span>
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> support@khelsetu.org</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
