import { createContext, useState } from "react";
// Cart Context
export const cartContext = createContext({
  showCart: "",
  setShowCart: null,
  cart: [],
  addProduct: (id, title) => {},
  removeProduct: (id) => {},
  decreaseProduct: (id) => {},
});
function CartProvider({ children }) {
  // State for show cart
  const [showCart, setShowCart] = useState("");
  // Cart array state
  const [cart, setCart] = useState([]);
  // Adding product function
  const addProduct = (product) => {
    const selectedProduct = cart.find((item) => item.id === product.id);

    // If selected product doesnt exist in cart => create quantity property with value 1

    if (!selectedProduct) {
      const item = { ...product, quantity: 1 };
      setCart([...cart, item]);
      // If selected product is already in cart => update quantity of selected product + 1
    } else if (cart[cart.indexOf(selectedProduct)].quantity < 10) {
      const index = cart.indexOf(selectedProduct);
      cart[index].quantity = cart[index].quantity + 1;
    }
  };
  // Remove product function
  const removeProduct = (product) => {
    // Get all products without removed product
    const newCart = cart.filter((item) => item.id !== product.id);

    setCart(newCart);
  };
  const decreaseProduct = (product) => {
    const selectedProduct = cart.find((item) => item.id === product.id);
    const index = cart.indexOf(selectedProduct);
    cart[index].quantity = cart[index].quantity - 1;
  };
  const emptyCart = () => {
    setCart([]);
  };

  return (
    <cartContext.Provider
      value={{
        showCart: showCart,
        setShowCart: setShowCart,
        addProduct: addProduct,
        removeProduct: removeProduct,
        cart: cart,
        decreaseProduct: decreaseProduct,
        emptyCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export default CartProvider;
