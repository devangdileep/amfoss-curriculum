import Navbar from "../components/navbar";
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
            </div>
            <DynamicIsland />
        </>
    );
}

export default Profile;