import Navbar from "../components/navbar";
import FolwnArtist from "../components/folwnartist";
import "../styles/profile.css";
import DynamicIsland from "../components/dynamicisland";


function Profile() {
    return (
        <>
            <div className="profile-page">
                <Navbar />
                <div className="profile-info">
                    <img src="src/assets/user-icon-tst.png" alt="" />
                    <h2>Username</h2>
                    <h3>Email</h3>
                </div>
                <div className="profile-flwn">
                    <h2>Followed Artists</h2>
                    <div className="divider">
                        <FolwnArtist />
                        <FolwnArtist />
                        <FolwnArtist />
                    </div>
                </div>
            </div>
            <DynamicIsland />
        </>
    );
}

export default Profile;