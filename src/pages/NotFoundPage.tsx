import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4 space-y-6">
      <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 font-black text-4xl font-display">
        404
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl font-black text-white font-display">Page Out of Bounds</h1>
        <p className="text-xs text-slate-400">
          The sports assessment route or athlete page you are trying to access does not exist or has been relocated.
        </p>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" size="md" onClick={() => navigate(-1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Go Back
        </Button>
        <Button variant="primary" size="md" onClick={() => navigate('/')} leftIcon={<Home className="w-4 h-4" />}>
          Return Home
        </Button>
      </div>
    </div>
  );
};
