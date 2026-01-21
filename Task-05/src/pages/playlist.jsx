import { useState, useEffect } from "react"
import { usePlayer } from "../components/playercontext"
import Navbar from "../components/navbar"
import PlaylistCards from "../components/playlistcards"
import SongCards from "../components/songcard"
import CreatePlaylistBtn from "../components/createplaylistbtn";

function Playlist() {
    const { setCurrentSong , user} = usePlayer();
    const [playlists, setPlaylists] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/playlists/${user}`)
        .then(res => res.json())
        .then(data => setPlaylists(data))
    }, []);
    const handleSongSelect = (song) => {
        setCurrentSong(song)
  };

    return (
        <>
            <Navbar />
            <div className="playlist-ctnr">
                <div className="playlist-create-btn">
                    <h2>Your Playlists</h2>
                    <CreatePlaylistBtn 
                        user={user} 
                        onPlaylistCreated={() => {
                        fetch(`http://localhost:5000/playlists/${user}`)
                            .then(res => res.json())
                            .then(data => setPlaylists(data))
                        }} 
                    />                
                    </div>
                <div className="playlist-data">
                    {playlists.map(pl => (
                        <PlaylistCards 
                        key={pl.id}
                        playlistName={pl.playlist_name}
                        />
                    ))}
                </div>
                <div className="playlist-recom">
                    <h2>Recommended Songs</h2>
                </div>
                <div className="playlist-data">
                    <SongCards onSongSelect={handleSongSelect} />
                </div>
            </div>
        </>
    )
}

export default Playlist;
