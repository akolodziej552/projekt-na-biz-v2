import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./styles/ArkuszMeyera.css";
import "./styles/index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
        <HashRouter>
                <AuthProvider>
                        <App />
                </AuthProvider>
        </HashRouter>
)