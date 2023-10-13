import React from "react";

import TEXTURE from "../../assets/banner-texture.png";
import STAND from "../../assets/stand-for-product.png";
import SOON from "../../assets/soon.png";
import ProgressBar from "../ProgressBar";
function Banner({ data }) {
  const notes = [];
  for (const [key, value] of Object.entries(data[0].attributes.ingredients)) {
    notes.push({ key, value });
  }

  return (
    <div className="relative h-[30rem] hidden overflow-hidden  md:flex md:h-[36rem]  lg:h-[34rem]">
      {/* TEXTURE BACKGROUND IMAGES */}
      <img
        src={TEXTURE}
        alt="texture"
        className="absolute w-1/2 top-0 right-0"
      />
      <img
        src={TEXTURE}
        alt="texture"
        className="absolute w-1/2 bottom-0 left-0 rotate-180 opacity-40"
      />
      {/* ABOUT PERFUME */}
      <div className="flex flex-col items-center gap-5 my-auto ml-20 md:w-[60%] lg:w-[50%] xl:w-[30%]">
        {/* Perfume title */}
        <h1 className="font-secondary text-whiteness  uppercase text-3xl">
          {data[0].attributes.title}
        </h1>
        {/* About Promo Perfume */}
        <p className=" w-full bg-black/10 text-whiteness/95 p-4  font-secondary text-justify border-[1px] border-light-gold/10 lg:text-lg">
          {data[0].attributes.About}
        </p>
        {/* Promo Perfume - Notes Container */}
        <div className="w-full grid grid-cols-4 justify-items-center gap-6">
          {notes.map((item) => (
            // Color === note
            <ProgressBar
              key={item.key}
              color={item.key}
              percentages={item.value * 10}
              component={"banner"}
            />
          ))}
        </div>
      </div>
      {/* PERFUME AND STAND BANNER CONTAINER*/}
      <div className="relative w-[30%] flex items-center justify-center z-10 md:w-[40%] md:z-40 xl:w-[30%]">
        {/* Stand for perfume */}
        <img
          src={STAND}
          alt="stand"
          className="absolute w-[14rem] h-[18rem] bottom-0 top-[10rem] right-0 left-0 mx-auto my-auto opacity-75 lg:w-[13rem] lg:h-[14rem] lg:top-[14rem] xl:w-[14rem] xl:h-[16rem] xl:top-[10.5rem]"
        />
        {/* Perfume image */}
        <img
          src={`https://arabico-strapi.onrender.com${data[0].attributes.perfume.data.attributes.url}`}
          alt="promo_perfume"
          className="absolute w-[10rem] top-0 bottom-0 right-0 left-0 mx-auto my-auto z-20 drop-shadow-[0_0px_14px_rgba(180,180,180,.1)]  lg:top-[3.7rem] lg:w-[9rem] xl:w-[10rem] xl:h-[18rem] xl:-top-0 xl:left-0"
        />
      </div>
      {/* COMING SOON BANNER IMG */}
      <img
        src={SOON}
        alt="coming-soon"
        className="absolute w-1/2 h-[30rem] md:w-[30%] md:h-[13rem] md:-right-8 md:-top-10 md:z-20 md:opacity-80 lg:h-[15rem] lg:-top-0 lg:z-20 lg:opacity-80 xl:w-[50%]  xl:h-[26rem] xl:-right-20 xl:top-[10rem] "
      />
    </div>
  );
}

export default Banner;
