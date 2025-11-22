import { Link } from "react-router-dom";
import "../styles/dynamicIsland.css";

function DynamicIsland() {
    return (
        <div className="dynamic-island-bar">
            <div className="song-cover-pic">
                <Link to="/playing">
                    <img src="src/assets/circle.png" />
                </Link>
            </div>
            <div className="song-playing-dta">
                <h3>Song Name</h3>
            </div>

            <div className="controls">
                <button >⏮</button>
                <button>▶</button>
                <button>⏭</button>
            </div>
        </div>
    );
}

export default DynamicIsland;
