import Navbar from "../components/navbar";
import PlaylistCards from "../components/playlistcards";
function Playlist() {
    return (
        <>
            <Navbar />
            <div className="playlist-create-btn">
                <h2>Your Playlists</h2>
                <button>Create +</button>
            </div>
            <PlaylistCards />
            <PlaylistCards />
            <PlaylistCards />
            <PlaylistCards />
            <PlaylistCards />
            <PlaylistCards />
            <PlaylistCards />
            <PlaylistCards />
            <PlaylistCards />
            <PlaylistCards />
        </>
    )
}
export default Playlist;