import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Zap, Download, RefreshCw, AlertCircle, FileArchive } from 'lucide-react';
import { compressImage, formatBytes } from '../services/compressionservice';
import { AppState, CompressionResult } from '../types';
import Button from './Button';
import GlassCard from './GlassCard';
import JSZip from 'jszip';
import Image from 'next/image';

interface TotalStatsProps {
  results: CompressionResult[];
}

const TotalStats: React.FC<TotalStatsProps> = ({ results }) => {
  const totalOriginal = results.reduce((acc, curr) => acc + curr.originalSize, 0);
  const totalCompressed = results.reduce((acc, curr) => acc + curr.compressedSize, 0);
  const totalReduction = Math.round(((totalOriginal - totalCompressed) / totalOriginal) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white/50 p-4 rounded-xl border border-slate-200">
         <div className="text-slate-500 text-sm">Total Images</div>
         <div className="text-xl font-bold text-slate-800">{results.length}</div>
      </div>
      <div className="bg-white/50 p-4 rounded-xl border border-slate-200">
         <div className="text-slate-500 text-sm">Total Saved</div>
         <div className="text-xl font-bold text-green-600">{formatBytes(totalOriginal - totalCompressed)}</div>
      </div>
      <div className="bg-white/50 p-4 rounded-xl border border-slate-200">
         <div className="text-slate-500 text-sm">Reduction</div>
         <div className="text-xl font-bold text-indigo-600">-{totalReduction}%</div>
      </div>
    </div>
  );
};

const Compressor: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [results, setResults] = useState<CompressionResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = async (files: File[]) => {
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length === 0) {
      setError('Please upload valid image files.');
      return;
    }

    setState(AppState.COMPRESSING);
    setError(null);

    try {
      // Process all files in parallel
      const compressionPromises = validFiles.map(async (file) => {
        return await compressImage(file);
      });

      const compressionResults = await Promise.all([
        ...compressionPromises,
        new Promise(resolve => setTimeout(resolve, 800)) // Min loading time
      ]);
      
      // Filter out the timeout result
      const finalResults = compressionResults.filter(r => r && 'originalFile' in (r as object)) as CompressionResult[];

      setResults(finalResults);
      setState(AppState.SUCCESS);
    } catch (err) {
      console.error(err);
      setError('Failed to compress images. Please try again.');
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
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
  };

  const reset = () => {
    setState(AppState.IDLE);
    setResults([]);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadFile = (result: CompressionResult) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(result.compressedFile);
    link.download = `compressed-${result.originalFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAll = async () => {
    if (results.length === 0) return;
    
    if (results.length === 1) {
      downloadFile(results[0]);
      return;
    }

    const zip = new JSZip();
    results.forEach(result => {
      zip.file(`compressed-${result.originalFile.name}`, result.compressedFile);
    });

    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = "compressed-images.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="compressor" className="py-20 px-4 min-h-[600px] flex items-center justify-center relative">
      <div className="w-full max-w-6xl mx-auto z-10">
        <AnimatePresence mode="wait">
          {state === AppState.IDLE && (
            <GlassCard key="idle" className="relative p-16 border-2 border-dashed border-indigo-200/50 hover:border-indigo-400 transition-colors max-w-4xl mx-auto overflow-hidden group">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                 <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-indigo-500 rounded-tl-lg transition-all group-hover:w-10 group-hover:h-10" />
                 <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-indigo-500 rounded-tr-lg transition-all group-hover:w-10 group-hover:h-10" />
                 <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-indigo-500 rounded-bl-lg transition-all group-hover:w-10 group-hover:h-10" />
                 <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-indigo-500 rounded-br-lg transition-all group-hover:w-10 group-hover:h-10" />
              </div>

              <div
                className="flex flex-col items-center justify-center cursor-pointer min-h-[300px] relative z-10"
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
                  multiple
                  onChange={handleFileSelect}
                />
                
                <motion.div
                  animate={{ scale: isDragging ? 1.1 : 1 }}
                  className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 text-indigo-600"
                >
                  <Upload className="w-10 h-10" />
                </motion.div>
                
                <h3 className="font-display text-3xl font-bold mb-4">
                  {isDragging ? 'Drop them here!' : 'Upload your images'}
                </h3>
                <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">
                  Drag & drop PNG, JPG, WebP or AVIF files here.
                  Batch processing supported!
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
            <GlassCard key="compressing" className="flex flex-col items-center justify-center min-h-[400px] max-w-4xl mx-auto">
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
              <p className="text-slate-500 mt-2">Processing your images</p>
            </GlassCard>
          )}

          {state === AppState.SUCCESS && results.length > 0 && (
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="w-full"
             >
               <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-display font-bold">Results</h2>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={reset} icon={<RefreshCw className="w-4 h-4" />}>
                       New Upload
                    </Button>
                    <Button onClick={downloadAll} icon={results.length > 1 ? <FileArchive className="w-4 h-4" /> : <Download className="w-4 h-4" />}>
                       {results.length > 1 ? 'Download All (ZIP)' : 'Download'}
                    </Button>
                  </div>
               </div>

               <TotalStats results={results} />

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {results.map((result, index) => (
                   <GlassCard key={index} className="p-0 overflow-hidden flex flex-col md:flex-row h-full">
                      <div className="w-full md:w-1/3 bg-slate-900 flex items-center justify-center p-4 min-h-[200px] relative">
                        <Image
                          src={result.previewUrl} 
                          alt={result.originalFile.name}
                          fill
                          unoptimized
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-center">
                         <div className="flex justify-between items-start mb-4">
                            <h4 className="font-bold text-slate-800 truncate max-w-[200px]" title={result.originalFile.name}>
                              {result.originalFile.name}
                            </h4>
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                              -{result.reductionPercentage}%
                            </span>
                         </div>
                         
                         <div className="flex justify-between text-sm text-slate-600 mb-6">
                            <div>
                              <div className="text-xs text-slate-400">Original</div>
                              <div className="font-medium">{formatBytes(result.originalSize)}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-indigo-400">Compressed</div>
                              <div className="font-bold text-indigo-600">{formatBytes(result.compressedSize)}</div>
                            </div>
                         </div>

                         <Button size="sm" variant="secondary" onClick={() => downloadFile(result)} icon={<Download className="w-3 h-3" />} className="w-full">
                            Download
                         </Button>
                      </div>
                   </GlassCard>
                 ))}
               </div>
             </motion.div>
          )}

          {state === AppState.ERROR && (
             <GlassCard key="error" className="text-center p-12 max-w-4xl mx-auto">
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
