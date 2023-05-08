-- CreateTable
CREATE TABLE "songs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "releaseYear" INTEGER NOT NULL,
    "artist" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "songs_title_artist_key" ON "songs"("title", "artist");
