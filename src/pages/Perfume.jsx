import React, { useEffect } from "react";
// React Router
import { defer, useActionData } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
// Axios
import axios from "axios";
// Import components
import PerfumeDetails from "../components/PerfumeComponents/PerfumeDetails";
import Comments from "../components/Comments";
import UserRating from "../components/PerfumeComponents/UserRating";
import SearchInput from "../components/SearchInput";
import Back from "../components/Back";
//
import { isEmpty } from "lodash";

function Perfume() {
  const { selectedPerfume, comments, userRating } = useLoaderData();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const commentsByPage = useActionData();
  return (
    <div className="md:mt-[3.2rem]">
      <Back />
      <SearchInput />
      <PerfumeDetails
        data={selectedPerfume.selectedPerfume[0]}
        averageRating={selectedPerfume.averageRating}
        ratingQuantity={selectedPerfume.ratingQuantity}
      />
      <UserRating
        data={selectedPerfume.selectedPerfume[0]}
        userRating={userRating}
      />
      <Comments
        data={commentsByPage ? commentsByPage.comments : comments.comments}
        commentsCount={comments.commentsQuantity}
      />
    </div>
  );
}

export default Perfume;
// LOADERS
// LOADER 1 : get selected perfume
export async function getInformationAboutSelectedPerfumeLoader(params) {
  const res = await fetch(
    `https://arabico-strapi.onrender.com/api/perfumes?populate=*&filters[productId][$eq]=${params.id}`
  );
  // Selected perfume
  const selectedPerfume = await res.json();
  // Brand of selected perfume
  const selectedBrand =
    selectedPerfume.data[0].attributes.brandCategory.data.attributes.title;
  // Fetch all perfumes by selected brand
  const response = await fetch(
    `https://arabico-strapi.onrender.com/api/perfumes?populate=*&filters[brandCategory][title][$eq]=${selectedBrand}`
  );
  const PerfumesBySelectedBrand = await response.json();
  let rating = 0;
  // Stars => { "1": 0, "2": 0, "3": 1, "4": 0, "5": 0} = star : total amount of star
  for (let key in selectedPerfume.data[0].attributes.Stars) {
    rating =
      rating + parseInt(key * selectedPerfume.data[0].attributes.Stars[key]);
  }

  return {
    selectedPerfume: selectedPerfume.data,
    perfumeByBrand: PerfumesBySelectedBrand.data,
    averageRating:
      rating !== 0 &&
      parseInt(selectedPerfume.data[0].attributes.ratingQuantity) !== 0
        ? rating / parseInt(selectedPerfume.data[0].attributes.ratingQuantity)
        : 0,
    ratingQuantity: selectedPerfume.data[0].attributes.ratingQuantity,
  };
}
// LOADER 2 : Get comments of selected perfume
export async function getCommentsLoader(params) {
  const res = await fetch(
    `https://arabico-strapi.onrender.com/api/ratings?populate=*&[filters][perfumeId][$eq]=${params.id}&pagination[limit]=10`
  );

  const data = await res.json();

  return {
    comments: data.data,
    commentsQuantity: data.meta.pagination.total,
  };
}
// LOADER 3 : Get average rating for selected perfume
export async function getRating(params) {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const res = await fetch(
    `https://arabico-strapi.onrender.com/api/arabicousers?populate=*&[filters][username][$eq]=${username}`
  );
  const data = await res.json();
  if (token !== null) {
    for (let key in data.data[0].attributes.stars) {
      if (key === params.id) {
        return data.data[0].attributes.stars[key];
      }
    }
  }
}

// ALL LOADERS
export async function perfumePageLoaders({ params }) {
  const [selectedPerfume, comments, userRating] = await Promise.all([
    getInformationAboutSelectedPerfumeLoader(params),
    getCommentsLoader(params),
    getRating(params),
  ]);

  return defer({ selectedPerfume, comments, userRating });
}

// ACTION
export async function perfumePageActions({ request, params }) {
  // FormData
  const form = await request.formData();
  const formType = form.get("formType");
  //
  // If we adding review
  //

  if (formType === "addReview") {
    // Fetch data of selected perfume
    const test = form.get("id");

    const resPerfume = await fetch(
      `https://arabico-strapi.onrender.com/api/perfumes?populate=*&[filters][id][$eq]=${test}`
    );
    // Perfume DATA
    const dataPerfume = await resPerfume.json();
    // All ratings for this perfume
    const perfumeRatings = dataPerfume.data[0].attributes.Stars;
    // username from localeStorage
    const activeUser = form.get("username");
    // Fetch data of selected user by username
    const resUser = await fetch(
      `https://arabico-strapi.onrender.com/api/arabicousers?populate=*&[filters][username][$eq]=${activeUser}`
    );
    // user DATA
    const dataUser = await resUser.json();
    // All ratings of this user
    const userRatings = dataUser.data[0].attributes.stars;
    // User selected rating
    const selectedStar = form.get("selectedStar");
    // params = perfume id
    const perfumeId = params.id;
    const ratedPerfume = {};
    ratedPerfume[perfumeId] = parseInt(selectedStar);
    const id = form.get("id");
    let ratedPerfumes = {};
    // First Review
    if (isEmpty(userRatings)) {
      ratedPerfumes = {
        ...ratedPerfume,
      };
    }
    // Other Reviews
    for (let key in userRatings) {
      if (key !== params.id) {
        ratedPerfumes = {
          ...userRatings,
          ...ratedPerfume,
        };
      }
    }
    // PUT reviews to STRAPI
    axios.put(
      `https://arabico-strapi.onrender.com/api/arabicousers/${dataUser.data[0].id}/?populate=stars `,
      {
        data: { stars: ratedPerfumes },
      }
    );
    for (let key in perfumeRatings) {
      if (key === selectedStar) {
        perfumeRatings[key] = perfumeRatings[key] + 1;
      }
    }
    axios.put(
      `https://arabico-strapi.onrender.com/api/perfumes/${id}/?populate=Stars `,
      {
        data: {
          Stars: perfumeRatings,
          ratingQuantity:
            parseInt(dataPerfume.data[0].attributes.ratingQuantity) + 1,
        },
      }
    );
    //
    // If we adding comment

    return redirect("/perfumes/" + dataPerfume.data[0].attributes.productId);
  } else if (formType === "addComment") {
    const username = form.get("username");
    const comment = form.get("comment");

    axios.post(`https://arabico-strapi.onrender.com/api/atings/`, {
      data: { username, description: comment, perfumeId: params.id },
    });
    const resPerfume = await fetch(
      `https://arabico-strapi.onrender.com/api/perfumes?populate=*&[filters][productId][$eq]=${params.id}`
    );
    // Perfume DATA
    const dataPerfume = await resPerfume.json();
    const commentsQuantity = dataPerfume.data[0].attributes.commentsQuantity;
    axios.put(
      `https://arabico-strapi.onrender.com/api/perfumes/${dataPerfume.data[0].id}`,
      {
        data: { commentsQuantity: parseInt(commentsQuantity) + 1 },
      }
    );
  } else if (formType === "delete") {
    const activeUser = form.get("username");
    const resUser = await fetch(
      `https://arabico-strapi.onrender.com/api/arabicousers?populate=*&[filters][username][$eq]=${activeUser}`
    );
    // user DATA
    const dataUser = await resUser.json();
    const userRatings = dataUser.data[0].attributes.stars;
    // Fetch data of selected perfume
    const resPerfume = await fetch(
      `https://arabico-strapi.onrender.com/api/perfumes?populate=*&[filters][productId][$eq]=${params.id}`
    );
    // Perfume DATA
    const dataPerfume = await resPerfume.json();
    // All ratings for this perfume
    const perfumeRatings = dataPerfume.data[0].attributes.Stars;

    for (let key in perfumeRatings) {
      if (key === userRatings[params.id].toString()) {
        perfumeRatings[key] = perfumeRatings[key] - 1;
      }
    }
    const id = form.get("id");
    axios.put(
      `https://arabico-strapi.onrender.com/api/perfumes/${id}/?populate=Stars `,
      {
        data: {
          Stars: perfumeRatings,
          ratingQuantity:
            parseInt(dataPerfume.data[0].attributes.ratingQuantity) - 1,
        },
      }
    );
    delete userRatings[params.id];

    axios.put(
      `https://arabico-strapi.onrender.com/api/arabicousers/${dataUser.data[0].id}/?populate=stars `,
      {
        data: { stars: userRatings },
      }
    );
  } else if (formType === "page") {
    const selectedPage = form.get("selectedPage");
    const res = await fetch(
      `https://arabico-strapi.onrender.com/api/ratings?populate=*&[filters][perfumeId][$eq]=${params.id}&pagination[page]=${selectedPage}&pagination[pageSize]=10`
    );

    const data = await res.json();

    return {
      comments: data.data,
      commentsQuantity: data.meta.pagination.total,
    };
  } else if (formType === "deleteComment") {
    const id = form.get("id");
    const deleteRes = await fetch(
      `https://arabico-strapi.onrender.com/api/ratings/${id}`,
      {
        method: "DELETE",
      }
    );
    const resPerfume = await fetch(
      `https://arabico-strapi.onrender.com/api/perfumes?populate=*&[filters][productId][$eq]=${params.id}`
    );
    // Perfume DATA
    const dataPerfume = await resPerfume.json();

    const commentsQuantity = dataPerfume.data[0].attributes.commentsQuantity;
    axios.put(
      `https://arabico-strapi.onrender.com/api/perfumes/${dataPerfume.data[0].id}`,
      {
        data: { commentsQuantity: parseInt(commentsQuantity) - 1 },
      }
    );
    const selectedPage = form.get("selectedPage");
    const res = await fetch(
      `https://arabico-strapi.onrender.com/api/ratings?populate=*&[filters][perfumeId][$eq]=${params.id}&pagination[page]=${selectedPage}&pagination[pageSize]=10`
    );

    const data = await res.json();

    return {
      comments: data.data,
      commentsQuantity: data.meta.pagination.total,
    };
  }

  // window.location.reload();
  return redirect(`/perfumes/${params.id}`);
}
