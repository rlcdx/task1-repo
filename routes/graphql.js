const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("../data/data.db");
const { graphqlHTTP } = require("express-graphql");
const express = require("express");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const resolvers = require("../services/resolvers");

const app = express();

const SongType = new GraphQLObjectType({
  name: "Song",
  description: "This represents a song",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    releaseYear: { type: new GraphQLNonNull(GraphQLInt) },
    artist: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    songs: {
      type: new GraphQLList(SongType),
      resolve: resolvers.songs,
    },
    song: {
      type: SongType,
      description: "A Single Song",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: resolvers.song,
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addSong: {
      type: SongType,
      description: "Add a new song",
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        artist: { type: new GraphQLNonNull(GraphQLString) },
        releaseYear: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: resolvers.addSong,
    },
    updateSong: {
      type: SongType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLString },
        artist: { type: GraphQLString },
        releaseYear: { type: GraphQLInt },
      },
      resolve: resolvers.updateSong,
    },
    deleteSong: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: resolvers.deleteSong,
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

// const graphqlMW = graphqlHTTP({
//   schema: schema,
//   graphiql: true,
// });

app.listen(3000, () => console.log("Server is running"));

// module.exports = {
//   schema,
//   graphqlMW,
// };