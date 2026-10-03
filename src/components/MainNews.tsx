import Image from "next/image";

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
            <div className="card bg-base-100 shadow-sm">
                <figure>
                    <Image
                        src="https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/501a/live/027926c0-bf27-11f1-b10d-f956452c9061.jpg.webp"
                        alt="Shoes"
                        width={500}
                        height={500}
                    />
                </figure>
                <div className="card-body [&>p]:grow-0">
                    <p className="text-sm text-red-500">{firstNews.category}</p>
                    <h2 className="card-title">{firstNews.title}</h2>
                    <p>{firstNews.description}</p>
                </div>
            </div>
            <div className="other-news grid auto-rows-fr gap-4">
                {otherNews.slice(0, 4).map((article, index) => (
                    <div key={index} className="card bg-base-100 shadow-sm">
                        <div className="card-body [&>p]:grow-0">
                            <p className="text-sm text-red-500">{article.category}</p>
                            <h2 className="card-title">{article.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainNews;
