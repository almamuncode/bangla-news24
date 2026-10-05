// import { Main } from "next/document";
import MainNews from "../components/MainNews";
import type { NewsSectionsResponse } from "@/types/news";
import MostRead from "../components/MostRead";
import SelectedNews from "../components/SelectedNews";

const hiddenSections = new Set([
  "বিবিসি বাংলা এখন হোয়াটসঅ্যাপে!",
  "বিবিসি বাংলা এখন ইন্সটাগ্রামে!",
  "সামাজিক মাধ্যমে বিবিসি বাংলা",
].map((title) => title.normalize("NFC").trim()));




export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections", { cache: "no-store" });
  const data: NewsSectionsResponse = await res.json();
  const sections = data.data.filter(
    (section) => !hiddenSections.has(section.title.normalize("NFC").trim()),
  );
  const mainNews = sections[0]?.articles ?? [];
  const mostRead = sections[1]?.articles ?? [];
  const selected = sections.slice(1) ?? [];


  return (
    <div>
      <div className="container mx-auto my-5 grid grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-3">
        {/* News */}
        <div className="min-w-0 lg:col-span-2">
          <MainNews news={mainNews} />
          <div className= "grid gap-5 mt-5">
            {selected.map((section, index) => (
              <div key={index}> <h1 className="text-xl font-bold mb-4">{section.title}</h1>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {section.articles.map((selected, articleIndex) => (
                <SelectedNews key={articleIndex} selected={selected} />
              ))}
              </div>
              </div>
            ))}
          </div>
        </div>


        {/* Most Read */}
        <div className="min-w-0 lg:col-span-1">
          <MostRead mostRead={mostRead} />
        </div>
      </div>
      <div></div>
    </div>
  );
}
