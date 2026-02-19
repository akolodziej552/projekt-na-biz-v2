import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/auth.css";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        setError("");

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = users.find((u) => u.email === email);

        if (userExists) {
            setError("Użytkownik z tym emailem już istnieje!");
            return;
        }

        const newUser = {
            id: Date.now(),
            email,
            password,
            role: "user"
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Konto utworzone! Możesz się teraz zalogować.");
        navigate("/login");
    };

    return (
        <div className="authwrapper">
            <form className="auth" id="register" onSubmit={handleRegister}>
                <h1>Stwórz konto</h1>
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
                <button type="submit">Stwórz konto</button>
                <p>Masz już konto? <Link to="/login">Zaloguj się!</Link></p>
            </form>
        </div>
    );
};

export default Register;
