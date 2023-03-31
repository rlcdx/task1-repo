const fs = require('node:fs')
const express = require('express')
const server = express()
server.use(express.json())

let songs = JSON.parse(fs.readFileSync('./data/songs.json'))

const getAllSongs = (req, res) => {
    res.json({
        data: {
            songs: songs
        }
    })
}
const getSong = (req, res) => {
    const id = req.params.id * 1

    let song = songs.find(tag => tag.id === id)

    if (!song) {
        return res.status(404).json({
            status: 'Failed',
            message: 'Error! Song with ID ' + id + ' is not found.'
        })
    }

    res.status(200).json({
        data: {
            song: song
        }
    })
}
const createSong = (req, res) => {
    console.log(req.body)
    const newId = songs[songs.length - 1].id + 1

    const newSong = Object.assign({ id: newId }, req.body)

    songs.push(newSong)

    fs.writeFile('./data/songs.json', JSON.stringify(songs), (err) => {
        res.status(201).json({
            data: {
                song: newSong
            }
        })
    })
}
const editSong = (req, res) => {
    const id = req.params.id * 1
    const songToUpdate = songs.find(tag => tag.id === id)

    if (!songToUpdate) {
        return res.status(404).json({
            status: 'Failed',
            message: 'Error! Song with ID ' + id + ' is not found.'
        })
    }

    const songIndex = songs.indexOf(songToUpdate)

    Object.assign(songToUpdate, req.body)

    songs[songIndex] = songToUpdate

    fs.writeFile('./data/songs.json', JSON.stringify(songs), (err) => {
        res.status(200).json({
            data: {
                song: songToUpdate
            }
        })
    })
}
const replaceSong = (req, res) => {
    const id = req.params.id * 1
    const changes = req.body
    const songToUpdate = songs.find(tag => tag.id === id)

    const songIndex = songs.indexOf(songToUpdate)

    if (songIndex != -1) {
        songs[songIndex] = changes
        // return res.status(200).json(songs[songIndex])
        fs.writeFile('./data/songs.json', JSON.stringify(songs), (err) => {
            res.status(200).json({
                data: {
                    song: changes
                }
            })
        })
    } else {
        res.status(404).json({ message: "does not exist" })
    }
}
const deleteSong = (req, res) => {
    const id = req.params.id * 1
    const songToDelete = songs.find(tag => tag.id === id)
    const songIndex = songs.indexOf(songToDelete)

    if (!songToDelete) {
        return res.status(404).json({
            status: 'Failed',
            message: 'Error! Song with ID ' + id + ' is not found.'
        })
    }

    songs.splice(songIndex, 1)

    fs.writeFile('./data/songs.json', JSON.stringify(songs), (err) => {
        res.status(204).json({
            data: {
                song: null
            }
        })
    })
}


exports.getAllSongs = getAllSongs
exports.getSong = getSong
exports.createSong = createSong
exports.editSong = editSong
exports.replaceSong = replaceSong
exports.deleteSong = deleteSong

