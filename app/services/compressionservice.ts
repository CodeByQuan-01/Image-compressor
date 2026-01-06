import imageCompression from 'browser-image-compression';
import { CompressionResult } from '../types';

export const compressImage = async (file: File): Promise<CompressionResult> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    const originalSize = file.size;
    const compressedSize = compressedFile.size;
    const reductionPercentage = Math.round(
      ((originalSize - compressedSize) / originalSize) * 100
    );

    const previewUrl = URL.createObjectURL(compressedFile);

    return {
      originalFile: file,
      compressedFile,
      originalSize,
      compressedSize,
      reductionPercentage,
      previewUrl,
    };
  } catch (error) {
    console.error('Compression failed:', error);
    throw error;
  }
};

export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
