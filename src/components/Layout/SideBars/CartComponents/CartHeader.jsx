import React from "react";
// React Icons
import { AiOutlineClose as Close } from "react-icons/ai";
// Context
import { useContext } from "react";
import { cartContext } from "../../../../store/CartProvider";
function CartHeader() {
  const { showCart, setShowCart } = useContext(cartContext);
  return (
    <div className="flex justify-between items-center py-4 px-2">
      <div className="bg-gold text-light-gold/90 text-2xl p-2 cursor-pointer rounded-full">
        <Close onClick={() => setShowCart("close")} />
      </div>
      <h1
        className={` font-logo text-xl text-whiteness uppercase tracking-[2px] ${
          showCart === "open" && "animate-delayAnimation "
        }`}
      >
        Your Cart
      </h1>
    </div>
  );
}

export default CartHeader;
