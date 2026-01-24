import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/dynamicIsland.css";
import { usePlayer } from "../components/playercontext";

function DynamicIsland() {
    const { currentSong, user } = usePlayer();
    const [isPlaying, setIsPlaying] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState("");    
    const [song, setSong] = useState({
        title: "No song playing",
        artist: "",
        cover: "",
        audio: "",
    });
    const audioRef = useRef(null);
    useEffect(() => {
        if (!user) return;
        const fetchPlaylist = () => {
        fetch(`http://localhost:5000/playlists/${user}`)
            .then(res => res.json())
            .then(data => setPlaylists(data));
        };
        fetchPlaylist();
        const intv = setInterval(fetchPlaylist,2000);
        return () => clearInterval(intv)
    }, [user]);
    const addToPlaylist = async (playlistName) => {
        if (!playlistName) return;
        await fetch("http://localhost:5000/playlists/addsong", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        username: user,
        playlist_name: playlistName,
        title: song.title,
        artist: song.artist,
        audio: song.audio,
        cover: song.cover
        })
    });
    setSelectedPlaylist("");
    };
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
        <div className="playlist-dropdown">
        <select 
            value={selectedPlaylist}
            onChange={(e)=>{
            setSelectedPlaylist(e.target.value);
            addToPlaylist(e.target.value);
            }}>
            <option value="">Add to playlist</option>
            {playlists.map(pl => (
            <option key={pl.id} value={pl.playlist_name}>
                {pl.playlist_name}
            </option>
            ))}
        </select>
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
