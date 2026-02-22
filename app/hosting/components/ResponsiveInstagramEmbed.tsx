"use client"

import * as React from "react"
import { InstagramEmbed } from "react-social-media-embed"

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

export function ResponsiveInstagramEmbed({ url }: { url: string }) {
  const { ref, width } = useResizeWidth<HTMLDivElement>()

  // Subtract a bit for padding, arrows, etc. Tweak as needed.
  const available = Math.floor(width)
  const embedWidth = clamp(available, 328, 420) // 328 is IG min-width from your DOM

  return (
    <div ref={ref} className="w-full flex justify-center">
      <div className="w-full max-w-[420px]">
        <InstagramEmbed url={url} width={embedWidth} />
      </div>
    </div>
  )
}