import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

import type { NewsResponse } from "@/types/news";

const Marquee = async () => {
    const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10")
    const data: NewsResponse = await res.json()
    const headlines = data.data;

    return (
        <div className="bg-red-700 text-white my-4">
            <div className="container mx-auto flex items-center">
                <div className="font-bold py-2 bg-red-800 px-2">সর্বশেষ</div>
                <MarqueeText direction="right" duration={15}>
                    {headlines.map((headline, index) => (
                        <span key={index}><span className="font-bold">{headline.title}</span>
                            <span className="mx-2"> ● </span></span>
                    ))}
                </MarqueeText>
            </div>

        </div>
    );
};

export default Marquee;
