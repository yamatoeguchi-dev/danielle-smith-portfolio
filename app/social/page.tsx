import React from 'react'

import Image from "next/image"

import ArticleCarousel from '@/components/articleCarousel'
import { Separator } from '@/components/ui/separator'
import { SOCIAL_MEDIA_ARTICLES } from '@/data/articles'


type Props = {}

export default function SocialPage({}: Props) {

  return (
    <div className="mb-8">
      {/* Desktop: 2 columns; small row gap so header+para stay close */}
      <div className="grid gap-x-8 gap-y-2 lg:grid-cols-2">
        {/* Header — top on mobile, left/top on desktop */}
        <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1">
          <h1 className="text-3xl font-bold">Social Media</h1>
        </div>

        {/* Image — second on mobile, entire right column on desktop */}
        <div className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <div className="relative w-full h-64 lg:h-full min-h-[300px]">
            <Image
              src="https://www.pngfind.com/pngs/m/5-59243_cell-phone-mockup-iphone-placeholder-hd-png-download.png"   // put in /public/images
              alt="Social media hero"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>

        {/* Paragraph — third on mobile, left/bottom on desktop */}
        <div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2 lg:relative lg:-top-8">
          <p className="mt-3 lg:mt-2">
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
      <Separator className='my-10'/>
      <div className='w-full'>
        <ArticleCarousel articles={SOCIAL_MEDIA_ARTICLES}/>
      </div>
    </div>
  )
}