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
import { TArticle } from "@/types";
import Link from "next/link";

function ArticleCard({ article }: { article: TArticle }) {
  return (
    <Link href={`/blog/${article.id}`}>
      <Card className="hover:bg-slate-200 duration-300 cursor-pointer">
        <CardHeader></CardHeader>
        <CardContent>
          <Image
            src={article.coverImage}
            alt="cover image"
            width={700}
            height={1000}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-2 items-start">
          <CardTitle className="font-medium text-lg">{article.title}</CardTitle>

          <CardDescription className="text-base">
            {article.description}
          </CardDescription>
          <CardDescription className="text-xs">
            Psoted by {article.author} - {article.date}
          </CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default ArticleCard;
