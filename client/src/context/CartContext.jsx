import {
  createContext,
  useState,
  useEffect,
} from "react";

export const CartContext = createContext();

function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState(() => {

  const savedCart = localStorage.getItem("cart");

  return savedCart
    ? JSON.parse(savedCart)
    : [];
});

useEffect(() => {

  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems)
  );

}, [cartItems]);

  // Add To Cart
  const addToCart = (product) => {

    const existingItem = cartItems.find(
      (item) => item.name === product.name
    );

    if (existingItem) {

      const updatedCart = cartItems.map((item) =>

        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCartItems(updatedCart);

    } else {

      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }

    alert("Product added to cart");
  };

  // Remove From Cart
  const removeFromCart = (name) => {

    const updatedCart = cartItems.filter(
      (item) => item.name !== name
    );

    setCartItems(updatedCart);
  };

  // Increase Quantity
  const increaseQuantity = (name) => {

    const updatedCart = cartItems.map((item) =>

      item.name === name
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCartItems(updatedCart);
  };

  // Decrease Quantity
  const decreaseQuantity = (name) => {

    const updatedCart = cartItems.map((item) =>

      item.name === name
        ? {
            ...item,
            quantity:
              item.quantity > 1
                ? item.quantity - 1
                : 1,
          }
        : item
    );

    setCartItems(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;