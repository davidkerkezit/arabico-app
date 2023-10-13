import React, { useEffect, useState } from "react";
// Components
import SortOption from "./SortOption";
// REACT ROUTER
import { Link } from "react-router-dom";
import { useLocation, useSubmit } from "react-router-dom";
// React Icons
import { IoMdOptions } from "react-icons/io";
import { BsArrowRight } from "react-icons/bs";
function ProductsHeader({ setShowSortOption, showSortOption }) {
  const [sortOption, setSortOption] = useState("Featured");
  const location = useLocation();
  const submit = useSubmit();

  useEffect(() => {
    submit(
      {
        sortOption: sortOption,
      },
      {
        method: "post",
      }
    );
  }, [sortOption]);
  return (
    <div className="flex justify-between mx-4 my-4 ss:mx-15 sm:mx-32 md:mx-20 md:py-4 lg:mx-30 xl:mx-60">
      <h4 className="logo-secondary-headers font-bold text-lg text-whiteness md:text-xl ">
        {location.pathname === "/search/" && "Search results"}
        {location.pathname === "/perfumes" && "All perfumes"}
        {location.pathname === "/" && "Most popular"}
      </h4>
      <div className="relative">
        {location.pathname === "/perfumes" && (
          <button
            onClick={() => {
              setShowSortOption((prev) => !prev);
            }}
            className="w-[2.6rem] h-full bg-gold flex items-center justify-center text-xl  text-light-gold/80  rounded-full  cursor-pointer z-40 aspect-square"
          >
            <IoMdOptions />
          </button>
        )}

        {showSortOption && (
          <div className="absolute bg-black/70 text-whiteness/95 flex flex-col top-9 right-6 z-50 backdrop-blur-lg border-[1px] border-light-gold/20 rounded-sm">
            <SortOption
              selected={"Featured"}
              title={"Featured"}
              setSortOption={setSortOption}
              sortOption={sortOption}
              setShowSortOption={setShowSortOption}
            />
            <SortOption
              selected={"LowerPrice"}
              title={"Price: Low to High"}
              setSortOption={setSortOption}
              sortOption={sortOption}
              setShowSortOption={setShowSortOption}
            />
            <SortOption
              selected={"HigherPrice"}
              title={"Price: High to Low"}
              setSortOption={setSortOption}
              sortOption={sortOption}
              setShowSortOption={setShowSortOption}
            />
            <SortOption
              selected={"TopRated"}
              title={"Top rated"}
              setSortOption={setSortOption}
              sortOption={sortOption}
              setShowSortOption={setShowSortOption}
            />
            <SortOption
              selected={"MostCommented"}
              title={"Most Commented"}
              setSortOption={setSortOption}
              sortOption={sortOption}
              setShowSortOption={setShowSortOption}
            />
          </div>
        )}
      </div>
      {location.pathname === "/" && (
        <div className="flex items-center justify-center gap-1">
          <Link to={"/perfumes"} className="font-secondary text-whiteness/70 ">
            View all
          </Link>
          <BsArrowRight className="text-whiteness/70" />
        </div>
      )}
    </div>
  );
}

export default ProductsHeader;
