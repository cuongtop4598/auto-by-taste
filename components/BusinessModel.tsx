
import React from 'react';

export const BusinessModel: React.FC = () => {
  const models = [
    {
      title: "Triển khai trọn gói (Setup)",
      description: "Bán máy Mac + Phí cài đặt phần mềm + Xây dựng cơ sở dữ liệu riêng (RAG).",
      icon: "🏢",
      highlight: "CAPEX Model"
    },
    {
      title: "Thuê bao & Bảo trì",
      description: "Cập nhật mô hình AI mới (Llama 4), hỗ trợ kỹ thuật và giao diện UI độc quyền.",
      icon: "⚙️",
      highlight: "Recurring Revenue"
    },
    {
      title: "Đào tạo & Tùy chỉnh",
      description: "Prompt Engineering cho nhân sự & Viết Agent tự động hóa chuyên biệt cho từng ngành.",
      icon: "🧠",
      highlight: "Professional Services"
    },
    {
      title: "Cho thuê thiết bị (HaaS)",
      description: "Trọn gói máy Mac + AI với chi phí chỉ 3-7 triệu/tháng. Giảm rào cản đầu tư.",
      icon: "💳",
      highlight: "Scalable Model"
    }
  ];

  return (
    <div className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">Mô Hình Kinh Doanh</h2>
          <p className="text-slate-400">Đa dạng hóa nguồn thu từ bán lẻ đến dịch vụ thuê bao chuyên nghiệp.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {models.map((item, i) => (
            <div key={i} className="p-8 rounded-3xl glass-card border border-white/5 hover:border-blue-500/30 transition-all group">
              <div className="text-3xl mb-6 bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                {item.icon}
              </div>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-2">{item.highlight}</p>
              <h4 className="text-xl font-bold text-white mb-4 leading-tight">{item.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 lg:p-12 rounded-[2.5rem] bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/5 relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 text-center md:text-left">
                <h4 className="text-2xl font-bold text-white mb-2">Sở hữu trí tuệ nhân tạo riêng</h4>
                <p className="text-slate-400">"Bảo mật dữ liệu là tài sản lớn nhất của doanh nghiệp."</p>
              </div>
              <div className="flex space-x-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">#1</p>
                  <p className="text-xs uppercase tracking-tighter text-slate-500">Bảo mật</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">10x</p>
                  <p className="text-xs uppercase tracking-tighter text-slate-500">Hiệu suất</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">0$</p>
                  <p className="text-xs uppercase tracking-tighter text-slate-500">Cloud Fee</p>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
