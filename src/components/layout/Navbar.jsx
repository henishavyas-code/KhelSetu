import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Activity, User, Menu, X, LogOut, Globe, HelpCircle, PhoneCall, ChevronDown, Shield, Award, LayoutDashboard, History, Settings, FileText } from 'lucide-react';
import { authService } from '../../services/authService';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [language, setLanguage] = useState('English');
  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = authService.subscribe((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-[#0B192C] text-slate-300 text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-medium tracking-wide text-white">KhelSetu</span>
          <span className="text-slate-400 hidden sm:inline">— AI-powered sports assessment for every athlete</span>
        </div>
        <div className="flex items-center gap-4 font-medium text-[11px]">
          <Link to="/resources" className="hover:text-white flex items-center gap-1 transition-colors">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Help</span>
          </Link>
          <a href="#footer-contact" className="hover:text-white flex items-center gap-1 transition-colors">
            <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
            <span>Contact</span>
          </a>
          <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded text-slate-200 border border-slate-700">
            <Globe className="w-3 h-3 text-saffron-500" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Select platform language"
              className="bg-transparent border-none text-[11px] text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="English" className="bg-slate-900 text-white">English</option>
              <option value="Hindi" className="bg-slate-900 text-white">हिंदी (Hindi)</option>
              <option value="Gujarati" className="bg-slate-900 text-white">ગુજરાતી (Gujarati)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <nav className={`bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-200 ${
        scrolled ? 'py-2.5 shadow-md' : 'py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#0B192C] flex items-center justify-center p-2 text-white shadow-md group-hover:scale-105 transition-transform">
                <Activity className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <span className="font-display tracking-tight text-xl font-bold text-[#0B192C]">
                  KHEL<span className="text-orange-600">SETU</span>
                </span>
                <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">Sports Assessment Platform</p>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive('/') ? 'bg-orange-50 text-orange-600' : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                }`}
              >
                Home
              </Link>

              <Link
                to="/explore"
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive('/explore') ? 'bg-orange-50 text-orange-600' : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                }`}
              >
                Assessments
              </Link>

              <Link
                to="/how-it-works"
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive('/how-it-works') ? 'bg-orange-50 text-orange-600' : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                }`}
              >
                How It Works
              </Link>

              <Link
                to={currentUser ? (currentUser.role === 'athlete' ? '/athlete/home' : currentUser.role === 'coach' ? '/coach/dashboard' : '/official/dashboard') : '/login'}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  location.pathname.startsWith('/athlete') ? 'bg-orange-50 text-orange-600' : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                }`}
              >
                Athletes
              </Link>

              <Link
                to="/coach/dashboard"
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  location.pathname.startsWith('/coach') ? 'bg-orange-50 text-orange-600' : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                }`}
              >
                Coaches
              </Link>

              <Link
                to="/resources"
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive('/resources') ? 'bg-orange-50 text-orange-600' : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                }`}
              >
                Resources
              </Link>
            </div>

            {/* Auth / Account Controls */}
            <div className="hidden lg:flex items-center gap-3">
              {currentUser ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#0B192C] text-white flex items-center justify-center font-bold text-xs">
                      {currentUser.name.charAt(0)}
                    </div>
                    <div className="text-left leading-tight">
                      <div className="text-xs font-bold text-slate-800">{currentUser.name}</div>
                      <div className="text-[10px] text-orange-600 font-semibold capitalize">{currentUser.role}</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                      </div>

                      {currentUser.role === 'athlete' && (
                        <>
                          <Link
                            to="/athlete/home"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                          >
                            <LayoutDashboard className="w-4 h-4 text-slate-400" />
                            Athlete Dashboard
                          </Link>
                          <Link
                            to="/athlete/profile"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                          >
                            <User className="w-4 h-4 text-slate-400" />
                            My Profile
                          </Link>
                          <Link
                            to="/athlete/history"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                          >
                            <History className="w-4 h-4 text-slate-400" />
                            Assessment History
                          </Link>
                        </>
                      )}

                      {currentUser.role === 'coach' && (
                        <>
                          <Link
                            to="/coach/dashboard"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                          >
                            <LayoutDashboard className="w-4 h-4 text-slate-400" />
                            Coach Dashboard
                          </Link>
                          <Link
                            to="/coach/dashboard"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                          >
                            <User className="w-4 h-4 text-slate-400" />
                            Assigned Athletes
                          </Link>
                        </>
                      )}

                      {currentUser.role === 'admin' && (
                        <>
                          <Link
                            to="/official/dashboard"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                          >
                            <Shield className="w-4 h-4 text-slate-400" />
                            Admin Console
                          </Link>
                        </>
                      )}

                      <div className="border-t border-slate-100 my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0B192C] hover:bg-blue-900 transition-colors shadow-sm"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 animate-in slide-in-from-top duration-200">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-800 border-b border-slate-100"
            >
              Home
            </Link>
            <Link
              to="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-800 border-b border-slate-100"
            >
              Assessments
            </Link>
            <Link
              to="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-800 border-b border-slate-100"
            >
              How It Works
            </Link>
            <Link
              to="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-slate-800 border-b border-slate-100"
            >
              Resources
            </Link>

            <div className="pt-2">
              {currentUser ? (
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-[11px] text-orange-600 font-semibold capitalize">{currentUser.role} Account</p>
                  </div>
                  <button
                    onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                    className="w-full py-2.5 rounded-lg text-center text-xs font-bold text-red-600 bg-red-50"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 rounded-lg text-center text-xs font-bold bg-slate-100 text-slate-800"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 rounded-lg text-center text-xs font-bold bg-[#0B192C] text-white"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
