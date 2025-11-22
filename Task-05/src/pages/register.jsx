import { Link } from 'react-router-dom';


function Login() {
    return (
        <div className="login-container">
            <div className="login-logo">
                <img src="src/assets/icon.png" alt="Melofi Logo" />
            </div>
            <h1>Melofi</h1>
            <h2>Create An Account</h2>
            <form className="login-form">
                <input type="text" placeholder="Username" required />
                <input type="text" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <Link to='/playlist'>
                    <button type="submit">Login</button>
                </Link>
            </form>
            <div className="login-signup">
                <button>
                    <a href="/">Sign in</a>
                </button>
            </div>
        </div>
    )
}
export default Login;