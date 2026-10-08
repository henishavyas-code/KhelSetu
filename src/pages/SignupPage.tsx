import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { validateEmail, validateName } from '../utils/validators';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sport, setSport] = useState('Athletics & Track');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateName(name)) {
      setError('Please enter your full name');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await signup(name, email, 'athlete');
      navigate('/app/dashboard');
    } catch {
      setError('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const sportsOptions = [
    { value: 'Athletics & Track', label: 'Athletics & Track' },
    { value: 'Cricket', label: 'Cricket' },
    { value: 'Football / Soccer', label: 'Football / Soccer' },
    { value: 'Basketball', label: 'Basketball' },
    { value: 'Kabaddi', label: 'Kabaddi' },
    { value: 'Badminton', label: 'Badminton' }
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-black text-2xl mx-auto shadow-md shadow-emerald-600/20">
            K
          </div>
          <h1 className="text-3xl font-black text-slate-900 font-display">Create Athlete Account</h1>
          <p className="text-xs text-slate-600 font-medium">Join India's AI sports assessment network</p>
        </div>

        <Card className="space-y-6">
          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="e.g. Aarav Patel"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="athlete@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Select
              label="Primary Sport Discipline"
              options={sportsOptions}
              value={sport}
              onChange={(e) => setSport(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            {error && <p className="text-xs text-rose-600 font-semibold">{error}</p>}

            <Button
              variant="primary"
              size="md"
              className="w-full"
              isLoading={loading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start Assessment Profile
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-600 font-bold hover:underline">
              Log In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
