"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SocialButtonProps {
  Icon: ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function SocialButton({ Icon, label, onClick, disabled }: SocialButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.99 }}
      className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 glass-subtle border border-white/10 hover:border-white/20 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {Icon}
      <span>{label}</span>
    </motion.button>
  );
}
