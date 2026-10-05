"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SaveNewsButton({ articleId, initiallySaved }: { articleId: string; initiallySaved?: boolean }) {
  const { data: session, isPending, error: sessionError } = authClient.useSession();
  const [saved, setSaved] = useState(initiallySaved ?? false);
  const [checking, setChecking] = useState(initiallySaved === undefined);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!session || initiallySaved !== undefined) return;
    const controller = new AbortController();
    fetch(`/api/saved-news?articleId=${encodeURIComponent(articleId)}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error();
        const data = await response.json();
        setSaved(data.saved);
        setChecking(false);
        setError("");
      }).catch(() => {
        if (!controller.signal.aborted) setError("সংরক্ষণের অবস্থা জানা যায়নি।");
      });
    return () => controller.abort();
  }, [session, articleId, initiallySaved, retry]);

  async function toggleSave() {
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/saved-news", {
        method: saved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId }),
      });
      if (!response.ok) throw new Error();
      setSaved((await response.json()).saved);
      router.refresh();
    } catch { setError("পরিবর্তন করা যায়নি। আবার চেষ্টা করুন।"); }
    finally { setPending(false); }
  }

  if (isPending) return <span role="status" className="text-sm text-gray-500">অপেক্ষা করুন…</span>;
  if (sessionError) return <p role="alert" className="text-sm text-red-700">সেশন লোড করা যায়নি।</p>;
  if (!session) return <Link href="/signin" className="btn btn-sm text-red-700">সংরক্ষণ করতে সাইন ইন করুন</Link>;
  return <div>
    <button type="button" onClick={toggleSave} disabled={pending || checking} aria-pressed={saved} className="btn btn-sm border-red-700/20 bg-red-50 text-red-700 hover:bg-red-100">
      {pending || checking ? "অপেক্ষা করুন…" : saved ? "সংরক্ষণ সরান" : "সংবাদ সংরক্ষণ করুন"}
    </button>
    {error && <p role="alert" className="mt-2 text-xs text-red-700">{error} {checking && <button type="button" onClick={() => setRetry(retry + 1)} className="underline">আবার চেষ্টা করুন</button>}</p>}
  </div>;
}
