"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Sparkles,
  UserCircle2,
  Brain,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SIDEBAR_LINKS = [
  { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/matches", label: "Matches", Icon: Sparkles },
  { href: "/teams", label: "Teams", Icon: Users },
  { href: "/planner", label: "AI Planner", Icon: Brain },
  { href: "/profile", label: "Profile", Icon: UserCircle2 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 sticky top-20 h-[calc(100vh-5rem)]">
      <div className="glass rounded-2xl p-4 flex-1 flex flex-col">
        <Link href="/" className="flex items-center gap-2 px-2 py-2 mb-4">
          <div className="relative h-8 w-8 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10">
            <Image
              src="/KK_Favicon.png"
              alt="Kampus Konnect AI"
              fill
              sizes="32px"
              className="object-contain p-1"
            />
          </div>
          <span className="font-display font-bold text-white text-sm">
            Kampus<span className="text-gradient">Konnect</span>
          </span>
        </Link>

        <nav className="space-y-1 flex-1">
          {SIDEBAR_LINKS.map(({ href, label, Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                  active
                    ? "bg-white/[0.06] text-white border border-white/10"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.03] border border-transparent"
                )}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 rounded-r bg-gradient-to-b from-cyan-400 to-violet-500" />
                )}
                <Icon className="h-4 w-4 shrink-0" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <Link
          href="/profile/edit"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/[0.03] transition-all"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
