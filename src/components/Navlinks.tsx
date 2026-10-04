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
        <nav aria-label="সংবাদ বিভাগ" className="navlinks container mx-auto flex flex-wrap justify-center gap-x-4 gap-y-2 px-4 py-2 text-sm sm:text-base [&>a]:py-2 [&>a]:hover:text-red-700">
            <Link href={"/"}>হোম</Link>
            {filerNews.map((link, index) => (
                <Link key={index} href={`/category/${link.slug}`}>
                    {link.title}
                </Link>
            ))}
        </nav>
    );
};

export default Navlinks;
