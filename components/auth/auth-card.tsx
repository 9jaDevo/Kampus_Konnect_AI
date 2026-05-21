"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GradientText } from "@/components/ui/gradient-text";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative overflow-hidden">
      {/* Left visual */}
      <div className="hidden lg:flex relative items-center justify-center p-12 overflow-hidden">
        <AuroraBackground intensity="intense" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-md space-y-6"
        >
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10">
              <Image src="/KK_Favicon.png" alt="" fill sizes="40px" className="object-contain p-1" />
            </div>
            <span className="font-display font-bold text-white text-lg">
              Kampus<span className="text-gradient">Konnect</span>
            </span>
          </Link>
          <h1 className="font-display font-bold text-4xl text-white leading-tight">
            Find your perfect <GradientText animated>student team</GradientText> with AI.
          </h1>
          <p className="text-slate-400 leading-relaxed">
            Match with teammates, mentors, and project collaborators. Get
            AI-generated explanations, first messages, and collaboration plans.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-xs uppercase tracking-widest text-cyan-300">
              Powered by Gemini AI
            </span>
          </div>
        </motion.div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md space-y-6"
        >
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-2">
            <div className="relative h-9 w-9 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10">
              <Image src="/KK_Favicon.png" alt="" fill sizes="36px" className="object-contain p-1" />
            </div>
            <span className="font-display font-bold text-white">
              Kampus<span className="text-gradient">Konnect</span>
            </span>
          </Link>
          <div className="space-y-2">
            <h2 className="font-display font-bold text-3xl text-white">{title}</h2>
            <p className="text-slate-400 text-sm">{subtitle}</p>
          </div>
          {children}
          {footer && (
            <div className="text-center text-sm text-slate-400 pt-4">{footer}</div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
