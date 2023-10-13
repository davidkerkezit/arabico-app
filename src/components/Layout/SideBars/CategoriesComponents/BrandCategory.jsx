import React, { useEffect } from "react";
// React Router
import { Link } from "react-router-dom";
// Custom Hook for fetching
import useFetch from "../../../../hooks/useFetch";

function BrandCategory({ setShowCategories, showCategories }) {
  // Fetching only brands  information without perfumes data
  const { data: brands } = useFetch(
    "https://arabico-strapi.onrender.com/api/brands"
  );

  return (
    <div className="w-full flex flex-col">
      <h1 className="bg-gradient-to-r from-coal via-zinc-800 to-coal text-whiteness font-semibold uppercase text-center text-lg py-2 border-y-[1px] border-light-gold/30 md:hidden">
        Brands
      </h1>
      {brands?.map((brand) => {
        return (
          <Link
            onClick={() => setShowCategories && setShowCategories("close")}
            key={brand.id}
            className="mobile_nav_category"
            to={`/brand/${brand.attributes.title}`}
          >
            {brand.attributes.title}
          </Link>
        );
      })}
    </div>
  );
}

export default BrandCategory;
