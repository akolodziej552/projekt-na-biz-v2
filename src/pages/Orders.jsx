import { useState, useEffect, useRef } from "react";

const toastStyle = {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "16px 24px",
    borderRadius: "8px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
    fontWeight: "bold",
    transform: "translateX(0)",
    animation: "slideIn 0.3s ease-out",
    zIndex: 9999,
}

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [toast, setToast] = useState(null);
    const previousOrdersRef = useRef([]);

    useEffect(() => {
    const loadOrders = () => {
        const savedOrders =
        JSON.parse(localStorage.getItem("orders")) || [];

        const sortedOrders = [...savedOrders].sort((a, b) => {
        const numA = parseInt(a.number.split("-")[1]);
        const numB = parseInt(b.number.split("-")[1]);
        return numB - numA;
        });

        setOrders(sortedOrders);
    };

    loadOrders();

    const handleStorageChange = (event) => {
        if (event.key === "orders") {
        const newOrders =
            JSON.parse(event.newValue) || [];

        newOrders.forEach((order) => {
            if (order.status === "Gotowe do odbioru") {
            setToast({
                message: `Zamówienie ${order.number} jest gotowe do odbioru!`,
            });
            }
        });

        loadOrders();
        }
    };

    window.addEventListener("storage", handleStorageChange);

    return () =>
        window.removeEventListener("storage", handleStorageChange);
    }, []);


    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => { setToast(null);}, 4000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const getStatusStyle = (status) => {
        switch (status) {
            case "Nowe":
            return { color: "orange", fontWeight: "bold" };
            case "W trakcie przygotowania":
            return { color: "blue", fontWeight: "bold" };
            case "Gotowe do odbioru":
            return { color: "green", fontWeight: "bold" };
            default:
            return {};
        }
    };


    return(
        <div>
            <h1>Historia zamówień</h1>
            {orders.length === 0 && <p>Brak zamówień!</p>}
            {orders.map((order, index) => (
                <div key={index}>
                    <h3>Numer: {order.number}</h3>
                    <p>Godzina odbioru: {order.pickupTime}</p>
                    <p>Status zamówienia: {" "}<span style={getStatusStyle(order.status)}>{order.status}</span></p>
                    <p>Data: {order.date}</p>
                    <p>Suma: {order.total}</p>
                    {order.items.map((item) => (
                        <p key={item.id}>
                            {item.name} x{item.quantity}
                        </p>
                    ))}
                </div>
            ))}
            {toast && (
                <div style={toastStyle}>
                    {toast.message}
                </div>
            )}
        </div>
    );
}

export default Orders;