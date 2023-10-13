import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useActionData, useLocation } from "react-router-dom";
// React Router
import { useSearchParams } from "react-router-dom";
// Components
import Products from "../components/Products";
import SearchInput from "../components/SearchInput";
import NORESULT from "../assets/search-result.png";
import Loading from "../components/Loading";
import { HiOutlineUsers } from "react-icons/hi";
import Users from "../components/Users";
import Back from "../components/Back";
function Search() {
  const [searchParams] = useSearchParams();
  const [searchedPerfumes, setSearchedPerfumes] = useState("Loading");
  const [searchedUsers, setSearchedUsers] = useState("Loading");
  const searchedPerfumeValue = searchParams.get("perfume");
  const searchedUserValue = searchParams.get("user");
  const location = useLocation();
  const morePerfumes = useActionData();

  useEffect(() => {
    const fetchData = async () => {
      if (searchedPerfumeValue !== null) {
        const res = await fetch(
          `https://arabico-strapi.onrender.com/api/perfumes?populate=*&filters[title][$containsi]=${searchedPerfumeValue}&pagination[limit]=10&filters[soon][$ne][1]=true`
        );

        const data = await res.json();
        setSearchedPerfumes(data.data);
   
        setSearchedUsers([]);
      } else {
        const res = await fetch(
          `https://arabico-strapi.onrender.com/api/arabicousers?populate=*&filters[$or][0][name][$containsi]=${searchedUserValue}&filters[$or][1][username][$containsi]=${searchedUserValue}&pagination[limit]=10`
        );
        const data = await res.json();
     
        setSearchedUsers(data.data);
        setSearchedPerfumes([]);
      }
    };
    fetchData();
  }, [searchedPerfumeValue, searchedUserValue]);


  return (
    <div className="md:mt-[3.2rem]">
      <Back />
      <SearchInput />
      {location.search.includes("perfume") && (
        <div>
          <p className="text-whiteness/60 mx-4 font-secondary text-lg text-center py-4">
            You are searching for :{" "}
            <span className="text-light-gold/80">{searchedPerfumeValue}</span>
          </p>
          {searchedPerfumes === "Loading" && <Loading />}
          {searchedPerfumes.length !== 0 && searchedPerfumes !== "Loading" && (
            <Products
              data={
                morePerfumes === undefined ? searchedPerfumes : morePerfumes
              }
            />
          )}

          {searchedPerfumes.length === 0 && (
            <div className="relative w-full  h-[20rem] ">
              <h5 className="text-center pt-16 font-secondary text-lg text-whiteness/60">
                Sorry,we couldn't find any results
              </h5>
              <img
                src={NORESULT}
                alt=""
                className="w-[7.5rem] contrast-0 absolute top-0 bottom-0 left-0 right-8 mx-auto my-auto"
              />
              <BsSearch className="text-[5rem] text-whiteness  absolute top-[5rem] left-[4rem] right-0 bottom-0  mx-auto my-auto animate-noResultSearchAnimation " />
            </div>
          )}
        </div>
      )}

      {location.search.includes("user") && (
        <div>
          <p className="text-whiteness/60 mx-4 font-secondary text-lg text-center py-4">
            You are searching for :{" "}
            <span className="text-light-gold/80">{searchedUserValue}</span>
          </p>
          {searchedUsers === "Loading" && <Loading />}
          {searchedUsers.length !== 0 && searchedUsers !== "Loading" && (
            <Users users={searchedUsers} />
          )}

          {searchedUsers.length === 0 && (
            <div className="relative w-full  h-[20rem] ">
              <h5 className="text-center pt-16 font-secondary text-lg text-whiteness/60">
                Sorry,we couldn't find any results
              </h5>
              <HiOutlineUsers className="text-[8rem] contrast-0 absolute top-0 bottom-0 left-0 right-8 mx-auto my-auto" />
              <BsSearch className="text-[5rem] text-whiteness  absolute top-[5rem] left-[4rem] right-0 bottom-0  mx-auto my-auto animate-noResultSearchAnimation " />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
// ACTION 1 = fetch more perfumes with limit + 10 (onClick)
export async function showMoreAction({ request }) {
  const form = await request.formData();
  const choice = form.get("choice");
  if (choice === "perfumes") {
    const loadedPerfumes = form.get("loadedProducts");
    const res = await fetch(
      `https://arabico-strapi.onrender.com/api/perfumes?populate=*&pagination[limit]=${parseInt(
        loadedPerfumes
      )}&filters[soon][$ne][1]=true`
    );
    const data = await res.json();
    return data.data;
  } else if (choice === "users") {
    const loadedUsers = form.get("loadedUsers");
    const res = await fetch(
      `https://arabico-strapi.onrender.com/api/arabicousers?populate=*&pagination[limit]=${parseInt(
        loadedUsers
      )}`
    );
    const data = await res.json();
    return data.data;
  }
}
