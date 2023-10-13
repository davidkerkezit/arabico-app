import React, { useEffect, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function Back() {
  let navigate = useNavigate();

  return (
    <div className={`mx-4 ss:mx-15 sm:mx-32 md:mx-60 md:hidden`}>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="flex gap-1 text-light-gold/80 mt-2 font-secondary items-center"
      >
        <HiArrowLongLeft />
        <p>Back</p>
      </button>
    </div>
  );
}

export default Back;
