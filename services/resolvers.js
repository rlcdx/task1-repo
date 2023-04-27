const sqlite3 = require("sqlite3").verbose();
const rf = require("./resolverFuncs.js")

const resolvers = {
  songs: () => {
    return rf.getAllSongs();
  },
  song: (args) => {
    return rf.getSongById(args)
  },
  addSong: (args) => {
    return rf.addSong(args)
  },
  updateSong: (args) => {
    return rf.updateSong(args)
  },
  deleteSong: (args) => {
    return rf.deleteSong(args)
  },
};

module.exports = resolvers;
