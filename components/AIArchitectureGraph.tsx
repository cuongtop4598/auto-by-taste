
import React from 'react';

const messagingApps = [
  { name: 'Telegram', icon: 'https://img.icons8.com/color/48/telegram-app.png', color: '#0088cc' },
  { name: 'WhatsApp', icon: 'https://img.icons8.com/color/48/whatsapp.png', color: '#25D366' },
  { name: 'Zalo', icon: 'https://img.icons8.com/color/48/zalo.png', color: '#0068FF' },
  { name: 'Signal', icon: 'https://img.icons8.com/color/48/signal-app.png', color: '#3A76F0' },
];

const aiTools = [
  { name: 'Browser', icon: '🌐' },
  { name: 'Excel', icon: '📊' },
  { name: 'Word', icon: '📝' },
  { name: 'Notion', icon: '📓' },
  { name: 'PowerPoint', icon: '📽️' },
  { name: 'Gmail', icon: '📧' },
  { name: 'Phone Call', icon: '📞' },
  { name: 'Customer Service', icon: '🎧' },
  { name: 'Accounting', icon: '💰' },
];

const hardware = [
  { name: 'Mac Studio', icon: 'https://img.icons8.com/sf-regular-filled/48/FFFFFF/mac-studio.png' },
  { name: 'Mac Mini', icon: 'https://img.icons8.com/sf-regular-filled/48/FFFFFF/mac-mini.png' },
];

export const AIArchitectureGraph: React.FC = () => {
  return (
    <div className="py-24 bg-gradient-to-b from-[#050505] via-[#0a0a15] to-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-semibold text-purple-400 mb-4">
            KIẾN TRÚC HỆ THỐNG
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">AI Agent</span> Architecture
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Hệ thống AI Agent đa tầng, kết nối liền mạch từ các kênh giao tiếp đến phần cứng mạnh mẽ
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="relative max-w-5xl mx-auto">

          {/* Layer 1: Messaging Apps */}
          <div className="relative mb-8">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 text-right pr-4">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Layer 1</span>
              <p className="text-[10px] text-slate-500">Kênh giao tiếp</p>
            </div>
            <div className="ml-28 glass-card rounded-2xl p-6 border-blue-500/20">
              <div className="flex flex-wrap justify-center gap-4">
                {messagingApps.map((app, index) => (
                  <div
                    key={app.name}
                    className="flex flex-col items-center p-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all hover:scale-105 cursor-pointer group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <img src={app.icon} alt={app.name} className="w-10 h-10" />
                    </div>
                    <span className="text-xs font-medium text-slate-300">{app.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Connection Line 1-2 */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
              <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500 to-purple-600"></div>
            </div>
          </div>

          {/* Layer 2: AI Agent Brain */}
          <div className="relative mb-8">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 text-right pr-4">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Layer 2</span>
              <p className="text-[10px] text-slate-500">Bộ não AI</p>
            </div>
            <div className="ml-28 relative">
              <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full"></div>
              <div className="relative glass-card rounded-2xl p-8 border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-purple-500/30 blur-2xl rounded-full animate-pulse"></div>
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                      <span className="text-4xl">🧠</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">AI Agent Brain</h3>
                  <p className="text-sm text-slate-400 text-center max-w-md">
                    Trung tâm xử lý thông minh - Nhận lệnh từ các kênh giao tiếp và điều phối các công cụ tự động
                  </p>
                  <div className="flex gap-2 mt-4">
                    <span className="px-3 py-1 bg-purple-500/20 rounded-full text-xs text-purple-300">NLP</span>
                    <span className="px-3 py-1 bg-blue-500/20 rounded-full text-xs text-blue-300">RAG</span>
                    <span className="px-3 py-1 bg-emerald-500/20 rounded-full text-xs text-emerald-300">LLM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Line 2-3 */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500 to-emerald-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
              <div className="w-0.5 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600"></div>
            </div>
          </div>

          {/* Layer 3: AI Tools */}
          <div className="relative mb-8">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 text-right pr-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Layer 3</span>
              <p className="text-[10px] text-slate-500">Công cụ AI</p>
            </div>
            <div className="ml-28 glass-card rounded-2xl p-6 border-emerald-500/20">
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
                {aiTools.map((tool, index) => (
                  <div
                    key={tool.name}
                    className="flex flex-col items-center p-3 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 hover:border-emerald-500/50 transition-all hover:scale-105 cursor-pointer group"
                  >
                    <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{tool.icon}</span>
                    <span className="text-[10px] font-medium text-slate-400 text-center leading-tight">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Connection Line 3-4 */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-8 bg-gradient-to-b from-emerald-500 to-orange-500"></div>
              <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></div>
              <div className="w-0.5 h-8 bg-gradient-to-b from-orange-500 to-orange-600"></div>
            </div>
          </div>

          {/* Layer 4: Hardware */}
          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 text-right pr-4">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Layer 4</span>
              <p className="text-[10px] text-slate-500">Phần cứng</p>
            </div>
            <div className="ml-28 glass-card rounded-2xl p-6 border-orange-500/20 bg-gradient-to-br from-orange-900/10 to-slate-900/50">
              <div className="flex flex-wrap justify-center gap-6">
                {hardware.map((hw) => (
                  <div
                    key={hw.name}
                    className="flex flex-col items-center p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-600/50 hover:border-orange-500/50 transition-all hover:scale-105 cursor-pointer group min-w-[140px]"
                  >
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br from-slate-700 to-slate-800 group-hover:from-orange-900/30 group-hover:to-slate-800 transition-all">
                      <img src={hw.icon} alt={hw.name} className="w-12 h-12 opacity-90" />
                    </div>
                    <span className="text-sm font-semibold text-slate-200">{hw.name}</span>
                    <span className="text-[10px] text-slate-500 mt-1">Apple Silicon</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-slate-500 mt-4">
                Powered by Apple Silicon - M2/M3/M4 Ultra với Neural Engine mạnh mẽ
              </p>
            </div>
          </div>

        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-slate-400">Kênh giao tiếp</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-slate-400">AI Agent Core</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-400">Automation Tools</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-slate-400">Hardware Infrastructure</span>
          </div>
        </div>

      </div>
    </div>
  );
};
