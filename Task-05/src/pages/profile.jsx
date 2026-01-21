import Navbar from "../components/navbar";
import "../styles/profile.css";
import { usePlayer } from "../components/playercontext";

function Profile() {
    const {user} = usePlayer();
    return (
        <>
            <div className="profile-page">
                <Navbar />
                <div className="profile-info">
                    <img src="src/assets/user-icon-tst.png" alt="" />
                    <h2>{user}</h2>
                </div>
            </div>
        </>
    );
}

export default Profile;