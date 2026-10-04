import Card from "@/components/Card";
import type { NewsArticle } from "@/types/news";

type CategoryResponse = {
    title: string;
    id: string;
    data: (NewsArticle & { id: string | number })[];
};

const CategoryPage = async ({ params }: { params: Promise<{ categoryId: string }> }) => {

    const { categoryId } = await params;
    const res = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryId}`);
    const data: CategoryResponse = await res.json();

    const category = data.data;

    return (
        <div className="category-page container mx-auto px-4 py-6 sm:px-6 ">
            <h1 className="text-2xl font-bold mb-4 border-b-2 border-red-700">{data?.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category?.map((article) => (
                    <div key={article.id} className="min-w-0">
                        <Card article={article} loading="eager" />
                    </div>
                ))}
            </div>

        </div>
    );
};

export default CategoryPage;
