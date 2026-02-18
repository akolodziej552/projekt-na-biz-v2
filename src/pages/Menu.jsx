import "../styles/pages/menu.css";
import ProductCard from "../components/ProductCard";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const products = [
        { id: 1, name: "Zapiekanka", price: 8 },
        { id: 2, name: "Hot Dog", price: 6 },
        { id: 3, name: "Kanapka", price: 5 },
        { id: 4, name: "Sok", price: 4 },
    ]

const Menu = () => {
    const { cart, addToCart, removeFromCart, clearCart, totalPrice } =  useContext(CartContext);
    const generateOrderNumber = () => {
      let counter = localStorage.getItem("orderCounter");

      if (!counter) {
        counter = 1;
      } else {
        counter = parseInt(counter) + 1;
      }

      localStorage.setItem("orderCounter", counter);

      return `ZAM-${String(counter).padStart(4, "0")}`;
    }

    const handleOrder = () => {
      if (cart.length === 0) return;

        const orderNumber = generateOrderNumber();

        const newOrder = {
            number: orderNumber,
            items: cart,
            total: totalPrice,
            date: new Date().toLocaleString()
        };

        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

        localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

        alert(`Zamówienie złożone!\nNumer odbioru: ${orderNumber}`);
        clearCart();
    };
    return (
         <div>
      <h1>Menu</h1>

      {products.map((product) => (
        <div key={product.id} style={{ marginBottom: "10px" }}>
          {product.name} - {product.price} zł
          <button onClick={() => addToCart(product)}>
            Dodaj do koszyka
          </button>
        </div>
      ))}

      <h2>Koszyk</h2>
      {cart.map((item) => (
        <div key={item.id}>
          {item.name} x{item.quantity}
          <button onClick={() => addToCart(item)}>+</button>
          <button onClick={() => removeFromCart(item.id)}>-</button>
        </div>
      ))}
      <h3>Suma: {totalPrice}zł</h3>
      {cart.length > 0 && (
        <button onClick={handleOrder}>Złóż zamówienie</button>
      )}
    </div>
    )
}

export default Menu;