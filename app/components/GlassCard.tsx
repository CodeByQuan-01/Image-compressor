import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`glass-card rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20 bg-white/60 ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
