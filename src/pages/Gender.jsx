import React from "react";
// React Router
import { useLoaderData, useParams } from "react-router-dom";
// Components
import QuoteBanner from "../components/GenderComponents/QuoteBanner";
import Products from "../components/Products";
// Import images
import FEMALE from "../assets/female.jpg";
import MALE from "../assets/male.jpg";
import Back from "../components/Back";
// Informations for banner
const gendersInfo = [
  {
    id: 1,
    gender: "female",
    quote:
      "Ladies,a man will never remember your handbag,but he will remember your perfume.",
    writer: "Olivier Creed",
    imageUrl: FEMALE,
  },
  {
    id: 2,
    gender: "male",
    quote: "Perfume: a cocktail of memories and emotion.",
    writer: "Jeffrey Stepakoff",
    imageUrl: MALE,
  },
];
function Gender() {
  // gender => Gender ID
  const { gender } = useParams();
  // perfumesByGender => all perfumes by selected gender
  const perfumesByGender = useLoaderData();
  // // Quotes informations by selected gender
  const Quotes = gendersInfo.find((item) => item.gender === gender);

  return (
    <div className="md:mt-[3.2rem]">
      <Back />
      <QuoteBanner data={Quotes} />
      {/* <Discounts data={discountedPerfumes} /> */}
      <h4 className="text-whiteness logo-secondary-headers font-semibold uppercase text-center text-lg py-2  bg-gradient-to-r from-coal via-zinc-800 to-coal  border-y-[1px] border-light-gold/30">
        {gender}
      </h4>
      <Products data={perfumesByGender} />
    </div>
  );
}

export default Gender;
// LOADER 1 - Get all perfumes by selected gender
export async function perfumesByGenderLoader({ params }) {
  const res = await fetch(
    `https://arabico-strapi.onrender.com/api/perfumes?populate=*&filters[genderCategory][title][$eqi]=${params.gender}&filters[soon][$ne][1]=true`
  );
  const data = await res.json();
  return data.data;
}
