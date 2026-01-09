import React from 'react'

import prisma from '@/lib/prisma'

type Props = {}

export default async function ArchivePage({}: Props) {
    const archives = await prisma.archive.findMany()
    return (
        <>
            <div>Archive Page</div>
            {
                archives.map((archive) => (
                    <div key={archive.id}>{archive.headline}</div>
                ))
            }
        </>
    )
}