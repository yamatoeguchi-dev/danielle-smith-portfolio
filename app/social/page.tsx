import React from 'react'

import ArticleCarousel from '@/components/article-carousel'
import { Separator } from '@/components/ui/separator'
import { SOCIAL_MEDIA_ARTICLES } from '@/data/articles'

import {Nbc7Social} from './components/nbc7/nbc7'
import {USCSocial} from './components/usc/usc'
import { SocialIntro } from './components/intro'


type Props = {}

export default function SocialPage({}: Props) {

  return (
    <div className="mb-8">
      <SocialIntro />
      <Nbc7Social />
      <USCSocial />
    </div>
  )
}