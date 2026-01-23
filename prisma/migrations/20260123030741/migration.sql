/*
  Warnings:

  - A unique constraint covering the columns `[headline]` on the table `Archive` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Archive_headline_key" ON "Archive"("headline");
