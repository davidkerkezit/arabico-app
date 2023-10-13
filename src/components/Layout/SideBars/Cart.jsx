import React, { useContext, useEffect, useState } from "react";
// Cart Context
import { cartContext } from "../../../store/CartProvider";
// Components
import CartProducts from "./CartComponents/CartProducts";
import EmptyCartAnimation from "./CartComponents/EmptyCartAnimation";
import CartHeader from "./CartComponents/CartHeader";
import EmptyButton from "./CartComponents/EmptyButton";
import DeliveryButton from "./CartComponents/DeliveryButton";

function Cart() {
  // states for triggering buttons animation
  const [triggerDeliveryButton, setTriggerDeliveryButton] = useState(false);

  // get data from Context
  const { showCart, cart, setShowCart, emptyCart } = useContext(cartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  // Set Total Price on showing cart
  useEffect(() => {
    let totalPriceCounter = 0;
    cart.forEach((element) => {
      totalPriceCounter = totalPriceCounter + element.price * element.quantity;
    });
    setTotalPrice(totalPriceCounter);
  }, [showCart]);

  return (
    <div className="relative  ">
      <div
        onClick={() => {
          setShowCart("close");
        }}
        className={`fixed w-full h-[100vh] bg-black/40 top-0 z-50 ${
          showCart === "close" && "hidden"
        } ${showCart === "" && `hidden `}`}
      />
      {/* Main cart container */}
      {showCart && (
        <div
          className={`fixed w-full h-[100vH] bg-coal/95 text-whiteness px-2 py-2 -top-2 bottom-0 overflow-scroll no-scrollbar backdrop-blur-sm z-50 md:absolute md:right-0  md:top-0 md:w-[37%] lg:w-[32%] xl:w-[30%]
             ${
               showCart === "open" &&
               `animate-openMobileCart md:animate-openMDCart`
             } ${
            showCart === "close" &&
            `animate-closeMobileCart md:animate-closeMDCart`
          } ${showCart === "" && `ml-[100%] md:mr-[-40%] `}`}
        >
          {/* Cart container header */}
          <CartHeader />
          {cart.length === 0 ? (
            <EmptyCartAnimation showCart={showCart} />
          ) : (
            // Products container if there are any added products in cart
            <div className="h-screen flex flex-col">
              {/* Total price & Buttons container */}
              <div className=" w-full">
                {/* Total price */}
                <h5 className=" font-secondary text-lg text-right mr-2 ">
                  Total price : $ {totalPrice}
                </h5>
                {/* BUTTONS CONTAINER */}
                <div className="flex  mx-2 mt-2 gap-2 my-2   z-40 ">
                  <EmptyButton />
                  <DeliveryButton />
                </div>
              </div>
              <CartProducts totalPrice={{ totalPrice, setTotalPrice }} />
            </div>
          )}
          {/* Scroll Down guideline */}
          {cart.length > 5 && showCart === "open" && (
            <button className="fixed h-5 bg-black/20 flex items-center gap-2 border-[1px] border-light-gold/5 px-2 rotate-90 -left-10 py-4  bottom-32 backdrop-blur-md z-40 md:hidden  ">
              <p className="font-secondary text-whiteness">Scroll Down</p>
              <div className="w-5 h-[1px] bg-whiteness" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
