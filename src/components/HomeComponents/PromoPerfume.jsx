import React from "react";
// Import CountUp react component
import CountUp from "react-countup";

function PromoPerfume({ data }) {
  // Creating empty array and pushing perfume notes with percents
  const notes = [];
  for (const [key, value] of Object.entries(data[0].attributes.ingredients)) {
    notes.push({ key, value });
  }

  return (
    // MAIN PROMO CONTAINER
    <div className="flex flex-col gap-2 md:hidden">
      {/* Header title container */}
      <div className="relative py-6 overflow-hidden">
        {/* Title */}
        <h1 className="font-secondary text-whiteness text-center text-2xl uppercase animate-opacityAnimation ">
          {data[0].attributes.title}
        </h1>
        {/* Soon */}
        <p className="w-max bg-red-500 font-secondary text-whiteness text-lg px-2 mx-auto my-1 uppercase">
          Soon
        </p>
      </div>
      {/* About promo perfume container */}
      <div className="relative flex flex-col justify-center items-center gap-4 px-2 py-4">
        <img
          src={`https://arabico-strapi.onrender.com${data[0].attributes.perfume.data.attributes.url}`}
          className="absolute w-[7rem] h-[14rem] bottom-0  top-0 left-0 right-0 mx-auto object-contain z-20 drop-shadow-3xl animate-topSlide "
          alt="promo_perfume"
        />
        {/* Four Notes container */}
        <div className="w-full grid grid-cols-2 gap-2 mx-auto">
          {/* Note container */}
          {notes.map((item) => (
            <div
              key={item.key}
              className={`w-full h-20 bg-gradient-to-b from-silver/30 to-coal/80 font-secondary text-whiteness flex flex-col p-2  justify-center items-center border-whiteness/30 border-[1px]  cursor-pointer   
              ${notes[0].key === item.key && "animate-rightSlide delayShort"} 
              ${notes[1].key === item.key && "animate-leftSlide delayShort"}
              ${notes[2].key === item.key && "animate-rightSlide delayLong"}
              ${notes[3].key === item.key && "animate-leftSlide delayLong "} 
              `}
            >
              {/* Item key === note name === color (e.g.Leather) */}
              <h4
                className="text-lg"
                style={{
                  color: "var(--" + item.key.split(" ")[0] + ")",
                }}
              >
                {item.key}
              </h4>
              {/* Container with percentage(item.value)*/}
              <div
                className="font-headers"
                style={{
                  color: "var(--" + item.key.split(" ")[0] + ")",
                }}
              >
                <CountUp end={item.value * 10} duration={3} delay={0.4} />%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PromoPerfume;
