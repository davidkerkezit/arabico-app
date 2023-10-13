import React, { useContext, useEffect, useState } from "react";
// REACT ROUTER
import { useLoaderData } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { cartContext } from "../../store/CartProvider";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
// REACT ICONS
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
// IMAGES
import AJMAL from "../../assets/ajmal.png";
import ARMAF from "../../assets/armaf.png";
import LATTAFA from "../../assets/lattafa.png";
import STAND from "../../assets/stand-for-product.png";
import SPOTS from "../../assets/spots.png";
// COMPONENTS
import NotesMobile from "./NotesMobile";
import PerfumeButtons from "./PerfumeButtons";
import AboutPerfume from "./AboutPerfume";
import ProgressBar from "../ProgressBar";
function PerfumeDetails({ data, averageRating, ratingQuantity }) {
  const { setWishList } = useOutletContext();
  const [wishListFromLocaleStorage, setWishListFromLocaleStorage] = useState(
    localStorage.getItem("wishList") === null
      ? []
      : localStorage.getItem("wishList")
  );
  // Add Wish Handler
  const addWishHandler = (id) => {
    if (localStorage.getItem("wishList") === null) {
      let wishList = [id];
      localStorage.setItem("wishList", JSON.stringify(wishList));
    } else {
      let storedWishes = JSON.parse(localStorage.getItem("wishList"));
      storedWishes.push(id);
      localStorage.setItem("wishList", JSON.stringify(storedWishes));
      setWishListFromLocaleStorage(storedWishes);
      setWishList(storedWishes);
    }
  };
  // Remove Wish Handler
  const removeWishHandler = (id) => {
    let storedWishes = JSON.parse(localStorage.getItem("wishList"));
    const index = storedWishes.indexOf(id);
    storedWishes.splice(index, 1);
    localStorage.setItem("wishList", JSON.stringify(storedWishes));
    setWishListFromLocaleStorage(storedWishes);
    setWishList(storedWishes);
  };
  // Perfume Notes
  const notes = [];
  for (const [key, value] of Object.entries(data.attributes.ingredients)) {
    notes.push({ key, value });
  }
  return (
    <div className="flex flex-col mt-8 md:mt-0">
      {/* Header title container */}
      <div className="bg-silver/20 flex flex-col gap-2 justify-center items-center py-4 mb-2 md:hidden">
        <h1 className="text-whiteness font-secondary text-2xl uppercase">
          {data.attributes.title}
        </h1>
      </div>
      <div className=" md:flex md:flex-row">
        {/*Perfume image and notes container*/}
        <div className="relative h-[13rem] bg-whiteness/5 flex flex-col justify-center items-center gap-4 overflow-hidden py-4 px-2 md:h-[40rem] md:w-1/2 md:border-y-[1px] md:border-light-gold/20 md:border-r-transparent md:border-l-transparent md:bg-gradient-to-r md:from-black/50 md:to-black/50 md:via-white/10">
          {/* IMAGE */}
          <div className="absolute w-[7rem] h-[9rem] top-0 bottom-3 left-0 right-0 mx-auto my-auto z-20 md:w-[8rem] md:h-[15rem] md:bottom-28  md:top-9">
            <img
              src={`https://arabico-strapi.onrender.com${data.attributes.perfume.data.attributes.url}`}
              className=" h-full mx-auto"
              alt="promo_perfume"
            />
          </div>
          <img
            src={STAND}
            alt="stand"
            className="absolute w-[10rem] h-[15.5rem] object-contain bottom-0 top-16 right-0 left-0 mx-auto my-auto z-10 md:w-[14rem]"
          />
          <img
            src={SPOTS}
            alt="spots"
            className="absolute -top-16 opacity-20 hidden md:w-[20rem] md:h-[29rem] md:block"
          />
          <div className="absolute w-full bg-black/5 flex items-center justify-center gap-10 bottom-0 px-6 py-4 backdrop-blur-3xl md:gap-2 lg:gap-10">
            {notes.map((item) => (
              <ProgressBar
                key={item.key}
                color={item.key}
                percentages={item.value * 10}
                component={"perfumeDetail"}
              />
            ))}
          </div>
          {/* NOTES */}
          <NotesMobile notes={notes} />
        </div>
        <div className="md:w-full md:bg-[#141414] md:flex md:flex-col-reverse md:justify-center md:gap-10 md:border-y-[1px] md:border-light-gold/20">
          <PerfumeButtons
            data={data}
            functions={{ removeWishHandler, addWishHandler }}
            wishList={wishListFromLocaleStorage}
          />
          <AboutPerfume
            data={data}
            rating={{ averageRating, ratingQuantity }}
          />

          <div className="flex flex-col items-center justify-center text-whiteness font-headers uppercase py-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl">
              {data.attributes.brandCategory.data.attributes.title}
            </h1>
            <h1 className="text-xl sm:text-2xl md:text-4xl xl:text-5xl ">
              {data.attributes.title}
            </h1>
          </div>
        </div>
      </div>

      <p className="text-whiteness/75 font-secondary text-justify py-4 px-4 md:hidden ">
        {data.attributes.About}
      </p>
    </div>
  );
}

export default PerfumeDetails;
