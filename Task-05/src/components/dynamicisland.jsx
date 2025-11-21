import "../styles/dynamicIsland.css";

function DynamicIsland() {
    return (
        <div className="dynamic-island-bar">
            <div className="song-cover-pic">
                <img src="src/assets/circle.png" />
            </div>
            <div className="song-playing-dta">
                <h3>Song Name</h3>
            </div>

            <div className="controls">
                <button>&lt;&lt;</button>
                <button>▶</button>
                <button>&gt;&gt;</button>
            </div>
        </div>
    );
}

export default DynamicIsland;
