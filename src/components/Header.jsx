import "../styles/header.css";
import logo from "../assets/zsllogo.ico";
import { useNavigate } from "react-router-dom";
import { FaPhone } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

const Header = () => {
    const navigate = useNavigate();
    const copyTel = () => {
        navigator.clipboard.writeText("730379195");
        alert("Numer telefonu został skopiowany!");
    }
    return (
        <header>
            <address onClick={copyTel}>
                <p className="telnum"><FaPhone className="telnum" /> 730 379 195</p>
            </address>
            <img src={logo} onClick={() => {navigate("/")}}/>
            <div className="shopacc">
                <a onClick={() => { navigate("/cart") }}><FaShoppingCart /></a>
                <a onClick={() => {navigate("/auth")}}><MdAccountCircle/></a>
            </div>
        </header>
    )
}

export default Header;