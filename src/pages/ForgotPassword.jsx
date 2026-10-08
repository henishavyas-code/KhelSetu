import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Mail, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
          <h1 className="text-2xl font-bold text-slate-900 pt-2">Reset Password</h1>
          <p className="text-xs text-slate-500">Enter your registered email address to receive password reset instructions</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
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

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0B192C] hover:bg-blue-900 text-white font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Send Reset Link</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h3 className="text-sm font-bold text-emerald-900">Reset Instructions Sent</h3>
            <p className="text-xs text-emerald-800 leading-relaxed">
              If an account with email <strong>{email}</strong> exists, password reset instructions have been dispatched.
            </p>
          </div>
        )}

        <div className="pt-2 text-center">
          <Link to="/login" className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
