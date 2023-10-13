import React from "react";
// REACT ICONS
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function AboutPerfume({ data, rating }) {
  return (
    <div className="relative bg-silver/20 py-6 px-6">
      <div className="flex flex-col gap-1">
        <h3 className="text-whiteness/90 font-secondary text-xl ">
          {data.attributes.title}{" "}
          <span className="text-sm text-whiteness/50">
            {data.attributes.volume}ml
          </span>
        </h3>

        <div className="flex flex-row items-center gap-2">
          <div className="flex">
            {parseInt(rating.ratingQuantity) !== 0 &&
              [...Array(parseInt(rating.averageRating.toFixed(0)))].map((s) => (
                <AiFillStar key={s} className="text-light-gold" />
              ))}
            {parseInt(rating.ratingQuantity) !== 0 &&
              [...Array(5 - parseInt(rating.averageRating.toFixed(0)))].map(
                (s, index) => (
                  <AiOutlineStar key={index} className="text-light-gold" />
                )
              )}
            {parseInt(rating.ratingQuantity) === 0 && (
              <h3 className="text-light-gold/75 font-secondary">
                There are no ratings for this perfume yet.
              </h3>
            )}
          </div>

          <p className="text-whiteness font-secondary">
            {parseInt(rating.ratingQuantity) !== 0
              ? "(" + rating.ratingQuantity + ")"
              : ""}
          </p>
        </div>
        <p className="text-whiteness/40 font-secondary text-lg">
          ${data.attributes.price}
        </p>
      </div>
      <p className="w-[80%] text-justify text-whiteness/75 font-secondary py-4 hidden md:block">
        {data.attributes.About}
      </p>
    </div>
  );
}

export default AboutPerfume;
