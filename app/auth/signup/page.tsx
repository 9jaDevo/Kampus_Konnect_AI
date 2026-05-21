"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Github, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AuthCard } from "@/components/auth/auth-card";
import { SocialButton } from "@/components/auth/social-button";
import { GlowButton } from "@/components/ui/glow-button";
import { Input, Label } from "@/components/ui/input";
import { getSupabaseBrowserClient, SUPABASE_ENABLED } from "@/lib/db/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!SUPABASE_ENABLED) {
      toast.info("Supabase not configured — entering demo mode.");
      router.push("/onboarding");
      return;
    }
    setLoading(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (error) throw error;
      toast.success("Account created — let's build your profile.");
      router.push("/onboarding");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Sign up failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleOAuth(provider: "google" | "github") {
    if (!SUPABASE_ENABLED) {
      router.push("/onboarding");
      return;
    }
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/onboarding` },
      });
      if (error) throw error;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "OAuth failed";
      toast.error(msg);
    }
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Get matched in under 2 minutes."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/auth/login" className="text-cyan-300 hover:text-cyan-200">
            Sign in
          </Link>
        </>
      }
    >
      <div className="space-y-3">
        <SocialButton
          Icon={<GoogleIcon />}
          label="Sign up with Google"
          onClick={() => handleOAuth("google")}
        />
        <SocialButton
          Icon={<Github className="h-4 w-4" />}
          label="Sign up with GitHub"
          onClick={() => handleOAuth("github")}
        />
      </div>

      <div className="flex items-center gap-3 text-xs text-slate-500">
        <div className="h-px bg-white/10 flex-1" />
        <span>or</span>
        <div className="h-px bg-white/10 flex-1" />
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Aisha Bello" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@school.edu" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" required minLength={8} />
        </div>
        <GlowButton type="submit" variant="primary" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? "Creating…" : "Create account"}
        </GlowButton>
      </form>

      <p className="text-[11px] text-slate-500 text-center">
        By signing up you agree to our terms and privacy policy.
      </p>
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
