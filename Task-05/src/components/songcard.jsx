import { useState, useEffect } from 'react';
import '../styles/playlistcard.css';

function SongCards({ onSongSelect }) { 
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetch('https://itunes.apple.com/search?term=pop&entity=song&limit=6')
            .then(res => res.json())
            .then(data => setSongs(data.results))
    }, []);

    return (
        <>
            {songs.map((song) => (
                <div className="playlistcards-container" key={song.trackId} onClick={() => onSongSelect(song)} >
                    <div className="playlist-image">
                        <img src={song.artworkUrl100.replace('100x100bb', '400x400bb')} alt={song.trackName}/>
                    </div>
                    <div className="playlist-info">
                        <h2>{song.trackName}</h2>
                        <h3>{song.artistName}</h3>
                    </div>
                </div>
            ))}
        </>
    );
}

export default SongCards;