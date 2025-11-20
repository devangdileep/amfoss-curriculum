import '../styles/navbar.css'

function Navbar() {
    return (
        <div className="navbar">
            <div className='navbar-logo'>
                <img src="src/assets/icon.png" />
            </div>
            <div className='navbar-topics'>
                <a href="/playlist">Playlist</a>
                <a href="/search">Search</a>
                <a href="/profile">Profile</a>
            </div>
            <div className='navbar-user'>
                <img src="src/assets/user-icon.png" />
            </div>
        </div>
    )
}

export default Navbar;
