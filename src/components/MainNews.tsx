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
        <div className="main-news-container grid grid-cols-2 items-stretch gap-5">
            <Card
                article={{
                    ...firstNews,
                    imageUrl: "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/501a/live/027926c0-bf27-11f1-b10d-f956452c9061.jpg.webp",
                }}
                loading="eager"
            />
            <div className="other-news grid auto-rows-fr gap-4">
                {otherNews.slice(0, 4).map((article, index) => (
                    <Card key={index} article={article} showImage={false} showDescription={false} />
                ))}
            </div>
        </div>
    );
};

export default MainNews;
