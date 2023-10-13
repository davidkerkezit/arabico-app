import React from "react";
// Sad Cart image
import sadCart from "../../../../assets/emptyCart.png";
function EmptyCartAnimation({ showCart }) {
  return (
    <div className="w-[100%] h-[50%] flex flex-col items-center justify-center gap-20">
      {" "}
      <p className=" ">Your cart is empty.</p>
      <img
        src={sadCart}
        className={`w-[40%] grayscale invert mr-[150%] ${
          showCart === "open" && "animate-emptyCartPrimary"
        } ${showCart === "close" && "animate-emptyCartSecondary"}`}
        alt=""
      />
    </div>
  );
}

export default EmptyCartAnimation;
