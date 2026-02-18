import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./styles/ArkuszMeyera.css";
import "./styles/index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
        <HashRouter>
                <AuthProvider>
                        <CartProvider>
                                <App />
                        </CartProvider>
                </AuthProvider>
        </HashRouter>
)