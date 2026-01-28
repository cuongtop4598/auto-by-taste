
import React from 'react';

const Card: React.FC<{ title: string; description: string; icon: string; isProblem?: boolean }> = ({ title, description, icon, isProblem }) => (
  <div className={`p-8 rounded-3xl glass-card border ${isProblem ? 'border-red-500/10' : 'border-emerald-500/10'}`}>
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${isProblem ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
      <span className="text-2xl">{icon}</span>
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

export const ProblemSolution: React.FC = () => {
  return (
    <div className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">Tại sao là bây giờ?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Doanh nghiệp đang đứng trước thách thức lớn giữa việc ứng dụng AI và bảo vệ quyền riêng tư dữ liệu.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card 
            title="Nguy cơ rò rỉ dữ liệu" 
            description="ChatGPT, Claude hay các dịch vụ Cloud AI yêu cầu gửi dữ liệu nội bộ lên máy chủ bên thứ ba, tiềm ẩn rủi ro lộ bí mật kinh doanh cực cao."
            icon="🔒"
            isProblem
          />
          <Card 
            title="Chi phí vận hành khổng lồ" 
            description="Thuê server GPU đám mây (A100, H100) tiêu tốn hàng nghìn USD mỗi tháng, gây áp lực tài chính dài hạn cho doanh nghiệp."
            icon="💸"
            isProblem
          />
        </div>

        <div className="p-8 lg:p-12 rounded-[2rem] bg-gradient-to-br from-blue-600/20 via-slate-900 to-purple-600/20 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Giải pháp: Local AI trên Apple Silicon</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Tận dụng kiến trúc Unified Memory trên chip Apple M-series, chúng tôi mang sức mạnh của các mô hình LLM hàng đầu (Llama 3, DeepSeek) về ngay tại văn phòng bạn.
              </p>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center text-xs">✓</span>
                  <span>Bảo mật 100%, không cần Internet</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center text-xs">✓</span>
                  <span>Phản hồi cực nhanh nhờ băng thông bộ nhớ lớn</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-5 h-5 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center text-xs">✓</span>
                  <span>Chi phí đầu tư một lần, sử dụng vĩnh viễn</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img src="https://umxxfeuo5ed9xpid.public.blob.vercel-storage.com/media/gemini_generated_image_3mlypz3mlypz3mly_1769612846736.png" className="rounded-2xl shadow-2xl" alt="Apple Silicon Tech" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
