import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { savedNews } from "@/lib/saved-news";
import SaveNewsButton from "@/components/SaveNewsButton";

export const metadata = { title: "সংরক্ষিত সংবাদ" };

export default async function SavedNewsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");
  const articles = await savedNews.find({ userId: session.user.id }).sort({ savedAt: -1 }).toArray();
  return <main lang="bn" className="flex-1 bg-stone-50 px-4 py-12">
    <section className="mx-auto max-w-3xl">
      <p className="mb-3 text-sm font-semibold text-red-700">আপনার পাঠক অ্যাকাউন্ট</p>
      <h1 className="text-3xl font-bold">সংরক্ষিত সংবাদ</h1>
      <p className="mt-3 text-gray-500">পরে পড়ার জন্য রেখে দেওয়া আপনার সংবাদগুলো।</p>
      <div className="mt-8 space-y-4">
        {articles.map((article) => <article key={article._id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-6">
          <div className="min-w-0 flex-1">
            <Link href={`/news/${encodeURIComponent(article.articleId)}`} className="text-lg font-bold hover:text-red-700 hover:underline">{article.title}</Link>
            <p className="mt-2 text-xs text-gray-500">সংরক্ষিত: {article.savedAt.toLocaleDateString("bn-BD", { timeZone: "Asia/Dhaka" })}</p>
          </div>
          <SaveNewsButton articleId={article.articleId} initiallySaved />
        </article>)}
        {!articles.length && <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
          <h2 className="text-xl font-bold">এখনও কোনো সংবাদ সংরক্ষণ করেননি</h2>
          <p className="mt-3 text-sm text-gray-500">সংবাদ পড়ার সময় সংরক্ষণ বাটনে চাপ দিন।</p>
          <Link href="/" className="btn mt-6 bg-red-700 text-white">সংবাদ পড়ুন →</Link>
        </div>}
      </div>
    </section>
  </main>;
}
