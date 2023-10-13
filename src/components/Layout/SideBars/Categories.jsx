import React from "react";
// Components
import GenderCategory from "./CategoriesComponents/GenderCategory";
import BrandCategory from "./CategoriesComponents/BrandCategory";
import CategoryHeader from "./CategoriesComponents/CategoryHeader";
import CategoryFooter from "./CategoriesComponents/CategoryFooter";

function Categories({ showCategories, setShowCategories }) {
  return (
    // MAIN CATEGORIES CONTAINER
    <div
      className={`fixed w-full bg-coal/95 top-0 bottom-0 left-0 backdrop-blur-sm py-2 z-50 ${
        showCategories === "open" && `animate-openMobileNav`
      } ${showCategories === "close" && `animate-closeMobileNav`} ${
        showCategories === "" && `ml-[-100%]`
      }`}
    >
      {/* Category Header */}
      <CategoryHeader setShowCategories={setShowCategories} />
      {/*  Brand/Gender Category Container */}
      <div className="text-whiteness mt-2 flex flex-col ">
        <GenderCategory setShowCategories={setShowCategories} />
        <BrandCategory
          setShowCategories={setShowCategories}
          showCategories={showCategories}
        />
      </div>
      {/* Brands Logos Container */}
      <CategoryFooter />
    </div>
  );
}

export default Categories;
