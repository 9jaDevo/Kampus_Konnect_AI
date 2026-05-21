"use client";

import {
  forwardRef,
  useRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  children: ReactNode;
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  function GlowButton(
    {
      variant = "primary",
      size = "md",
      magnetic = true,
      className,
      children,
      onMouseMove,
      onMouseLeave,
      ...rest
    },
    ref
  ) {
    const localRef = useRef<HTMLButtonElement | null>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 18 });
    const springY = useSpring(y, { stiffness: 200, damping: 18 });
    const tx = useTransform(springX, (v) => `${v}px`);
    const ty = useTransform(springY, (v) => `${v}px`);

    function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
      if (magnetic && localRef.current) {
        const rect = localRef.current.getBoundingClientRect();
        const px = e.clientX - rect.left - rect.width / 2;
        const py = e.clientY - rect.top - rect.height / 2;
        x.set(px * 0.2);
        y.set(py * 0.2);
      }
      onMouseMove?.(e);
    }

    function handleLeave(e: React.MouseEvent<HTMLButtonElement>) {
      x.set(0);
      y.set(0);
      onMouseLeave?.(e);
    }

    return (
      <motion.button
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        style={magnetic ? { x: tx, y: ty } : undefined}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileTap={{ scale: 0.96 }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 font-medium rounded-xl",
          "transition-[box-shadow,background,border-color] duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-6 py-3 text-base",
          size === "lg" && "px-8 py-4 text-base",
          variant === "primary" &&
            "text-white bg-gradient-to-r from-indigo-500 via-indigo-500 to-violet-500 shadow-[0_8px_24px_-8px_rgba(99,102,241,0.6)] hover:shadow-[0_12px_36px_-8px_rgba(139,92,246,0.7)]",
          variant === "outline" &&
            "text-white glass border-white/15 hover:border-white/30 hover:bg-white/[0.07]",
          variant === "ghost" &&
            "text-slate-300 hover:text-white hover:bg-white/[0.05]",
          className
        )}
        {...(rest as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  }
);
