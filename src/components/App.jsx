import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Main from "./pages/Main";
import Auth from "./pages/Auth";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Menu from "./pages/Menu";
import "../styles/app.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const App = () => {
    return (
        <div className="app">
            <BrowserRouter>
                <Header /> 
                <Nav />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/menu" element={<Menu />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    )
};
export default App;