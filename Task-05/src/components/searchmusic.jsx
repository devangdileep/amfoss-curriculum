import "../styles/searchmusic.css"

function SearchMusic() {
    return (
        <div className="song-search">
            <div className="result">
                <div className="song-icon">
                    <img src="src/assets/circle.png" />
                </div>
                <div className="song-search-result">
                    <h2>Song Name</h2>
                    <h3>Artist</h3>
                </div>
                <div className="playbutton">
                    <img src="src/assets/playbutton.png" />
                </div>
            </div>
        </div>
    )

}
export default SearchMusic;