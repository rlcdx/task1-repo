/*
  Warnings:

  - A unique constraint covering the columns `[title,artist]` on the table `songs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "songs_title_artist_key" ON "songs"("title", "artist");
