import React, { useState } from "react";
// Context
import { useContext } from "react";
import { cartContext } from "../../../../store/CartProvider";
// React Icons
import { TbShoppingCartOff } from "react-icons/tb";
function EmptyButton() {
  // Animation
  const [triggerEmptyButton, setTriggerEmptyButton] = useState(false);
  const { emptyCart } = useContext(cartContext);
  const EmptyCartHandler = () => {
    // ANIMATION
    setTriggerEmptyButton(true);
    setTimeout(() => {
      setTriggerEmptyButton(false);
    }, 100);
    // Remove all products
    emptyCart();
  };

  return (
    <button
      className={`w-[50%] bg-coal/60 flex items-center justify-between mx-auto items text-sm gap-1 pl-3 border-[1px] border-light-gold/30 ${
        triggerEmptyButton
          ? "bg-light-gold/5 border-light-gold/50"
          : "bg-coal/60 border-silver/90"
      }   `}
      onClick={EmptyCartHandler}
    >
      <p className="font-secondary text-lg text-whiteness ">Empty cart</p>
      <div className="bg-silver text-light-gold/90 text-xl p-1 m-[2px]">
        <TbShoppingCartOff />
      </div>
    </button>
  );
}

export default EmptyButton;
