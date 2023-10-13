import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
function ProgressBar({ color, percentages, component }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    percentages !== counter &&
      setTimeout(() => {
        setCounter((counter) => counter + 0.5);
      }, 40);
  }, [counter]);

  return (
    <div className="w-full md:flex flex-col gap-2 items-center hidden lg:w-[80%]    ">
      <p className="text-whiteness/80 font-secondary text-lg lg:text-base md:text-sm">
        {color}
      </p>
      <Link
        to={component !== "banner" && "/notes/" + color}
        className="w-full lg:w-[90%] xl:w-full md:w-[80%] aspect-square rounded-full relative cursor-pointer hover:scale-105 duration-200"
        style={{
          background:
            "conic-gradient(var(--" +
            color.split(" ")[0] +
            "), " +
            counter * 3.6 +
            "deg, rgba(214, 214, 214, 0.3) 0deg)",
          animation: "1s animate 1s linear alternate infinite",
        }}
      >
        <p
          className=" font-secondary text-2xl lg:text-base xl:text-xl md:text-sm  w-max h-max z-40 absolute mx-auto top-0 bottom-0 left-0 right-0  my-auto"
          style={{
            color: "var(--" + color.split(" ")[0] + ")",
          }}
        >
          <span className="">{Math.ceil(counter)}%</span>
          {/* <CountUp end={percentages} duration={3} delay={0.4} />% */}
        </p>
        <div className="w-[90%] aspect-square bg-[#252525] rounded-full absolute mx-auto top-0 bottom-0 left-0 right-0  my-auto" />
      </Link>
    </div>
  );
}

export default ProgressBar;
