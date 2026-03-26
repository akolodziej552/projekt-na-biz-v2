import { createContext, useContext, useState, useCallback } from "react";
import "../styles/components/toast.css";

export const ToastContext = createContext();

export function ToastProvider({children}) {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((text, type = "info") => {
        const id = Date.now();
        setToasts((prev) => [...prev, {id, text, type}]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3500);
    },[]);

    return(
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="toast-container">
                {toasts.map((t) => (
                    <div key={t.id} className={`toast-item toast-item--${t.type}`}>
                        {t.text}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);