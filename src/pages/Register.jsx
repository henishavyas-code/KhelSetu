import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Lock, Mail, User, Phone, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { authService } from '../services/authService';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('athlete'); // 'athlete' vs 'coach'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Real-time password criteria validation
  const pwdValidation = authService.validatePassword(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!pwdValidation.isValid) {
      setError(`Password requirement missing: ${pwdValidation.errors.join(', ')}`);
      return;
    }

    setLoading(true);
    try {
      const newUser = authService.register({
        name,
        email,
        phone,
        password,
        confirmPassword,
        role
      });

      setLoading(false);
      // Redirect to appropriate role dashboard
      if (newUser.role === 'athlete') {
        navigate('/athlete/home');
      } else if (newUser.role === 'coach') {
        navigate('/coach/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to create account.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-md space-y-6">
        
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
          <h1 className="text-2xl font-bold text-slate-900 pt-2">Create your KhelSetu account</h1>
          <p className="text-xs text-slate-500">Join the national sports assessment platform</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Role Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Select Account Role</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('athlete')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                  role === 'athlete'
                    ? 'border-orange-500 bg-orange-50 text-orange-600'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Athlete Account</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('coach')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                  role === 'coach'
                    ? 'border-orange-500 bg-orange-50 text-orange-600'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Coach / Organization</span>
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. Aarav Patel"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Phone</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Password Policy Requirements Checklist */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 text-[11px]">
            <p className="font-bold text-slate-700">Password Requirements:</p>
            <div className="grid grid-cols-2 gap-1 text-slate-600">
              <span className={password.length >= 8 ? 'text-emerald-600 font-semibold' : ''}>
                {password.length >= 8 ? '✓' : '○'} At least 8 characters
              </span>
              <span className={/[A-Z]/.test(password) ? 'text-emerald-600 font-semibold' : ''}>
                {/[A-Z]/.test(password) ? '✓' : '○'} One uppercase letter
              </span>
              <span className={/[0-9]/.test(password) ? 'text-emerald-600 font-semibold' : ''}>
                {/[0-9]/.test(password) ? '✓' : '○'} One number
              </span>
              <span className={/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) ? 'text-emerald-600 font-semibold' : ''}>
                {/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) ? '✓' : '○'} One special character
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#0B192C] hover:bg-blue-900 text-white font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            {loading ? 'Creating Account...' : 'Create KhelSetu Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Bottom CTA */}
        <div className="pt-2 text-center text-xs text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-600 font-bold hover:underline">
            Log In
          </Link>
        </div>

      </div>
    </div>
  );
};
