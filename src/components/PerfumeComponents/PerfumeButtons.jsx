import React from "react";
import { useContext, useState } from "react";
// CONTEXT
import { cartContext } from "../../store/CartProvider";
// REACT ICONS
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
function PerfumeButtons({ data, functions, wishList }) {
  const { addProduct } = useContext(cartContext);
  // ANIMATION STATES
  const [triggerCartButton, setTriggerCartButton] = useState(false);
  const [triggerWishButton, setTriggerWishButton] = useState(false);
  const addToCartHandler = () => {
    // ADD PRODUCT TO CART
    addProduct({
      perfumeId: data.attributes.productId,
      id: data.id,
      title: data.attributes.title,
      imgUrl: data.attributes.perfume.data.attributes.url,
      price: data.attributes.price,
      volume: data.attributes.volume,
    });
    // ANIMATION ON CLICK
    setTriggerCartButton(true);
    setTimeout(() => {
      setTriggerCartButton(false);
    }, 100);
  };
  const addToWishHandler = () => {
    // ADD TO LOCALE STORAGE
    wishList.includes(data.id)
      ? functions.removeWishHandler(data.id)
      : functions.addWishHandler(data.id);
    // ANIMATION
    setTriggerWishButton(true);
    setTimeout(() => {
      setTriggerWishButton(false);
    }, 100);
  };
  return (
    <div className="w-full flex justify-center gap-2 mb-4 px-2 md:justify-start md:gap-5 md:px-0 md:mb-0 md:ml-5">
      {/* CART BUTTON */}
      <button
        onClick={addToCartHandler}
        className={`w-full h-[3rem] flex items-center gap-1 justify-between pl-3 border-[1px] mt-2 text-sm md:duration-100 md:hover:bg-whiteness/5 md:w-1/3 ${
          triggerCartButton
            ? "bg-light-gold/5 border-light-gold"
            : "bg-coal/60 border-silver/90"
        }`}
      >
        <p className="font-secondary text-whiteness ">Add to cart</p>
        <div
          className={`h-[2.6rem] bg-silver/90 text-lg flex items-center justify-center text-coal p-2 m-[2px] aspect-square ${
            triggerCartButton ? "scale-90" : "scale-100"
          } `}
        >
          <AiOutlineShoppingCart
            className={`text-light-gold ${
              triggerCartButton ? "scale-110" : "scale-100"
            } `}
          />
        </div>
      </button>
      {/* WISH BUTTON */}
      <button
        onClick={addToWishHandler}
        className={`w-full h-[3rem] text-sm flex items-center justify-between gap-1 pl-3 mt-2 border-[1px] md:duration-100 md:hover:bg-whiteness/5 md:w-1/3 ${
          triggerWishButton
            ? "bg-red-500/5 border-red-500/50"
            : "bg-coal/60 border-silver/90"
        }`}
      >
        {/* ADDED / NOT ADDED (as wish) - TEXT */}
        <p className="font-secondary text-whiteness  ">
          {wishList.includes(data.id) ? "Added" : "Add to Wish"}
        </p>
        {/* ADDED / NOT ADDED (as wish) - ICON */}
        <div className="h-[2.6rem] bg-silver/90 text-lg flex items-center justify-center p-2 m-[2px] text-light-gold aspect-square">
          {wishList.includes(data.id) ? (
            <MdOutlineFavorite />
          ) : (
            <MdFavoriteBorder />
          )}
        </div>
      </button>
    </div>
  );
}

export default PerfumeButtons;
