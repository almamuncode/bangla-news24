"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Userinfo = () => {

    const { data: session, isPending, error, refetch } = authClient.useSession();
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [signOutError, setSignOutError] = useState("");

    async function handleSignOut() {
        if (isSigningOut) return;
        setIsSigningOut(true);
        setSignOutError("");
        try {
            const result = await authClient.signOut();
            if (result.error) {
                setSignOutError("সাইন আউট করা সম্ভব হয়নি। আবার চেষ্টা করুন।");
                return;
            }
            router.refresh();
        } catch {
            setSignOutError("সংযোগ করা সম্ভব হয়নি। আবার চেষ্টা করুন।");
        } finally {
            setIsSigningOut(false);
        }
    }

    return (
        <div className="flex max-w-full flex-wrap items-center justify-center justify-self-center gap-2 lg:col-start-3 lg:justify-self-end">
            {isPending ? (
                <span role="status" className="text-sm text-gray-500">অপেক্ষা করুন…</span>
            ) : session?.user ? (
                <>
                    <span className="max-w-48 truncate text-sm font-semibold text-gray-700" title={session.user.name}>{session.user.name}</span>
                    <button type="button" onClick={handleSignOut} disabled={isSigningOut} className="btn bg-red-700 text-white hover:bg-red-800 disabled:opacity-60">
                        {isSigningOut ? "অপেক্ষা করুন…" : "সাইন আউট"}
                    </button>
                    {signOutError && <p role="alert" className="w-full text-center text-xs text-red-700">{signOutError}</p>}
                </>
            ) : error ? (
                <>
                    <span role="alert" className="text-xs text-red-700">সেশন লোড করা যায়নি।</span>
                    <button type="button" onClick={() => void refetch()} className="btn btn-sm">আবার চেষ্টা করুন</button>
                </>
            ) : (
                <>
            <Link href="/signin" className="btn">সাইন ইন</Link>
            <Link href="/signup" className="btn bg-red-700 text-white">সাইন আপ</Link>
                </>
            )}
        </div>
    );
};

export default Userinfo;
