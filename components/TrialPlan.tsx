
import React from 'react';

interface TrialFeature {
  icon: string;
  title: string;
  description: string;
}

const trialFeatures: TrialFeature[] = [
  {
    icon: "🖥️",
    title: "Mac Mini M4 tại văn phòng",
    description: "Chúng tôi mang trực tiếp Mac Mini M4 (32GB RAM) đến văn phòng của bạn để demo và trải nghiệm."
  },
  {
    icon: "📁",
    title: "Nạp 100+ tài liệu nội bộ",
    description: "Upload tài liệu, quy trình, FAQ của doanh nghiệp để AI học và trả lời chính xác theo ngữ cảnh riêng."
  },
  {
    icon: "🤖",
    title: "AI Agent tùy chỉnh",
    description: "Trải nghiệm trợ lý ảo được cấu hình riêng cho ngành nghề và nhu cầu cụ thể của bạn."
  },
  {
    icon: "🔒",
    title: "Bảo mật 100% On-Device",
    description: "Dữ liệu không bao giờ rời khỏi thiết bị. Mọi xử lý đều diễn ra cục bộ trên Mac Mini."
  },
  {
    icon: "📊",
    title: "Báo cáo hiệu suất chi tiết",
    description: "Nhận báo cáo đo lường tốc độ xử lý, độ chính xác và tiềm năng tiết kiệm chi phí."
  },
  {
    icon: "👨‍💻",
    title: "Hỗ trợ kỹ thuật 1-1",
    description: "Chuyên gia AI đồng hành suốt quá trình trải nghiệm, giải đáp mọi thắc mắc."
  }
];

const trialSteps = [
  {
    step: 1,
    title: "Đăng ký trải nghiệm",
    description: "Liên hệ qua Zalo hoặc điền form để đặt lịch demo tại văn phòng."
  },
  {
    step: 2,
    title: "Khảo sát nhu cầu",
    description: "Đội ngũ tư vấn sẽ tìm hiểu quy trình và nhu cầu cụ thể của doanh nghiệp."
  },
  {
    step: 3,
    title: "Cài đặt & Demo",
    description: "Mang Mac Mini đến, nạp tài liệu và demo trực tiếp khả năng AI."
  },
  {
    step: 4,
    title: "Trải nghiệm 7 ngày",
    description: "Sử dụng thử miễn phí 7 ngày để đánh giá hiệu quả thực tế."
  }
];

export const TrialPlan: React.FC = () => {
  return (
    <div className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-6">
            <span className="text-green-400 text-sm font-semibold">Miễn phí 7 ngày</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Trải Nghiệm Thử <span className="text-blue-400">Mac Mini AI</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Không cam kết, không rủi ro. Chúng tôi mang AI đến tận nơi để bạn trải nghiệm
            sức mạnh của On-Device AI với chính dữ liệu của mình.
          </p>
        </div>

        {/* Trial Package Card */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative p-8 lg:p-12 rounded-[2.5rem] bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-2 border-blue-500/30">
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-400 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg shadow-green-500/30">
              Gói Trải Nghiệm Đặc Biệt
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mt-4">
              {/* Left: Package Info */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Mac Mini M4 Trial</h3>
                <p className="text-slate-400 mb-6">Trọn gói trải nghiệm 7 ngày tại văn phòng</p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300">Mac Mini M4 - 32GB RAM</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300">Cài đặt Llama 3.1 8B + Mistral</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300">RAG với 100+ tài liệu của bạn</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300">Giao diện chat đơn giản, dễ dùng</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300">Hỗ trợ kỹ thuật online 24/7</span>
                  </div>
                </div>

                <div className="flex items-end space-x-2 mb-6">
                  <span className="text-4xl font-bold text-white">0đ</span>
                  <span className="text-slate-400 line-through text-lg">5.000.000đ</span>
                  <span className="text-green-400 text-sm font-semibold ml-2">Miễn phí hoàn toàn</span>
                </div>

                <a
                  href="https://zalo.me/0337776435"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:scale-105"
                >
                  <span>Đăng ký trải nghiệm ngay</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              {/* Right: Visual */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="w-64 h-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl flex items-center justify-center shadow-2xl border border-white/10">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🖥️</div>
                      <p className="text-white font-bold">Mac Mini M4</p>
                      <p className="text-slate-400 text-sm">32GB Unified Memory</p>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>

                  {/* Floating badges */}
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    7 ngày FREE
                  </div>
                  <div className="absolute -bottom-2 -left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    On-Device AI
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white text-center mb-12">Những gì bạn nhận được</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trialFeatures.map((feature, idx) => (
              <div key={idx} className="p-6 rounded-2xl glass-card hover:bg-white/10 transition-all group">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white text-center mb-12">Quy trình đơn giản</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {trialSteps.map((step, idx) => (
              <div key={idx} className="relative text-center">
                {/* Connector line */}
                {idx < trialSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                )}

                {/* Step number */}
                <div className="relative z-10 w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                  <span className="text-white text-2xl font-bold">{step.step}</span>
                </div>

                <h4 className="text-white font-bold mb-2">{step.title}</h4>
                <p className="text-slate-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-400 mb-6">
            Còn chần chừ gì nữa? Hãy để AI làm việc cho bạn ngay hôm nay!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://zalo.me/0337776435"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-2xl transition-all shadow-lg shadow-green-500/30"
            >
              <img src="https://img.icons8.com/color/48/zalo.png" alt="Zalo" className="w-6 h-6 mr-2" />
              Chat Zalo ngay
            </a>
            <a
              href="tel:0337776435"
              className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all border border-white/20"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Gọi: 033 777 6435
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
