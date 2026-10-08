import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="footer-contact" className="bg-[#0B192C] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white p-2">
                <Activity className="w-6 h-6" />
              </div>
              <span className="font-display tracking-tight text-2xl font-bold text-white">
                KHEL<span className="text-orange-500">SETU</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              AI-powered sports assessment for every athlete. Standardized fitness and movement analysis using accessible camera technology across India.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <span>New Delhi & State Sports Operation Centers, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>support@khelsetu.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>+91 1800-KHEL-SETU (Toll Free)</span>
              </div>
            </div>
          </div>

          {/* Platform Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Platform</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-orange-400 transition-colors">Explore Assessments</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-orange-400 transition-colors">How It Works</Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-orange-400 transition-colors">Resources & Guides</Link>
              </li>
            </ul>
          </div>

          {/* For Athletes & Coaches */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">User Portals</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/athlete/home" className="hover:text-orange-400 transition-colors">Athlete Dashboard</Link>
              </li>
              <li>
                <Link to="/athlete/history" className="hover:text-orange-400 transition-colors">Assessment History</Link>
              </li>
              <li>
                <Link to="/coach/dashboard" className="hover:text-orange-400 transition-colors">Coach & Academy Portal</Link>
              </li>
              <li>
                <Link to="/official/dashboard" className="hover:text-orange-400 transition-colors">Admin Console</Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Support & Legal</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/resources" className="hover:text-orange-400 transition-colors">Help Center & FAQ</Link>
              </li>
              <li>
                <a href="#footer-contact" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#footer-contact" className="hover:text-orange-400 transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#footer-contact" className="hover:text-orange-400 transition-colors">Data Protection Standards</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 KhelSetu. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Secure Digital Public Infrastructure
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
