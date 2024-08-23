import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function page() {
  const articles = [
    {
      title: "Article 1",
      coverImage: "https://via.placeholder.com/150",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "John Doe",
      date: "2022-01-01",
    },
    {
      title: "Article 2",
      coverImage: "https://via.placeholder.com/150",
      content:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
      author: "Jane Smith",
      date: "2022-01-02",
    },
    {
      title: "Article 3",
      coverImage: "https://via.placeholder.com/150",
      content:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      author: "Robert Johnson",
      date: "2022-01-03",
    },
  ];

  return (
    <div className="min-h-screen container">
      <div className="grid xl:grid-cols-4 gap-5 md:grid-cols-3 sm:grid-cols-2 py-10">
        {articles.map((article, index) => (
          <Card key={index}>
            <CardHeader></CardHeader>
            <CardContent>
              <img src={article.coverImage} alt="cover image" />
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <CardTitle>{article.title}</CardTitle>
              <br />
              <CardDescription>{article.author}</CardDescription>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
