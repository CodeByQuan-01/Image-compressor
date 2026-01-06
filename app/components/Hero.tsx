import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import Button from './Button';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/20 text-indigo-900 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            v2.0 Now Available
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-slate-900">
            Compress images <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-x">
              to perfection.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-relaxed">
            Intelligent compression that reduces file size by up to 90% without visible quality loss.
            Secure, client-side, and lightning fast.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" onClick={onStart} icon={<Zap className="w-5 h-5" />}>
              Start Compressing
            </Button>
            <Button variant="secondary" size="lg" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
              See How It Works
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
             <div className="flex flex-col items-center">
                <div className="text-4xl font-display font-bold text-indigo-600 mb-2">90%</div>
                <div className="text-slate-500 font-medium">Size Reduction</div>
             </div>
             <div className="flex flex-col items-center">
                <div className="text-4xl font-display font-bold text-indigo-600 mb-2">100%</div>
                <div className="text-slate-500 font-medium">Privacy (Client-side)</div>
             </div>
             <div className="flex flex-col items-center">
                <div className="text-4xl font-display font-bold text-indigo-600 mb-2">&lt;10MB</div>
                <div className="text-slate-500 font-medium">Guaranteed Output</div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
