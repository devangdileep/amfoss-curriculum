import { Link } from 'react-router-dom';
import '../styles/login.css';

function Login() {
    return (
        <div className="login-container">
            <div className="login-logo">
                <img src="src/assets/icon.png" alt="Melofi Logo" />
            </div>
            <h1>Melofi</h1>
            <h2>Sign in</h2>
            <form className="login-form">
                <input type="text" placeholder="Username / Email" required />
                <input type="password" placeholder="Password" required />
                <Link to='/playlist'>
                    <button type="button">Login</button>
                </Link>
            </form>

            <div className="login-signup">
                <h3>Don't Have An Account Yet ?</h3>
                <button>
                    <a href="/register">Sign Up</a>
                </button>

            </div>
        </div>
    )
}
export default Login;