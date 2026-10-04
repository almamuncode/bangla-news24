import Image from "next/image";
import CardDescription from "@/components/CardDescription";
import type { NewsArticle } from "@/types/news";

type CardProps = {
    article: NewsArticle;
    showImage?: boolean;
    showDescription?: boolean;
    loading?: "eager" | "lazy";
};

const Card = ({ article, showImage = true, showDescription = true, loading }: CardProps) => {
    const publishedDate = article.firstPublished ? new Date(article.firstPublished) : null;
    const validPublishedDate = publishedDate && !Number.isNaN(publishedDate.getTime()) ? publishedDate : null;

    return (
    <div className="card h-full min-w-0 bg-base-100 shadow-sm">
        {showImage && (
            <figure className="aspect-video w-full shrink-0 overflow-hidden bg-base-200">
                {article.imageUrl && <Image
                    src={article.imageUrl}
                    alt={article.title}
                    width={500}
                    height={500}
                    loading={loading}
                    className="h-full w-full object-cover"
                />}
            </figure>
        )}
        <div className="card-body [&>p]:grow-0">
            <p className="text-sm text-red-500">{article.category}</p>
            {validPublishedDate && (
                <time dateTime={validPublishedDate.toISOString()} className="text-xs text-base-content/60">
                    প্রকাশিত: {validPublishedDate.toLocaleDateString("bn-BD", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        timeZone: "Asia/Dhaka",
                    })}
                </time>
            )}
            <h2 className="card-title line-clamp-2 min-h-14 leading-7" title={article.title}>{article.title}</h2>
            {showDescription && <CardDescription key={article.description} description={article.description} />}
        </div>
    </div>
);
};

export default Card;
