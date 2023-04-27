const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("../data/data.db");

function getAllSongs() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM songs", (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}

function getSongById(args) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM songs WHERE id = ?", [args.id], (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
}

function addSong(args) {
  return new Promise((resolve, reject) => {
    const { title, artist, releaseYear } = args;
    db.run(
      "INSERT INTO songs (title, artist, releaseYear) VALUES (?, ?, ?)",
      [title, artist, releaseYear],
      function (error) {
        if (error) {
          reject(error);
        } else {
          db.get(
            "SELECT * FROM songs WHERE id = ?",
            [this.lastID],
            (error, row) => {
              if (error) {
                reject(error);
              } else {
                resolve(row);
              }
            }
          );
        }
      }
    );
  });
}

function updateSong(args) {
  return new Promise((resolve, reject) => {
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
    db.run(
      `UPDATE songs SET ${updateClause} WHERE id = ?`,
      [...updateParams, args.id],
      (error) => {
        if (error) {
          reject(error);
        } else {
          db.get(
            "SELECT * FROM songs WHERE id = ?",
            [args.id],
            (error, row) => {
              if (error) {
                reject(error);
              } else {
                resolve(row);
              }
            }
          );
        }
      }
    );
  });
}

function deleteSong(args) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM songs WHERE id = ?", [args.id], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(`Song with ID ${args.id} has been deleted`);
      }
    });
  });
}

module.exports = {
  getAllSongs,
  getSongById,
  addSong,
  updateSong,
  deleteSong,
};
