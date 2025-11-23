import DynamicIsland from "../components/dynamicisland";
import Navbar from "../components/navbar";
import PlaylistCards from "../components/playlistcards";
function Playlist() {
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
                    <h2>Recommended Playlists</h2>
                </div>
                <div className="playlist-data">
                    <PlaylistCards />
                    <PlaylistCards />
                    <PlaylistCards />
                </div>
                <DynamicIsland />
            </div>
        </>
    )
}
export default Playlist;