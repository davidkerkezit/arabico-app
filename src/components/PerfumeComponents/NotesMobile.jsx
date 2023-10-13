import React from "react";
// REACT ROUTER
import { Link } from "react-router-dom";
// CountUp
import CountUp from "react-countup";
function NotesMobile({ notes }) {
  return (
    <div className="w-full grid grid-cols-2 gap-2 md:hidden  ">
      {notes.map((item) => (
        <Link
          to={`/notes/${item.key}`}
          key={item.key}
          className={`w-[65%] h-16 bg-gradient-to-b from-silver/30 to-coal/80 flex flex-col  items-center font-secondary text-whiteness p-2  border-whiteness/20 border-[1px]  
    ${notes[0].key === item.key && "animate-leftSlide delayShort  "} 
    ${
      notes[1].key === item.key &&
      "animate-rightSlide delayShort justify-self-end "
    }
    ${notes[2].key === item.key && "animate-leftSlide delayLong"}
    ${
      notes[3].key === item.key &&
      "animate-rightSlide delayLong  justify-self-end"
    } 
    `}
        >
          <h4
            className="text-lg "
            style={{
              color: "var(--" + item.key.split(" ")[0] + ")",
            }}
          >
            {item.key}
          </h4>
          <div
            className="font-headers"
            style={{
              color: "var(--" + item.key.split(" ")[0] + ")",
            }}
          >
            <CountUp end={item.value * 10} duration={3} delay={0.4} />%
          </div>
        </Link>
      ))}
    </div>
  );
}

export default NotesMobile;
