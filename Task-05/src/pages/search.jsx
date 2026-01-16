import { useState } from "react";
import Navbar from "../components/navbar";
import "../styles/search.css";
import SearchMusic from "../components/searchmusic";
import { usePlayer } from "../components/playercontext"; 

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const { setCurrentSong } = usePlayer(); 

    const handleSelectSong = (song) => {
        setCurrentSong(song); 
    };

    return (
        <>
            <Navbar />
            <div className="search-bar-ctn">
                <div className="search-box">
                    <input 
                        type="text" 
                        placeholder="Search for songs..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="search-content">
                {!searchQuery ? (<div></div>) : (
                    <div className="song-search">
                        <h2>Results for "{searchQuery}"</h2>
                        <div className="song-search-ctn">
                            <SearchMusic term={searchQuery} onSelectSong={handleSelectSong} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Search;