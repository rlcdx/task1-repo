import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Songs() {
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    releaseYear: "",
  });

  useEffect(() => {
    axios.get("http://localhost:8000/songs").then((response) => {
      console.log(response.data.songs);
      setSongs(response.data.songs);
      console.log("songs:", songs);
    });
  }, []);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewSong({
      ...newSong,
      [name]: name === "releaseYear" ? parseInt(value) : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8000/songs", newSong).then((response) => {
      setSongs([...songs, response.data]);
      setNewSong({ title: "", artist: "", releaseYear: "" });
    });
  };

  const deleteSong = (id) => {
    axios.delete(`http://localhost:8000/songs/${id}`).then(() => {
      setSongs(songs.filter((song) => song.id !== id));
    });
  };

  return (
    <div className="App">
      <h1>Songs in History</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Add New Song</h2>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={newSong.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Artist:</label>
          <input
            type="text"
            name="artist"
            value={newSong.artist}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Release Year:</label>
          <input
            type="number"
            name="releaseYear"
            value={newSong.releaseYear}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Song</button>
      </form>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            {song.title} - {song.artist} ({song.releaseYear})
            <button onClick={() => navigate(`/update/${song.id}`)}>
              Update
            </button>
            <button onClick={() => deleteSong(song.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
