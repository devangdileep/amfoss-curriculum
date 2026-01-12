import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Register() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPass, setUserPass] = useState("");
    const [serverResp, setServerResp] = useState("");
    const [isLoading, setIsLoading] = useState(false); 
    
    const navigate = useNavigate();

    const sendToBackend = async (e) => {
        e.preventDefault();
        setIsLoading(true); 
        
        try {
            const response = await fetch("http://127.0.0.1:5000/auth/register", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username: userName, 
                    email: userEmail,
                    password: userPass 
                })
            });

            const data = await response.json();

            if (data.status === "success") {
                navigate('/playlist');
            } else {
                setServerResp(data.message || "Registration Failed");
            }
        } catch (error) {
            setServerResp("Server connection error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-logo">
                <img src="src/assets/icon.png" alt="Melofi Logo" />
            </div>
            <h1>Melofi</h1>
            <h2>Create An Account</h2>
            <form className="login-form" onSubmit={sendToBackend}>
                <input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                <input type="email" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={userPass} onChange={(e) => setUserPass(e.target.value)} required />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </form>

            {serverResp && <p className="error-msg">{serverResp}</p>}
            
            <div className="login-signup">
                <p>Already have an account?</p>
                <button type="button" onClick={() => navigate("/")}>Sign In</button>
            </div>
        </div>
    );
}

export default Register;