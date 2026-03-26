import "../styles/pages/menu.css";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart, FaClock, FaCheckCircle } from "react-icons/fa";
import { fmt, generateOrderNumber } from "../utils/orderUtils";
import products from "../data/products";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const Menu = () => {
    const { showToast } = useToast();
    const { cart, addToCart, removeFromCart, clearCart, totalPrice } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [pickupTime, setPickupTime] = useState("");
    const [ordered, setOrdered] = useState(false);

    const handleOrder = () => {
        if (!user) {
            showToast("Musisz być zalogowany, aby złożyć zamówienie!", "error");
            return;
        }
        if (cart.length === 0) return;
        if (!pickupTime) {
            showToast("Wybierz godzinę odbioru!", "error");
            return;
        }
        const orderNumber = generateOrderNumber();
        
        const newOrder = {
            userId: user.id,
            number: orderNumber,
            items: cart,
            total: totalPrice,
            pickupTime,
            date: new Date().toLocaleString(),
            status: "Nowe",
        };

        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
        localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

        setOrdered(true);
        clearCart();
        setPickupTime("");
        setTimeout(() => setOrdered(false), 4000);
    };

    const getQuantity = (id) => {
        const item = cart.find((i) => i.id === id);
        return item ? item.quantity : 0;
    };

    return (
        <div className="menu-page">
            <div className="menu-layout">
                <section className="menu-products">
                    <h1 className="menu-title">Menu</h1>
                    <div className="products-grid">
                        {products.map((product) => {
                            const qty = getQuantity(product.id);
                            return (
                                <div key={product.id} className="product-card">
                                    <img src={product.img} alt={product.name} className="product-img"/>
                                    <div className="product-info">
                                        <span className="product-name">{product.name}</span>
                                        <span className="product-price">{fmt(product.price)}</span>
                                    </div>
                                    <div className="product-controls">
                                        {qty > 0 ? (
                                            <>
                                                <button className="qty-btn" onClick={() => removeFromCart(product.id)}>−</button>
                                                <span className="qty-count">{qty}</span>
                                                <button className="qty-btn" onClick={() => addToCart(product)}>+</button>
                                            </>
                                        ) : (
                                            <button className="add-btn" onClick={() => addToCart(product)}>Dodaj</button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
                <aside className="cart-panel">
                    <h2 className="cart-title"><FaShoppingCart style={{ marginRight: "6px" }}/> Koszyk</h2>

                    {cart.length === 0 ? (
                        <p className="cart-empty">Koszyk jest pusty</p>
                    ) : (
                        <>
                            <ul className="cart-list">
                                {cart.map((item) => (
                                    <li key={item.id} className="cart-item">
                                        <span className="cart-item-name">{item.name}</span>
                                        <div className="cart-item-controls">
                                            <button className="qty-btn small" onClick={() => removeFromCart(item.id)}>−</button>
                                            <span className="qty-count">{item.quantity}</span>
                                            <button className="qty-btn small" onClick={() => addToCart(item)}>+</button>
                                        </div>
                                        <span className="cart-item-price">{fmt(item.price * item.quantity)}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="cart-total">
                                <span>Suma:</span>
                                <strong>{fmt(totalPrice)}</strong>
                            </div>

                            <div className="cart-pickup">
                                <label htmlFor="pickup-time"><FaClock style={{ marginRight: "6px" }}/> Godzina odbioru:</label>
                                <input
                                    id="pickup-time"
                                    type="time"
                                    value={pickupTime}
                                    onChange={(e) => setPickupTime(e.target.value)}
                                />
                            </div>

                            <button className="order-btn" onClick={handleOrder}>
                                Złóż zamówienie
                            </button>
                            <button className="clear-btn" onClick={clearCart}>
                                Wyczyść koszyk
                            </button>
                        </>
                    )}

                    {ordered && (
                        <div className="order-success">
                            <FaCheckCircle style={{ marginRight: "6px" }}/> Zamówienie złożone!
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
};

export default Menu;
