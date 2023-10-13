import React, { useContext, useState } from "react";
// Context
import { cartContext } from "../../../../store/CartProvider";
// React Router
import { Link } from "react-router-dom";
// React Icons
import { TbTruckDelivery } from "react-icons/tb";
function DeliveryButton() {
  // Button Animation
  const [triggerDeliveryButton, setTriggerDeliveryButton] = useState(false);
  const { setShowCart } = useContext(cartContext);
  const DeliverProductsHandler = () => {
    // ANIMATION
    setTriggerDeliveryButton(true);
    setTimeout(() => {
      setTriggerDeliveryButton(false);
    }, 100);
    // close cart sidebar
    setShowCart("close");
  };
  return (
    <Link
      className={`bg-coal/60 items justify-between pl-3 border-[1px] border-light-gold/30  mx-auto  ${
        triggerDeliveryButton
          ? "bg-light-gold/5 border-light-gold/50"
          : "bg-coal/60 border-silver/90"
      } w-[50%] text-sm flex items-center gap-1`}
      to={"/delivery"}
      onClick={DeliverProductsHandler}
    >
      <p className="font-secondary text-whiteness text-lg ">Delivery</p>
      <div className="bg-light-gold/80 m-[2px] text-coal text-xl p-1">
        <TbTruckDelivery />
      </div>
    </Link>
  );
}

export default DeliveryButton;
