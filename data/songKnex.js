const knex = require("./knex")

function createSong(song) {
    return knex("songs").insert(song)
}

function getAllSongs() {
    return knex("songs").select("*")
}

function deleteSong(id) {
    return knex("songs").where("id", id).del()
}

function updateSong(id, song) {
    return knex("songs").where("id", id).update(song)
}

module.exports = {
    createSong,
    getAllSongs,
    deleteSong,
    updateSong
}