import "../../styles/pages/auth.css";
import {useState} from "react"

const Auth = () => {
    const [isRegistered, setIsRegistered] = useState(true);
    if (isRegistered) {
        return (
            <div className="authwrapper">
                <form className="auth" id="login">
                    <h1>Zaloguj się</h1>
                    <input name="email" placeholder="Email" type="email" required />
                    <input name="password" placeholder="Hasło" type="password" required />
                    <button type="submit">Zaloguj</button>
                    <label>
                        <input type="checkbox" name="remember" /> Zapamiętaj mnie
                    </label>
                    <p>Zapomniałeś <a>hasła?</a></p>
                    <p>Nie masz jeszcze konta? <a onClick={() => setIsRegistered(!isRegistered)}>Stwórz je!</a></p>
                </form>
            </div>
        )
    } else {
        return (
            <div className="authwrapper">
                <form className="auth" id="register">
                    <h1>Stwórz konto</h1>
                    <input name="email" placeholder="Email" type="email" required />
                    <input name="password" placeholder="Hasło" type="password" required />
                    <input name="password" placeholder="Potwierdź hasło" type="password" required />
                    <button type="submit">Stwórz konto</button>
                    <p>Masz już konto? <a onClick={() => setIsRegistered(!isRegistered)}>Zaloguj się!</a></p>
                </form>
            </div>
        )
    }
}
    
export default Auth;