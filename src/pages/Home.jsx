import React from "react";
// React router
import { useActionData, useLoaderData } from "react-router-dom";
import { defer } from "react-router-dom";
// Components
import LatestPerfumes from "../components/HomeComponents/LatestPerfumes";
import PromoPerfume from "../components/HomeComponents/PromoPerfume";
import Products from "../components/Products";
import SearchInput from "../components/SearchInput";
import Banner from "../components/HomeComponents/Banner";

function Home() {
  // promoPerfume => soon === true
  // latestPerfume => isNew === true
  // limitedNumberOfPerfumes => 10 perfumes on first render

  const { promoPerfume, latestPerfumes, limitedNumberOfPerfumes } =
    useLoaderData();
  // morePerfumes => show more perfumes (onClick)
  const morePerfumes = useActionData();

  return (
    <div className="md:mt-[3.2rem]">
      <SearchInput />
      <PromoPerfume data={promoPerfume} />
      <Banner data={promoPerfume} />
      <LatestPerfumes data={latestPerfumes} />
      <Products
        data={
          morePerfumes === undefined ? limitedNumberOfPerfumes : morePerfumes
        }
      />
    </div>
  );
}

export default Home;
// PAGE LOADERS
// LOADER 1 - Get perfumes with limit (Pagination)
export async function limitedNumberOfPerfumesLoader() {
  const res = await fetch(
    `https://arabico-strapi.onrender.com/api/perfumes?populate=*&sort[0]=ratingQuantity:desc&pagination[pageSize]=12&filters[soon][$ne][1]=true`
  );
  const data = await res.json();
  return data.data;
}
// LOADER 2 - Get perfume with soon === true
export async function getPromoPerfume() {
  const res = await fetch(
    `https://arabico-strapi.onrender.com/api/perfumes?populate=*&filters[soon][$eq]=true`
  );
  const data = await res.json();
  return data.data;
}
// LOADER 3 : Get perfumes with isNew === true
export async function getLatestPerfumes() {
  const res = await fetch(
    `https://arabico-strapi.onrender.com/api/perfumes?populate=*&filters[isNew][$eq]=true`
  );
  const data = await res.json();
  return data.data;
}
export async function homePageLoaders() {
  const [promoPerfume, latestPerfumes, limitedNumberOfPerfumes] =
    await Promise.all([
      getPromoPerfume(),
      getLatestPerfumes(),
      limitedNumberOfPerfumesLoader(),
    ]);
  return defer({
    promoPerfume,
    latestPerfumes,
    limitedNumberOfPerfumes,
  });
}
