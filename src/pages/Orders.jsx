import { useState, useEffect } from "react";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(savedOrders);
    }, []);

    return(
        <div>
            <h1>Historia zamówień</h1>
            {orders.length === 0 && <p>Brak zamówień!</p>}
            {orders.map((order, index) => (
                <div key={index}>
                    <h3>Numer: {order.number}</h3>
                    <p>Data: {order.date}</p>
                    <p>Suma: {order.total}</p>
                    {order.items.map((item) => (
                        <p key={item.id}>
                            {item.name} x{item.quantity}
                        </p>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Orders;