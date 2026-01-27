import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { usePlayer } from "../components/playercontext";
import "../styles/userplaylist.css"

function UserPlaylist() {
  const { playlistName } = useParams();
  const { user, setCurrentSong } = usePlayer();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/playlists/songs/${user}/${playlistName}`)
      .then((res) => res.json())
      .then((data) => setSongs(data));
  }, [playlistName, user]);
  const deleteSong = (songTitle) => {
    fetch("http://localhost:5000/playlists/delete-song", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user,
        playlist_name: playlistName,
        title: songTitle,
      }),
    })
    .then(() => {
      const remainingSongs = songs.filter(s => s.title !== songTitle);
      setSongs(remainingSongs);
    });
  };

  return (
    <>
    <Navbar />
    <h2 className="playlist-title-hed">{playlistName}</h2>
    <div className="user-playlist">
        <div className="search-results-list">
            {songs.map((song, index) => (
            <div
                className="result"
                key={index}
                onClick={() =>
                setCurrentSong({
                    trackName: song.title,
                    artistName: song.artist,
                    artworkUrl100: song.cover,
                    previewUrl: song.audio,
                })
                }
                style={{ cursor: "pointer" }}
            >
                <div className="song-icon">
                <img src={song.cover} alt={song.title} />
                </div>
                <div className="song-search-result">
                <h2>{song.title}</h2>
                <h3>{song.artist}</h3>
                </div>

                <button className="delete-btn" onClick={(e) => {deleteSong(song.title)}}>
                  Delete
                </button>
            </div>
            ))}
        </div>
    </div>
    </>
  );
}

export default UserPlaylist;
