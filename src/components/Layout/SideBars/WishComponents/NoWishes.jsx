import React from "react";
// React Icons
import { LuHeartOff, LuHeart } from "react-icons/lu";
function NoWishes({ wishAnimation }) {
  return (
    <div className="flex flex-col gap-5 justify-center items-center mt-[20%] ">
      <h4 className="text-light-gold font-secondary text-lg animate-opacity">
        Wish list is empty.
      </h4>
      {wishAnimation ? (
        <div className="relative">
          <div className="absolute h-[1rem] bg-light-gold/80 -left-5 right-0 top-0 bottom-3 mx-auto my-auto rounded-md rotate-45 animate-heartCut" />
          <LuHeart className="text-[10rem] text-light-gold/80" />
        </div>
      ) : (
        <div className=" relative animate-opacityAnimation">
          <LuHeartOff className="text-[10rem] text-light-gold/80" />
        </div>
      )}
    </div>
  );
}

export default NoWishes;
