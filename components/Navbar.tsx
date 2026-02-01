
import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Auto By Taste</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#overview" className="text-sm font-medium hover:text-blue-400 transition-colors">Tổng quan</a>
          <a href="#problem" className="text-sm font-medium hover:text-blue-400 transition-colors">Giải pháp</a>
          <a href="#architecture" className="text-sm font-medium hover:text-blue-400 transition-colors">Kiến trúc</a>
          <a href="#products" className="text-sm font-medium hover:text-blue-400 transition-colors">Gói sản phẩm</a>
          <a href="#trial" className="text-sm font-medium hover:text-green-400 transition-colors">Dùng thử</a>
          <a href="#business" className="text-sm font-medium hover:text-blue-400 transition-colors">Mô hình</a>
          <a href="#funding" className="text-sm font-medium hover:text-blue-400 transition-colors">Gọi vốn</a>
        </div>

        <div className="flex items-center space-x-4">
          <a href="https://zalo.me/0337776435" target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-blue-400 transition-colors">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Zalo Founder</span>
          </a>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-600/20">
            Đầu tư ngay
          </button>
        </div>
      </div>
    </nav>
  );
};
