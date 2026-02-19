import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("loggedUser"));
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
            localStorage.setItem("loggedUser", JSON.stringify(foundUser));
            localStorage.setItem("currentUser", JSON.stringify(foundUser));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("loggedUser");
        localStorage.removeItem("currentUser");
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
