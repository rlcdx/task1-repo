const fs = require('node:fs')
const showList = require('./showlist');

const express = require('express')
const server = express()
const pug = require('pug')

server.set('view engine','pug')

server.listen(8000, '127.0.0.1', () => {
    console.log('Server is running.')
})

server.get("/", function(req, res) {
    res.render(
        'sample',
        { title : 'Noice', message : 'List of TV shows', list : showList() }
    )
})

server.get("/favicon.ico", (req, res) => {
    const f2 = fs.readFileSync('./public/darock.jpg')
    res.end(f2)
})
