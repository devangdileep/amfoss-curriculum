import Navbar from "../components/navbar";
import "../styles/profile.css";

function Profile() {
    return (
        <div className="profile-page">
            <Navbar />
            <div className="profile-info">
                <img src="src/assets/user-icon-tst.png" alt="" />
                <h2>Username: Username</h2>
                <h2>Email: Email</h2>
            </div>
            <div className="profile-flwn">
                <h2>Followed Artists</h2>
                <ul>
                    <li>Artist 1</li>
                    <li>Artist 2</li>
                    <li>Artist 3</li>
                </ul>
            </div>
        </div>
    );
}

export default Profile;