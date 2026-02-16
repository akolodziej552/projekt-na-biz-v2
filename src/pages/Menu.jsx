import "../styles/pages/menu.css";
import ProductCard from "../components/ProductCard";
import { useState } from "react";

const products = [
        { id: 1, name: "Zapiekanka", price: 8 },
        { id: 2, name: "Hot Dog", price: 6 },
        { id: 3, name: "Kanapka", price: 5 },
        { id: 4, name: "Sok", price: 4 },
    ]

const Menu = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    }

    const handleOrder = () => {
        alert("Zamówienie złożone!");
        setCart([]);
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
      {cart.map((item, index) => (
        <p key={index}>{item.name}</p>
      ))}

      {cart.length > 0 && (
        <button onClick={handleOrder}>Złóż zamówienie</button>
      )}
    </div>
    )
}

export default Menu;