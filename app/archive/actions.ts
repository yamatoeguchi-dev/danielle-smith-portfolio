"use server";

import prisma from "@/lib/prisma";

const select = {
    id: true,
    organization: true,
    headline: true,
    publishDate: true,
    url: true,
} as const;

export async function loadMoreArchives({
    cursor,
    take,
}: {
    cursor: number | string,
    take: number,
}) {
    const items = await prisma.archive.findMany({
        orderBy: [{ publishDate: "desc" }, { id: "desc" }],
        take,
        skip: 1,
        cursor: { id: cursor as any },
        select,
    });

    const nextCursor = items.length ? items[items.length - 1].id : null;

    return { items, nextCursor };
}
