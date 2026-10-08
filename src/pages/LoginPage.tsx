import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { validateEmail, validatePassword } from '../utils/validators';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('aarav.patel@khelsetu.org');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    const passCheck = validatePassword(password);
    if (!passCheck.isValid) {
      setError(passCheck.message || 'Invalid password');
      return;
    }

    setLoading(true);
    try {
      await login(email, 'athlete');
      navigate('/app/dashboard');
    } catch {
      setError('Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-black text-2xl mx-auto shadow-md shadow-emerald-600/20">
            K
          </div>
          <h1 className="text-3xl font-black text-slate-900 font-display">Log In to KhelSetu</h1>
          <p className="text-xs text-slate-600 font-medium">Access your AI sports performance dashboard</p>
        </div>

        <Card className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="athlete@khelsetu.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
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

            <div className="flex justify-between items-center text-xs">
              <Link to="/forgot-password" className="text-emerald-600 hover:underline font-bold">
                Forgot password?
              </Link>
            </div>

            <Button
              variant="primary"
              size="md"
              className="w-full"
              isLoading={loading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Enter Athlete Portal
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600 font-medium">
            Don't have an account yet?{' '}
            <Link to="/signup" className="text-emerald-600 font-bold hover:underline">
              Create Athlete Profile
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
