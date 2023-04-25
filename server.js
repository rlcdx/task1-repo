const express = require('express')
const setupSongRoutes = require('./routes/routeSetup')
// const sqlite3 = require("sqlite3").verbose();
// const db = new sqlite3.Database("./data/data.db");

// const { graphqlMW } = require("./routes/graphql");

const server = express()
const pug = require('pug')

server.set('view engine','pug')

server.use("/song-reqs", express.static("public"));
server.use("/song-reqs", express.static("styles"));
server.use(express.json())
server.use(express.urlencoded({extended: true}))
// server.use("/graphql", graphqlMW)

setupSongRoutes(server)

server.listen(8000, '127.0.0.1', () => {
    console.log('Server is running...')
})