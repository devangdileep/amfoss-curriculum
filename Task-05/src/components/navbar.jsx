import '../styles/navbar.css'
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="navbar">
            <div className='navbar-logo'>
                <img src="src/assets/icon.png" />
            </div>
            <div className='navbar-topics'>

                <Link to='/playlist'><button type='button'>Playlist</button></Link>
                <Link to='/search'><button type='button'>Search</button></Link>
                <Link to='/profile'><button type='button'>Profile</button></Link>
            </div>
            <div className='navbar-user'>
                <img src="src/assets/user-icon.png" />
            </div>
        </div>
    )
}

export default Navbar;
