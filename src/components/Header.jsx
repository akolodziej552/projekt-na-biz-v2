import "../styles/components/header.css";
import logo from "../assets/zsllogo.ico";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { FaPhone } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

const Header = () => {
    const { cart } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    const copyTel = () => {
        navigator.clipboard.writeText("730379195");
        alert("Numer telefonu został skopiowany!");
    }
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity,0);
    return (
        <header>
            <address onClick={copyTel}>
                <p className="telnum"><FaPhone className="telnum" /> 730 379 195</p>
            </address>
            <img src={logo}/>
            <div className="shopacc">
                {user && <Link to="/cart"><FaShoppingCart />{totalQuantity > 0 && <span>({totalQuantity})</span>}</Link>}
                {!user ? (
                    <Link to="/login"><MdAccountCircle/></Link>
                ) : (<button onClick={logout}>Wyloguj</button>)}
                
            </div>

        </header>
    )
}

export default Header;