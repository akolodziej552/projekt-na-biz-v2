import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/pages/auth.css";
const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        const success = login(email, password);

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
                <label>
                    <input type="checkbox" name="remember" /> Zapamiętaj mnie
                </label>
                <p>Nie masz jeszcze konta? <Link to="/register">Stwórz je!</Link></p>
            </form>
        </div>
    );
};

export default Login;
