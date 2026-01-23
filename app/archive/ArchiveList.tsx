"use client"

import React from "react"
import { Loader2, ExternalLink } from "lucide-react"

import { ArchiveOrganizationType } from "@/lib/enums/archive.enum"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { formatAPDate } from "@/utils/misc"

import { loadMoreArchives } from "./actions"


type ArchiveRow = {
    id: number | string
    organization: string
    headline: string
    publishDate: Date | string
    url: string
}

export default function ArchiveList({
    initialItems,
    initialCursor,
    pageSize,
}: {
    initialItems: ArchiveRow[]
    initialCursor: ArchiveRow["id"] | null
    pageSize: number
}) {
    const [items, setItems] = React.useState<ArchiveRow[]>(initialItems)
    const [cursor, setCursor] = React.useState<ArchiveRow["id"] | null>(initialCursor)
    const [loading, setLoading] = React.useState(false)
    const [hasMore, setHasMore] = React.useState(initialItems.length === pageSize)

    const onLoadMore = async () => {
        if (!cursor || loading) return
        setLoading(true)
        try {
            const res = await loadMoreArchives({ cursor, take: pageSize })
            setItems((prev) => [...prev, ...res.items])
            setCursor(res.nextCursor)
            setHasMore(res.items.length === pageSize && res.nextCursor !== null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-3">
            {items.map((a) => (
            <Card key={String(a.id)} className="transition-colors hover:bg-muted/50">
                <a
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="block px-4 py-2"
                >
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                    <div className="text-xs font-medium text-muted-foreground">
                        {ArchiveOrganizationType[a.organization as keyof typeof ArchiveOrganizationType].replaceAll('_', ' ')}
                    </div>
                    <div className="mt-1 line-clamp-2 text-base font-medium">
                        {a.headline}
                    </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                    <div className="text-xs text-muted-foreground">
                        {formatAPDate(new Date(a.publishDate))}
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
                </a>
            </Card>
            ))}

            {items.length === 0 && (
            <div className="rounded-xl border p-8 text-center text-sm text-muted-foreground">
                No archive items yet.
            </div>
            )}

            {hasMore && (
            <div className="pt-3">
                <Button
                type="button"
                variant="secondary"
                className="w-full hover:cursor-pointer hover:bg-muted/50"
                onClick={onLoadMore}
                disabled={loading}
                >
                {loading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading…
                    </>
                ) : (
                    "Load more"
                )}
                </Button>
            </div>
            )}
        </div>
  )
}
