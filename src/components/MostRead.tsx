import Link from "next/link";
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
                    <li key={article.id} className="mb-2">
                        <Link href={`/news/${encodeURIComponent(article.id)}`} className="text-lg flex items-start gap-2 hover:text-red-700 hover:underline focus-visible:outline-2 focus-visible:outline-red-700"><span className="text-red-700 shrink-0">{index + 1}.</span><span className="text-left">{article.title}</span></Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MostRead;
