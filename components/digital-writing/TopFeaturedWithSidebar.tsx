import FeaturedArticle from "@/components/digital-writing/FeaturedArticle"
import { Archive } from "@/app/generated/prisma/client";

import { TextArticleList } from "./TextArticleList";


type Props = {
  featuredArticle: Archive;
  rightArticles: Archive[];
};

export function TopFeaturedWithSidebar({
  featuredArticle,
  rightArticles,
}: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
      <div className="lg:col-span-3">
        <FeaturedArticle article={featuredArticle} />
      </div>

      <div className="lg:col-span-2">
        <TextArticleList articles={rightArticles} />
      </div>
    </div>
  );
}
