import { useState } from "react"
import { Link } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = users.find((u) => u.email === email);

        if (userExists) {
            alert("Użytkownik już istnieje!");
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