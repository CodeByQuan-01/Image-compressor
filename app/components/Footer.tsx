import React from 'react';
import { Github, Heart } from 'lucide-react';
import { XLogo } from '@phosphor-icons/react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/50 backdrop-blur-md border-t border-slate-200 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold font-display shadow-md">
            IF
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-800">ImageForge</span>
        </div>
        
        <div className="text-slate-500 text-sm flex items-center gap-1">
          Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by CodeByQuan
        </div>

        <div className="flex gap-6">
          <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
            <XLogo className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
