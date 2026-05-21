"use client";

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-xl glass-subtle px-4 py-3 text-sm text-white placeholder:text-slate-500",
        "focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:border-indigo-400/40",
        "transition-all duration-200",
        className
      )}
      {...rest}
    />
  );
});

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-xl glass-subtle px-4 py-3 text-sm text-white placeholder:text-slate-500",
          "focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:border-indigo-400/40",
          "transition-all duration-200 resize-none",
          className
        )}
        {...rest}
      />
    );
  }
);

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ className, ...rest }: LabelProps) {
  return (
    <label
      className={cn(
        "text-sm font-medium text-slate-300 block mb-2",
        className
      )}
      {...rest}
    />
  );
}
