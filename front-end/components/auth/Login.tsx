"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play,Mail,Loader2,ArrowRight,Eye,EyeOff,Lock,Check, } from "lucide-react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword,setShowPassword]= useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe,setRememberMe] = useState(false)
  const { login } = useAuth();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login(email, password);
      router.push("/settings");
    } catch (err) {
      setError(err instanceof Error ? err.message : "cannot login");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
<main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.18),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-orange-500/20 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-amber-500/15 blur-[140px]" />

      <motion.section
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950/80 p-7 shadow-[0_0_50px_-12px_rgba(249,115,22,0.25)] backdrop-blur-2xl sm:p-10"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-400 p-0.5 shadow-xl shadow-orange-500/30"
          >
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-zinc-950/30 backdrop-blur-sm">
              <Play className="ml-0.5 h-6 w-6 fill-white text-white" />
            </div>
          </motion.div>

          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Welcome Back
          </h1>
          <p className="mt-1.5 text-xs text-zinc-400 sm:text-sm">
            Enter your details to continue your streaming session
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-zinc-900/60 py-2.5 text-xs font-semibold text-white transition-all hover:border-white/20 hover:bg-zinc-800/80 active:scale-95"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Google
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-zinc-900/60 py-2.5 text-xs font-semibold text-white transition-all hover:border-white/20 hover:bg-zinc-800/80 active:scale-95"
          >
            <svg className="h-4 w-4 fill-current text-[#5865F2]" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.009c.12.098.245.195.372.288a.077.077 0 0 1-.006.128 12.299 12.299 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            Discord
          </button>
        </div>

        <div className="relative mb-6 flex items-center justify-center">
          <div className="w-full border-t border-white/10" />
          <span className="absolute bg-zinc-950 px-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            Or continue with
          </span>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Email Address
            </label>
            <div className="group relative flex items-center">
              <Mail className="absolute left-3.5 h-4 w-4 text-zinc-500 transition-colors group-focus-within:text-orange-500" />
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-white/10 bg-zinc-900/60 py-3 pr-4 pl-10 text-sm text-white placeholder:text-zinc-600 transition-all duration-200 focus:border-orange-500 focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Password
            </label>
            <div className="group relative flex items-center">
              <Lock className="absolute left-3.5 h-4 w-4 text-zinc-500 transition-colors group-focus-within:text-orange-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-zinc-900/60 py-3 pr-10 pl-10 text-sm text-white placeholder:text-zinc-600 transition-all duration-200 focus:border-orange-500 focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-zinc-500 transition-colors hover:text-zinc-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex cursor-pointer items-center gap-2 select-none">
              <div
                onClick={() => setRememberMe(!rememberMe)}
                className={`flex h-4 w-4 items-center justify-center rounded border transition-all ${
                  rememberMe
                    ? 'border-orange-500 bg-orange-500 text-white'
                    : 'border-white/20 bg-zinc-900'
                }`}
              >
                {rememberMe && <Check className="h-3 w-3 stroke-[3]" />}
              </div>
              <span className="text-xs text-zinc-400">Remember me</span>
            </label>

            <Link
              href="/forgot-password"
              className="text-xs font-medium text-orange-400 transition-colors hover:text-orange-300"
            >
              Forgot password?
            </Link>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-xs font-medium text-red-400 backdrop-blur-md"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="group relative mt-2 flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-200 hover:shadow-orange-500/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Sign In
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            )}
          </motion.button>
        </form>

        <p className="mt-8 text-center text-xs text-zinc-400">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="font-semibold text-orange-400 transition-colors hover:text-orange-300 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </motion.section>
    </main>
  );
};

export default Login;
