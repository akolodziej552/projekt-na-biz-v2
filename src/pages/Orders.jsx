import "../styles/pages/orders.css";
import { useState, useEffect,useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaClipboardList, FaClock, FaCheckCircle, FaCalendar, FaTimes} from "react-icons/fa";
import { fmt } from "../utils/orderUtils";

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [toast, setToast] = useState(null);

    const loadOrders = () => {
            const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

            if (!user) {
                setOrders([]);
                return;
            }

            const userOrders = savedOrders.filter((order) => String(order.userId) === String(user.id));

            const sorted = [...userOrders].sort((a, b) => {
                return parseInt(b.number.split("-")[1]) - parseInt(a.number.split("-")[1]);
            });
            setOrders(sorted);
    };

    const cancelOrder = (orderNumber) => {
            if (!window.confirm("Czy na pewno chcesz anulować to zamówienie?")) return;
            const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
            const updated = allOrders.map((o) => o.number === orderNumber ? { ...o, status: "Anulowane" } : o);
            localStorage.setItem("orders", JSON.stringify(updated));
            loadOrders();
    }
    
    useEffect(() => {
        loadOrders();

        const handleStorageChange = (event) => {
            if (event.key === "orders") {
                const newOrders = JSON.parse(event.newValue) || [];
                const userOrders = newOrders.filter((order) => order.userId === user?.id);

                userOrders.forEach((order) => {
                    if (order.status === "Gotowe do odbioru") {
                        setToast(`Zamówienie ${order.number} jest gotowe do odbioru!`);
                    }
                });
                loadOrders();
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const getStatusClass = (status) => {
        switch (status) {
            case "Nowe": return "status status--new";
            case "W trakcie przygotowania": return "status status--progress";
            case "Gotowe do odbioru": return "status status--ready";
            case "Anulowane": return "status status--cancelled";
            default: return "status";
        }
    };

    return (
        <div className="orders-page">
            <h1 className="orders-title">Historia zamówień</h1>

            {orders.length === 0 ? (
                <div className="orders-empty">
                    <span><FaClipboardList /></span>
                    <p>Nie masz jeszcze żadnych zamówień</p>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order, index) => (
                        <div key={index} className="order-card">
                            <div className="order-card-header">
                                <span className="order-number">{order.number}</span>
                                <span className={getStatusClass(order.status)}>{order.status}</span>
                                {order.status === "Nowe" && (
                                    <button className="btn-cancel" onClick={() => cancelOrder(order.number)}>
                                        <FaTimes/>
                                    </button>
                                )}
                            </div>
                            <div className="order-card-body">
                                <div className="order-meta">
                                    <span><FaCalendar style={{ marginRight: "6px" }}/> {order.date}</span>
                                    <span><FaClock style={{ marginRight: "6px" }}/> Odbiór: {order.pickupTime}</span>
                                </div>
                                <ul className="order-items">
                                    {order.items.map((item) => (
                                        <li key={item.id}>
                                            <span>{item.name}</span>
                                            <span className="order-item-qty">×{item.quantity}</span>
                                            <span className="order-item-price">{fmt(item.price * item.quantity)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="order-total">
                                    Suma: <strong>{fmt(order.total)}</strong>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {toast && (
                <div className="toast">
                    <FaCheckCircle style={{ marginRight: "6px" }}/> {toast}
                </div>
            )}
        </div>
    );
};

export default Orders;
