import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navlinks from "../components/Navlinks";
import Marquee from "@/components/Marquee";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});


export const metadata: Metadata = {
  title: {
    default: "Bangla News24",
    template: "%s | Bangla News24",
  },
  description: "বাংলাদেশ ও বিশ্বের সর্বশেষ খবর পড়ুন Bangla News24-এ।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <Navlinks />
        <Marquee />
        {children}
        <Footer />
        </body>
    </html>
  );
}
