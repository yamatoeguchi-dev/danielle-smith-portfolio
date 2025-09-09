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
    <Carousel opts={{ align: "start" }}>
      <CarouselContent>
        {articles.map((article, index) => {
          const gif = isGif(article.imageUrl);

          return (
            <CarouselItem
              key={index}
              className="basis-[85%] md:basis-1/2 lg:basis-1/4"
            >
              <div className="rounded-lg flex flex-col sm:p-6 p-4">
                {/* Aspect box so the fill image has height on all breakpoints */}
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

                <h2 className="text-xl font-semibold mb-4">{article.title}</h2>
                <p className="text-gray-700 mb-4 flex-grow">{article.description}</p>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto text-blue-500 hover:underline"
                >
                  Read More
                </a>
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious className="left-1 sm:left-2 top-1/2 -translate-y-1/2 translate-x-0 z-10 pointer-events-auto" />
      <CarouselNext className="right-1 sm:right-2 top-1/2 -translate-y-1/2 translate-x-0 z-10 pointer-events-auto" />
    </Carousel>
  )
}