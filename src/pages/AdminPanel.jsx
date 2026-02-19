import { useState, useEffect } from "react";

const AdminPanel = () => {
    const [orders, setOrders] = useState([]);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if(!currentUser || currentUser.role !== "admin") {
        return <h2>Brak dostepu</h2>
    }
    useEffect(() => {
        const loadOrders = () => {
            const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
            const sortedOrders = savedOrders.sort((a,b) => {
                const numA = parseInt(a.number.split("-")[1]);
                const numB = parseInt(b.number.split("-")[1]);
                return numB - numA;
            })
            setOrders(sortedOrders);
        }
        loadOrders();
        const interval = setInterval(() => {loadOrders()}, 3000);
        return () => clearInterval(interval);
    }, []);

    const updateStatus = (index,newStatus) => {
        const updatedOrders = [...orders];
        updatedOrders[index].status = newStatus;

        setOrders(updatedOrders);
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
    };

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

    const clearOrders = () => {
        if (window.confirm("Czy na pewno chcesz usunąć wszystkie zamówienia")) {
            localStorage.removeItem("orders");
            setOrders([]);
        }
    }
    return (
        <div>
            <h1>Panel Admina</h1>

            <button onClick={() => clearOrders()}>
                Wyczyść historię zamówień
            </button>
            <p>Liczba zamówień: {orders.length}</p>
            {orders.length === 0 && <p>Brak zamówień</p>}
            {orders.map((order, index) => (
                <div key={index}>
                    <h3>{order.number}</h3>
                    <p>Godzina: {order.pickupTime}</p>
                    <p>Suma: {order.total} zł</p>
                    <p>Status: {" "}
                        <span style={getStatusStyle(order.status)}>{order.status}</span>
                    </p>

                    <button
                        onClick={() =>
                        updateStatus(index, "W trakcie przygotowania")
                        }
                    >
                        W trakcie
                    </button>

                    <button
                        onClick={() =>
                        updateStatus(index, "Gotowe do odbioru")
                        }
                    >
                        Gotowe
                    </button>
                </div>
            ))}
        </div>
    )
}

export default AdminPanel;