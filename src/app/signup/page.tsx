
import AuthForm from "@/components/AuthForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "সাইন আপ" };

export default function SignUpPage() {
  return <AuthForm mode="signup" />;
}
