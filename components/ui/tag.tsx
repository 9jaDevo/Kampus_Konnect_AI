import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  variant?: "default" | "cyan" | "indigo" | "violet" | "muted";
  size?: "sm" | "md";
  className?: string;
}

export function Tag({
  children,
  variant = "default",
  size = "sm",
  className,
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border whitespace-nowrap",
        size === "sm" && "px-2.5 py-1 text-xs",
        size === "md" && "px-3 py-1.5 text-sm",
        variant === "default" && "bg-white/[0.04] border-white/10 text-slate-200",
        variant === "cyan" && "bg-cyan-500/10 border-cyan-400/30 text-cyan-200",
        variant === "indigo" && "bg-indigo-500/10 border-indigo-400/30 text-indigo-200",
        variant === "violet" && "bg-violet-500/10 border-violet-400/30 text-violet-200",
        variant === "muted" && "bg-white/[0.02] border-white/5 text-slate-400",
        className
      )}
    >
      {children}
    </span>
  );
}
