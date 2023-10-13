import React, { useRef, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import Products from "./Products";
import USER from "../assets/user-test.png";
import CountUp from "react-countup";
import { FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
function UserProfile({
  user,
  fiveFavoritesPerfume,
  lastFiveComments,
  commentsQuantity,
  ratingsQuantity,
}) {
  const commentsSection = useRef();
  const ratingsSection = useRef();
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/");
  };

  return (
    <div className="h-full pb-8 flex flex-col gap-5 ">
      <div className="relative flex flex-col md:flex-col-reverse  ">
        <img
          src={USER}
          alt=""
          className="w-[40%] aspect-square object-cover mx-auto grayscale md:hidden "
        />
        <button
          onClick={logoutHandler}
          className="mb-4 mx-auto text-whiteness md:hidden font-secondary flex items-center gap-1 px-2 bg-silver/30 border-[1px] border-light-gold/30"
        >
          <p>Logout</p>
          <LuLogOut />
        </button>
        <div className=" z-10 bg-black/40 w-full backdrop-blur-sm bottom-0 flex flex-col items-center  ">
          <h1 className="text-whiteness md:hidden w-full logo-secondary-headers font-semibold uppercase text-center text-lg py-2  bg-gradient-to-r from-coal via-black to-coal  border-y-[1px] border-light-gold/30">
            {user.attributes.name}
          </h1>
          <div className=" w-full flex  ">
            <button
              onClick={() =>
                ratingsSection.current.scrollIntoView({ behavior: "smooth" })
              }
              className=" w-[50%] text-center border-[1px] items-center border-whiteness/5 flex flex-col py-3 gap-1 "
            >
              <p className=" font-secondary  text-whiteness/70   text-center ">
                Ratings
              </p>
              <p className="text-whiteness font-secondary text-3xl">
                {" "}
                <CountUp end={ratingsQuantity} duration={3} delay={0.4} />
              </p>
            </button>

            <button
              onClick={() =>
                commentsSection.current.scrollIntoView({ behavior: "smooth" })
              }
              className=" w-[50%] text-center border-[1px] border-whiteness/5 items-center flex flex-col py-3  gap-1  "
            >
              <p className=" font-secondary  text-whiteness/70   text-center  ">
                Comments
              </p>

              <p className="text-whiteness font-secondary text-3xl">
                {" "}
                <CountUp end={commentsQuantity} duration={3} />
              </p>
            </button>
          </div>
        </div>
        <div className="  justify-center items-center  overflow-hidden h-[13rem]  flex-col gap-4 hidden md:flex  md:h-max md:py-4">
          <img
            src={USER}
            alt=""
            className="  w-[8rem] h-[8rem] aspect-square object-cover rounded-full border-[2px] border-stone-500   "
          />
          <p className="font-secondary text-whiteness text-xl flex items-center  gap-1">
            <CiUser className="text-red-500" />
            {user.attributes.username}
          </p>
          <p className="bg-red-500/50 px-4 text-center py-1 font-secondary text-lg text-white uppercase">
            {user.attributes.name}
          </p>
          <button
            onClick={logoutHandler}
            className="mb-4 mx-auto text-whiteness  font-secondary flex items-center gap-1 px-2 bg-silver/30 border-[1px] border-light-gold/30"
          >
            <p>Logout</p>
            <LuLogOut />
          </button>
        </div>{" "}
        *
      </div>
      <div ref={ratingsSection}>
        <h3 className="text-whiteness logo-secondary-headers font-semibold uppercase text-center text-lg py-2  bg-gradient-to-r from-coal via-zinc-800/50 to-coal  border-y-[1px] border-light-gold/30">
          Top rated perfumes
        </h3>
        <Products data={fiveFavoritesPerfume} />
      </div>
      <div ref={commentsSection}>
        <h3 className="text-whiteness logo-secondary-headers font-semibold uppercase text-center text-lg py-2  bg-gradient-to-r from-coal via-zinc-800/50 to-coal  border-y-[1px] border-light-gold/30">
          Last comments
        </h3>
        <div className="text-whiteness flex flex-col gap-1 my-5  ">
          {lastFiveComments.map((c) => (
            <Link
              to={"/perfumes/" + c.commentInfo.attributes.perfumeId}
              className="flex justify-between border-y-[1px] border-light-gold/5 items-center  font-secondary bg-gradient-to-r py-1 h-[4rem] from-whiteness/5 to-coal r "
            >
              <div className="flex gap-1 ml-3">
                <img
                  className="w-[2rem] h-[3rem] p-1 "
                  src={`https://arabico-strapi.onrender.com${c.perfumeImg}`}
                  alt="product"
                />
                <div className="flex flex-col w-full pl-2 justify-between  ">
                  <p>{c.commentInfo.attributes.description}</p>
                  <p className="text-whiteness/50 text-sm  ">
                    {c.commentInfo.attributes.createdAt.slice(0, 10)}
                  </p>
                </div>
              </div>

              <FaChevronRight className="text-2xl text-light-gold/50 pr-3" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
