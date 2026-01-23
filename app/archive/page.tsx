import prisma from '@/lib/prisma'
import { ArchiveContentType } from '@/lib/enums/archive.enum'

import ArchiveList from "./ArchiveList"

const PAGE_SIZE = 10

export default async function ArchivePage() {
	// Fetch the initial set of archive items from the database
	const initial = await prisma.archive.findMany({
		orderBy: [{ publishDate: "desc" }, { id: "desc" }],
		take: PAGE_SIZE,
		select: {
		id: true,
		organization: true,
		headline: true,
		publishDate: true,
		url: true,
		},
	})

	const totalDigitalArticleCount : number = await prisma.archive.count({
		where: {
			contentType: ArchiveContentType.DIGITAL_ARTICLE,
		}
	});

	// Determine the initial cursor for pagination
  	const initialCursor = initial.length ? initial[initial.length - 1].id : null

	return (
		<div className="editorial-headline mx-auto w-full max-w-3xl px-4 pb-20">
			<div className="mb-6">
				<h1 className="text-2xl font-semibold tracking-tight">Archive ({totalDigitalArticleCount})</h1>
			</div>

			<ArchiveList initialItems={initial} initialCursor={initialCursor} pageSize={PAGE_SIZE} />
		</div>
	)
}