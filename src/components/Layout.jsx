import React from "react";
import { useEffect, useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import { cartContext } from "../store/CartProvider";
// LAYOUT COMPONENTS
import Header from "./Header";

import Nav from "./Nav";
import Login from "./Layout/Modals/Login";
import Categories from "./Layout/SideBars/Categories";
import Wish from "./Layout/SideBars/Wish";
import Cart from "./Layout/SideBars/Cart";
import SearchResults from "./SearchResults";

function Layout() {
  const [showCategories, setShowCategories] = useState("");
  // Show/Hide Login component
  const [showLogin, setShowLogin] = useState(false);
  // Login/Register container when we show Login component
  const [AuthType, setAuthType] = useState("login");
  const { showCart } = useContext(cartContext);
  // If Wish List isn't empty set State to list from locale storage
  const [wishList, setWishList] = useState(
    localStorage.getItem("wishList") === null ||
      localStorage.getItem("wishList") === "[]"
      ? []
      : JSON.parse(localStorage.getItem("wishList"))
  );
  const [showWishList, setShowWishList] = useState("");
  //
  const [showSearchResults, setShowSearchResults] = useState("");
  useEffect(() => {
    if (showLogin || showCart === "open" || showWishList === "open") {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else if (!showCart || showCart !== "open" || !showWishList !== "open") {
      document.body.style.overflow = "unset";
      document.body.style.position = "relative";
    }
  }, [showLogin, showCart, showWishList]);

  return (
    <div className="h-full pb-10 relative overflow-hidden ">
      {/* LOGIN props - onClick login button = show Login component */}
      {/* LOGIN props - onClick burger menu = hide Login component */}
      {/* WISH props - We send Wish List to Wish Component inside Header component */}
      <Header
        login={{ setShowLogin, showLogin }}
        wish={{ showWishList, setShowWishList }}
        setShowCategories={setShowCategories}
        showCategories={showCategories}
        setShowSearchResults={setShowSearchResults}
        showSearchResults={showSearchResults}
      />
      <Categories
        showCategories={showCategories}
        setShowCategories={setShowCategories}
      />
      <Wish
        wish={wishList}
        setWish={setWishList}
        showWish={showWishList}
        setShowWish={setShowWishList}
      />
      <Cart />
      <SearchResults
        showResults={{ showSearchResults, setShowSearchResults }}
      />
      {/*  */}
      <Outlet
        //
        context={{
          //  We use in Comments component for showing LOGIN (only loged users can comment)
          setShowLogin,
          //  We use in Comments component to select Authentication Type (Register or Login)
          setAuthType,
          //  We use in Products component to update wish list
          setWishList,
        }}
      />
      {/* We use to display notification (Wish List Counter)  */}
      <Nav
        wish={{ wishList, setShowWishList, showWishList }}
        login={setShowLogin}
      />
      {/* Show/Hide Component */}
      {showLogin && (
        <Login
          login={{ setShowLogin, showLogin }}
          authType={{
            AuthType,
            setAuthType,
          }}
        />
      )}
    </div>
  );
}

export default Layout;
