import { auth } from "@/lib/auth";
import { bookmarkId, savedNews } from "@/lib/saved-news";

export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const articleId = new URL(request.url).searchParams.get("articleId");
  const saved = articleId
    ? Boolean(await savedNews.findOne({ _id: bookmarkId(session.user.id, articleId), userId: session.user.id }))
    : await savedNews.find({ userId: session.user.id }).sort({ savedAt: -1 }).toArray();
  return Response.json({ saved }, { headers: { "Cache-Control": "private, no-store" } });
}

async function mutate(request: Request, remove: boolean) {
  // Cookie-authenticated writes must originate from this site.
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  let body;
  try { body = await request.json(); } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const articleId = body?.articleId;
  if (typeof articleId !== "string" || !articleId.trim() || articleId.length > 500) {
    return Response.json({ error: "Invalid article" }, { status: 400 });
  }
  const _id = bookmarkId(session.user.id, articleId);
  if (remove) {
    await savedNews.deleteOne({ _id, userId: session.user.id });
  } else {
    const response = await fetch(`https://news-api-v2.vercel.app/api/article/${encodeURIComponent(articleId)}`, { cache: "no-store", signal: AbortSignal.timeout(15000) });
    if (!response.ok) return Response.json({ error: "Article unavailable" }, { status: 502 });
    const article = await response.json();
    if (!article.success || typeof article.data?.title !== "string") {
      return Response.json({ error: "Article unavailable" }, { status: 404 });
    }
    await savedNews.updateOne({ _id, userId: session.user.id }, {
      $setOnInsert: { userId: session.user.id, articleId, title: article.data.title, savedAt: new Date() },
    }, { upsert: true });
  }
  return Response.json({ saved: !remove });
}

export async function POST(request: Request) { return mutate(request, false); }
export async function DELETE(request: Request) { return mutate(request, true); }
