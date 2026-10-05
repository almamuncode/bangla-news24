"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";

export default function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const fields = new FormData(event.currentTarget);
    const email = String(fields.get("email")).trim();
    const password = String(fields.get("password"));
    setPending(true);
    setError("");
    try {
      const result = isSignup
        ? await authClient.signUp.email({ name: String(fields.get("name")).trim(), email, password })
        : await authClient.signIn.email({ email, password });
      if (result.error) {
        setError(result.error.message || "আবার চেষ্টা করুন।");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("সংযোগ করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    } finally {
      setPending(false);
    }
  }

  const inputClass = "mt-2 block h-12 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-700 focus:ring-3 focus:ring-red-700/10 disabled:bg-gray-50";

  return (
    <main lang="bn" className="flex flex-1 items-center justify-center border-y border-gray-100 bg-stone-50 px-4 py-10 sm:px-6 sm:py-16">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative flex flex-col justify-between overflow-hidden bg-red-700 p-8 text-white sm:p-10">
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full border-[45px] border-white/5" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-2"><Image src="/logo.webp" alt="" width={36} height={36} /></span>
              <span className="text-xl font-bold">Bangla News24</span>
            </div>
            <div className="mb-6 mt-10 h-1 w-10 bg-white/60" />
            <h2 className="max-w-xs text-3xl font-bold leading-relaxed sm:text-4xl">খবরের সঙ্গে থাকুন,<br />প্রতিদিন।</h2>
            <p className="mt-5 max-w-xs text-sm leading-7 text-red-100">বাংলাদেশ ও বিশ্বের সর্বশেষ খবর, এক জায়গায়। আপনার প্রতিদিনের সংবাদ সঙ্গী।</p>
          </div>
          <div className="relative mt-10 flex items-center gap-3 border-t border-white/20 pt-5 text-xs text-red-100">
            <span className="h-2 w-2 rounded-full bg-white" /> বাংলাদেশ <span aria-hidden="true">·</span> বিশ্ব <span aria-hidden="true">·</span> সর্বশেষ সংবাদ
          </div>
        </aside>
        <section className="p-7 sm:p-10 lg:p-12" aria-labelledby="auth-heading">
          <p className="mb-3 text-xs font-semibold tracking-wide text-red-700">আপনার পাঠক অ্যাকাউন্ট</p>
          <h1 id="auth-heading" className="text-3xl font-bold text-gray-900">{isSignup ? "নতুন অ্যাকাউন্ট খুলুন" : "স্বাগতম, আবারও"}</h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">{isSignup ? "তথ্য দিয়ে Bangla News24-এ যোগ দিন।" : "আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন।"}</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <fieldset disabled={pending} className="space-y-5">
              {isSignup && <div>
                <label htmlFor="name" className="text-sm font-semibold text-gray-700">নাম</label>
                <input id="name" name="name" type="text" autoComplete="name" placeholder="আপনার পুরো নাম" required maxLength={100} pattern={".*\\S.*"} className={inputClass} />
              </div>}
              <div>
                <label htmlFor="email" className="text-sm font-semibold text-gray-700">ইমেইল</label>
                <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required className={inputClass} />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-semibold text-gray-700">পাসওয়ার্ড</label>
                <div className="relative">
                  <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete={isSignup ? "new-password" : "current-password"} placeholder={isSignup ? "অন্তত ৮ অক্ষরের পাসওয়ার্ড" : "আপনার পাসওয়ার্ড"} required minLength={isSignup ? 8 : undefined} maxLength={128} aria-describedby={isSignup ? "password-hint" : undefined} className={`${inputClass} pr-20`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} aria-controls="password" aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"} aria-pressed={showPassword} className="absolute inset-y-0 right-3 my-auto h-8 rounded px-1 text-xs font-medium text-gray-500 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-red-700">{showPassword ? "লুকান" : "দেখুন"}</button>
                </div>
                {isSignup && <p id="password-hint" className="mt-2 text-xs text-gray-500">কমপক্ষে ৮ অক্ষর ব্যবহার করুন।</p>}
              </div>
            </fieldset>
            {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            <button type="submit" disabled={pending} className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-red-700 px-5 text-sm font-bold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700 disabled:cursor-wait disabled:opacity-60">
              {pending ? "অপেক্ষা করুন…" : isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন করুন"}
              {!pending && <span aria-hidden="true">→</span>}
            </button>
          </form>
          <p className="mt-7 border-t border-gray-100 pt-6 text-center text-sm text-gray-500">
            {isSignup ? "ইতোমধ্যে অ্যাকাউন্ট আছে?" : "এখনও অ্যাকাউন্ট নেই?"}{" "}
            <Link href={isSignup ? "/signin" : "/signup"} className="font-bold text-red-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-red-700">{isSignup ? "সাইন ইন করুন" : "সাইন আপ করুন"}</Link>
          </p>
          <div className="mt-5 text-center"><Link href="/" className="text-xs text-gray-500 hover:text-red-700">← সংবাদে ফিরে যান</Link></div>
        </section>
      </div>
    </main>
  );
}
