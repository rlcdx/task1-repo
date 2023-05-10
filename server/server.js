const express = require("express");
const setupSongRoutes = require("./routes/routeSetup");

const cors = require("cors");

const server = express();

server.set("view engine", "pug");

server.use(cors());
server.use("/song-reqs", express.static("public"));
server.use("/song-reqs", express.static("styles"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/waw", cors(), (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

setupSongRoutes(server);

server.listen(8000, "127.0.0.1", () => {
  console.log("Server is running on port 8000");
});
