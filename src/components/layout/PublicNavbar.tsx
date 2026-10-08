import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../common/Button';
import { Menu, X, ArrowRight } from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Assessments', path: '/assessments' },
    { name: 'Sports', path: '/sports' },
    { name: 'For Athletes', path: '/athletes' },
    { name: 'For Organizations', path: '/organizations' },
    { name: 'About', path: '/about' }
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              K
            </div>
            <div>
              <span className="font-display font-black text-2xl tracking-wider text-slate-900 group-hover:text-emerald-600 transition-colors">
                KHEL<span className="text-emerald-600">SETU</span>
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-slate-500 font-bold -mt-1">
                AI Sports Assessment
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-bold transition-colors ${
                  location.pathname === link.path ? 'text-emerald-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors">
              Log In
            </Link>
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate('/app/dashboard')}
            >
              START ASSESSMENT
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold text-slate-800 hover:text-emerald-600 py-1.5 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/app/dashboard');
              }}
            >
              START ASSESSMENT
            </Button>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-sm font-bold text-slate-700 py-2"
            >
              Log In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
