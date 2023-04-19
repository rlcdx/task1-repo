const fs = require('node:fs')
const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const showList = require('./showlist')
const functions = require('./functions')

const server = express()
const pug = require('pug')
// const db = new sqlite3.Database('./data/data.db')
const db = require('./data/songKnex')

server.set('view engine','pug')

server.use('/song-reqs', express.static('public'))
server.use('/song-reqs', express.static('styles'))
server.use(express.json())

server.get('/', function(req, res) {
    res.render('sample', { list : showList() })
})

server.get('/song-reqs', function(req, res) {
    res.sendFile(__dirname + '/views/song-reqs.html')
})

server.get('/song-reqs/patch-req', function(req, res) {
    res.sendFile(__dirname + '/views/patch-req.html')
})

server.get('/favicon.ico', (req, res) => {
    const icon = fs.readFileSync('./public/darock.jpg')
    res.end(icon)
})

// server.route('/songs')
//     .get(functions.getAllSongs)
//     .post(functions.addSong)
// server.route('/songs/:id')
//     .get(functions.getSong)
//     .patch(functions.editSong)
//     .put(functions.replaceSong)
//     .delete(functions.deleteSong)

server.get('/songs', async (req, res) => {
    const songs = await db.getAllSongs()
    res.status(200).json({songs})
})

server.get('/songs/:id', async (req, res) => {
    const id = req.params.id
    const song = await db.getSong(id)
    res.status(200).json({song})
})

server.post('/songs', async (req, res) => {
    const results = await db.createSong(req.body)
    res.status(201).json({id: results[0]})
})

server.patch('/songs/:id', async (req, res) => {
    const id = await db.updateSong(req.params.id, req.body)
    res.status(200).json({id})
})

server.delete('/songs/:id', async (req, res) => {
    await db.deleteSong(req.params.id)
    res.status(200).json({success:true})
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Server is running...')
})