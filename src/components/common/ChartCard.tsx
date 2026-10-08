import React from 'react';
import { Card } from './Card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export interface ChartCardProps {
  title: string;
  subtitle?: string;
  data: { date: string; score: number }[];
  height?: number;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  data,
  height = 240
}) => {
  return (
    <Card className="space-y-4">
      <div>
        <h3 className="text-base font-bold text-white font-display">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400 font-medium">{subtitle}</p>}
      </div>

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} domain={[40, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0D1117',
                borderColor: '#1E293B',
                borderRadius: '8px',
                color: '#F8FAFC',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#10B981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#scoreGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
