import "../styles/pages/admin.css";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminPanel = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    if (!user || user.role !== "admin") {
        return <Navigate to="/" />;
    }

    useEffect(() => {
        const loadOrders = () => {
            const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
            const sorted = [...savedOrders].sort((a, b) =>
                parseInt(b.number.split("-")[1]) - parseInt(a.number.split("-")[1])
            );
            setOrders(sorted);
        };

        loadOrders();
        const interval = setInterval(loadOrders, 3000);
        return () => clearInterval(interval);
    }, []);

    const updateStatus = (index, newStatus) => {
        const updated = [...orders];
        updated[index].status = newStatus;
        setOrders(updated);
        localStorage.setItem("orders", JSON.stringify(updated));
    };

    const clearOrders = () => {
        if (window.confirm("Czy na pewno chcesz usunąć wszystkie zamówienia?")) {
            localStorage.removeItem("orders");
            setOrders([]);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "Nowe": return "status status--new";
            case "W trakcie przygotowania": return "status status--progress";
            case "Gotowe do odbioru": return "status status--ready";
            default: return "status";
        }
    };

    const countByStatus = (s) => orders.filter((o) => o.status === s).length;

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Panel Admina</h1>
                <button className="btn-danger" onClick={clearOrders}>
                    🗑 Wyczyść historię
                </button>
            </div>

            <div className="admin-stats">
                <div className="stat-card stat--new">
                    <span className="stat-num">{countByStatus("Nowe")}</span>
                    <span>Nowe</span>
                </div>
                <div className="stat-card stat--progress">
                    <span className="stat-num">{countByStatus("W trakcie przygotowania")}</span>
                    <span>W trakcie</span>
                </div>
                <div className="stat-card stat--ready">
                    <span className="stat-num">{countByStatus("Gotowe do odbioru")}</span>
                    <span>Gotowe</span>
                </div>
                <div className="stat-card stat--total">
                    <span className="stat-num">{orders.length}</span>
                    <span>Łącznie</span>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="admin-empty">
                    <span>📋</span>
                    <p>Brak zamówień</p>
                </div>
            ) : (
                <div className="admin-orders">
                    {orders.map((order, index) => (
                        <div key={index} className={`admin-order-card ${order.status === "Nowe" ? "card--highlight" : ""}`}>
                            <div className="admin-order-header">
                                <span className="order-number">{order.number}</span>
                                <span className={getStatusClass(order.status)}>{order.status}</span>
                                <span className="order-time">⏰ {order.pickupTime}</span>
                            </div>
                            <div className="admin-order-body">
                                <ul className="order-items">
                                    {order.items.map((item) => (
                                        <li key={item.id}>
                                            <span>{item.name}</span>
                                            <span>×{item.quantity}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="admin-order-footer">
                                    <strong className="order-total">{order.total} zł</strong>
                                    <div className="admin-actions">
                                        <button
                                            className="btn-action btn--progress"
                                            onClick={() => updateStatus(index, "W trakcie przygotowania")}
                                            disabled={order.status === "W trakcie przygotowania" || order.status === "Gotowe do odbioru"}
                                        >
                                            🔄 W trakcie
                                        </button>
                                        <button
                                            className="btn-action btn--ready"
                                            onClick={() => updateStatus(index, "Gotowe do odbioru")}
                                            disabled={order.status === "Gotowe do odbioru"}
                                        >
                                            ✅ Gotowe
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
