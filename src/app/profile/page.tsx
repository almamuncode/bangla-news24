import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileForm from "@/components/ProfileForm";

export const metadata = { title: "প্রোফাইল" };

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");
  return <main lang="bn" className="flex-1 bg-stone-50 px-4 py-12">
    <section className="mx-auto max-w-2xl">
      <p className="mb-3 text-sm font-semibold text-red-700">আপনার পাঠক অ্যাকাউন্ট</p>
      <h1 className="text-3xl font-bold">প্রোফাইল</h1>
      <p className="mt-3 text-gray-500">আপনার তথ্য ও পাসওয়ার্ড পরিচালনা করুন।</p>
      <ProfileForm name={session.user.name} email={session.user.email} />
    </section>
  </main>;
}
