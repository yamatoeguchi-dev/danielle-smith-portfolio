'use client'

import React from 'react'

import { SocialCarousel } from './components/SocialCarousel'


type Props = {}

export default function SocialPage({}: Props) {
  const nbcSocialEmbedLinks: Array<string> = [
    "https://www.instagram.com/reel/DQRti5_FHk9/?utm_source=ig_web_copy_link",
    "https://www.instagram.com/reel/CzL4W6-PLzx/?utm_source=ig_embed&ig_rid=e31804f6-76ac-4a9d-9540-82147b16f633",
    "https://www.instagram.com/reel/DCnhLCrJx2Q/?utm_source=ig_embed&ig_rid=21cca2db-6457-4ba9-9fa8-e84b3edfc021",
    "https://www.instagram.com/reel/C8k2gzRty98/?utm_source=ig_embed&ig_rid=53921f8f-d3f3-4dca-a793-6b89a9f51876",
    "https://www.instagram.com/reel/Czeah4Crxxf/?utm_source=ig_embed&ig_rid=6d700167-cc7b-4549-bf66-40139322e5ec",
    "https://www.instagram.com/reel/CxjRhUCrkI-/?utm_source=ig_embed&ig_rid=71521e8d-7956-4dc1-be50-b92289afc894",
  ]

  const uscRunDownSocialEmbedLinks: Array<string> = [
    "https://www.instagram.com/p/CNWVbawFT-r/?utm_source=ig_embed&ig_rid=3bfbf54a-55d8-4285-b040-fbed5cc9ea94",
    "https://www.instagram.com/p/CLqHvarF3T_/?utm_source=ig_embed&ig_rid=ea2d3271-b99c-4ec0-8b02-844f751c940c",
    "https://www.instagram.com/p/CMgDvuzFFtX/?utm_source=ig_embed&ig_rid=49a36737-c4db-434c-ae45-9cb4b52041e7",
    "https://www.instagram.com/p/CK0DJYpl2EE/?utm_source=ig_embed&ig_rid=8714e08e-2451-4d63-8311-a88cf33e365b",
    "https://www.instagram.com/p/COPE9ofFxYu/?utm_source=ig_embed&ig_rid=74ec962e-1363-4f62-99ab-26a3d787256c",
  ]

  return (
    <div className="mx-auto w-full max-w-5xl py-8">
      <div className="space-y-20">

        {/* NBC San Diego Section */}
        <section>
          {/* Section Header */}
          <div className="mb-8 border-b border-neutral-300 pb-6">

            <h2 className="mt-3 font-serif text-xl md:text-2xl xl:text-3xl leading-tight text-neutral-900">
              NBC San Diego
            </h2>
          </div>

          {/* Carousel */}
          <div>
            <SocialCarousel socialEmbedLinks={nbcSocialEmbedLinks} />
          </div>
        </section>


        {/* USC Annenberg Media Section */}
        <section>
          {/* Section Header */}
          <div className="mb-8 border-b border-neutral-300 pb-6">

            <h2 className="mt-3 font-serif text-xl md:text-2xl xl:text-3xl leading-tight text-neutral-900">
              USC Annenberg Media
            </h2>
          </div>

          {/* Carousel */}
          <div>
            <SocialCarousel socialEmbedLinks={uscRunDownSocialEmbedLinks} />
          </div>
        </section>

      </div>
    </div>
  )
}