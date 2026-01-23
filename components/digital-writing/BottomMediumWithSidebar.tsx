import { TextArticleList } from "./TextArticleList";

import MediumArticle from "@/components/digital-writing/MediumArticle";
import { Archive } from "@/app/generated/prisma/client";


type Props = {
  mediumArticles: Archive[];
  rightArticles: Archive[];
};

export function BottomMediumWithSidebar({
  mediumArticles,
  rightArticles,
}: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {mediumArticles.map((article, i) => (
            <MediumArticle key={`${article.headline}-${i}`} article={article} />
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        <TextArticleList articles={rightArticles} />
      </div>
    </div>
  );
}
