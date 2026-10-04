import Card from "@/components/Card";

import type { NewsArticle } from "@/types/news";

type MainNewsProps = {
    news: NewsArticle[];
};

const MainNews = ({ news }: MainNewsProps) => {
    const [firstNews, ...otherNews] = news;

    if (!firstNews) {
        return null;
    }

    return (
        <div className="main-news-container grid grid-cols-1 items-stretch gap-5 md:grid-cols-2">
            <div className="min-w-0 self-start">
            <Card
                article={{
                    ...firstNews,
                    imageUrl: "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/501a/live/027926c0-bf27-11f1-b10d-f956452c9061.jpg.webp",
                }}
                loading="eager"
            />
            </div>
            <div className="other-news grid min-w-0 content-start gap-4 self-start">
                {otherNews.slice(0, 4).map((article) => (
                    <Card key={article.id} article={article} showImage={false} showDescription={false} />
                ))}
            </div>
        </div>
    );
};

export default MainNews;
