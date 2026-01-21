import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Navbar from "../components/navbar"

function UserPlaylist() {
    const { id } = useParams();
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/get-playlist-songs?id=${id}`)
            .then(res => res.json())
            .then(ids => {
                if (ids.length > 0) {
                    fetch(`https://itunes.apple.com/lookup?id=${ids.join(',')}`)
                        .then(res => res.json())
                        .then(data => setSongs(data.results));
                }
            });
    }, [id]);

    return (
        <>
            <Navbar />
            <div className="playlist-fetch">
                {songs.map(song => (
                    <div key={song.trackId} className="song-details">
                        <img src={song.artworkUrl60} alt="" />
                        <h3>{song.trackName}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}

export default UserPlaylist;