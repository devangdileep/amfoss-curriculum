import '../styles/playlistcard.css';

function PlaylistCards() {
    return (
        <div className="playlistcards-container">
            <div className="playlist-image">
                <img src="src/assets/playlist.jpg" />
            </div>
            <div className="playlist-info">
                <h2>Playlist Name</h2>
            </div>

        </div>
    );
}

export default PlaylistCards;