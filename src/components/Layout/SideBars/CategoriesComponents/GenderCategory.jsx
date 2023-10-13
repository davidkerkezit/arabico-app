import React from "react";
// React Router
import { Link } from "react-router-dom";
// We can fetch from STRAPI but the genders are always the same
const genders = ["male", "female"];

function GenderCategory({ setShowCategories }) {
  return (
    <div className="w-full flex flex-col">
      <h1 className="bg-gradient-to-r from-coal via-zinc-800 to-coal text-whiteness font-semibold uppercase text-center text-lg py-2 border-y-[1px] border-light-gold/30 md:hidden">
        Gender
      </h1>
      {genders?.map((gender) => {
        return (
          <Link
            onClick={() => setShowCategories && setShowCategories("close")}
            key={gender}
            className="mobile_nav_category "
            to={`/gender/${gender}`}
          >
            {gender}
          </Link>
        );
      })}
    </div>
  );
}

export default GenderCategory;
