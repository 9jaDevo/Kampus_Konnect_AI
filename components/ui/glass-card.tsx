"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "strong" | "subtle";
  glow?: "none" | "indigo" | "cyan" | "violet";
  asChild?: boolean;
  children: ReactNode;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  function GlassCard(
    { variant = "default", glow = "none", className, children, ...rest },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-2xl overflow-hidden",
          variant === "default" && "glass",
          variant === "strong" && "glass-strong",
          variant === "subtle" && "glass-subtle",
          glow === "indigo" && "glow-indigo",
          glow === "cyan" && "glow-cyan",
          glow === "violet" && "glow-violet",
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
