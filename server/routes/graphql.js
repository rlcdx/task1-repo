const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const resolvers = require("../services/resolvers");

const server = express();

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
        createSong(title: String!, artist: String!, releaseYear: Int!): Song
        updateSong(id: Int!, title: String, artist: String, releaseYear: Int): Song
        deleteSong(id: Int!): String
    }
`);

const root = {
  songs: resolvers.songs,
  song: resolvers.song,
  createSong: resolvers.createSong,
  updateSong: resolvers.updateSong,
  deleteSong: resolvers.deleteSong,
};

server.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// const graphqlMW = graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// })

server.listen(3000, () => console.log("Server is running"));

// module.exports = graphqlMW
