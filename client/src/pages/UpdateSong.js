import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateSong = ({ match, history }) => {
  const [song, setSong] = useState({ title: "", artist: "", releaseYear: "" });
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/songs/${id}`).then((response) => {
      setSong(response.data.song);
      console.log(response.data.song);
    });
  }, [id]);

  const handleInputChange = (event) => {
    const value =
      event.target.name === "releaseYear"
        ? parseInt(event.target.value)
        : event.target.value;
    setSong({ ...song, [event.target.name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.patch(`http://localhost:8000/songs/${id}`, song).then(() => {
      navigate("/songs");
    });
  };

  return (
    <div>
      <h2>Update Song</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={song.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Artist:</label>
          <input
            type="text"
            name="artist"
            value={song.artist}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Release Year:</label>
          <input
            type="number"
            name="releaseYear"
            value={song.releaseYear}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Song</button>
      </form>
    </div>
  );
};

export default UpdateSong;
