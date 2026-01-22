import "../styles/nav.css";
import { useNavigate } from "react-router-dom";
import { MdOutlineMenuBook } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa6";

const Nav = () => {
    const navigate = useNavigate();
    return (
        <nav>
            <a onClick={() => { navigate("/") }}>Strona Główna <IoMdHome className="navicon"/></a>
            <a onClick={() => { navigate("/menu") }}>Menu <MdOutlineMenuBook className="navicon" /></a>
            <a onClick={() => { navigate("/contact") }}>Kontakt <FaEnvelope className="navicon" /></a>
        </nav>
    )
};

export default Nav;