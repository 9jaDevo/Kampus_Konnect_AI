"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Github, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AuthCard } from "@/components/auth/auth-card";
import { SocialButton } from "@/components/auth/social-button";
import { GlowButton } from "@/components/ui/glow-button";
import { Input, Label } from "@/components/ui/input";
import { getSupabaseBrowserClient, SUPABASE_ENABLED } from "@/lib/db/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!SUPABASE_ENABLED) {
      toast.info("Supabase not configured — entering demo mode.");
      router.push("/dashboard");
      return;
    }
    setLoading(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleOAuth(provider: "google" | "github") {
    if (!SUPABASE_ENABLED) {
      toast.info("Supabase not configured — entering demo mode.");
      router.push("/dashboard");
      return;
    }
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/dashboard` },
      });
      if (error) throw error;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "OAuth failed";
      toast.error(msg);
    }
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue finding your perfect team."
      footer={
        <>
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-cyan-300 hover:text-cyan-200">
            Sign up
          </Link>
        </>
      }
    >
      <div className="space-y-3">
        <SocialButton
          Icon={<GoogleIcon />}
          label="Continue with Google"
          onClick={() => handleOAuth("google")}
        />
        <SocialButton
          Icon={<Github className="h-4 w-4" />}
          label="Continue with GitHub"
          onClick={() => handleOAuth("github")}
        />
      </div>

      <div className="flex items-center gap-3 text-xs text-slate-500">
        <div className="h-px bg-white/10 flex-1" />
        <span>or</span>
        <div className="h-px bg-white/10 flex-1" />
      </div>

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@school.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <GlowButton type="submit" variant="primary" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
          {loading ? "Signing in…" : "Sign in"}
        </GlowButton>
      </form>

      <button
        onClick={() => {
          toast.info("Entering demo mode");
          router.push("/dashboard");
        }}
        className="w-full text-center text-xs text-slate-500 hover:text-slate-300 pt-2"
      >
        Continue as guest →
      </button>
    </AuthCard>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}
