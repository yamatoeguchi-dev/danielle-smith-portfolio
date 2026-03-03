"use client"

import * as React from "react"
import { Instagram, Music } from "lucide-react"
import { InstagramEmbed, TikTokEmbed } from "react-social-media-embed"

type SocialPost = {
  platform: "tiktok" | "instagram"
  url: string
}

type SocialEmbedGridProps = {
  posts: SocialPost[]
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function useResizeWidth<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null)
  const [width, setWidth] = React.useState(0)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry?.contentRect?.width ?? 0)
    })

    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return { ref, width }
}

const platformConfig = {
  tiktok: {
    icon: Music,
    label: "TikTok",
  },
  instagram: {
    icon: Instagram,
    label: "Instagram",
  },
}

function EmbedCard({ post }: { post: SocialPost }) {
  const { ref, width } = useResizeWidth<HTMLDivElement>()
  const config = platformConfig[post.platform]
  const Icon = config.icon
  const isPlaceholder = !post.url || post.url === "#"

  const available = Math.floor(width)
  const instagramWidth = clamp(available, 358, 420)
  const tiktokWidth = clamp(available, 325, 420)

  if (isPlaceholder) {
    return (
      <div className="rounded-sm border border-border bg-secondary flex flex-col items-center justify-center p-8 min-h-90 transition-transform duration-200 hover:-translate-y-0.5">
        <Icon className="w-8 h-8 text-muted-foreground mb-3" />
        <p className="text-sm font-medium text-foreground mb-1">{config.label} Post</p>
        <p className="text-xs text-muted-foreground mb-3">Embed URL pending</p>
      </div>
    )
  }

  return (
    <div ref={ref} className="rounded-sm overflow-hidden bg-card min-h-90 transition-transform duration-200 hover:-translate-y-0.5 p-3 flex justify-center">
      {post.platform === "instagram" ? (
        <InstagramEmbed url={post.url} width={instagramWidth} />
      ) : (
        <TikTokEmbed url={post.url} width={tiktokWidth} />
      )}
    </div>
  )
}

export default function SocialEmbedGrid({ posts }: SocialEmbedGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {posts.map((post, index) => (
        <EmbedCard key={`${post.platform}-${index}`} post={post} />
      ))}
    </div>
  )
}
