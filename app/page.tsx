"use client";

import React, { useRef } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Compressor from './components/Compressor';
import Footer from './components/Footer';

const App: React.FC = () => {
  const compressorRef = useRef<HTMLElement>(null);

  const scrollToCompressor = () => {
    const element = document.getElementById('compressor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-200 selection:text-indigo-900">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="h-8 w-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold font-display shadow-lg shadow-indigo-500/30">
                IF
             </div>
             <span className="font-display font-bold text-xl tracking-tight hidden sm:block">ImageForge</span>
          </div>
          <button
            onClick={scrollToCompressor}
            className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Start Compressing
          </button>
        </div>
      </nav>

      <main>
        <Hero onStart={scrollToCompressor} />
        <Features />
        <Compressor />
      </main>

      <Footer />
    </div>
  );
};

export default App;
