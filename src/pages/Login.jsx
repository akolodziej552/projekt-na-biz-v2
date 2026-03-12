import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/pages/auth.css";
const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        const success = login(email, password, remember);

        if (!success) {
            setError("Nieprawidłowy email lub hasło");
            return;
        }

        navigate("/menu");
    };

    return (
        <div className="authwrapper">
            <form className="auth" id="login" onSubmit={handleLogin}>
                <h1>Zaloguj się</h1>
                {error && <p className="auth-error">{error}</p>}
                <input
                    name="email"
                    placeholder="Email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    name="password"
                    placeholder="Hasło"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Zaloguj</button>
                <div className="remember">
                    <input
                        id="remember"
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                    />
                    <label htmlFor="remember">Zapamiętaj mnie</label>
                </div>
                <p>Nie masz jeszcze konta? <Link to="/register">Stwórz je!</Link></p>
            </form>
        </div>
    );
};

export default Login;
