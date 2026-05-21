import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animated?: boolean;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

export function GradientText({
  children,
  className,
  animated = false,
  as: Tag = "span",
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        animated ? "text-gradient-shift" : "text-gradient",
        className
      )}
    >
      {children}
    </Tag>
  );
}
