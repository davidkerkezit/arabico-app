import React, { useEffect, useState } from "react";
// Components
import WishHeader from "./WishComponents/WishHeader";
import NoWishes from "./WishComponents/NoWishes";
import WishedProducts from "./WishComponents/WishedProducts";
function Wish({ wish, setWish, showWish, setShowWish }) {
  const [wishPerfumes, setWishPerfumes] = useState([]);
  const [wishAnimation, setWishAnimation] = useState(false);

  const fetchPerfumes = async () => {
    const res = await fetch(
      `https://arabico-strapi.onrender.com/api/perfumes?populate=*`
    );
    const data = await res.json();
    let perfumes = [];
    data.data.map((p) => {
      wish.includes(p.id) && perfumes.push(p);
    });
    setWishPerfumes(perfumes);
  };
  useEffect(() => {
    if (showWish === "open") {
      fetchPerfumes();
    }
  }, [showWish, wish]);
  const removeWish = async (id) => {
    let storedWishes = JSON.parse(localStorage.getItem("wishList"));
    const index = storedWishes.indexOf(id);
    storedWishes.splice(index, 1);
    localStorage.setItem("wishList", JSON.stringify(storedWishes));
    setWish(storedWishes);
  };
  useEffect(() => {
    if (showWish === "open" && wishPerfumes.length === 0) {
      setWishAnimation(true);
      setTimeout(() => {
        setWishAnimation(false);
      }, 400);
    }
  }, [showWish]);
  return (
    <div className="relative">
      <div
        onClick={() => {
          setShowWish("close");
        }}
        className={`fixed w-full h-[100vh] bg-black/40 top-0 z-50 ${
          showWish === "close" && "hidden"
        } ${showWish === "" && `hidden `}`}
      />
      <div
        className={`fixed w-full h-[100vH] text-whiteness bg-coal/95 px-2 -top-2 bottom-0 backdrop-blur-sm z-50 overflow-scroll  no-scrollbar md:w-[37%] 
         md:absolute  md:right-0 py-2 md:top-[0] lg:w-[32%] xl:w-[30%] ${
           showWish === "open" && `animate-openMobileCart md:animate-openMDCart`
         } ${
          showWish === "close" &&
          `animate-closeMobileCart md:animate-closeMDCart`
        } ${showWish === "" && `ml-[100%] md:mr-[-40%]`} `}
      >
        <WishHeader
          setShowWish={setShowWish}
          setWishAnimation={setWishAnimation}
        />
        <div className="flex flex-col my-2 mx-2 gap-2 cursor-pointer">
          {wishPerfumes.length !== 0 &&
            wishPerfumes.map((product) => (
              <WishedProducts
                key={product.id}
                setShowWish={setShowWish}
                product={product}
                removeWishHandler={removeWish}
              />
            ))}
        </div>
        {wishPerfumes.length === 0 && (
          <NoWishes
            wishAnimation={wishAnimation}
            setWishAnimation={setWishAnimation}
          />
        )}
      </div>
    </div>
  );
}

export default Wish;
