import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { useState } from 'react';

function Login() {
    const [userName, setUserName] = useState("");
    const [userPass, setUserPass] = useState("");
    const [serverResp, setServerResp] = useState("");
    
    const navigate = useNavigate();

    const sendToBackend = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("http://127.0.0.1:5000/auth/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username: userName, 
                    password: userPass 
                })
            });

            const data = await response.json();

            if (data.status === "success") {
                navigate('/playlist');
            } else {
                setServerResp(data.message || "Login Failed");
            }
        } catch (error) {
            setServerResp("Server connection error");
        }
    };

    return (
        <div className="login-container">
            <div className="login-logo">
                <img src="src/assets/icon.png" alt="Melofi Logo" />
            </div>
            <h1>Melofi</h1>
            <h2>Sign in</h2>
            
            <form className="login-form" onSubmit={sendToBackend}>
                <input 
                    type="text" 
                    placeholder="Username / Email" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={userPass}
                    onChange={(e) => setUserPass(e.target.value)}
                    required 
                />
                
                <button type="submit">Login</button>
            </form>

            {serverResp && <p className="error-msg">{serverResp}</p>}

            <div className="login-signup">
                <h3>Don't Have An Account Yet?</h3>
                <button type="button" onClick={() => navigate('/register')}>Sign Up</button>
            </div>
        </div>
    );
}

export default Login;