import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { IbmPlexSans } from "@/lib/fonts";
import { TArticle } from "@/types";
import ArticleCard from "@/components/articles/ArticleCard";

export default function page() {
  const articles: TArticle[] = [
    {
      id: "1",
      title: "Data & The community",
      coverImage: "/article.png",
      description:
        "At OAU, we are excited to announce the launch of our new Office of Institutional Research (OIR). This office is dedicated to advancing the college's mission thro..",
      author: "John Doe",
      date: "2022-01-01",
    },
    {
      id: "2",
      title: "Article 2",
      coverImage: "/article.png",
      description:
        "At OAU, we are excited to announce the launch of our new Office of Institutional Research (OIR). This office is dedicated to advancing the college's mission thro..",
      author: "Jane Smith",
      date: "2022-01-02",
    },
    {
      id: "3",
      title: "Article 3",
      coverImage: "/article.png",
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      author: "Robert Johnson",
      date: "2022-01-03",
    },
  ];

  return (
    <div className={`min-h-screen container ${IbmPlexSans.className}`}>
      <div className="grid xl:grid-cols-3 gap-5 md:grid-cols-3 sm:grid-cols-2 py-10">
        {articles.map((article: TArticle, index: number) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
}
