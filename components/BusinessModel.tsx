
import React from 'react';

export const BusinessModel: React.FC = () => {
  const models = [
    {
      title: "Bán giải pháp trọn gói",
      description: "Doanh thu từ phần cứng Apple + Phí cài đặt phần mềm trợ lý ảo tối ưu (Setup fee).",
      icon: "🏢"
    },
    {
      title: "Phí bảo trì & Cập nhật",
      description: "Thu phí hàng năm để cập nhật các mô hình AI mới nhất (Llama, DeepSeek) và bảo trì hệ thống.",
      icon: "⚙️"
    },
    {
      title: "Huấn luyện AI chuyên sâu",
      description: "Dịch vụ tùy chỉnh (Customization) cho phép AI học trên dữ liệu riêng của từng ngành nghề cụ thể.",
      icon: "🧠"
    }
  ];

  return (
    <div className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">Mô Hình Kinh Doanh</h2>
          <p className="text-slate-400">Cách chúng tôi tạo ra dòng tiền bền vững và giá trị cho nhà đầu tư.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {models.map((item, i) => (
            <div key={i} className="p-8 rounded-3xl glass-card flex flex-col items-center text-center">
              <div className="text-4xl mb-6">{item.icon}</div>
              <h4 className="text-xl font-bold text-white mb-4">{item.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 lg:p-12 rounded-3xl bg-blue-600/5 border border-blue-500/10 text-center">
          <h4 className="text-2xl font-bold text-white mb-4">Lợi thế cạnh tranh (USP)</h4>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-blue-400 font-bold text-2xl mb-2">#1</p>
              <p className="text-slate-300 font-semibold">Bảo mật tuyệt đối</p>
              <p className="text-slate-500 text-sm">Dữ liệu không bao giờ rời khỏi nội bộ</p>
            </div>
            <div>
              <p className="text-blue-400 font-bold text-2xl mb-2">#2</p>
              <p className="text-slate-300 font-semibold">Tối ưu chi phí</p>
              <p className="text-slate-500 text-sm">Không phí thuê bao Cloud đắt đỏ</p>
            </div>
            <div>
              <p className="text-blue-400 font-bold text-2xl mb-2">#3</p>
              <p className="text-slate-300 font-semibold">Hiệu năng vượt trội</p>
              <p className="text-slate-500 text-sm">Apple Silicon là "vua" hiệu năng/watt</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
