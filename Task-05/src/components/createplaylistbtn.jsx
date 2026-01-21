import { useState } from "react";
import "../styles/createplaylist.css";

function CreatePlaylistBtn({ user, onPlaylistCreated }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  const create = async () => {
    if (!name.trim()) return;

    await fetch("http://localhost:5000/playlists/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, playlist_name: name })
    });

    setName("");
    setShow(false);
    onPlaylistCreated();
  };

  return (
    <>
      <button onClick={() => setShow(true)}>Create +</button>

      {show && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Create Playlist</h3>

            <input
              type="text"
              placeholder="Playlist name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="popup-actions">
              <button onClick={create}>Create</button>
              <button onClick={() => setShow(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreatePlaylistBtn;
