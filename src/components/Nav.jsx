import "../styles/components/nav.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { MdOutlineMenuBook } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa6";

const Nav = () => {
    const { user } = useContext(AuthContext);
    return (
        <nav>
            <Link to="/">Strona Główna <IoMdHome className="navicon"/></Link>
            <Link to="/menu">Menu <MdOutlineMenuBook className="navicon" /></Link>
            <Link to="/contact">Kontakt <FaEnvelope className="navicon" /></Link>
            {user && <Link to="/orders">Moje zamówienia</Link>}
            {user?.role === "admin" && (<Link to="/admin">Panel admina</Link>)}
        </nav>
    )
};

export default Nav;