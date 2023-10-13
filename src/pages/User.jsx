import React, { useEffect } from "react";
// React Router
import { useLoaderData } from "react-router-dom";
// Components
import UserProfile from "../components/UserProfile";
import Back from "../components/Back";

function User() {
  const {
    selectedUser,
    stars,
    lastComments,
    commentsQuantity,
    ratingsQuantity,
  } = useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="md:mt-[3.2rem]">
      <Back />
      <UserProfile
        user={selectedUser}
        fiveFavoritesPerfume={stars}
        lastFiveComments={lastComments}
        commentsQuantity={commentsQuantity}
        ratingsQuantity={ratingsQuantity}
      />
    </div>
  );
}

export default User;
// LOADER 1 - get selected user
export async function userLoader({ params }) {
  const resUser = await fetch(
    `https://arabico-strapi.onrender.com/api/arabicousers?populate=*&filters[username][$eq]=${params.username}`
  );
  const userData = await resUser.json();

  // Rated perfumes by user example { "armafventana": 1, "lattafaraedluxe": 5,"lattafaanaabiyedhrouge": 3,"lattafabadeealoud": 3}
  let ratedPerfumes = [];
  for (let key in userData.data[0].attributes.stars) {
    ratedPerfumes.push([key, userData.data[0].attributes.stars[key]]);
  }
  // Sorting rated perfumes by user
  ratedPerfumes.sort(function (b, a) {
    return a[1] - b[1];
  });

  let favoritePerfumes = [];
  // SIMULATION - Get five perfumes(data) of user by best rating
  // I know that this combination (for loop and fetch) is not smart but in the future you will receive data from the backend developer
  const getFavoritesPerfumes = async () => {
    for (let i = 0; i < ratedPerfumes.slice(0, 5).length; i++) {
      const favoriteRes = await fetch(
        `https://arabico-strapi.onrender.com/api/perfumes?populate=*&filters[productId][$eq]=${ratedPerfumes[i][0]}`
      );
      const favoriteData = await favoriteRes.json();

      favoritePerfumes.push(favoriteData.data[0]);
      await Promise.all(favoritePerfumes);
    }
  };
  await getFavoritesPerfumes();
  //
  // Get last 5 comments of User
  let latestFiveComments = [];
  const resComments = await fetch(
    `https://arabico-strapi.onrender.com/api/ratings?populate=*&filters[username][$eq]=${userData.data[0].attributes.username}&sort[0]=createdAt:desc&pagination[limit]=5`
  );
  const commentsData = await resComments.json();

  const getCommentedPerfumes = async () => {
    for (let i = 0; i < commentsData.data.length; i++) {
      const yest = await fetch(
        `https://arabico-strapi.onrender.com/api/perfumes?populate=*&filters[productId][$eq]=${commentsData.data[i].attributes.perfumeId}`
      );
      const yestdata = await yest.json();

      latestFiveComments.push({
        commentInfo: commentsData.data[i],
        perfumeImg: yestdata.data[0].attributes.perfume.data.attributes.url,
      });
    }
  };

  await getCommentedPerfumes();
  return {
    selectedUser: userData.data[0],
    stars: favoritePerfumes,
    lastComments: latestFiveComments,
    commentsQuantity: commentsData.data.length,
    ratingsQuantity: ratedPerfumes.length,
  };
}
export async function showMoreUsersAction({ request }) {
  const form = await request.formData();
  const loadedUsers = form.get("loadedUsers");
  const res = await fetch(
    `https://arabico-strapi.onrender.com/api/perfumes?populate=*&pagination[limit]=${parseInt(
      loadedUsers
    )}`
  );

  const data = await res.json();

  return data.data;
}
