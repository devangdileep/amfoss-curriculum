import { useState, useEffect } from "react";
import "../styles/searchmusic.css"

function SearchMusic({ term, onSelectSong }) {
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!term.trim()) {
            setSongs([]);
            return;
        }

        const fetchingsongresp = setTimeout(() => {
            setIsLoading(true);
            const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=5`;

            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    setSongs(data.results || []);
                    setIsLoading(false);
                });
        }, 500);

        return () => clearTimeout(fetchingsongresp);
    }, [term]);

    if (isLoading) return <h2 className="loading-text">Searching...</h2>;

    return (
        <div className="search-results-list">
            {songs.map((song) => (
                <div 
                    className="result" 
                    key={song.trackId} 
                    onClick={() => onSelectSong(song)}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="song-icon">
                        <img src={song.artworkUrl100} alt={song.trackName} />
                    </div>                    
                    <div className="song-search-result">
                        <h2>{song.trackName}</h2>
                        <h3>{song.artistName}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SearchMusic;