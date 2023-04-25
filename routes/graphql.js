const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("../data/data.db");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const resolvers = require("../services/resolvers");
<<<<<<< HEAD

const server = express();
=======
// dsads
const app = express();
>>>>>>> fd862518d04dc04041bdbcce5c090d27a25b0605

const schema = buildSchema(`
    type Song {
        id: Int!
        title: String!
        releaseYear: Int!
        artist: String!
    }
    
    type Query {
        songs: [Song!]!
        song(id: Int!): Song
    }
    
    type Mutation {
        addSong(title: String!, artist: String!, releaseYear: Int!): Song
        updateSong(id: Int!, title: String, artist: String, releaseYear: Int): Song
        deleteSong(id: Int!): String
    }
`);

const root = {
  songs: resolvers.songs,
  song: resolvers.song,
  addSong: resolvers.addSong,
  updateSong: resolvers.updateSong,
  deleteSong: resolvers.deleteSong
};

server.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

server.listen(3000, () => console.log("Server is running"));
