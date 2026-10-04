export type NewsArticle = {
    title: string;
    description: string;
    category: string;
    imageUrl?: string | null;
    firstPublished?: string | null;
};

export type NewsSection = {
    title: string;
    articles: NewsArticle[];
};

export type NewsSectionsResponse = {
    data: NewsSection[];
};

export type NewsResponse = {
    data: Pick<NewsArticle, "title">[];
};
