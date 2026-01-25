import Link from "next/link";

import { Archive } from "@/app/generated/prisma/client";
import { formatAPDate } from "@/utils/misc";
import { Separator } from "@/components/ui/separator";

import ArticleMeta from "./ArticleMeta";


type Props = {
  article: Archive;
  showDivider?: boolean;
};

export function TextArticleItem({
  article,
  showDivider = false,
}: Props) {
  return (
    <div className="py-3">
      <ArticleMeta date={formatAPDate(article.publishDate)} className="text-muted-foreground mb-1" />

      <Link
        href={article.url}
        className="block text-md font-semibold leading-snug hover:underline"
        target="blank"
      >
        {article.headline}
      </Link>

      {showDivider ? <Separator className="mt-4" /> : null}
    </div>
  );
}
