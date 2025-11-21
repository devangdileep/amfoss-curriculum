import Navbar from "../components/navbar";
import "../styles/search.css";
import FetchArtist from "../components/fetchartist";
import SearchMusic from "../components/searchmusic";
import DynamicIsland from "../components/dynamicisland";

function Search() {
    return (
        <>
            <Navbar />
            <div className="search-bar-ctn">
                <div className="search-box">
                    <input type="text" placeholder="Search..." />
                </div>
            </div>
            <div className="fetch-artist">
                <FetchArtist />
                <FetchArtist />
                <FetchArtist />
                <FetchArtist />
            </div>
            <div className="song-search">
                <h2>Songs</h2>
                <div className="song-search-ctn">
                    <SearchMusic />
                    <SearchMusic />
                    <SearchMusic />
                    <SearchMusic />

                </div>
            </div>
            <DynamicIsland />
        </>
    );
}
export default Search;