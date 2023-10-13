import React, { useEffect } from "react";
// React Router
import { useActionData, useLoaderData } from "react-router-dom";
// Components
import Products from "../components/Products";
import Back from "../components/Back";
function Perfumes() {
  // limitedNumberOfPerfumes => 10 perfumes on first render
  const limitedNumberOfPerfumes = useLoaderData();
  // morePerfumes => show more perfumes (onClick)
  const morePerfumes = useActionData();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="md:mt-[3.2rem]">
      <Back />
      <Products
        // First render => morePerfumes === undefined => limit 10 perfumes
        // After action => morePerfumes !== undefined => limit 10 + 10 ... perfumes
        data={
          morePerfumes === undefined
            ? limitedNumberOfPerfumes.data
            : morePerfumes
        }
        totalAmountOfPerfume={limitedNumberOfPerfumes.meta.pagination.total}
      />
    </div>
  );
}

export default Perfumes;
// LOADER 1 - Get perfumes with limit (Pagination)
export async function limitedNumberOfPerfumesLoader() {
  const res = await fetch(
    `https://arabico-strapi.onrender.com/api/perfumes?populate=*&pagination[limit]=12&filters[soon][$ne][1]=true`
  );
  const data = await res.json();

  return data;
}
// ACTION 1 = fetch more perfumes with limit + 10 (onClick)
export async function showMoreAction({ request }) {
  const form = await request.formData();
  const loadedPerfumes = form.get("loadedProducts");
  const sortOption = form.get("sortOption");
  const choice = form.get("choice");
  let apiSort = "";
  let apiPagination = "&pagination[limit]=12";
  if (choice === "morePerfumes") {
    apiPagination = `&pagination[limit]=${parseInt(loadedPerfumes)}`;
  }

  switch (sortOption) {
    case "LowerPrice":
      apiSort = "&sort[0]=price";
      break;
    case "HigherPrice":
      apiSort = "&sort[0]=price:desc";
      break;
    case "MostCommented":
      apiSort = "&sort[0]=commentsQuantity:desc";
      break;

    default:
      break;
  }
  if (sortOption !== "TopRated") {
    const res = await fetch(
      `https://arabico-strapi.onrender.com/api/perfumes?populate=*${apiPagination}${apiSort}&filters[soon][$ne][1]=true`
    );

    const data = await res.json();
    return data.data;
  } else {
    const res = await fetch(
      `https://arabico-strapi.onrender.com/api/perfumes?populate=*&filters[soon][$ne][1]=true`
    );
    const data = await res.json();
    let ratings = [];
    data.data.forEach((perfume) => {
      let final = 0;
      for (let key in perfume.attributes.Stars) {
        final = final + parseInt(key) * perfume.attributes.Stars[key];
      }
      if (perfume.attributes.soon !== true) {
        ratings.push({
          id: perfume.id,
          attributes: perfume.attributes,
          final: final === 0 ? 0 : final / perfume.attributes.ratingQuantity,
        });
      }
    });
    ratings.sort(function (a, b) {
      return parseFloat(b.final) - parseFloat(a.final);
    });

    return ratings;
  }
}
