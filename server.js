const express = require('express')
const setupSongRoutes = require('./routes/routeSetup')

const server = express()
const pug = require('pug')

server.set('view engine','pug')

server.use(express.json())
server.use(express.urlencoded({extended: true}))

setupSongRoutes(server)

server.listen(8000, '127.0.0.1', () => {
    console.log('Server is running...')
})