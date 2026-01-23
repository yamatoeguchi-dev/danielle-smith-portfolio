import Image from "next/image";
import Link from "next/link";

import { Archive } from "@/app/generated/prisma/client";
import { formatAPDate } from "@/utils/misc";

import ArticleMeta from "./ArticleMeta";


type Props = {
  article: Archive
};

export default function FeaturedArticle({
  article
}: Props) {
  const Content = (
    <article className="relative group overflow-hidden rounded-none">
      {article.imageUrl && (
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.headline}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0
        bg-gradient-to-t
        from-black/100
        via-black/20
        to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
        <ArticleMeta
          date={formatAPDate(article.publishDate)}
          className="text-white/90"
        />
        <h2 className="mt-3 mb-3 text-sm md:text-2xl font-semibold leading-tight text-white">
          {article.headline}
        </h2>
      </div>
    </article>
  );

  return (
    <Link href={article.url} className="block cursor-pointer" target="blank">
      {Content}
    </Link>
  );
}
