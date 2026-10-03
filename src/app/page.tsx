// import { Main } from "next/document";
import MainNews from "../components/MainNews";
import type { NewsSectionsResponse } from "@/types/news";
import Marquee from "../components/Marquee";
import MostRead from "../components/MostRead";
import SelectedNews from "../components/SelectedNews";





export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");
  const data: NewsSectionsResponse = await res.json();
  console.log(data);
  const sections = data.data;
  const mainNews = sections[0]?.articles ?? [];
  const mostRead = sections[1]?.articles ?? [];
  const selected = sections.slice(1) ?? [];

  console.log(selected);

  return (
    <div>
      <Marquee />
      <div className="container mx-auto grid grid-cols-3 gap-4 my-5">
        {/* News */}
        <div className="col-span-2">
          <MainNews news={mainNews} />
          <div className= "grid gap-5 mt-5">
            {selected.map((section, index) => (
              <div key={index}> <h1 className="text-xl font-bold mb-4">{section.title}</h1>
              <div className="grid grid-cols-3 gap-5">
                {section.articles.map((selected, articleIndex) => (
                <SelectedNews key={articleIndex} selected={selected} />
              ))}
              </div>
              </div>
            ))}
          </div>
        </div>


        {/* Most Read */}
        <div className="col-span-1">
          <MostRead mostRead={mostRead} />
        </div>
      </div>
      <div></div>
    </div>
  );
}
