import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Tabs } from '../components/common/Tabs';
import { User, Bell, Camera, Shield, CheckCircle } from 'lucide-react';

export const AthleteSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: 'account', label: 'Account Profile', icon: <User className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notification Alerts', icon: <Bell className="w-4 h-4" /> },
    { id: 'camera', label: 'Camera & Hardware', icon: <Camera className="w-4 h-4" /> },
    { id: 'security', label: 'Security & Privacy', icon: <Shield className="w-4 h-4" /> }
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-black text-white font-display">Account Settings</h1>
        <p className="text-xs text-slate-400">Manage your profile, camera hardware permissions, and security controls.</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <Card className="space-y-6">
        {saved && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Settings saved successfully.</span>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="space-y-4">
            <Input label="Athlete Display Name" defaultValue="Aarav Patel" />
            <Input label="Email Address" defaultValue="aarav.patel@khelsetu.org" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="State" defaultValue="Gujarat" />
              <Input label="District" defaultValue="Ahmedabad" />
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4 text-xs text-slate-300">
            <label className="flex items-center justify-between p-3 bg-[#07090E] rounded-xl border border-slate-800">
              <span>Email Alerts for Rank Changes</span>
              <input type="checkbox" defaultChecked className="accent-emerald-500 w-4 h-4" />
            </label>
            <label className="flex items-center justify-between p-3 bg-[#07090E] rounded-xl border border-slate-800">
              <span>New Assessment Availability</span>
              <input type="checkbox" defaultChecked className="accent-emerald-500 w-4 h-4" />
            </label>
          </div>
        )}

        {activeTab === 'camera' && (
          <div className="space-y-4 text-xs text-slate-300">
            <Select
              label="Default Web Camera Source"
              options={[
                { value: 'default', label: 'Integrated HD Web Camera' },
                { value: 'ext', label: 'External Wide-Angle Camera' }
              ]}
            />
            <p className="text-slate-400">Frame rate output: 60 FPS target with WebGL canvas acceleration.</p>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-4">
            <Input label="Current Password" type="password" placeholder="••••••••" />
            <Input label="New Password" type="password" placeholder="••••••••" />
          </div>
        )}

        <Button variant="primary" size="md" onClick={handleSave}>
          Save Preferences
        </Button>
      </Card>
    </div>
  );
};
