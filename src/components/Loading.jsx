import React from "react";
import LOGO from "../assets/logo.png";
import { AiOutlineLoading } from "react-icons/ai";

function Loading() {
  return (
    <div className="w-full bg-silver/10 h-screen ">
      <img src={LOGO} alt="" className="w-[50%] opacity-75 mx-auto pt-28 " />
      <AiOutlineLoading className="text-light-gold text-5xl mx-auto mt-10 animate-Loading" />
    </div>
  );
}

export default Loading;
