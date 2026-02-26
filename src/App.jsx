import Header from "./components/Header";
import Nav from "./components/Nav";
import Main from "./pages/Main";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import AdminPanel from "./pages/AdminPanel";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/app.css";
import { Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <div className="app">
            <Header /> 
            <Nav />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/menu" element={
                    <ProtectedRoute>
                        <Menu />
                    </ProtectedRoute>} />
                <Route path="/orders" element={
                    <ProtectedRoute>
                        <Orders/>
                    </ProtectedRoute>}/>
                <Route path="/admin" element={<AdminRoute><AdminPanel/></AdminRoute>}/>
                <Route path="/cart" element={
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                }/>
            </Routes>
        </div>
    )
};
export default App;