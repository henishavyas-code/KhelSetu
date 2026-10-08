import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Activity, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { authService } from '../services/authService';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = authService.login(email, password);
      setLoading(false);
      
      // Redirect based on role or state location
      if (location.state && location.state.from) {
        navigate(location.state.from.pathname);
      } else if (user.role === 'athlete') {
        navigate('/athlete/home');
      } else if (user.role === 'coach') {
        navigate('/coach/dashboard');
      } else if (user.role === 'admin') {
        navigate('/official/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Your account could not be authenticated.');
    }
  };

  // Quick Demo Logins
  const handleQuickLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('Password@123');
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-md space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-[#0B192C] flex items-center justify-center text-white p-2">
              <Activity className="w-6 h-6 text-orange-500" />
            </div>
            <span className="font-display tracking-tight text-2xl font-bold text-[#0B192C]">
              KHEL<span className="text-orange-600">SETU</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 pt-2">Welcome back to KhelSetu</h1>
          <p className="text-xs text-slate-500">Log in to access your assessment dashboard & profile</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Email Address or Phone</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-orange-600 focus:ring-orange-500"
              />
              <span>Remember me</span>
            </label>

            <Link to="/forgot-password" className="text-orange-600 font-semibold hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#0B192C] hover:bg-blue-900 text-white font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Log In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Credentials Assistant */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Quick Demo Login</p>
          <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold">
            <button
              onClick={() => handleQuickLogin('aarav@khelsetu.in')}
              className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-center"
            >
              Athlete
            </button>
            <button
              onClick={() => handleQuickLogin('coach.rajesh@khelsetu.in')}
              className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-center"
            >
              Coach
            </button>
            <button
              onClick={() => handleQuickLogin('admin@khelsetu.in')}
              className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-center"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-2 text-center text-xs text-slate-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-orange-600 font-bold hover:underline">
            Register for KhelSetu
          </Link>
        </div>

      </div>
    </div>
  );
};
