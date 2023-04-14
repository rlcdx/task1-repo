const fs = require('node:fs')
const express = require('express')
const showList = require('./showlist')
const functions = require('./functions')

const server = express()
const pug = require('pug')

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

server.route('/songs')
    .get(functions.getAllSongs)
    .post(functions.addSong)
server.route('/songs/:id')
    .get(functions.getSong)
    .patch(functions.editSong)
    .put(functions.replaceSong)
    .delete(functions.deleteSong)

server.listen(8000, '127.0.0.1', () => {
    console.log('Server is running...')
})