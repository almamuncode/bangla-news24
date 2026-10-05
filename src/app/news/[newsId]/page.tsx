import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type TextBlock = {
    type: "text" | "subheading";
    text: string;
};

type ImageBlock = {
    type: "image";
    url: string;
    width?: number;
    height?: number;
    caption?: string;
    altText?: string;
    copyrightHolder?: string;
};

type DescriptionBlock = {
    type: string;
    model?: { text?: string; blocks?: DescriptionBlock[] };
};

type ArticleDetails = {
    title: string;
    description?: string | { blocks?: DescriptionBlock[] };
    imageUrl?: string | null;
    firstPublished?: string | null;
    lastPublished?: string | null;
    byline?: { name: string; role?: string | null }[];
    topics?: { id: string; name: string }[];
    body?: (TextBlock | ImageBlock)[];
    text?: string;
    source?: string;
    sourceUrl?: string;
    link?: string;
};

type ArticleResponse = {
    success: boolean;
    data?: ArticleDetails | null;
};

const extractDescription = (blocks: DescriptionBlock[]): string =>
    blocks.map(({ model }) => model?.text ?? extractDescription(model?.blocks ?? [])).join(" ").trim();

const parseDate = (value?: string | null) => {
    if (!value) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
};

const formatDate = (date: Date) => new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Dhaka",
}).format(date);

const ArticleImage = ({ image, title, lead = false }: { image: ImageBlock; title: string; lead?: boolean }) => (
    <figure className="my-8 overflow-hidden rounded-xl border border-base-content/10 bg-base-200/40">
        <Image
            src={image.url}
            alt={image.altText || image.caption || title}
            width={image.width || 1024}
            height={image.height || 576}
            sizes="(max-width: 768px) 100vw, 848px"
            loading={lead ? "eager" : "lazy"}
            className="h-auto w-full"
        />
        {(image.caption || image.copyrightHolder) && (
            <figcaption className="flex flex-wrap justify-between gap-2 px-4 py-3 text-sm leading-6 text-base-content/60">
                {image.caption && <span>{image.caption}</span>}
                {image.copyrightHolder && <span>ছবি: {image.copyrightHolder}</span>}
            </figcaption>
        )}
    </figure>
);

const NewsDetails = async ({ params }: { params: Promise<{ newsId: string }> }) => {
    const { newsId } = await params;
    const res = await fetch(`https://news-api-v2.vercel.app/api/article/${encodeURIComponent(newsId)}`, { cache: "no-store" });
    if (res.status === 404) notFound();
    if (!res.ok) throw new Error("Unable to load article");

    const response: ArticleResponse = await res.json();
    if (!response.success || !response.data) notFound();
    const article = response.data;
    const description = typeof article.description === "string"
        ? article.description
        : extractDescription(article.description?.blocks ?? []);
    const published = parseDate(article.firstPublished);
    const updated = parseDate(article.lastPublished);
    const body = article.body ?? [];
    const firstBlock = body[0];
    const leadImage = firstBlock?.type === "image" ? firstBlock : article.imageUrl
        ? { type: "image" as const, url: article.imageUrl }
        : null;
    const contentBlocks = firstBlock?.type === "image" ? body.slice(1) : body;
    const sourceUrl = article.sourceUrl || article.link;
    const safeSourceUrl = sourceUrl && /^https?:\/\//i.test(sourceUrl) ? sourceUrl : null;

    return (
        <main className="container mx-auto px-4 py-6 sm:px-6 sm:py-10">
            <article className="mx-auto max-w-212" lang="bn">
                <nav aria-label="ব্রেডক্রাম্ব" className="mb-8 flex items-center gap-3 text-sm text-base-content/60">
                    <Link href="/" className="hover:text-red-700 hover:underline">হোম</Link>
                    <span aria-hidden="true">/</span>
                    <span>সংবাদ</span>
                </nav>

                <header>
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                        {(article.topics ?? []).map((topic) => (
                            <span key={topic.id} className="rounded-full bg-red-700/10 px-3 py-1 text-xs font-semibold text-red-700">{topic.name}</span>
                        ))}
                    </div>
                    <h1 className="text-3xl font-bold leading-snug tracking-tight sm:text-4xl lg:text-5xl">{article.title}</h1>
                    {description && <p className="mt-5 whitespace-pre-line text-lg leading-8 text-base-content/70 sm:text-xl sm:leading-9">{description}</p>}

                    <div className="mt-6 flex flex-wrap items-start justify-between gap-4 border-y border-base-content/10 py-4">
                        <div>
                            {article.byline?.map((author, index) => (
                                <div key={`${author.name}-${index}`}>
                                    <p className="text-sm font-semibold">{author.name}</p>
                                    {author.role && <p className="mt-1 text-xs text-base-content/60">{author.role}</p>}
                                </div>
                            ))}
                            {article.source && <p className="mt-1 text-xs text-base-content/60">সূত্র: {article.source}</p>}
                        </div>
                        <div className="space-y-1 text-xs leading-6 text-base-content/60">
                            {published && <p>প্রকাশিত: <time dateTime={published.toISOString()}>{formatDate(published)}</time></p>}
                            {updated && (!published || updated.getTime() > published.getTime()) && (
                                <p>আপডেট: <time dateTime={updated.toISOString()}>{formatDate(updated)}</time></p>
                            )}
                        </div>
                    </div>
                </header>

                {leadImage && <ArticleImage image={leadImage} title={article.title} lead />}

                <div className="mx-auto max-w-180 space-y-6 py-2 text-lg leading-9 text-base-content/90">
                    {contentBlocks.length > 0 ? contentBlocks.map((block, index) => {
                        if (block.type === "image") return <ArticleImage key={index} image={block} title={article.title} />;
                        if (block.type === "subheading") return <h2 key={index} className="pt-5 text-2xl font-bold leading-snug text-base-content">{block.text}</h2>;
                        return <p key={index} className="whitespace-pre-line">{block.text}</p>;
                    }) : article.text?.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => (
                        <p key={index} className="whitespace-pre-line">{paragraph}</p>
                    ))}
                </div>

                <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-base-content/10 pt-6 text-sm">
                    <Link href="/" className="font-semibold text-red-700 hover:underline">← আরও সংবাদ পড়ুন</Link>
                    {safeSourceUrl && <a href={safeSourceUrl} target="_blank" rel="noopener noreferrer" className="text-base-content/60 hover:text-red-700 hover:underline">মূল প্রতিবেদন পড়ুন ↗</a>}
                </footer>
            </article>
        </main>
    );
};

export default NewsDetails;
