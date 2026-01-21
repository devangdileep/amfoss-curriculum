import { usePlayer } from "../components/playercontext"
import Navbar from "../components/navbar"
import PlaylistCards from "../components/playlistcards"
import SongCards from "../components/songcard"

function Playlist() {
    const { setCurrentSong } = usePlayer();

    const handleSongSelect = (song) => {
        setCurrentSong(song)
  };

    return (
        <>
            <Navbar />
            <div className="playlist-ctnr">
                <div className="playlist-create-btn">
                    <h2>Your Playlists</h2>
                    <button>Create +</button>
                </div>
                <div className="playlist-data">
                    <PlaylistCards />
                    <PlaylistCards />
                    <PlaylistCards />
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
