import React, { useContext, useEffect, useState } from "react";
// Import React Icons
import { RiMenu4Line as Menu } from "react-icons/ri";
// Import useFetch Hook
import useFetch from "../hooks/useFetch";
// Import React Router Link
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import { AiOutlineClose as Close, AiOutlineSearch } from "react-icons/ai";
import { HiOutlineUserPlus } from "react-icons/hi2";
// Import brands logos
import ARABICO from "../assets/logo.png";
// import cartContext
import { cartContext } from "../store/CartProvider";
import SearchInput from "./SearchInput";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { AiOutlineHeart } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import Categories from "./Layout/SideBars/Categories";
import { Bs0Circle, BsCheck } from "react-icons/bs";
import GenderCategory from "./Layout/SideBars/CategoriesComponents/GenderCategory";
import BrandCategory from "./Layout/SideBars/CategoriesComponents/BrandCategory";
import { AiOutlineUser } from "react-icons/ai";
import USER from "../assets/user-test.png";
function Header({
  login,
  wish,
  setShowWishList,
  setShowCategories,
  showCategories,
  setShowSearchResults,
  showSearchResults,
}) {
  // Cart Context

  const [searchValue, setSearchValue] = useState("");
  const [searchOption, setSearchOption] = useState("perfumes");
  const [showSearchOption, setShowSearchOption] = useState(false);
  const { showCart, cart, setShowCart } = useContext(cartContext);
  const token = useRouteLoaderData("root");
  const [logedUser, setLogedUser] = useState(null);
  const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    searchOption === "perfumes" && navigate(`/search/?perfume=${searchValue}`);
    searchOption === "users" && navigate(`/search/?user=${searchValue}`);
  };
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
    // MAIN HEADER
    <div className="flex justify-between items-center px-4 py-3 sm:px-10 md:py-0  text-whiteness z-50 md:z-40 relative md:fixed md:w-full md:bg-coal  ">
      {/* Header Buttons Container */}
      <div className=" bg-gold  text-2xl cursor-pointer text-light-gold/90  rounded-full p-2 md:hidden ">
        {login.showLogin && (
          <Close
            onClick={() => {
              login.setShowLogin(false);
              setShowCart("");
            }}
          />
        )}

        {!login.showLogin && (
          <Menu
            onClick={() => {
              setShowCategories("open");
            }}
          />
        )}
      </div>
      {/* Logo */}
      <div className="flex items-center justify-between w-max md:w-full gap-12">
        <Link to={"/"}>
          <img
            src={ARABICO}
            alt="logo"
            className="w-32  object-contain cursor-pointer "
          />
        </Link>

        <div className=" lg:w-1/2 md:w-[65%] items-center hidden gap-10  md:flex ">
          <ul className="flex  w-full ">
            <li className="grow  font-secondary text-lg text-center py-3 text-white/85 hover:bg-white/5 cursor-pointer border-b-[2px] border-transparent hover:border-light-gold/50  ">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="grow  font-secondary text-lg text-center py-3 text-white/85 hover:bg-white/5 cursor-pointer border-b-[2px] border-transparent hover:border-light-gold/50">
              <Link to={"/perfumes"}>Perfumes</Link>
            </li>
            <li className="group grow  font-secondary text-lg text-center py-3 text-white/85 hover:bg-white/5 cursor-pointer border-b-[2px] border-transparent hover:border-light-gold/50 relative">
              Genders
              <div className="absolute bg-coal/70 backdrop-blur-md h-max w-full top-[3.4rem]  hidden group-hover:flex duration-100 ">
                <GenderCategory />
              </div>
            </li>
            <li className="group grow  font-secondary text-lg text-center py-3 text-white/85 hover:bg-white/5 cursor-pointer border-b-[2px] border-transparent hover:border-light-gold/50 relative">
              Brands
              <div className="absolute bg-coal/70 backdrop-blur-md h-max w-full top-[3.4rem]  hidden group-hover:flex duration-100">
                <BrandCategory />
              </div>
            </li>{" "}
          </ul>
          <div className="flex gap-6  text-xl items-center">
            <button
              onClick={() => {
                window.scrollTo({ behavior: "smooth", top: 0 });

                setShowCart(
                  showCart === "" || showCart === "close" ? "open" : "close"
                );
                login.showLogin && login.setShowLogin(false);
                wish.showWishList === "open" && wish.setShowWishList("close");
                showSearchResults === "open" && setShowSearchResults("close");
              }}
              className={`cursor-pointer flex     justify-center py-2 duration-200 flex-col items-center relative   `}
            >
              <LiaShoppingBagSolid
                className="cursor-pointer text-whiteness/80 hover:text-whiteness duration-100"
                onClick={() => {
                  setShowCart("open");
                }}
              />
              {cart.length > 0 && (
                <div className="  absolute top-0 bottom-4 right-0 left-3 mx-auto my-auto bg-red-600 font-secondary w-[1rem] flex justify-center items-center text-sm h-[1rem] text-whiteness text-center rounded-full">
                  {cart.length}
                </div>
              )}
            </button>
            <button
              onClick={() => {
                wish.setShowWishList(
                  wish.showWishList === "" || wish.showWishList === "close"
                    ? "open"
                    : "close"
                );
                login.showLogin && login.setShowLogin(false);
                showCart === "open" && setShowCart("close");
                showSearchResults === "open" && setShowSearchResults("close");
              }}
            >
              <AiOutlineHeart className="cursor-pointer text-whiteness/80 hover:text-whiteness duration-100" />
            </button>
            <button
              onClick={() => {
                setShowSearchResults(
                  showSearchResults === "" || showSearchResults === "close"
                    ? "open"
                    : "close"
                );
                login.showLogin && login.setShowLogin(false);
                wish.showWishList === "open" && wish.setShowWishList("close");
                showCart === "open" && setShowCart("close");
              }}
            >
              <AiOutlineSearch className="cursor-pointer text-whiteness/80 hover:text-whiteness duration-100" />
            </button>
            {token ? (
              <Link
                onClick={() => {
                  showCart === "open" && setShowCart("close");
                  wish.showWishList === "open" && wish.setShowWishList("close");
                  window.scrollTo({ behavior: "smooth", top: 0 });
                }}
                to={`/${logedUser && logedUser.attributes.username}`}
                className={`cursor-pointer flex  justify-center w-[1.8rem]   duration-200 flex-col items-center  `}
              >
                <img src={USER} alt="" className=" object-contain w-full " />{" "}
              </Link>
            ) : (
              <button
                onClick={() => {
                  login.setShowLogin((showLogin) => !showLogin);
                  showSearchResults === "open" && setShowSearchResults("close");
                  wish.showWishList === "open" && setShowWishList("close");
                  showCart === "open" && setShowCart("close");
                }}
              >
                <HiOutlineUserPlus className="cursor-pointer text-whiteness/80 hover:text-whiteness duration-100" />
              </button>
            )}
          </div>
        </div>
      </div>
      {showSearchOption && (
        <div
          onClick={() => setShowSearchOption(false)}
          className="bg-transparent absolute w-full bottom-0 top-0 left-0 right-0 h-[100vh] z-40"
        />
      )}
    </div>
  );
}

export default Header;
