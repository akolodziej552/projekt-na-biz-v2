import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const foundUser = users.find(
            (u) => u.email === email && u.password === password
        );

        if (!foundUser) {
            alert("Nieprawidłowy email lub hasło")
            return;
        }
        localStorage.setItem("currentUser", JSON.stringify(foundUser));

        alert("Zalogowano!");
        navigate("/menu");
    }
    return (
        <div className="authwrapper">
            <form className="auth" id="login">
                <h1>Zaloguj się</h1>
                <input name="email" placeholder="Email" type="email" required onChange={(e) => setEmail(e.target.value)}/>
                <input name="password" placeholder="Hasło" type="password" required onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" onClick={handleLogin}>Zaloguj</button>
                <label>
                    <input type="checkbox" name="remember" /> Zapamiętaj mnie
                </label>
                <p>Zapomniałeś <a>hasła?</a></p>
                <p>Nie masz jeszcze konta? <Link to="/register">Stwórz je!</Link></p>
            </form>
        </div>
    )
}
export default Login;