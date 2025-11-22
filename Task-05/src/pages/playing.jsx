import Navbar from "../components/navbar";
import DynamicIsland from "../components/dynamicisland";
import "../styles/playing.css"

function PlayingMusic() {
    return (

        <>
            <Navbar />
            <div className="playing-song">
                <h2 >Now Playing</h2>
                <div className="song-title-card">
                    <img src="/src/assets/playing.jpg" />
                </div>
                <h2 className="song-title">Song Title - Artist Name</h2>
                <div className="controls-playing">
                    <button > ⏮ </button>
                    <button > ▶ </button>
                    <button > ⏭ </button>
                </div>
                <h2>Lyrics</h2>
                <div className="lyrics-playing">
                    <h3>
                        Lorem ipsum dolor sit amet,<br></br>
                        consectetur adipiscing elit.<br></br>
                        Sed do eiusmod tempor incididunt<br></br>
                        ut labore et dolore magna aliqua.<br></br>
                        Ut enim ad minim veniam,<br></br>
                        quis nostrud exercitation ullamco<br></br>
                        laboris nisi ut aliquip ex ea<br></br>
                        commodo consequat.<br></br>
                        Duis aute irure dolor in reprehenderit<br></br>
                        in voluptate velit esse cillum dolore<br></br>
                        eu fugiat nulla pariatur.<br></br>
                        Excepteur sint occaecat cupidatat non<br></br>
                        proident, sunt in culpa qui officia<br></br>
                        deserunt mollit anim id est laborum.<br></br>
                    </h3>
                </div>
            </div>
            <DynamicIsland />
        </>
    )
}

export default PlayingMusic;