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

    const login = (email,password) => {
        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (
            savedUser &&
            savedUser.email == email &&
            savedUser.password == password
        ) {
            setUser(savedUser)
            localStorage.setItem("loggedUser", JSON.stringify(savedUser));
            return true;
        }
        return false;
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("loggedUser");
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}