import React from "react";
function BrandDetails({ data }) {
  return (
    <div className="relative bg-gradient-to-b from-black to-coal text-whiteness p-5 border-solid border-[1px] border-whiteness/5 overflow-hidden md:flex md:justify-center md:items-center md:gap-20 lg:gap-40">
      <img
        className="absolute h-full top-0 left-0 right-0 bottom-0 mx-auto invert-50 hidden md:relative md:w-[15%] md:block md:mx-0 md:opacity-70 lg:w-[10%]"
        src={data.logo}
        alt="logo"
      />
      <div className="md:w-1/2 lg:w-1/4">
        <h5 className=" text-2xl pb-4 text-center font-secondary">
          About {data.brandName}
        </h5>
        <p className="relative font-secondary text-justify z-10 md:w-full">
          {data.description}
        </p>
      </div>
      <img
        className="absolute h-full top-0 left-0 right-0 bottom-0 invert-50 mx-auto md:relative md:w-[15%] md:mx-0 md:opacity-70 lg:w-[10%]"
        src={data.logo}
        alt="logo"
      />
    </div>
  );
}

export default BrandDetails;
