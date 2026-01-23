import Link from 'next/link';
import React from 'react'

import prisma from '@/lib/prisma'
import { TopFeaturedWithSidebar } from "@/components/digital-writing/TopFeaturedWithSidebar";
import { BottomMediumWithSidebar } from "@/components/digital-writing/BottomMediumWithSidebar";


type Props = {}

export default async function DigitalPage({}: Props) {
  const FEATURED_ARTICLE_ID = 797;
  const RIGHT_ARTICLES_IDS = [795, 887, 832];
  const MEDIUM_ARTICLE_IDS = [832, 808];
  const BOTTOM_RIGHT_ARTICLES_IDS = [1117, 1071, 1090];

  const [
    featuredArticle,
    rightArticles,
    mediumArticles,
    bottomRightArticles,
  ] = await Promise.all([
    prisma.archive.findUnique({
      where: { id: FEATURED_ARTICLE_ID },
    }),
    prisma.archive.findMany({
      where: { id: { in: RIGHT_ARTICLES_IDS } },
    }),
    prisma.archive.findMany({
      where: { id: { in: MEDIUM_ARTICLE_IDS } },
    }),
    prisma.archive.findMany({
      where: { id: { in: BOTTOM_RIGHT_ARTICLES_IDS } },
    }),
  ]);

  return (
    <div className='editorial-headline'>
      {featuredArticle && (
        <TopFeaturedWithSidebar
          featuredArticle={featuredArticle}
          rightArticles={rightArticles}
        />
      )}

      <BottomMediumWithSidebar
        mediumArticles={mediumArticles}
        rightArticles={bottomRightArticles}
      />

      <div className="flex justify-center my-10">
        <Link
          href="/archive"
          className="inline-flex items-center rounded-md border border-neutral-300 px-6 py-3 text-sm font-medium
                     hover:bg-neutral-100 transition-colors"
        >
          View Full Archive
        </Link>
      </div>
    </div>
  )
}