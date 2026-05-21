import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/[0.06]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />
      <div className="container py-12 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-9 w-9 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10">
              <Image
                src="/KK_Favicon.png"
                alt="Kampus Konnect AI"
                fill
                sizes="36px"
                className="object-contain p-1"
              />
            </div>
            <span className="font-display font-bold text-white text-lg">
              Kampus<span className="text-gradient">Konnect</span>
            </span>
          </Link>
          <p className="text-sm text-slate-400 max-w-sm">
            AI-powered student collaboration. Find teammates, mentors, and project
            partners with intelligent matching.
          </p>
          <div className="flex gap-3">
            {[
              { Icon: Github, href: "https://github.com/9jaDevo/Kampus_Konnect_AI" },
              { Icon: Twitter, href: "#" },
              { Icon: Linkedin, href: "#" },
            ].map(({ Icon, href }, i) => (
              <Link
                key={i}
                href={href}
                className="h-9 w-9 rounded-lg glass-subtle border border-white/10 hover:border-white/20 inline-flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-display font-semibold text-white text-sm">Product</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/matches" className="hover:text-white transition-colors">Matches</Link></li>
            <li><Link href="/teams" className="hover:text-white transition-colors">Teams</Link></li>
            <li><Link href="/planner" className="hover:text-white transition-colors">AI Planner</Link></li>
            <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-display font-semibold text-white text-sm">Resources</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
            <li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
            <li><Link href="/auth/signup" className="hover:text-white transition-colors">Get started</Link></li>
          </ul>
        </div>
      </div>
      <div className="container py-6 flex items-center justify-between text-xs text-slate-500 border-t border-white/[0.04]">
        <p>© {new Date().getFullYear()} Kampus Konnect AI. Built for Connect N Code.</p>
        <p className="hidden sm:block">Powered by Gemini AI</p>
      </div>
    </footer>
  );
}
