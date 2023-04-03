const fs = require('node:fs')
const express = require('express')
const showList = require('./showlist')
const functions = require('./functions')

const server = express()
const pug = require('pug')

server.set('view engine','pug')

server.use('/tings', express.static('public'))
server.use(express.json())

server.get('/', function(req, res) {
    res.render(
        'sample',
        { title : 'Noice', message : 'List of TV shows', list : showList() }
    )
})

server.get('/favicon.ico', (req, res) => {
    const icon = fs.readFileSync('./public/darock.jpg')
    res.end(icon)
})

server.route('/songs')
    .get(functions.getAllSongs)
    .post(functions.createSong)
server.route('/songs/:id')
    .get(functions.getSong)
    .patch(functions.editSong)
    .put(functions.replaceSong)
    .delete(functions.deleteSong)

server.listen(8000, '127.0.0.1', () => {
    console.log('Server is running...')
})