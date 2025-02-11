import React, { createContext, useState, useEffect, useMemo } from "react";

// Create a context for the cart
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // State to hold cart items
  const [cart, setCart] = useState([]);
  // State to hold the total number of items
  const [itemAmount, setItemAmount] = useState(0);
  // State to hold the total price
  const [total, setTotal] = useState(0);

  // Calculate total price whenever the cart changes
  useEffect(() => {
    const newTotal = cart.reduce(
      (accumulator, currentItem) => accumulator + currentItem.price * currentItem.amount,
      0
    );
    setTotal(newTotal);
  }, [cart]);

  // Calculate total item amount whenever the cart changes
  useEffect(() => {
    const newAmount = cart.reduce(
      (accumulator, currentItem) => accumulator + currentItem.amount,
      0
    );
    setItemAmount(newAmount);
  }, [cart]);

  // Function to add a product to the cart
  const addToCart = (product, id) => {
    setCart((prevCart) => {
      const cartItem = prevCart.find((item) => item.id === id);
      if (cartItem) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, amount: item.amount + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, amount: 1 }];
      }
    });
  };

  // Function to remove a product from the cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Function to increase the amount of a specific product
  const increaseAmount = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };

  // Function to decrease the amount of a specific product
  const decreaseAmount = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => item.amount > 0)
    );
  };

  // Memoize the context value to optimize performance
  const contextValue = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      increaseAmount,
      decreaseAmount,
      itemAmount,
      total,
    }),
    [cart, itemAmount, total]
  );

  // Provide the context to children components
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
