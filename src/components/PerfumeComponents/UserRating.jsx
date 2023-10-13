import React from "react";
// REACT ROUTER
import {
  useParams,
  useSubmit,
  useRouteLoaderData,
  useOutletContext,
} from "react-router-dom";
// REACT ICONS
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BsArrowRepeat } from "react-icons/bs";
function UserRating({ data, userRating }) {
  const { id } = useParams();
  const token = useRouteLoaderData("root");
  const { setShowLogin, setAuthType } = useOutletContext();
  const submit = useSubmit();
  const ratePerfumeHandler = (selectedStar) => {
    submit(
      {
        selectedStar: selectedStar,
        id: data.id,
        username: localStorage.getItem("username"),
        formType: "addReview",
      },
      {
        method: "post",
      }
    );
  };
  const resetRatingHandler = () => {
    submit(
      {
        id: data.id,
        username: localStorage.getItem("username"),
        formType: "delete",
      },
      {
        method: "post",
      }
    );
  };

  return (
    <>
      {token ? (
        <div className="bg-gradient-to-r from-coal via-zinc-800 to-coal flex flex-col items-center justify-center gap-1 text-whiteness font-secondary p-2 my-4 border-y-[1px] border-light-gold/10 md:border-t-transparent md:mt-0">
          {/* RATING HEADER */}
          <h3 className="text-lg">
            {userRating !== undefined ? "Your rating " : "Rate this perfume "}
          </h3>

          <div className="flex items-center gap-1">
            {userRating !== undefined &&
              [...Array(userRating)].map((s, index) => (
                <AiFillStar
                  key={index}
                  className="text-4xl text-light-gold/80"
                />
              ))}

            {userRating === undefined && (
              <div className="flex justify-center gap-2">
                <AiOutlineStar
                  onClick={() => ratePerfumeHandler(1)}
                  className="text-light-gold/60 text-4xl md:hover:scale-125 md:duration-200  md:cursor-pointer md:hover:text-light-gold"
                />
                <AiOutlineStar
                  onClick={() => ratePerfumeHandler(2)}
                  className="text-light-gold/60 text-4xl md:hover:scale-125 md:duration-200  md:cursor-pointer md:hover:text-light-gold"
                />
                <AiOutlineStar
                  onClick={() => ratePerfumeHandler(3)}
                  className="text-light-gold/60 text-4xl md:hover:scale-125  md:duration-200 md:cursor-pointer md:hover:text-light-gold"
                />
                <AiOutlineStar
                  onClick={() => ratePerfumeHandler(4)}
                  className="text-light-gold/60 text-4xl  md:hover:scale-125 md:duration-200  md:cursor-pointer md:hover:text-light-gold"
                />
                <AiOutlineStar
                  onClick={() => ratePerfumeHandler(5)}
                  className="text-light-gold/60 text-4xl  md:hover:scale-125  md:duration-200 md:cursor-pointer md:hover:text-light-gold"
                />
              </div>
            )}
            {userRating !== undefined && (
              <BsArrowRepeat
                className=" text-light-gold/50 text-2xl md:cursor-pointer md:hover:text-light-gold md:duration-100 md:hover:scale-125"
                onClick={resetRatingHandler}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="w-full bg-gradient-to-r from-coal via-zinc-800 to-coal flex flex-col justify-center items-center gap-3 font-secondary my-4 p-2">
          <div className="flex">
            {[...Array(5)].map((s, index) => (
              <AiOutlineStar
                key={index}
                className="text-whiteness/20 text-4xl md:cursor-pointer md:hover:cursor-not-allowed"
              />
            ))}
          </div>
          <div className="flex gap-1 pb-4">
            <h4 className="font-secondary text-whiteness">
              Only logged users can can post a rating.
            </h4>
            <button
              onClick={() => {
                setShowLogin(true);
                setAuthType("login");
              }}
              className="font-secondary text-light-gold"
            >
              Login in
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default UserRating;
