import React from 'react'

import { ArticleLink } from '@/types/media-content';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import Image from 'next/image';

type Props = {
    articles: ArticleLink[]
}

function isGif(src: string) {
  return /\.gif$/i.test(src);
}

export default function ArticleCarousel({articles}: Props) {
  return (
    <Carousel className="px-6" opts={{ align: "start" }}>
      <CarouselContent>
        {articles.map((article, index) => {
          const gif = isGif(article.imageUrl);

          return (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="relative w-full aspect-[9/16] sm:aspect-[9/16]">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-md mb-4"
                  unoptimized={gif}
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious className="xl:hidden left-1 sm:left-2 top-1/2 -translate-y-1/2 -translate-x-1/4 z-10 pointer-events-auto" />
      <CarouselNext className="xl:hidden right-1 sm:right-2 top-1/2 -translate-y-1/2 translate-x-1/4 z-10 pointer-events-auto" />
    </Carousel>
  )
}