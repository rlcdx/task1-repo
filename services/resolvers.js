const sqlite3 = require("sqlite3").verbose();
const db = require("./songKnex");

const resolvers = {
  songs: () => {
    return new Promise((resolve, reject) => {
      db.getAllSongs,
        (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve(rows);
          }
        };
    });
  },
  song: (args) => {
    return new Promise((resolve, reject) => {
      db.getSong(args),
        [args.id],
        (error, row) => {
          if (error) {
            reject(error);
          } else {
            resolve(row);
          }
        };
    });
  },
  addSong: (args) => {
    return new Promise((resolve, reject) => {
      const { title, artist, releaseYear } = args;
      db.createSong(args),
        [title, artist, releaseYear],
        (error, row) => {
          if (error) {
            reject(error);
          } else {
            resolve(row);
          }
        };
    });
  },
  updateSong: (args) => {
    return new Promise(() => {
      let updateClause = "";
      let updateParams = [];
      if (args.title) {
        updateClause += "title = ?, ";
        updateParams.push(args.title);
      }
      if (args.artist) {
        updateClause += "artist = ?, ";
        updateParams.push(args.artist);
      }
      if (args.releaseYear) {
        updateClause += "releaseYear = ?, ";
        updateParams.push(args.releaseYear);
      }
      updateClause = updateClause.slice(0, -2);
      db.updateSong(args);
    });
  },
  deleteSong: (args) => {
    return new Promise((resolve, reject) => {
      db.deleteSong(args),
        [args.id],
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(`Song with ID ${args.id} has been deleted`);
          }
        };
    });
  },
};

module.exports = resolvers;
