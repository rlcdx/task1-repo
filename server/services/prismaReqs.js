const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllSongs() {
  // GET ALL SONGS
  const songs = await prisma.songs.findMany();
  return songs;
}

async function getSongById(args) {
  const song = await prisma.songs.findUnique({
    where: {
      id: args.id,
    },
  });
  console.log(song);
  return song;
}

async function createSong(args) {
  // CREATE NEW SONG
  const { title, artist, releaseYear } = args;
  const song = await prisma.songs.create({
    data: {
      title,
      artist,
      releaseYear,
    },
  });
  return song;
}

async function updateSong(args) {
  // UPDATE SONG
  let data = {};
  if (args.title) {
    data.title = args.title;
  }
  if (args.artist) {
    data.artist = args.artist;
  }
  if (args.releaseYear) {
    data.releaseYear = args.releaseYear;
  }
  console.log("ARGS: ", args);
  const song = await prisma.songs.update({
    where: {
      id: args.id,
    },
    data,
  });
  console.log("DATA: ", data);
  console.log("SONG: ", song);
  return song;
}

async function deleteSong(args) {
  // DELETE SONG
  const song = await prisma.songs.delete({
    where: {
      id: args.id,
    },
  });
}

module.exports = {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
};
