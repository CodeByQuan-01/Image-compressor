import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Check, Zap, Download, RefreshCw, AlertCircle } from 'lucide-react';
import { compressImage, formatBytes } from '../services/compressionservice';
import { AppState, CompressionResult } from '../types';
import Button from './Button';
import GlassCard from './GlassCard';

const Compressor: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }

    setState(AppState.COMPRESSING);
    setError(null);

    try {
      // Simulate a small delay for better UX if it's too fast
      const [compressionResult] = await Promise.all([
        compressImage(file),
        new Promise(resolve => setTimeout(resolve, 800))
      ]);
      
      setResult(compressionResult);
      setState(AppState.SUCCESS);
    } catch (err) {
      console.error(err);
      setError('Failed to compress image. Please try again.');
      setState(AppState.ERROR);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const reset = () => {
    setState(AppState.IDLE);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadFile = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(result.compressedFile);
    link.download = `compressed-${result.originalFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="compressor" className="py-20 px-4 min-h-[600px] flex items-center justify-center relative">
      <div className="w-full max-w-4xl mx-auto z-10">
        <AnimatePresence mode="wait">
          {state === AppState.IDLE && (
            <GlassCard key="idle" className="text-center p-16 border-2 border-dashed border-indigo-200 hover:border-indigo-400 transition-colors">
              <div
                className="flex flex-col items-center justify-center cursor-pointer min-h-[300px]"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
                
                <motion.div
                  animate={{ scale: isDragging ? 1.1 : 1 }}
                  className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 text-indigo-600"
                >
                  <Upload className="w-10 h-10" />
                </motion.div>
                
                <h3 className="font-display text-3xl font-bold mb-4">
                  {isDragging ? 'Drop it here!' : 'Upload your image'}
                </h3>
                <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">
                  Drag & drop any PNG, JPG, WebP or AVIF file here, or click to browse.
                  We&apos;ll compress it instantly.
                </p>
                
                <div className="flex gap-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  <span>PNG</span>
                  <span>JPEG</span>
                  <span>WEBP</span>
                  <span>AVIF</span>
                </div>
              </div>
            </GlassCard>
          )}

          {state === AppState.COMPRESSING && (
            <GlassCard key="compressing" className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="relative w-32 h-32 mb-8">
                 <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#E2E8F0" strokeWidth="8" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#6366F1" strokeWidth="8" strokeDasharray="280" strokeDashoffset="200" strokeLinecap="round" />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="w-10 h-10 text-indigo-600 animate-pulse" />
                 </div>
              </div>
              <h3 className="font-display text-2xl font-bold animate-pulse">Forging Pixels...</h3>
              <p className="text-slate-500 mt-2">Analyzing structural integrity</p>
            </GlassCard>
          )}

          {state === AppState.SUCCESS && result && (
             <GlassCard key="success" className="p-0 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                   {/* Preview Area */}
                   <div className="bg-slate-900 p-8 flex items-center justify-center relative min-h-[400px]">
                      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
                        Preview
                      </div>
                      <img
                        src={result.previewUrl}
                        alt="Compressed Preview"
                        className="max-w-full max-h-[350px] rounded-lg shadow-2xl object-contain"
                      />
                   </div>

                   {/* Stats Area */}
                   <div className="p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-6 text-green-600">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="w-5 h-5" />
                        </div>
                        <span className="font-bold">Compression Successful</span>
                      </div>

                      <h3 className="font-display text-3xl font-bold mb-8 text-slate-800 break-all">
                        {result.originalFile.name}
                      </h3>

                      <div className="grid grid-cols-2 gap-6 mb-10">
                         <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="text-slate-500 text-sm mb-1">Original Size</div>
                            <div className="text-xl font-bold text-slate-800">{formatBytes(result.originalSize)}</div>
                         </div>
                         <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 relative overflow-hidden">
                            <div className="text-indigo-600 text-sm mb-1">Compressed Size</div>
                            <div className="text-2xl font-bold text-indigo-700">{formatBytes(result.compressedSize)}</div>
                            <div className="absolute top-2 right-2 bg-indigo-200 text-indigo-800 text-xs font-bold px-2 py-0.5 rounded-full">
                               -{result.reductionPercentage}%
                            </div>
                         </div>
                      </div>

                      <div className="flex flex-col gap-3">
                         <Button size="lg" onClick={downloadFile} icon={<Download className="w-5 h-5" />} className="w-full">
                            Download Image
                         </Button>
                         <Button variant="outline" onClick={reset} icon={<RefreshCw className="w-4 h-4" />} className="w-full">
                            Compress Another
                         </Button>
                      </div>
                   </div>
                </div>
             </GlassCard>
          )}

          {state === AppState.ERROR && (
             <GlassCard key="error" className="text-center p-12">
                <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                   <AlertCircle className="w-10 h-10" />
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">Oops! Something went wrong</h3>
                <p className="text-slate-600 mb-8">{error}</p>
                <Button onClick={reset}>Try Again</Button>
             </GlassCard>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Compressor;
