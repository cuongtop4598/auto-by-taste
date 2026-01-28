
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { FundingAllocation } from '../types';

const data: FundingAllocation[] = [
  { name: 'R&D (Framework MLX/Software)', value: 40, color: '#3B82F6' },
  { name: 'Thiết bị & Kho hàng', value: 30, color: '#8B5CF6' },
  { name: 'Marketing & Sales', value: 20, color: '#10B981' },
  { name: 'Vận hành & Pháp lý', value: 10, color: '#F59E0B' },
];

export const FundingSection: React.FC = () => {
  return (
    <div className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">Kế Hoạch Sử Dụng Vốn</h2>
            <p className="text-slate-400">Giai đoạn Seed Round tập trung vào tối ưu hóa công nghệ và mở rộng thị trường.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-6">
              {data.map((item, i) => (
                <div key={i} className="p-5 glass-card rounded-2xl border-l-4" style={{ borderColor: item.color }}>
                  <div className="flex justify-between items-center mb-1">
                    <h5 className="font-bold text-white">{item.name}</h5>
                    <span className="text-2xl font-bold text-white">{item.value}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                  </div>
                </div>
              ))}
              
              <div className="pt-8">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-600/20 transition-all text-lg">
                  Tải Bản Kế Hoạch Chi Tiết (PDF)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
