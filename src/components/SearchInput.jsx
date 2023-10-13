import React, { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import { BiCheck } from "react-icons/bi";
import { Bs0Circle, BsCheck } from "react-icons/bs";
import { includes } from "lodash";
function SearchInput({ component, setValue, setOption }) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchOption, setSearchOption] = useState("perfumes");
  const [showSearchOption, setShowSearchOption] = useState(false);
  const location = useLocation();
  const searchHandler = (e) => {
    e.preventDefault();
    searchOption === "perfumes" && navigate(`/search/?perfume=${searchValue}`);
    searchOption === "users" && navigate(`/search/?user=${searchValue}`);
  };
  useEffect(() => {
    setTimeout(() => {
      setShowSearchOption(false);
      setOption && setOption(searchOption);
    }, 100);
  }, [searchOption]);
  useEffect(() => {
    location.search.includes("user") && setSearchOption("users");
  }, [location]);

  return (
    <div
      className={`flex  justify-center gap-2 my-4 items-center relative md:my-0  ${
        component !== "searchResult" && "md:hidden"
      } `}
    >
      <form
        className=" w-[80%]   flex items-center justify-center bg-gold rounded-3xl px-4 md:w-full "
        onSubmit={searchHandler}
      >
        <button onClick={searchHandler}>
          <RiSearch2Line className="text-3xl text-light-gold/60  duration-100" />
        </button>
        <input
          type="text"
          placeholder={
            searchOption === "perfumes"
              ? "Search for perfumes"
              : "Search for users"
          }
          className="w-full  px-4 py-[12px] bg-transparent    font-secondary focus:outline-none text-whiteness rounded-full placeholder:text-gray-300"
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) =>
            (e.target.placeholder =
              searchOption === "perfumes"
                ? "Search for perfumes"
                : "Search for users")
          }
          onChange={(e) => {
            setSearchValue(e.target.value);
            component === "searchResult" && setValue(e.target.value);
          }}
        />
      </form>
      <button
        onClick={() => {
          setShowSearchOption((prev) => !prev);
        }}
        className=" bg-gold   cursor-pointer z-20  aspect-square w-[2.6rem] text-2xl h-full flex items-center justify-center text-light-gold/80  rounded-full  "
      >
        <FiFilter />
      </button>
      {showSearchOption && (
        <div className="bg-black/30 z-50 backdrop-blur-sm  border-[1px] border-light-gold/20 rounded-sm text-whiteness/95 absolute flex flex-col -bottom-14 right-10">
          <button
            onClick={() => {
              setSearchOption("perfumes");
            }}
            className={`py-1 flex flex-row items-center justify-between px-2 z-50  w-[10rem] ${
              searchOption === "perfumes" && "bg-whiteness/5"
            }`}
          >
            <p className="">Perfumes</p>
            {searchOption === "perfumes" && (
              <BsCheck className="bg-silver/40" />
            )}
          </button>
          <button
            onClick={() => {
              setSearchOption("users");
            }}
            className={` py-1 flex flex-row items-center justify-between px-2    w-[10rem] ${
              searchOption === "users" && "bg-whiteness/5"
            } `}
          >
            <p className="">Users</p>
            {searchOption === "users" && <BsCheck className="bg-silver/40" />}
          </button>
        </div>
      )}
      {showSearchOption && (
        <div
          onClick={() => setShowSearchOption(false)}
          className="bg-transparent absolute w-full bottom-0 top-0 left-0 right-0 h-[100vh] z-40"
        />
      )}
    </div>
  );
}

export default SearchInput;
