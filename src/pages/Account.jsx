import "../styles/pages/account.css";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Account = () => {
    const { user, updateUser, deleteAccount } = useContext(AuthContext);
    const navigate = useNavigate();

    const [newEmail, setNewEmail] = useState("");
    const [emailMsg, setEmailMsg] = useState(null);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMsg, setPasswordMsg] = useState(null);

    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmailMsg(null);
        if(!newEmail) return;

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const taken = users.find((u) => u.email === newEmail && String(u.id) !== String(user.id));
        if (taken) {
            setEmailMsg({type: "error", text: "Ten email jest już zajęty."});
            return;
        }
        updateUser({email: newEmail});
        setEmailMsg({type: "success", text: "Email został zmieniony."});
        setNewEmail("");
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPasswordMsg(null);

        if (currentPassword !== user.password) {
            setPasswordMsg({type: "error", text: "Aktualne hasło jest nieprawidłowe." });
            return;
        } if (newPassword.length < 4) {
            setPasswordMsg({type: "error", text: "Nowe hasło musi mieć co najmniej 4 znaki."});
            return;
        } if (newPassword !== confirmPassword) {
            setPasswordMsg({type: "error", text: "Hasła nie są zgodne."});
            return;
        }

        updateUser({password: newPassword});
        setPasswordMsg({type: "success", text: "Hasło zostało zmienione."});
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const handleDelete = () => {
        if (window.confirm("Czy na pewno chcesz usunąć konto? Tej operacji nie można cofnąć.")) {
            deleteAccount();
            navigate("/");
        }
    };

    return (
        <div className="account-page">
            <h1 className="account-title">Ustawienia konta</h1>
            <p className="account-subtitle">Zalogowany jako: <strong>{user?.email}</strong></p>

            <section className="account-section">
                <h2>Zmień email</h2>
                <form onSubmit={handleEmailChange}>
                    <div className="field">
                        <label>Nowy email</label>
                        <input 
                            type="email"
                            placeholder={user?.email}
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            required
                        />
                    </div>
                    {emailMsg && (
                        <p className={`msg msg--${emailMsg.type}`}>{emailMsg.text}</p>
                    )}
                    <button type="submit" className="btn-save">Zapisz</button>
                </form>
            </section>

            <section className="account-section">
                <h2>Zmień hasło</h2>
                <form onSubmit={handlePasswordChange}>
                    <div className="field">
                        <label>Aktualne hasło</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="field">
                        <label>Nowe hasło</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="field">
                        <label>Potwierdź nowe hasło</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {passwordMsg && (
                        <p className={`msg msg--${passwordMsg.type}`}>{passwordMsg.text}</p>
                    )}
                    <button type="submit" className="btn-save">Zapisz</button>
                </form>
            </section>

            <section className="account-section account-section--danger">
                    <h2>Usuń konto</h2>
                    <p>Ta operacja jest nieodwracalna. Wszystkie Twoje dane zostaną usunięte.</p>
                    <button className="btn-delete" onClick={handleDelete}>Usuń konto</button>
            </section>
        </div>
    );
};

export default Account;