import Card from "@/components/Card";
import type { NewsArticle } from "@/types/news";

type SelectedNewsProps = {
    selected: NewsArticle;
};

const SelectedNews = ({ selected }: SelectedNewsProps) => <Card article={selected} />;

export default SelectedNews;
