import type { Variants } from "framer-motion";

export const BRAND_COLORS = {
  cyan: "#06CFFF",
  blue: "#3B82F6",
  indigo: "#6366F1",
  violet: "#8B5CF6",
  purple: "#7C3AED",
  ink: "#07071A",
} as const;

export const GRADIENTS = {
  brand: "linear-gradient(135deg, #06CFFF 0%, #6366F1 50%, #8B5CF6 100%)",
  brandSoft:
    "linear-gradient(135deg, rgba(6,207,255,0.15) 0%, rgba(99,102,241,0.15) 50%, rgba(139,92,246,0.15) 100%)",
  cyanIndigo: "linear-gradient(135deg, #06CFFF, #6366F1)",
  indigoViolet: "linear-gradient(135deg, #6366F1, #8B5CF6)",
} as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
