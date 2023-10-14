import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import Products from "./Products";
import NORESULT from "../assets/search-result.png";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import Users from "./Users";
import { HiOutlineUsers } from "react-icons/hi";
import { AiOutlineClose as Close } from "react-icons/ai";
function SearchResults({ showResults }) {
  const [option, setOption] = useState("perfumes");
  const [value, setValue] = useState("");
  const [searchedPerfumes, setSearchedPerfumes] = useState([]);
  const fetchData = async () => {
    if (option === "perfumes") {
      const res = await fetch(
        `https://arabico-strapi.onrender.com/api/perfumes?populate=*&filters[title][$containsi]=${value}`
      );
      const data = await res.json();

      setSearchedPerfumes(data.data);
    } else if (option === "users") {
      const res = await fetch(
        `https://arabico-strapi.onrender.com/api/arabicousers?populate=*&filters[name][$containsi]=${value}`
      );

      const data = await res.json();

      setSearchedPerfumes(data.data);
    }
  };
  console.log(showResults);
  useEffect(() => {
    if (showResults.showSearchResults === "open" && value !== "") {
      fetchData();
    }
  }, [value, showResults.showSearchResults]);

  return (
    <div className="relative  ">
      <div
        onClick={() => {
          showResults.setShowSearchResults("close");
        }}
        className={`bg-black/40 fixed top-0 w-full h-[100vh] z-50 ${
          showResults.showSearchResults === "close" && "hidden"
        } ${showResults.showSearchResults === "" && `hidden `}`}
      />
      <div
        className={`fixed  backdrop-blur-sm w-full px-2 xl:w-[30%] lg:w-[32%] md:w-[37%] h-[100vH] bg-coal/95 hidden md:block
    no-scrollbar -top-2 bottom-0 md:absolute  md:right-0 py-4 z-50 text-whiteness overflow-scroll md:top-[0] ${
      showResults.showSearchResults === "close" && "animate-closeMDCart"
    } ${showResults.showSearchResults === "open" && "animate-openMDCart"} ${
          showResults.showSearchResults === "" && "md:mr-[-40%]"
        }`}
      >
        <div className="flex justify-between items-center py-4 px-2 mb-5 ">
          <div className="bg-gold  text-2xl cursor-pointer text-light-gold/90  rounded-full p-2">
            <Close onClick={() => showResults.setShowSearchResults("close")} />
          </div>
          <h1
            className={` uppercase text-whiteness tracking-[2px] font-logo  text-xl ${
              showResults.showSearchResults === "open" &&
              "animate-delayAnimation "
            }`}
          >
            Your Search
          </h1>
        </div>
        <SearchInput
          component={"searchResult"}
          setValue={setValue}
          setOption={setOption}
        />
        {option === "perfumes" && (
          <div className="grid grid-cols-2 p-4 gap-2 w-full  ">
            {searchedPerfumes.length !== 0 &&
              value !== "" &&
              searchedPerfumes.map((product) => (
                <Link
                  onClick={() => {
                    showResults.setShowSearchResults("close");
                  }}
                  to={"perfumes/" + product.attributes.productId}
                  className=" w-full bg-zinc-900 hover:border-light-gold/80 group hover:bg-whiteness/5  border-[1px] duration-150 border-light-gold/25 aspect-square flex flex-col items-center py-5 text-center justify-between h-[14rem]"
                >
                  <p className="font-secondary text-lg">
                    {" "}
                    {product.attributes.title}
                  </p>
                  <img
                    src={`https://arabico-strapi.onrender.com${product.attributes.perfume.data.attributes.url}`}
                    alt=""
                    className="w-[4.2rem] h-[8rem] object-contain group-hover:scale-105 duration-150"
                  />
                </Link>
              ))}
          </div>
        )}
        {option === "users" && (
          <div className=" p-4  w-full  ">
            {searchedPerfumes.length !== 0 &&
              value !== "" &&
              searchedPerfumes.map((product) => (
                <Users users={searchedPerfumes} />
              ))}
          </div>
        )}
        {searchedPerfumes.length === 0 && option === "perfumes" && (
          <div className="relative w-full  h-[20rem] ">
            <h5 className="text-center pt-16 font-secondary text-lg text-whiteness/60">
              Sorry,we couldn't find any results
            </h5>
            <img
              src={NORESULT}
              alt=""
              className="w-[7.5rem] contrast-0 absolute top-0 bottom-0 left-0 right-8 mx-auto my-auto "
            />
            <BsSearch className="text-[5rem] text-whiteness  absolute top-[5rem] left-[4rem] right-0 bottom-0  mx-auto my-auto animate-noResultSearchAnimation " />
          </div>
        )}
        {searchedPerfumes.length === 0 && option === "users" && (
          <div className="relative w-full  h-[20rem] ">
            <h5 className="text-center pt-16 font-secondary text-lg text-whiteness/60">
              Sorry,we couldn't find any results
            </h5>
            <HiOutlineUsers className="text-[8rem] contrast-0 absolute top-0 bottom-0 left-0 right-8 mx-auto my-auto" />
            <BsSearch className="text-[5rem] text-whiteness  absolute top-[5rem] left-[4rem] right-0 bottom-0  mx-auto my-auto animate-noResultSearchAnimation " />
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
