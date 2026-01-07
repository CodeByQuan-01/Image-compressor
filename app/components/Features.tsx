import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Layers, Cpu, Zap, Image as ImageIcon, Globe, Lock, Timer, Cloud } from 'lucide-react';
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
                      <Image 
                        src="https://picsum.photos/seed/magic/800/600" 
                        alt="Magic Compression" 
                        width={800}
                        height={600}
                        className="w-full h-auto"
                        unoptimized
                      />
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
                       <Image 
                        src="https://picsum.photos/seed/quality/800/600" 
                        alt="High Quality"
                        width={800}
                        height={600}
                        className="rounded-2xl shadow-lg relative z-10"
                        unoptimized
                       />
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
                  <GlassCard className="p-8 md:p-12">
                     <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-1 space-y-8">
                           <div className="space-y-4">
                              <div className="inline-flex items-center gap-2 text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full text-sm font-bold border border-indigo-100">
                                 <Cpu className="w-4 h-4" /> WebAssembly Powered
                              </div>
                              <h3 className="font-display text-3xl md:text-4xl font-bold text-slate-900">
                                 Local Processing Speed
                              </h3>
                              <p className="text-slate-600 text-lg leading-relaxed">
                                 Your images never leave your browser. We utilize modern Web Workers and WASM to compress images instantly on your device, ensuring maximum privacy and zero latency.
                              </p>
                           </div>
                           
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-4">
                                 <div className="bg-white p-2.5 rounded-lg shadow-sm text-indigo-600">
                                    <Lock className="w-5 h-5" />
                                 </div>
                                 <div>
                                    <h4 className="font-bold text-slate-900">100% Private</h4>
                                    <p className="text-sm text-slate-500 mt-1">Files are processed locally</p>
                                 </div>
                              </div>
                              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-4">
                                 <div className="bg-white p-2.5 rounded-lg shadow-sm text-indigo-600">
                                    <Globe className="w-5 h-5" />
                                 </div>
                                 <div>
                                    <h4 className="font-bold text-slate-900">Offline Capable</h4>
                                    <p className="text-sm text-slate-500 mt-1">Works without internet</p>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="flex-1 w-full max-w-lg">
                           <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
                              <div className="absolute top-0 right-0 p-32 bg-indigo-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
                              
                              <div className="space-y-6 relative z-10">
                                 <div className="flex items-center justify-between border-b border-white/10 pb-6">
                                    <div className="space-y-1">
                                       <div className="text-slate-400 text-sm font-medium">Processing Time</div>
                                       <div className="text-4xl font-bold text-green-400 font-mono">~0.4s</div>
                                    </div>
                                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                                       <Timer className="w-6 h-6 text-green-400" />
                                    </div>
                                 </div>

                                 <div className="space-y-4">
                                    <div className="space-y-2">
                                       <div className="flex justify-between text-sm">
                                          <span className="text-white font-medium">Local Processing</span>
                                          <span className="text-green-400">Instant</span>
                                       </div>
                                       <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                          <motion.div 
                                             initial={{ width: 0 }}
                                             animate={{ width: "95%" }}
                                             transition={{ duration: 1, delay: 0.2 }}
                                             className="h-full bg-green-500 rounded-full"
                                          />
                                       </div>
                                    </div>

                                    <div className="space-y-2 opacity-50">
                                       <div className="flex justify-between text-sm">
                                          <span className="text-slate-300">Traditional Upload</span>
                                          <span className="text-slate-400">Slow</span>
                                       </div>
                                       <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                          <motion.div 
                                             initial={{ width: 0 }}
                                             animate={{ width: "30%" }}
                                             transition={{ duration: 1.5, delay: 0.4 }}
                                             className="h-full bg-slate-500 rounded-full"
                                          />
                                       </div>
                                    </div>
                                 </div>

                                 <div className="pt-6 grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 rounded-lg p-3 text-center">
                                       <div className="text-2xl font-bold mb-1">0ms</div>
                                       <div className="text-xs text-slate-400">Upload Latency</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3 text-center">
                                       <div className="text-2xl font-bold mb-1">∞</div>
                                       <div className="text-xs text-slate-400">Files / Minute</div>
                                    </div>
                                 </div>
                              </div>
                           </div>
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
