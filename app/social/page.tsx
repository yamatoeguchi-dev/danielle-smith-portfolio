'use client'

import React from 'react'

import { InstagramEmbed } from 'react-social-media-embed'


type Props = {}

export default function SocialPage({}: Props) {

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <InstagramEmbed url="https://www.instagram.com/reel/DQRti5_FHk9/?utm_source=ig_web_copy_link" width='328' />
    </div>
  )
}