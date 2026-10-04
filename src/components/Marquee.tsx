import Link from "next/link";
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

import type { NewsResponse } from "@/types/news";

const Marquee = async () => {
    const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10")
    const data: NewsResponse = await res.json()
    const headlines = data.data;

    return (
        <div className="bg-red-700 text-white my-4">
            <div className="container mx-auto flex min-w-0 items-center overflow-hidden">
                <div className="shrink-0 whitespace-nowrap bg-red-800 px-3 py-2 text-sm font-bold sm:text-base">সর্বশেষ</div>
                <div className="min-w-0 flex-1 overflow-hidden text-sm sm:text-base">
                <MarqueeText direction="right" duration={15}>
                    {headlines.map((headline) => (
                        <span key={headline.id}><Link href={`/news/${encodeURIComponent(headline.id)}`} className="font-bold hover:underline focus-visible:outline-2 focus-visible:outline-white">{headline.title}</Link>
                            <span className="mx-2"> ● </span></span>
                    ))}
                </MarqueeText>
                </div>
            </div>

        </div>
    );
};

export default Marquee;
