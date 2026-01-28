
import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { TargetSegments } from './components/TargetSegments';
import { ProductTiers } from './components/ProductTiers';
import { BusinessModel } from './components/BusinessModel';
import { StrategySection } from './components/StrategySection';
import { FundingSection } from './components/FundingSection';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <main className="flex-grow pt-20">
        <section id="overview">
          <Hero />
        </section>
        
        <section id="problem">
          <ProblemSolution />
        </section>

        <section id="segments">
          <TargetSegments />
        </section>

        <section id="products">
          <ProductTiers />
        </section>

        <section id="business">
          <BusinessModel />
        </section>

        <section id="strategy">
          <StrategySection />
        </section>

        <section id="funding">
          <FundingSection />
        </section>
      </main>
      <Footer />

      {/* Floating Action Button for Zalo/Contact */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end space-y-3">
        <a 
          href="https://zalo.me/0337776435" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center space-x-3 bg-blue-600 text-white pl-4 pr-2 py-2 rounded-full shadow-2xl shadow-blue-600/40 hover:bg-blue-500 transition-all hover:scale-105"
        >
          <span className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Chat Zalo Founder</span>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <img src="https://img.icons8.com/color/48/zalo.png" alt="Zalo" className="w-6 h-6" />
          </div>
        </a>
      </div>
    </div>
  );
}

export default App;
