import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/dynamicIsland.css";
import { usePlayer } from "../components/playercontext";

function DynamicIsland() {
    const { currentSong } = usePlayer();
    const [isPlaying, setIsPlaying] = useState(false);
    const [song, setSong] = useState({
        title: "No song playing",
        artist: "",
        cover: "",
        audio: "",
    });
    const audioRef = useRef(null);

    useEffect(() => {
        if (currentSong) {
        setSong({
            title: currentSong.trackName,
            artist: currentSong.artistName,
            cover: currentSong.artworkUrl100.replace("100x100bb", "600x600bb"),
            audio: currentSong.previewUrl,
        });
        setIsPlaying(true);
        }
    }, [currentSong]);

    useEffect(() => {
        if (audioRef.current && song.audio) {
        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined)
            playPromise.catch(() => setIsPlaying(false));
        } else {
            audioRef.current.pause();
        }
        }
    }, [song.audio, isPlaying]);

    if (!currentSong) {
        return null;
    }
    return (
        <div className="dynamic-island-bar active">
        {song.audio && (
            <audio
            ref={audioRef}
            src={song.audio}
            onEnded={() => setIsPlaying(false)}
            />
        )}
        <div className="song-cover-pic">
            <Link to="/playing">
                <img src={song.cover} alt={song.title} />
            </Link>
        </div>
        <div className="song-playing-dta">
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
        </div>
        <div className="controls">
            {song.audio && (
            <button onClick={() => setIsPlaying(!isPlaying)} className="play-pause-btn">
                {isPlaying ? "⏸" : "▶"}
            </button>
            )}
        </div>
        </div>
    );
}

export default DynamicIsland;
