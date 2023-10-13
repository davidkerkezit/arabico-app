import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../store/CartProvider";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
  useOutletContext,
  useRouteLoaderData,
  useSearchParams,
} from "react-router-dom";
//  React Icons
import {
  AiOutlineHome,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { TbSpray } from "react-icons/tb";
function Nav({ wish, login }) {
  const token = useRouteLoaderData("root");
  const [logedUser, setLogedUser] = useState(null);
  const navigation = useNavigation();

  // Active Nav options
  const [active, setActive] = useState("home");
  // Get cart Context
  const { showCart, cart, setShowCart } = useContext(cartContext);

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `https://arabico-strapi.onrender.com/api/arabicousers/?populate=*&[filters][id][$eq]=${localStorage.getItem(
          "userId"
        )}`
      )
        .then((res) => res.json())
        .then((data) => setLogedUser(data.data[0]));
    };
    fetchData();
  }, [token]);

  return (
    // NAV Main Container
    <div className="fixed bottom-0 bg-coal/70 backdrop-blur-md h-[4rem] text-darkness w-full border-t-[1px] z-30 border-light-gold/20  right-0 left-0 flex justify-between md:hidden  ">
      {/* SEARCH Container */}
      <Link
        to="/perfumes"
        onClick={() => {
          setActive("perfumes");
          window.scrollTo({ behavior: "smooth", top: 0 });
          showCart === "open" && setShowCart("close");
          wish.showWishList === "open" && wish.setShowWishList("close");
        }}
        className={`cursor-pointer flex justify-center py-2  w-full  duration-200 flex-col items-center relative ${
          active === "perfumes" && showCart !== "open"
            ? "border-t-[3px] border-light-gold/90 bg-whiteness/5"
            : "border-t-[3px] border-transparent"
        }`}
      >
        <TbSpray className="text-2xl text-light-gold/80" />

        <p className="text-xs text-light-gold/80 font-secondary">Perfumes</p>
      </Link>
      {/* WISH Container */}
      <button
        onClick={() => {
          setActive("wish");
          window.scrollTo({ behavior: "smooth", top: 0 });
          wish.setShowWishList(
            wish.showWishList === "" || wish.showWishList === "close"
              ? "open"
              : "close"
          );
          setShowCart("");
        }}
        // to="/wish"
        className={`cursor-pointer flex justify-center py-2  w-full  duration-200 flex-col items-center relative ${
          wish.showWishList === "open"
            ? "border-t-[3px] border-light-gold/90 bg-whiteness/5"
            : "border-t-[3px] border-transparent"
        }`}
      >
        <AiOutlineHeart className="text-2xl text-light-gold/80" />
        <p className="text-xs text-light-gold/80 font-secondary">Wish</p>
        <div
          className={`absolute ${
            wish.wishList.length === 0 && "hidden"
          } top-0 bottom-9 right-0 left-7 mx-auto my-auto bg-red-600 font-secondary w-[1rem] h-[1rem] text-whiteness flex justify-center items-center text-sm text-center rounded-full`}
        >
          {wish.wishList.length}
        </div>
      </button>
      {/* HOME Container */}
      <div className="w-[40%] " />
      <Link
        to="/"
        onClick={() => {
          setActive("home");
          showCart === "open" && setShowCart("close");
          wish.showWishList === "open" && wish.setShowWishList("close");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`cursor-pointer flex  bg-coal  backdrop-blur-md w-[4.5rem] rounded-full  border-[1px] border-light-gold/80 aspect-square absolute bottom-5 left-0 right-0 mx-auto z-20   justify-center  duration-200 flex-col items-center   ${
          active === "home" &&
          showCart !== "open" &&
          wish.showWishList !== "open" &&
          "border-[4px] "
        } `}
      >
        <AiOutlineHome className={`text-2xl text-light-gold `} />

        <p className="text-xs text-light-gold font-secondary">Home</p>
      </Link>

      {/* CART Container */}
      <button
        onClick={() => {
          window.scrollTo({ behavior: "smooth", top: 0 });
          setShowCart("cart");
          setShowCart(
            showCart === "" || showCart === "close" ? "open" : "close"
          );
        }}
        className={`cursor-pointer flex   w-full  justify-center py-2 duration-200 flex-col items-center relative   ${
          showCart === "open"
            ? "border-t-[3px] border-light-gold/90 bg-whiteness/5"
            : "border-t-[3px] border-transparent"
        }`}
      >
        <AiOutlineShoppingCart className="text-2xl text-light-gold/80" />
        <p className="text-xs text-light-gold/80 font-secondary">Cart</p>
        {cart.length > 0 && (
          <div className="  absolute top-0 bottom-9 right-0 left-7 mx-auto my-auto bg-red-600 font-secondary w-[1rem] flex justify-center items-center text-sm h-[1rem] text-whiteness text-center rounded-full">
            {cart.length}
          </div>
        )}
      </button>
      {/* 
      / */}
      {/*  */}
      {/*  */}

      {token ? (
        <Link
          onClick={() => {
            setActive("users");
            showCart === "open" && setShowCart("close");
            wish.showWishList === "open" && wish.setShowWishList("close");
            window.scrollTo({ behavior: "smooth", top: 0 });
          }}
          to={`/${logedUser && logedUser.attributes.username}`}
          className={`cursor-pointer flex  justify-center   duration-200 flex-col items-center w-full  ${
            active === "users" && showCart !== "open"
              ? "border-t-[3px] border-light-gold/90 bg-whiteness/5"
              : "border-t-[3px] border-transparent"
          }`}
        >
          {" "}
          <AiOutlineUser className="text-2xl text-light-gold/80" />
          <p className="text-xs text-light-gold font-secondary">
            {logedUser && logedUser.attributes.username}
          </p>
        </Link>
      ) : (
        <Link
          onClick={() => {
            setActive("users");
            showCart === "open" && setShowCart("close");
            wish.showWishList === "open" && wish.setShowWishList("close");
            login(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          // to={"/user"}
          className={`cursor-pointer flex  justify-center   duration-200 flex-col items-center w-full  ${
            active === "users" && showCart !== "open"
              ? "border-t-[3px] border-light-gold/90 bg-whiteness/5"
              : "border-t-[3px] border-transparent"
          }`}
        >
          <AiOutlineUser className="text-2xl text-light-gold/80" />
          <p className="text-xs text-light-gold/80 font-secondary">User</p>
        </Link>
      )}
    </div>
  );
}

export default Nav;
