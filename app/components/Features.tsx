import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Layers, Cpu, Zap, Image as ImageIcon } from 'lucide-react';
import GlassCard from './GlassCard';

const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState('magic');

  const tabs = [
    { id: 'magic', label: 'One-Click Magic', icon: <Wand2 className="w-4 h-4" /> },
    { id: 'quality', label: 'Smart Quality', icon: <Layers className="w-4 h-4" /> },
    { id: 'formats', label: 'All Formats', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'speed', label: 'Lightning Fast', icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <section id="features" className="py-24 px-4 relative">
       <div className="max-w-6xl mx-auto">
         <div className="text-center mb-16">
           <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
           <p className="text-lg text-slate-600">Everything you need to optimize your images for the web.</p>
         </div>

         {/* Tabs Navigation */}
         <div className="flex flex-wrap justify-center gap-2 mb-12">
           {tabs.map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                 activeTab === tab.id
                   ? 'text-white'
                   : 'text-slate-600 hover:bg-white/50'
               }`}
             >
               {activeTab === tab.id && (
                 <motion.div
                   layoutId="activeTab"
                   className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg"
                   transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                 />
               )}
               <span className="relative z-10 flex items-center gap-2">
                 {tab.icon} {tab.label}
               </span>
             </button>
           ))}
         </div>

         {/* Tab Content */}
         <div className="relative min-h-[400px]">
           <AnimatePresence mode="wait">
             {activeTab === 'magic' && (
               <motion.div
                 key="magic"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 transition={{ duration: 0.3 }}
                 className="w-full"
               >
                 <GlassCard className="flex flex-col md:flex-row items-center gap-12 p-12">
                    <div className="flex-1 space-y-6">
                      <h3 className="font-display text-3xl font-bold">Automated Perfection</h3>
                      <p className="text-slate-600 text-lg">
                        Our intelligent algorithm analyzes each image individually to determine the optimal compression settings.
                        No technical knowledge required - just drop your file and let the magic happen.
                      </p>
                      <ul className="space-y-3">
                        {['Auto-detects image complexity', 'Preserves important details', 'Removes invisible metadata'].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-slate-700">
                            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-1 relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                      <img src="https://picsum.photos/seed/magic/800/600" alt="Magic Compression" className="w-full h-auto" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                        <div className="text-white">
                           <div className="text-sm font-mono opacity-80">Reduced by 75%</div>
                        </div>
                      </div>
                    </div>
                 </GlassCard>
               </motion.div>
             )}

             {activeTab === 'quality' && (
                <motion.div
                  key="quality"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <GlassCard className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                     <div className="relative group">
                       <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                       <img src="https://picsum.photos/seed/quality/800/600" className="rounded-2xl shadow-lg relative z-10" alt="High Quality" />
                     </div>
                     <div className="space-y-6">
                        <h3 className="font-display text-3xl font-bold">Pixel-Perfect Clarity</h3>
                        <p className="text-slate-600 text-lg">
                          We use advanced structural similarity algorithms (SSIM) to ensure the compressed image looks virtually identical to the original to the human eye.
                        </p>
                        <div className="bg-white/50 rounded-xl p-6 border border-white/20">
                          <div className="flex justify-between mb-2">
                             <span className="font-bold text-slate-800">Visual Quality</span>
                             <span className="text-indigo-600 font-bold">98%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                             <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '98%' }}></div>
                          </div>
                        </div>
                     </div>
                  </GlassCard>
                </motion.div>
             )}
             
             {activeTab === 'formats' && (
                <motion.div
                  key="formats"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <GlassCard className="text-center p-16">
                     <h3 className="font-display text-3xl font-bold mb-12">Universal Format Support</h3>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {['PNG', 'JPEG', 'WEBP', 'AVIF'].map((format) => (
                           <div key={format} className="flex flex-col items-center justify-center p-8 bg-white/40 rounded-2xl border border-white/20 hover:scale-105 transition-transform">
                              <div className="text-2xl font-black text-slate-800 mb-2">{format}</div>
                              <div className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">Supported</div>
                           </div>
                        ))}
                     </div>
                  </GlassCard>
                </motion.div>
             )}

             {activeTab === 'speed' && (
                <motion.div
                  key="speed"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <GlassCard className="flex flex-col md:flex-row items-center gap-12">
                     <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-sm font-bold">
                           <Cpu className="w-4 h-4" /> WebAssembly Powered
                        </div>
                        <h3 className="font-display text-3xl font-bold">Local Processing Speed</h3>
                        <p className="text-slate-600 text-lg">
                           Your images never leave your browser. We utilize modern Web Workers and WASM to compress images instantly on your device, ensuring maximum privacy and zero latency.
                        </p>
                     </div>
                     <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="bg-slate-900 text-white p-6 rounded-2xl">
                           <div className="text-3xl font-bold text-green-400 mb-1">0.4s</div>
                           <div className="text-sm text-slate-400">Average Time</div>
                        </div>
                        <div className="bg-white border border-slate-200 p-6 rounded-2xl">
                           <div className="text-3xl font-bold text-slate-900 mb-1">0ms</div>
                           <div className="text-sm text-slate-500">Upload Time</div>
                        </div>
                     </div>
                  </GlassCard>
                </motion.div>
             )}
           </AnimatePresence>
         </div>
       </div>
    </section>
  );
};

export default Features;
