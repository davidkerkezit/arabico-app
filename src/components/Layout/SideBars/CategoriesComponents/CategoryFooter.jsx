import React from "react";
// Brands - logo
import ARMAF from "../../../../assets/armaf.png";
import AJMAL from "../../../../assets/ajmal.png";
import LATTAFA from "../../../../assets/lattafa.png";
function CategoryFooter() {
  return (
    <div className="w-full flex flex-row justify-center items-center gap-4 bottom-16 brightness-50 mt-60">
      <img
        src={ARMAF}
        alt="armaf"
        className="w-[15%] brightness-0 invert grayscale-[100%]"
      />
      <img src={AJMAL} alt="ajmal" className="w-[15%] brightness-0 invert " />
      <img
        src={LATTAFA}
        alt="lattafa"
        className="w-[15%] brightness-0 invert "
      />
    </div>
  );
}

export default CategoryFooter;
