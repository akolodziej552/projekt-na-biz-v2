import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({children}) {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        if (savedCart) {
            setCart(savedCart);
        }
    },[])
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);

            if (existing) {
                return prev.map((item) =>
                item.id === product.id ?
            { ...item, quantity: item.quantity + 1}
            : item);
            }
            return [...prev, {...product, quantity: 1}];
        });
    };
    const removeFromCart = (id) => {
        setCart((prev) => 
            prev.map((item) => item.id === id
            ? {...item, quantity: item.quantity - 1 }
            : item
        ).filter((item) => item.quantity > 0)    
        );
    };
    const clearCart = () => {
        setCart([]);
    };
    const totalPrice = cart.reduce((sum,item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, totalPrice}}>
            {children}
        </CartContext.Provider>
    );
}