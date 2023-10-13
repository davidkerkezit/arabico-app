import React, { useEffect, useState, useRef } from "react";
// React Icons
import { AiOutlineLogin } from "react-icons/ai";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// React Router
import { useNavigate } from "react-router-dom";

function Signin({ login }) {
  // Sign in information
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // Sign in Animation
  const [loginUsernameAnimation, setLoginUsernameAnimation] = useState(false);
  const [loginPasswordAnimation, setLoginPasswordAnimation] = useState(false);
  // Hide/Show Password
  const [loginShowPassword, setLoginShowPassword] = useState(false);
  // Failed login
  const [failedLogin, setFailedLogin] = useState(false);
  const navigate = useNavigate();
  const loginHandler = async (e) => {
    e.preventDefault();
    fetch(
      `https://arabico-strapi.onrender.com/api/arabicousers/?populate=*&[filters][username][$eq]=${loginUsername}`
    )
      .then((response) => response.json())
      .then((user) => {
        if (
          user.data.length !== 0 &&
          user.data[0].attributes.password === loginPassword
        ) {
          localStorage.setItem("userId", user.data[0].id);
          localStorage.setItem("token", Math.floor(Math.random() * 10000) + 1);
          localStorage.setItem("username", user.data[0].attributes.username);
          setFailedLogin(false);
          login.setShowLogin(false);
          navigate("/" + user.data[0].attributes.username);
        } else {
          setFailedLogin(true);
        }
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {failedLogin && (
        <div className="text-center border-[1px] border-red-500/20 rounded-lg mx-4 animate-shake">
          <p className="text-red-400 font-secondary px-10 py-2">
            <span className="text-secondary font-bold tracking-wide">
              Error:
            </span>
            You have entered incorrect username or password.
          </p>
        </div>
      )}
      <form
        className="flex flex-col gap-4 my-4 mx-4 md:items-center md:gap-7 md:my-6"
        onSubmit={loginHandler}
      >
        <div
          className="relative"
          onClick={() => {
            setLoginPasswordAnimation(false);
          }}
        >
          <label
            className={`absolute bg-coal text-whiteness/70 font-secondary bottom-8 px-2 ${
              loginUsernameAnimation
                ? "animate-authInputsAnimation"
                : "animate-back"
            } `}
          >
            username
          </label>
          <input
            onChange={(e) => setLoginUsername(e.target.value)}
            onBlur={() => {
              setLoginUsernameAnimation(false);
            }}
            onFocus={(e) => {
              e.preventDefault();
              setLoginUsernameAnimation(true);
              setFailedLogin(false);
            }}
            type="text"
            className="w-full lg:w-[36rem] md:w-[32rem] font-secondary px-4 text-lg   rounded-lg bg-transparent border-[1px] border-whiteness/30 text-white py-2 focus:outline-none focus:border-light-gold"
          />
        </div>
        <div className="relative  flex flex-row ">
          <label
            className={`absolute text-whiteness/70 font-secondary bottom-8 left-[10px]   bg-coal px-2 
         ${
           loginPasswordAnimation
             ? "animate-authInputsAnimation"
             : "animate-back"
         }
      `}
          >
            password
          </label>
          <input
            id="passwordInput"
            onChange={(e) => setLoginPassword(e.target.value)}
            onBlur={() => {
              setLoginPasswordAnimation(false);
            }}
            onFocus={() => {
              setLoginPasswordAnimation(true);
              setFailedLogin(false);
            }}
            type={!loginShowPassword ? "password" : "text"}
            className="w-[100%] bg-transparent font-secondary text-white text-lg py-2 px-4 border-e-transparent border-[1px] border-whiteness/30 rounded-s-lg rounded-e-none focus:outline-none focus:border-light-gold focus:border-e-transparent md:w-[29rem] lg:w-[33rem]"
          />
          <div
            className={`w-[3rem] text-white flex items-center justify-center border-[1px] rounded-e-lg border-s-transparent ${
              loginPasswordAnimation
                ? "border-light-gold"
                : "border-whiteness/30"
            } `}
          >
            {!loginShowPassword ? (
              <AiOutlineEye
                className="h-full text-2xl text-gray-200/70 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setLoginShowPassword(true);
                }}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="h-full text-2xl text-light-gold/80 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setLoginShowPassword(false);
                }}
              />
            )}
          </div>
        </div>

        <button
          className="w-max bg-coal/60 flex items-center gap-1 text-sm mx-auto mt-2 pl-3 border-[1px] border-light-gold/90 rounded-l-full rounded-r-full"
          onClick={loginHandler}
        >
          {" "}
          <p className="font-secondary text-whiteness px-4 md:px-6 ">Sign In</p>
          <div className="bg-light-gold text-coal p-2 m-[2px] rounded-full">
            <AiOutlineLogin />
          </div>
        </button>
      </form>
    </div>
  );
}

export default Signin;
