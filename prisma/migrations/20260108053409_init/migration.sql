-- CreateTable
CREATE TABLE "Archive" (
    "id" SERIAL NOT NULL,
    "organization" VARCHAR(255) NOT NULL,
    "contentType" VARCHAR(255) NOT NULL,
    "publishDate" TIMESTAMP(3) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "headline" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Archive_pkey" PRIMARY KEY ("id")
);
