import Image from "next/image";
import Link from "next/link";

import ArticleMeta from "@/components/digital-writing/ArticleMeta"
import { Archive } from "@/app/generated/prisma/client";
import { formatAPDate } from "@/utils/misc";


type Props = {
  article: Archive;
};

export default function MediumArticle({
  article
}: Props) {
  return (
    <Link href={article.headline} className="group block" target="blank">
      <article className="rounded-none">
        {article.imageUrl && (
          <div className="relative mb-3 aspect-[4/3] overflow-hidden">
            <Image
              src={article.imageUrl}
              alt={article.headline}
              fill
              sizes="(min-width: 640px) 30vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <ArticleMeta date={formatAPDate(article.publishDate)} className="text-muted-foreground mb-1" />
        <h3 className="mb-2 text-sm font-semibold leading-snug group-hover:underline">
          {article.headline}
        </h3>
      </article>
    </Link>
  );
}
