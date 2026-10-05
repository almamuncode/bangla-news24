import AuthForm from "@/components/AuthForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "সাইন ইন" };

export default function SignInPage() {
  return <AuthForm mode="signin" />;
}
