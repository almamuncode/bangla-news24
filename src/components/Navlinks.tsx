import Link from "next/link";

type Category = {
    slug: string;
    title: string;
    topicId: string | null;
    url: string;
    scrapable: boolean;
};

type CategoriesResponse = {
    success: boolean;
    count: number;
    cachedAt: string;
    data: Category[];
};

const Navlinks = async () => {
    const res = await fetch("https://news-api-v2.vercel.app/api/categories");

    if (!res.ok) {
        return null;
    }

    const response: CategoriesResponse = await res.json();
    const navlinks = response.data;
    const filerNews = navlinks.filter(link => link.scrapable);

    if (!response.success || !navlinks?.length) {
        return null;
    }

    return (
        <div className="navlinks flex flex-wrap gap-4 justify-center">
            <Link href={"/"}>হোম</Link>
            {filerNews.map((link, index) => (
                <Link key={index} href={`/category/${link.slug}`}>
                    {link.title}
                </Link>
            ))}
        </div>
    );
};

export default Navlinks;
