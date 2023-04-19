const knex = require("./knex")

function getAllSongs() {
    return knex("songs").select("*")
}

function createSong(song) {
    return knex("songs").insert(song)
    
}

function getSong(id) {
    return knex("songs").select("*").where("id", id)
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
    getSong,
    deleteSong,
    updateSong
}