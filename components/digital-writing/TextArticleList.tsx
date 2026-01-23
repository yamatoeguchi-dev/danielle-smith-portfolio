import { Archive } from "@/app/generated/prisma/client";

import { TextArticleItem } from "./TextArticleItem";


type Props = {
  articles: Archive[];
};

export function TextArticleList({ articles }: Props) {
  return (
    <div className="px-4">
      {articles.map((article, i) => (
        <TextArticleItem
          key={article.headline}
          article={article}
          showDivider={i < articles.length - 1}
        />
      ))}
    </div>
  );
}
