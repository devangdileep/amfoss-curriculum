import Navbar from "../components/navbar";
import "../styles/playing.css"
import { usePlayer } from "../components/playercontext";
import { useState , useEffect } from "react";

function PlayingMusic() {
    const { currentSong }  = usePlayer();
    const[ song , nowplayingsong] = useState({
        trackname: "Nothing Playing Right Now",
        artist: "Please Select A Song",
        photo: ""
    })
    useEffect(() => {
        if (currentSong) {
            nowplayingsong({
                trackname: currentSong.trackName,
                artist: currentSong.artistName,
                photo: currentSong.artworkUrl100.replace("100x100bb", "600x600bb"),
            });
        }
    }, [currentSong]);
    return (

        <>  
            <Navbar />
            <div className="playing-song">
                <h2>Now Playing</h2>
                <div className="song-title-card">
                    <img src={song.photo} />
                </div>
            </div>
            <div className="song-detials">
                <h2>🎶 {song.trackname}</h2>
                <h2>Artist : {song.artist}</h2>
            </div>
        </>
    )
}

export default PlayingMusic;

