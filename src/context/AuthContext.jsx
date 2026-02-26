import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const ADMIN = {
    id: "admin",
    email: "admin@admin.com",
    password: "admin123",
    role: "admin"
};

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Seed konta admina przy starcie
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const adminExists = users.find((u) => u.role === "admin");
        if (!adminExists) {
            localStorage.setItem("users", JSON.stringify([...users, ADMIN]));
        }

        // Przywróć zalogowanego usera
        const savedUser = JSON.parse(localStorage.getItem("currentUser"));
        if (savedUser) {
            setUser(savedUser);
        }
    }, []);

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const foundUser = users.find(
            (u) => u.email === email && u.password === password
        );
        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem("currentUser", JSON.stringify(foundUser));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("currentUser");
        localStorage.removeItem("cart");
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
