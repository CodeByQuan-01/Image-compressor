import React from 'react';

export interface CompressionResult {
  originalFile: File;
  compressedFile: File;
  originalSize: number;
  compressedSize: number;
  reductionPercentage: number;
  previewUrl: string;
}

export interface CompressionStats {
  totalOriginal: number;
  totalCompressed: number;
  count: number;
}

export enum AppState {
  IDLE = 'IDLE',
  COMPRESSING = 'COMPRESSING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}
