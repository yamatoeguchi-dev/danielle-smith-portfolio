import { Play } from "lucide-react"

import { Badge } from "@/components/ui/badge"

type SupportedMediaPlatform = "youtube" | "vimeo"

type ProjectMedia = {
  url: string
  platform?: SupportedMediaPlatform
  title?: string
}

export interface FeaturedProject {
  title: string
  role: string
  organization: string
  description: string
  impacts: string[]
  tags?: string[]
  award?: string
  media?: ProjectMedia
  mediaPlaceholderLabel?: string
}

function extractYouTubeId(url: string) {
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match?.[1]) return match[1]
  }

  return null
}

function extractVimeoId(url: string) {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return match?.[1] ?? null
}

function inferPlatform(url: string): SupportedMediaPlatform | null {
  if (/youtu\.be|youtube\.com/.test(url)) return "youtube"
  if (/vimeo\.com/.test(url)) return "vimeo"
  return null
}

function buildEmbedUrl(media: ProjectMedia) {
  const platform = media.platform ?? inferPlatform(media.url)
  if (!platform) return null

  if (platform === "youtube") {
    const videoId = extractYouTubeId(media.url)
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  }

  const vimeoId = extractVimeoId(media.url)
  return vimeoId
		? `https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0&transparent=0&dnt=1`
		: null
}

export default function FeaturedProjectBlock({
  title,
  role,
  organization,
  description,
  impacts,
  tags,
  award,
  media,
  mediaPlaceholderLabel = "Video / Media",
}: FeaturedProject) {
  const embedUrl = media ? buildEmbedUrl(media) : null

  return (
    <article className="group grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-border transition-transform duration-200">
      {embedUrl ? (
        <div className="relative w-full overflow-hidden rounded-sm border border-border bg-secondary aspect-video">
        <iframe
            src={embedUrl}
            title={media?.title ?? title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
        />
        </div>
      ) : (
        <div className="aspect-video bg-secondary rounded-sm border border-border flex items-center justify-center cursor-pointer overflow-hidden">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Play className="w-8 h-8" />
            <span className="text-xs font-medium">{mediaPlaceholderLabel}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center">
        <h3 className="text-lg md:text-xl font-semibold leading-snug mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground font-medium mb-3">
          {role} — {organization}
        </p>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">{description}</p>

        <ul className="space-y-1.5 mb-4">
          {impacts.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {award ? (
          <Badge variant="secondary" className="w-fit text-xs">
            {award}
          </Badge>
        ) : null}
      </div>
    </article>
  )
}
