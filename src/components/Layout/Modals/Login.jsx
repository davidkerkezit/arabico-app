import React, { useEffect, useState } from "react";
// React Icons
import { FaUser, FaUsers } from "react-icons/fa";
// React Router
import { Link } from "react-router-dom";
// Components
import Signin from "./LoginComponents/Signin";
import Signup from "./LoginComponents/Signup";

function Login({ login, authType }) {
  const [succesRegister, setSuccesRegister] = useState(false);

  return (
    <div className="absolute h-[100vh] w-full top-0 bottom-0 left-0 right-0 flex justify-center pt-12 overflow-hidden z-40">
      <div
        className={`absolute w-full bg-black/80 top-0 bottom-0 left-0 right-0 hidden md:fixed md:z-50 md:h-[100vh] md:block ${
          !login.showLogin && "hidden"
        } `}
        onClick={() => {
          login.setShowLogin(false);
        }}
      />
      <div className="fixed w-full h-screen bg-coal flex flex-col gap-2 z-50  md:w-1/2 md:h-[40rem] md:mt-[3rem] md:border-[1px] md:border-light-gold/25 md:rounded-md lg:mt-[5rem] xl:mt-[7rem]">
        <div className="h-32 flex justify-center items-center rounded-t-md  pt-2">
          {authType.AuthType === "login" ? (
            <FaUser className="bg-light-gold p-1 text-[5rem] text-coal  mx-auto rounded-full border-[4px] border-whiteness shadow-inner shadow-black/50" />
          ) : (
            <FaUsers className="bg-light-gold text-[5rem] text-coal mx-auto p-1 rounded-full border-[4px] border-whiteness shadow-inner shadow-black/50" />
          )}
        </div>
        <h5 className="bg-gradient-to-r from-coal via-zinc-800 to-coal text-whiteness font-semibold uppercase text-center text-lg py-2 border-y-[1px] border-light-gold/30">
          {authType.AuthType === "login"
            ? "Login to our site"
            : "Become part of Arabico community"}
        </h5>
        {authType.AuthType === "login" ? (
          <Signin login={login} />
        ) : (
          <Signup registration={authType.setAuthType} />
        )}

        <div className="font-secondary flex gap-1 mx-auto my-6">
          <p className="text-white/40">
            {authType.AuthType === "login"
              ? "Don't have an acount?"
              : "You already have an acount?"}
          </p>
          <Link
            onClick={() => {
              authType.AuthType === "login"
                ? authType.setAuthType("register")
                : authType.setAuthType("login");
            }}
            className="text-light-gold/80 md:hover:text-light-gold md:duration-150"
          >
            {authType.AuthType === "login" ? "Sign Up" : "Sign In"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
