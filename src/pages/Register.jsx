import { useState } from "react"
import { Link } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        localStorage.setItem("user", JSON.stringify({ email, password }));
        alert("Konto utworzone!");
    };
    return (
            <div className="authwrapper">
                <form className="auth" id="register">
                    <h1>Stwórz konto</h1>
                    <input name="email" placeholder="Email" type="email" required  onChange={(e) => setEmail(e.target.value)}/>
                    <input name="password" placeholder="Hasło" type="password" required onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit" onClick={handleRegister}>Stwórz konto</button>
                    <p>Masz już konto? <Link to="/login">Zaloguj się!</Link></p>
                </form>
            </div>
    )
}

export default Register;