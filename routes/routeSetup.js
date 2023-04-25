const fs = require("node:fs");
const db = require("../services/songKnex");
const showList = require("../showlist");
const express = require("express");
const path = require("path");
const sqlite3 = require('sqlite3').verbose()

const server = express();

server.use("/song-reqs", express.static("public"));
server.use("/song-reqs", express.static("styles"));

function setupSongRoutes(server) {
  server.get("/", function (req, res) {
    res.render("sample", { list: showList() });
  });

  server.get("/random", function (req, res) {
    const filePath = path.join(__dirname, "..", "views", "random.html");
    res.sendFile(filePath);
  });

  server.get("/song-reqs", function (req, res) {
    const filePath = path.join(__dirname, "..", "views", "song-reqs.html");
    res.sendFile(filePath);
  });

  server.get("/song-reqs/patch-req", function (req, res) {
    const filePath = path.join(__dirname, "..", "views", "patch-req.html");
    res.sendFile(filePath);
  });

  server.get("/favicon.ico", (req, res) => {
    const filePath = path.join(__dirname, "..", "public", "darock.jpg");
    const icon = fs.readFileSync(filePath);
    res.end(icon);
  });

  server.get("/songs", async (req, res) => {
    const songs = await db.getAllSongs();
    res.status(200).json({ songs });
  });

  server.get("/songs/:id", async (req, res) => {
    const id = req.params.id;
    const song = await db.getSong(id);
    if (!song) {
      return res.status(404).json({
        status: "Failed",
        message: "Error! Song with ID " + id + " is not found.",
      });
    }
    res.status(200).json({ song });
  });

  server.post("/songs", async (req, res) => {
    const results = await db.createSong(req.body);
    res.status(201).json({ id: results[0] });
  });

  server.patch("/songs/:id", async (req, res) => {
    const id = await db.updateSong(req.params.id, req.body);
    res.status(200).json({ id });
  });

  server.delete("/songs/:id", async (req, res) => {
    await db.deleteSong(req.params.id);
    res.status(200).json({ success: true });
  });
}

module.exports = setupSongRoutes;
