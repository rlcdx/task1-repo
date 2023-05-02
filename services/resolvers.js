const sqlite3 = require("sqlite3").verbose();
const db = require("./prismaReqs");

const resolvers = {
  songs: () => {
    return db.getAllSongs();
  },
  song: (args) => {
    return db.getSongById(args);
  },
  createSong: (args) => {
    return db.createSong(args);
  },
  updateSong: (args) => {
    return db.updateSong(args);
  },
  deleteSong: (args) => {
    return db.deleteSong(args);
  },
};

module.exports = resolvers;
