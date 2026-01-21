import { useNavigate } from 'react-router-dom';
import '../styles/playlistcard.css';

function PlaylistCards({ playlistName }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/userplaylist/${playlistName}`);
    };
    return (
        <div className="playlistcards-container" onClick={handleClick}>
            <div className="playlist-image">
                <img src="src/assets/playlist.jpg" />
            </div>
            <div className="playlist-info">
                <h2>{playlistName}</h2>
            </div>

        </div>
    );
}

export default PlaylistCards;
