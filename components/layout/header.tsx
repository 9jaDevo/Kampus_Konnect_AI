"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { GlowButton } from "@/components/ui/glow-button";

const NAV_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/matches", label: "Matches" },
  { href: "/planner", label: "AI Planner" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "py-2 backdrop-blur-xl bg-[#07071a]/60 border-b border-white/[0.06]"
          : "py-4 bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-9 w-9 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10 group-hover:border-white/20 transition-colors">
            <Image
              src="/KK_Favicon.png"
              alt="Kampus Konnect AI"
              fill
              sizes="36px"
              className="object-contain p-1"
              priority
            />
          </div>
          <span className="font-display font-bold text-white text-lg tracking-tight hidden sm:block">
            Kampus<span className="text-gradient">Konnect</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/auth/login">
            <GlowButton variant="ghost" size="sm">
              Sign in
            </GlowButton>
          </Link>
          <Link href="/auth/signup">
            <GlowButton variant="primary" size="sm">
              Get started
            </GlowButton>
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-lg glass-subtle border border-white/10 text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full inset-x-0 mx-4 mt-2 rounded-2xl glass-strong p-4 space-y-2"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 rounded-lg text-sm text-slate-200 hover:bg-white/[0.05]"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2">
              <Link href="/auth/login" className="w-full">
                <GlowButton variant="outline" size="sm" className="w-full">
                  Sign in
                </GlowButton>
              </Link>
              <Link href="/auth/signup" className="w-full">
                <GlowButton variant="primary" size="sm" className="w-full">
                  Get started
                </GlowButton>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
