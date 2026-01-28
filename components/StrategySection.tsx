
import React from 'react';

export const StrategySection: React.FC = () => {
  return (
    <div className="py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">Chiến Lược Chào Bán</h2>
          <p className="text-slate-400">Chứng minh giá trị thực tế bằng dữ liệu thật và bài toán kinh tế.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Strategy 1: Real Trial */}
          <div className="relative p-8 lg:p-12 rounded-[3rem] bg-blue-600/5 border border-blue-500/10 group">
            <div className="absolute top-0 right-0 p-6 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">🧪</div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-sm mr-4">01</span>
              Dùng thử với dữ liệu thật
            </h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Chúng tôi mang trực tiếp Mac Mini đến văn phòng khách hàng, nạp 100+ tệp tài liệu nội bộ và demo khả năng trả lời chính xác ngay lập tức.
            </p>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-sm italic text-blue-400">"AI trả lời dựa trên chính quy trình của bạn, không phải kiến thức chung trên mạng."</p>
            </div>
          </div>

          {/* Strategy 2: Cost Comparison */}
          <div className="relative p-8 lg:p-12 rounded-[3rem] bg-purple-600/5 border border-purple-500/10 group">
            <div className="absolute top-0 right-0 p-6 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">📊</div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-sm mr-4">02</span>
              Bài toán chi phí (ROI)
            </h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              So sánh chi phí thuê 10 nhân sự xử lý văn bản truyền thống với việc đầu tư 01 cụm Mac Studio hoạt động 24/7 trong 5 năm.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                <p className="text-xs text-slate-500 uppercase">Truyền thống</p>
                <p className="text-lg font-bold text-red-400">10 Nhân sự</p>
              </div>
              <div className="text-center p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <p className="text-xs text-slate-500 uppercase">AI-Local Hub</p>
                <p className="text-lg font-bold text-emerald-400">1 Mac Studio</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-[#0a0a0a] px-8 py-4 rounded-full">
               <p className="text-white font-bold text-lg">
                 Thông điệp chủ chốt: <span className="text-gradient">Sở hữu trí tuệ nhân tạo riêng - Bảo mật là tài sản lớn nhất.</span>
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
