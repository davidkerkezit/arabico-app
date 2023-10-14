import React, { useContext, useEffect, useState } from "react";
// Import Components
import ProductsHeader from "./ProductsComponents/ProductsHeader";
// Import React Icons
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { AiOutlineShoppingCart, AiOutlineDown } from "react-icons/ai";
import { cartContext } from "../store/CartProvider";
// import from React Router
import {
  useLocation,
  useNavigate,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "react-router-dom";
// Lines Ellipsis
import LinesEllipsis from "react-lines-ellipsis";

function Products({ data, totalAmountOfPerfume }) {
  // State for "add to cart" button animation
  const [addedProductId, setAddedProductId] = useState(null);
  // Loader and action limit of fetched perfumes
  const [loadedProducts, setLoadedProducts] = useState(10);
  // Sort options
  const [sortOption, setSortOption] = useState("Featured");
  //  Show/Hide sort container
  const [showSortOption, setShowSortOption] = useState(false);
  // Wish array
  const [wishArray, setWishArray] = useState(
    localStorage.getItem("wishList") === null
      ? []
      : localStorage.getItem("wishList")
  );
  // Context
  const cartCtx = useContext(cartContext);
  const { setWishList, wishList } = useOutletContext();
  // React router hooks
  const location = useLocation();
  const submit = useSubmit();
  const navigate = useNavigate();

  // ADD TO CART HANDLER
  const addToCartHandler = (p) => {
    // ANIMATION
    setAddedProductId(p.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 100);
    // Cart Context function
    cartCtx.addProduct({
      perfumeId: p.attributes.productId,
      id: p.id,
      title: p.attributes.title,
      imgUrl: p.attributes.perfume.data.attributes.url,
      price: p.attributes.price,
      volume: p.attributes.volume,
    });
  };
  // ADD TO WISHLIST HANDLER
  const addWishHandler = (id) => {
    // First Wish added
    if (localStorage.getItem("wishList") === null) {
      let wishList = [id];
      localStorage.setItem("wishList", JSON.stringify(wishList));
      // Adding after first wish
    } else {
      let storedWishes = JSON.parse(localStorage.getItem("wishList"));
      storedWishes.push(id);
      localStorage.setItem("wishList", JSON.stringify(storedWishes));
      //
      setWishArray(storedWishes);
      // setWishList from outlet context for ANIMATION
      setWishList(storedWishes);
    }
  };
  // REMOVE FROM  WISHLIST HANDLER
  const removeWishHandler = (id) => {
    let storedWishes = JSON.parse(localStorage.getItem("wishList"));
    const index = storedWishes.indexOf(id);
    storedWishes.splice(index, 1);
    localStorage.setItem("wishList", JSON.stringify(storedWishes));
    setWishArray(storedWishes);
    // setWishList from outlet context for ANIMATION
    setWishList(storedWishes);
  };
  // Hide sort container after selecting sort option
  useEffect(() => {
    setTimeout(() => {
      setShowSortOption(false);
    }, 100);
  }, [sortOption]);
  // Show more handler
  const showMoreHandler = () => {
    setLoadedProducts(loadedProducts + 10);
    submit(
      {
        loadedProducts: loadedProducts + 10,
        choice: "morePerfumes",
        sortOption: sortOption,
      },
      {
        method: "post",
      }
    );
  };
  return (
    <div className="relative flex flex-col pb-14">
      <ProductsHeader
        setShowSortOption={setShowSortOption}
        showSortOption={showSortOption}
      />
      <div className="grid grid-cols-2 gap-4  mx-4 ss:grid-cols-3 ss:mx-15 sm:mx-32 md:grid-cols-4 md:mx-20 lg:mx-30 xl:mx-60">
        {data &&
          data.map((p) => {
            return (
              // Product container
              <div
                onClick={() => navigate(`/perfumes/${p.attributes.productId}`)}
                key={p.id}
                className="relative h-[19rem] bg-gradient-to-t from-silver/60 to-transparent text-whiteness  flex flex-col  items-center gap-2 py-5 rounded-xl overflow-hidden animate-opacityAnimation md:h-[21rem] md:border-[1px] md:border-light-gold/10 md:hover:to-whiteness/5 md:hover:border-light-gold/30 md:duration-100  md:cursor-pointer md:gap-5"
              >
                {/* Product image */}
                <img
                  className="w-[5rem] h-[10rem] object-contain "
                  src={`https://arabico-strapi.onrender.com${p.attributes.perfume.data.attributes.url}`}
                  alt="product"
                />{" "}
                <div className=" w-full px-4">
                  <div className="flex flex-col justify-center items-center md:gap-2">
                    <h5
                      className={`font-headers-secondary font-semibold text-xl 
                         ${
                           p.attributes.discount
                             ? "text-light-gold"
                             : "text-whiteness"
                         }`}
                    >
                      ${p.attributes.price}
                    </h5>
                    <LinesEllipsis
                      text={p.attributes.title}
                      maxLine="1"
                      ellipsis="..."
                      trimRight
                      basedOn="letters"
                      className="font-secondary text-sm text-whiteness/60 text-center md:hidden "
                    />
                    <p className="font-secondary text-sm text-whiteness/60 text-center hidden md:block md:text-base ">
                      {p.attributes.title}
                    </p>
                    <button
                      className={` ${
                        addedProductId === p.id
                          ? "border-light-gold bg-whiteness/5"
                          : "border-light-gold/50 bg-coal/60"
                      } absolute flex items-center gap-1 bottom-4 border-[1.5px] pl-3  mt-2 rounded-l-full rounded-r-full text-sm md:hover:bg-whiteness/10 md:hover:border-light-gold/90 md:duration-100`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCartHandler(p);
                      }}
                    >
                      <p className="font-secondary text-whiteness md:px-3  ">
                        Add to cart
                      </p>
                      <div
                        className={`bg-light-gold p-2 m-[2px] rounded-full text-coal ${
                          addedProductId === p.id ? "scale-90 " : "scale-100 "
                        }`}
                      >
                        <AiOutlineShoppingCart />
                      </div>
                    </button>
                  </div>
                </div>
                {/* Absolute 'Sale' container */}
                {p.attributes.discount && (
                  <div className="absolute w-[10rem] bg-red-500 -right-14 top-4 text-sm font-secondary tracking-wide text-center uppercase rotate-45">
                    sale
                  </div>
                )}
                {/* Favorite icons */}
                <div className=" absolute left-2 top-2 text-center uppercase font-headers ">
                  {wishArray.includes(p.id) ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeWishHandler(p.id);
                      }}
                      className="bg-red-500/5 p-1 rounded-full z-20  md:hover:scale-110 duration-150"
                    >
                      <MdOutlineFavorite className="text-light-gold text-lg" />
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addWishHandler(p.id);
                      }}
                      className="bg-light-gold/10 p-1 rounded-full z-20 md:hover:scale-110 duration-150"
                    >
                      <MdFavoriteBorder className="text-xl text-light-gold" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      {/* SHOW MORE BUTTON */}
      {(location.pathname === "/search/" ||
        location.pathname === "/perfumes") &&
        totalAmountOfPerfume - data.length > 0 && (
          <button
            className="bg-coal/60 flex items-center gap-1 mx-auto text-sm mt-6 pl-3 border-[1px] border-light-gold/30"
            onClick={showMoreHandler}
          >
            <p className="font-secondary text-whiteness ">Show more</p>
            <div className="bg-silver p-2 m-[2px]  text-light-gold/90">
              <AiOutlineDown />
            </div>
          </button>
        )}
      {/*  */}
      {showSortOption && (
        <div
          onClick={() => setShowSortOption(false)}
          className="absolute w-full h-[100vh] bg-transparent bottom-0 top-0 left-0 right-0 z-40"
        />
      )}
    </div>
  );
}

export default Products;
