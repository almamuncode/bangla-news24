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

    if (!response.success || !navlinks?.length) {
        return null;
    }

    return (
        <nav aria-label="সংবাদ বিভাগ" className="container mx-auto flex flex-wrap justify-center gap-x-6 gap-y-2 px-4 py-3">
           {navlinks.map((link) => (
               <a key={link.slug} href={link.url} className="font-medium hover:text-red-700">
                   {link.title}
               </a>
           ))}
        </nav>
    );
};

export default Navlinks;
