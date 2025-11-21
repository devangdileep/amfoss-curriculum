import DynamicIsland from "../components/dynamicisland";
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
            <div className="playlist-recom">
                <h2>Recommended Playlists</h2>
            </div>
            <PlaylistCards />
            <PlaylistCards />
            <PlaylistCards />
            <PlaylistCards />
            <PlaylistCards />

            <DynamicIsland />
        </>
    )
}
export default Playlist;