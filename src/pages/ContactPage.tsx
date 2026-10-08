import React, { useState } from 'react';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Mail, MapPin, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <Badge variant="emerald">Get In Touch</Badge>
        <h1 className="text-4xl font-black text-slate-900 font-display">Contact KhelSetu Support</h1>
        <p className="text-sm text-slate-600 font-medium">Have questions about sports assessments, institutional partnerships, or technical support?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-5xl mx-auto">
        <div className="md:col-span-5 space-y-6">
          <Card className="space-y-4">
            <div className="flex items-center gap-3 text-emerald-600">
              <Mail className="w-5 h-5" />
              <span className="text-sm font-bold text-slate-900">Email Us</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">support@khelsetu.org · partnership@khelsetu.org</p>
          </Card>

          <Card className="space-y-4">
            <div className="flex items-center gap-3 text-emerald-600">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-bold text-slate-900">Headquarters</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">Sports Technology Complex, Sector 15, Gandhinagar, Gujarat 382016</p>
          </Card>
        </div>

        <div className="md:col-span-7">
          <Card>
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-display">Message Received</h3>
                <p className="text-xs text-slate-600 font-medium">Our team will respond to your inquiry within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Your Name" placeholder="e.g. Aarav Patel" required />
                <Input label="Email Address" type="email" placeholder="name@domain.com" required />
                <Input label="Subject" placeholder="Inquiry topic" required />
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Message</label>
                  <textarea
                    rows={4}
                    className="block w-full rounded-xl bg-white border border-slate-200 p-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
                    placeholder="Tell us how we can help..."
                    required
                  />
                </div>
                <Button variant="primary" size="md" className="w-full" rightIcon={<Send className="w-4 h-4" />}>
                  Send Message
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
