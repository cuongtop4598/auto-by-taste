
import React from 'react';

const segments = [
  {
    title: "Tài chính - Pháp lý - Y tế",
    description: "Các văn phòng luật, kiểm toán, ngân hàng, bệnh viện tư nhân.",
    needs: ["Tóm tắt hồ sơ bệnh án", "Tra cứu văn bản pháp luật", "Phân tích hợp đồng"],
    whyMac: "Tuyệt đối không để lộ thông tin khách hàng lên đám mây.",
    icon: "🏦",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Kỹ thuật - Sản xuất",
    description: "Công ty xây dựng, nhà máy sản xuất (Cao su SVR10), kiến trúc.",
    needs: ["Tra cứu quy chuẩn kỹ thuật (RAG)", "Báo cáo tiến độ tự động", "Viết mô tả sản phẩm xuất khẩu"],
    whyMac: "Xử lý tệp PDF kỹ thuật nặng và sơ đồ tư duy vượt trội.",
    icon: "🏗️",
    color: "from-amber-500/20 to-orange-500/20"
  },
  {
    title: "Content Agency & Đào tạo",
    description: "Team Marketing, TikToker, Trung tâm dạy kỹ năng/ngoại ngữ.",
    needs: ["Lên kịch bản video hàng loạt", "Dịch thuật chuyên ngành", "Chatbot hỗ trợ học viên 24/7"],
    whyMac: "Mac Mini nhỏ gọn, là 'trạm não bộ' chung cho cả đội ngũ.",
    icon: "🎬",
    color: "from-purple-500/20 to-pink-500/20"
  }
];

export const TargetSegments: React.FC = () => {
  return (
    <div className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">Phân Khúc Mục Tiêu</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Chúng tôi tập trung vào những lĩnh vực coi trọng Bảo mật và Tri thức nội bộ.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {segments.map((s, i) => (
            <div key={i} className={`p-8 rounded-[2.5rem] glass-card border border-white/5 bg-gradient-to-br ${s.color} flex flex-col`}>
              <div className="text-4xl mb-6">{s.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{s.title}</h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">{s.description}</p>
              
              <div className="space-y-3 mb-8 flex-grow">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nhu cầu trọng tâm</p>
                {s.needs.map((need, ni) => (
                  <div key={ni} className="flex items-start space-x-2 text-sm text-slate-400">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{need}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-xs italic text-slate-500 mb-1">Tại sao chọn Apple Silicon?</p>
                <p className="text-sm font-medium text-slate-200">{s.whyMac}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
