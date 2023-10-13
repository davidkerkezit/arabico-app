import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineDelete,
  AiOutlineRight,
  AiOutlineLeft,
} from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { TfiComments } from "react-icons/tfi";
import USER from "../assets/user-test.png";
import { BsArrowDown } from "react-icons/bs";
import { GrFormPrevious, GrFormNext, GrNext, GrPrevious } from "react-icons/gr";
import {
  Link,
  useActionData,
  useLoaderData,
  useOutletContext,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import { BsSendFill } from "react-icons/bs";
import Pagination from "./PerfumeComponents/Pagionation";
function Comments({ data, commentsCount }) {
  const btn = useRef();
  const [showComments, setShowComments] = useState(false);
  const [usernameInputAnimation, setUsernameAnimation] = useState(false);
  const [commentInputAnimation, setCommentAnimation] = useState(false);
  const token = useRouteLoaderData("root");
  const { setShowLogin, setAuthType } = useOutletContext();
  const [commentRows, setCommentRows] = useState(1);
  const username = useRef();
  const [commentValue, setCommentValue] = useState("");
  const submit = useSubmit();
  const [selectedPage, setSelectedPage] = useState(1);

  const addCommentHandler = (e) => {
    e.preventDefault();

    if (commentValue !== "") {
      submit(
        {
          username: localStorage.getItem("username"),
          comment: commentValue,

          formType: "addComment",
        },
        {
          method: "post",
        }
      );

      setCommentValue("");
    }
  };

  useEffect(() => {
    submit(
      {
        selectedPage: selectedPage,

        formType: "page",
      },
      {
        method: "post",
      }
    );
  }, [selectedPage]);

  const deleteCommentHandler = (id) => {
    submit(
      {
        id: id,
        selectedPage: selectedPage,
        formType: "deleteComment",
      },
      {
        method: "post",
      }
    );
  };
  useEffect(() => {
    if (
      document.querySelector("textarea") &&
      document.querySelector("textarea").scrollHeight === 40
    ) {
      setCommentRows(1);
    } else if (
      document.querySelector("textarea") &&
      document.querySelector("textarea").scrollHeight === 64
    ) {
      setCommentRows(2);
    } else if (
      document.querySelector("textarea") &&
      document.querySelector("textarea").scrollHeight === 88
    ) {
      setCommentRows(3);
    }
  }, [commentValue]);

  return (
    <div className="mb-20">
      <div className="flex gap-1 text-whiteness mx-4 text-lg mt-5">
        <h5 className="font-roboto ">Comments</h5>
        <p className="font-secondary">({commentsCount})</p>
      </div>
      {data.length === 0 && (
        <div className="relative w-full  h-[13rem] mt-5 ">
          <h5 className="text-center font-secondary text-lg text-whiteness/60">
            No comments yet
          </h5>
          <TfiComments className="w-[7.5rem] contrast-0 absolute top-0 bottom-0 left-0 right-8 mx-auto my-auto text-[10rem]" />
          <BsSearch className="text-[5rem] text-whiteness  absolute top-[5rem] left-[4rem] right-0 bottom-0  mx-auto my-auto animate-noResultSearchAnimation duration-1000" />
        </div>
      )}

      <div className="mt-5 ">
        {data.length !== 0 &&
          data.map((comment) => (
            <div
              key={data[0].id}
              className="flex  px-4 gap-3 even:bg-silver/10 odd:bg-silver/5 pb-12 pt-2  relative"
            >
              <img
                src={USER}
                alt=""
                className="w-[2.7rem] h-[2.7rem] aspect-square rounded-full object-fill grayscale "
              />
              <div className="flex flex-col gap-1 w-full ">
                <div className="flex justify-between flex-row  w-full">
                  <h6 className="font-roboto text-whiteness">
                    {comment.attributes.username}
                  </h6>

                  {localStorage.getItem("username") ===
                    comment.attributes.username && (
                    <button
                      className="bg-silver/30 border-[1px] border-light-gold/10 text-whiteness/70 px-1 absolute bottom-2 right-2 flex items-center gap-1 justify-center font-secondary"
                      onClick={() => deleteCommentHandler(comment.id)}
                    >
                      <p className="font-secondary text-sm">Delete</p>
                      <AiOutlineDelete className="text-light-gold/60 text-lg" />
                    </button>
                  )}

                  <p className="font-secondary text-light-gold  text-[0.8rem]">
                    <span className=" text-light-gold/70 px-1">
                      {comment.attributes.createdAt.slice(0, 10)}
                    </span>{" "}
                    ({comment.attributes.createdAt.slice(11, 16)})
                  </p>
                </div>

                <p className="font-secondary text-whiteness/70">
                  {comment.attributes.description}
                </p>
              </div>
            </div>
          ))}
      </div>
      {/* PAGINATION */}

      {data.length !== 0 && (
        <Pagination
          itemsCount={commentsCount}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
      )}

      {token ? (
        <form
          className="w-[90%] border-[1px] border-whiteness/20 flex mb-10 justify-between pr-4 mt-10 rounded-lg relative  mx-auto "
          onSubmit={addCommentHandler}
        >
          <textarea
            onChange={(e) => {
              setCommentValue(e.target.value);
            }}
            className="  overflow-y-hidden  bg-transparent h-max w-full pr-2 font-secondary py-2 placeholder:text-whiteness/30 resize-none   text-whiteness/70 pl-4 focus:outline-none "
            placeholder="Write your comment here..."
            rows={commentRows}
            value={commentValue}
            wrap="soft"
            maxlength="88"
            cols="20"
          ></textarea>
          <p className="absolute text-whiteness/40 -bottom-6 font-secondary text-sm right-1">
            {commentValue.length}/88
          </p>
          <button
            className="my-auto flex  aspect-square h-full group "
            onClick={addCommentHandler}
          >
            <BsSendFill className="text-2xl text-whiteness/60  " />
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center py-4 gap-4 mt-5 mb-5 ">
          <div className="flex gap-1 border-b-[1px] border-whiteness/10 pb-4">
            <h4 className="font-secondary text-whiteness ">
              Only logged users can leave a comment.
            </h4>
            <button
              className="font-secondary text-light-gold"
              onClick={() => {
                setShowLogin(true);
                setAuthType("login");
              }}
            >
              Login in
            </button>
          </div>
          <div className="flex gap-1">
            <h4 className="font-secondary text-whiteness">
              Don't have an acount?
            </h4>
            <button
              className="font-secondary text-light-gold"
              onClick={() => {
                setShowLogin(true);
                setAuthType("register");
              }}
            >
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comments;
