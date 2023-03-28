const fs = require('node:fs')
const showList = require('./showlist');

const express = require("express")
const server = express()

server.listen(8000, '127.0.0.1', () => {
    console.log('Server is running.')
})

server.get("/", (req, res) => {
    const f = fs.readFileSync('./public/display.html', 'utf-8')
    res.end(f.replace('{{listahan}}', showList()))
})

server.get("/favicon.ico", (req, res) => {
    const f3 = fs.readFileSync('./public/darock.jpg')
    res.end(f3)
})
