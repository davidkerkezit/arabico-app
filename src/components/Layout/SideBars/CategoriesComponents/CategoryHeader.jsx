import React from "react";
// Our logo
import ARABICO from "../../../../assets/logo.png";
// React Icon
import { AiOutlineClose as Close } from "react-icons/ai";

function CategoryHeader({ setShowCategories }) {
  return (
    <div className="flex justify-between items-center py-2 px-4">
      <img
        src={ARABICO}
        alt="logo"
        className="w-32 object-contain cursor-pointer"
      />
      <div className=" bg-gold text-2xl cursor-pointer text-light-gold/90 rounded-full p-2 ">
        <Close
          onClick={() => {
            setShowCategories("close");
          }}
          className=" cursor-pointer "
        />
      </div>
    </div>
  );
}

export default CategoryHeader;
