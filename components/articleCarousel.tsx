import React from 'react'

import { ArticleLink } from '@/types/media-content';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext
} from "@/components/ui/carousel";
import Image from 'next/image';

type Props = {
    articles: ArticleLink[]
}

export default function ArticleCarousel({articles}: Props) {
  return (
      <Carousel
          opts={{
            align: "start",
          }}
      >
        <CarouselContent>
          {articles.map((article, index) => (
            <CarouselItem
              key={index}
              className="basis-[85%] md:basis-1/2 lg:basis-1/3"
            >
              <div className="rounded-lg h-full flex flex-col bg-red-50 sm:p-6 p-4">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
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
          ))}
        </CarouselContent>
      <CarouselNext className="right-1 sm:right-2 top-1/2 -translate-y-1/2 translate-x-0 z-10 pointer-events-auto" />
    </Carousel>
  )
}