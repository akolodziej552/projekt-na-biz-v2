import "../styles/pages/admin.css";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { FaClipboardList, FaTrash, FaClock, FaSync, FaCheckCircle, FaUsers } from "react-icons/fa";
import { fmt } from "../utils/orderUtils";

const AdminPanel = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [tab, setTab] = useState("orders");
    const [users, setUsers] = useState([]);

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

    useEffect(() => {
        if (tab === "users") {
            const saved = JSON.parse(localStorage.getItem("users")) || [];
            setUsers(saved.filter((u) => u.role !== "admin"));
        }
    }, [tab])

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

    const deleteUser = (id) => {
        if (window.confirm("Czy na pewno chcesz usunąć tego użytkownika?")) {
            const saved = JSON.parse(localStorage.getItem("users")) || [];
            localStorage.setItem("users", JSON.stringify(saved.filter((u) => String(u.id) !== String(id))));
            setUsers(users.filter((u) => String(u.id) !== String(id)));
        }
    }

    const countByStatus = (s) => orders.filter((o) => o.status === s).length;

    if (!user || user.role !== "admin") {
        return <Navigate to="/" />;
    }

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Panel Admina</h1>
                <button className="btn-danger" onClick={clearOrders}>
                    <FaTrash style={{ marginRight: "6px" }}/> Wyczyść historię
                </button>
            </div>

            <div className="admin-tabs">
                <button className={`admin-tab ${tab === "orders" ? "admin-tab--active" : ""}`} onClick={() => setTab("orders")}>
                    <FaClipboardList style={{marginRight: "6px"}} /> Zamówienia
                </button>
                <button className={`admin-tab ${tab === "users" ? "admin-tab--active" : ""}`} onClick={() => setTab("users")}>
                    <FaUsers style={{marginRight: "6px"}} /> Użytkownicy
                </button>
            </div>

            {tab === "orders" && (  
                <>
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
                        <span><FaClipboardList /></span>
                        <p>Brak zamówień</p>
                    </div>
                ) : (
                    <div className="admin-orders">
                        {orders.map((order, index) => (
                            <div key={index} className={`admin-order-card ${order.status === "Nowe" ? "card--highlight" : ""}`}>
                                <div className="admin-order-header">
                                    <span className="order-number">{order.number}</span>
                                    <span className={getStatusClass(order.status)}>{order.status}</span>
                                    <span className="order-time"><FaClock style={{ marginRight: "6px" }}/> {order.pickupTime}</span>
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
                                        <strong className="order-total">{fmt(order.total)}</strong>
                                        <div className="admin-actions">
                                            <button
                                                className="btn-action btn--progress"
                                                onClick={() => updateStatus(index, "W trakcie przygotowania")}
                                                disabled={order.status === "W trakcie przygotowania" || order.status === "Gotowe do odbioru"}
                                            >
                                                <FaSync style={{ marginRight: "6px" }}/> W trakcie
                                            </button>
                                            <button
                                                className="btn-action btn--ready"
                                                onClick={() => updateStatus(index, "Gotowe do odbioru")}
                                                disabled={order.status === "Gotowe do odbioru"}
                                            >
                                                <FaCheckCircle style={{ marginRight: "6px" }}/> Gotowe
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                </> 
            )}
            {tab === "users" && (
                <table className="users-table">
                    <thead>
                        <tr><th>Email</th><th>ID</th><th>Zamówienia</th><th></th></tr>
                    </thead>
                    <tbody>
                        {users.map((u) => {
                            const allOrders = JSON.parse(localStorage.getItem(orders)) || [];
                            const orderCount = allOrders.filter((o) => String(o.userId) === String(u.id)).length;
                            return (
                                <tr key={u.id}>
                                    <td>{u.email}</td>
                                    <td className="user-id">{u.id}</td>
                                    <td>{orderCount}</td>
                                    <td>
                                        <button className="btn-danger btn-sm" onClick={() => deleteUser(u.id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
            
        </div>
    );
};

export default AdminPanel;
