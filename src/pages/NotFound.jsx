import { useNavigate } from "react-router-dom";
import "../styles/pages/notfound.css";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="notfound-page">
            <span className="notfound-code">404</span>
            <h1>Strona nie istnieje</h1>
            <p>Adres który wpisałeś nie prowadzi do żadnej strony.</p>
            <button className="btn-primary" onClick={() => navigate("/")}>Wróć na stronę główną</button>
        </div>
    )
}

export default NotFound;