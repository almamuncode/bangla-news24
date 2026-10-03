import type { NewsArticle } from "@/types/news";

type MostReadProps = {
    mostRead: NewsArticle[];
};

const MostRead = ({mostRead}: MostReadProps) => {

    if (!mostRead || mostRead.length === 0) {
        return null;
    }

    return (
        <div className="most-read card bg-base-100 shadow-sm p-4">
            <h2 className="text-xl font-bold mb-4">সর্বাধিক পঠিত</h2>
            <ul>
                {mostRead.map((article, index) => (
                    <li key={index} className="mb-2">
                        <div className="text-lg"><span className="text-red-700 mr-2">{index + 1}.</span> <span>{article.title}</span></div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MostRead;
