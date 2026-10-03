import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

type Headline = {
    title: string;
};

type NewsResponse = {
    data: Headline[];
};

const Marquee = async () => {
    const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10")
    const data: NewsResponse = await res.json()
    const headlines = data.data;

    console.log(headlines);

    return (
        <div className="bg-red-700 text-white">
            <div className="container mx-auto flex items-center">
                <div className="font-bold py-2 bg-red-800 px-2">সর্বশেষ</div>
                <MarqueeText direction="right" duration={15}>
                    {headlines.map((headline, index) => (
                        <span key={index}><span>{headline.title}</span>
                            <span className="mx-2"> ● </span></span>
                    ))}
                </MarqueeText>
            </div>

        </div>
    );
};

export default Marquee;
