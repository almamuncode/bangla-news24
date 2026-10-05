"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfileForm({ name, email }: { name: string; email: string }) {
  const router = useRouter();
  const [pending, setPending] = useState<"name" | "password" | null>(null);
  const [nameMessage, setNameMessage] = useState({ text: "", error: false });
  const [passwordMessage, setPasswordMessage] = useState({ text: "", error: false });
  const inputClass = "mt-2 block w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-red-700 focus:ring-3 focus:ring-red-700/10 disabled:bg-gray-50";
  const buttonClass = "btn mt-5 bg-red-700 text-white hover:bg-red-800";

  async function updateName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const value = String(new FormData(event.currentTarget).get("name")).trim();
    if (!value) { setNameMessage({ text: "আপনার নাম লিখুন।", error: true }); return; }
    setPending("name");
    setNameMessage({ text: "", error: false });
    try {
      const result = await authClient.updateUser({ name: value });
      if (result.error) throw new Error(result.error.message);
      setNameMessage({ text: "আপনার নাম আপডেট হয়েছে।", error: false });
      router.refresh();
    } catch {
      setNameMessage({ text: "নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।", error: true });
    } finally { setPending(null); }
  }

  async function updatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    setPending("password");
    setPasswordMessage({ text: "", error: false });
    try {
      const result = await authClient.changePassword({
        currentPassword: String(fields.get("currentPassword")),
        newPassword: String(fields.get("newPassword")),
        revokeOtherSessions: true,
      });
      if (result.error) {
        setPasswordMessage({ text: "পাসওয়ার্ড পরিবর্তন করা যায়নি। বর্তমান পাসওয়ার্ড যাচাই করুন।", error: true });
        return;
      }
      form.reset();
      setPasswordMessage({ text: "পাসওয়ার্ড পরিবর্তন হয়েছে। অন্য ডিভাইসের সেশন বন্ধ করা হয়েছে।", error: false });
    } catch {
      setPasswordMessage({ text: "সংযোগ করা সম্ভব হয়নি। আবার চেষ্টা করুন।", error: true });
    } finally { setPending(null); }
  }

  return <div className="mt-8 space-y-6">
    <form onSubmit={updateName} className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
      <h2 className="mb-5 text-xl font-bold">ব্যক্তিগত তথ্য</h2>
      <fieldset disabled={pending !== null} className="space-y-5">
        <div><label htmlFor="profile-name" className="text-sm font-semibold">নাম</label><input id="profile-name" name="name" defaultValue={name} autoComplete="name" required maxLength={100} className={inputClass} /></div>
        <div><label htmlFor="profile-email" className="text-sm font-semibold">ইমেইল</label><input id="profile-email" type="email" value={email} readOnly className={`${inputClass} bg-gray-50 text-gray-500`} /><p className="mt-2 text-xs text-gray-500">অ্যাকাউন্টের ইমেইল এখানে পরিবর্তন করা যাবে না।</p></div>
        <button type="submit" className={buttonClass}>{pending === "name" ? "অপেক্ষা করুন…" : "তথ্য সংরক্ষণ করুন"}</button>
      </fieldset>
      {nameMessage.text && <p role={nameMessage.error ? "alert" : "status"} className={`mt-4 text-sm ${nameMessage.error ? "text-red-700" : "text-green-700"}`}>{nameMessage.text}</p>}
    </form>
    <form onSubmit={updatePassword} className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
      <h2 className="mb-5 text-xl font-bold">পাসওয়ার্ড পরিবর্তন</h2>
      <fieldset disabled={pending !== null} className="space-y-5">
        <div><label htmlFor="current-password" className="text-sm font-semibold">বর্তমান পাসওয়ার্ড</label><input id="current-password" name="currentPassword" type="password" autoComplete="current-password" required className={inputClass} /></div>
        <div><label htmlFor="new-password" className="text-sm font-semibold">নতুন পাসওয়ার্ড</label><input id="new-password" name="newPassword" type="password" autoComplete="new-password" minLength={8} maxLength={128} required aria-describedby="new-password-hint" className={inputClass} /><p id="new-password-hint" className="mt-2 text-xs text-gray-500">কমপক্ষে ৮ অক্ষর ব্যবহার করুন।</p></div>
        <button type="submit" className={buttonClass}>{pending === "password" ? "অপেক্ষা করুন…" : "পাসওয়ার্ড পরিবর্তন করুন"}</button>
      </fieldset>
      {passwordMessage.text && <p role={passwordMessage.error ? "alert" : "status"} className={`mt-4 text-sm ${passwordMessage.error ? "text-red-700" : "text-green-700"}`}>{passwordMessage.text}</p>}
    </form>
  </div>;
}
