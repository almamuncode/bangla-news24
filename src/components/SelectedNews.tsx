import Image from "next/image";
import type { NewsArticle } from "@/types/news";

type SelectedNewsProps = {
    selected: NewsArticle;
};

const SelectedNews = ({selected: selectedNews}: SelectedNewsProps) => {

    return (
        <div className="card bg-base-100 shadow-sm m-4">
                        {selectedNews.imageUrl && <figure>
                            <Image
                                src={selectedNews.imageUrl}
                                alt={selectedNews.title}
                                width={500}
                                height={500}
                            />
                        </figure>}
                        <div className="card-body [&>p]:grow-0">
                            <p className="text-sm text-red-500">{selectedNews.category}</p>
                            <h2 className="card-title">{selectedNews.title}</h2>
                            <p>{selectedNews.description}</p>
                        </div>
                    </div>
    );
};

export default SelectedNews;
