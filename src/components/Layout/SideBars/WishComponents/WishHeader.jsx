import React from "react";
// React Icons
import { AiOutlineClose as Close } from "react-icons/ai";
function WishHeader({ setShowWish, setWishAnimation }) {
  return (
    <div className="flex justify-between items-center mx-2 py-2">
      <div className="w-max bg-gold text-2xl cursor-pointer text-light-gold/90 rounded-full p-2">
        <Close
          onClick={() => {
            setShowWish("close");
            setWishAnimation(false);
          }}
        />
      </div>
      <h1 className="text-whiteness font-secondary text-xl uppercase text-center">
        Wish list
      </h1>
    </div>
  );
}

export default WishHeader;
