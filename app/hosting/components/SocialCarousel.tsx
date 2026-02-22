"use client"

import * as React from "react"

import { ResponsiveInstagramEmbed } from "./ResponsiveInstagramEmbed"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

type Props = { socialEmbedLinks: string[] }

export function SocialCarousel({ socialEmbedLinks }: Props) {

  return (
    <Carousel
      className="relative w-full"
    >
      <CarouselContent>
        {socialEmbedLinks.map((link) => (
          <CarouselItem
            key={link}
            className="md:basis-1/2 xl:basis-1/3 flex justify-center"
          >
            <div className="pointer-events-none md:pointer-events-auto">
              <ResponsiveInstagramEmbed url={link} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Controls BELOW carousel */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <CarouselPrevious className="static md:inline-flex" />
        <CarouselNext className="static md:inline-flex" />
      </div>
    </Carousel>
  )
}