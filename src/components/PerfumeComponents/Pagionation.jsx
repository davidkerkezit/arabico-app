import React from "react";
// REACT ICONS
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
function Pagination({ itemsCount, setSelectedPage, selectedPage }) {
  let page = [];
  let counter = 0;
  [...Array(Math.ceil(itemsCount / 10))].map((p) => {
    page.push((counter = counter + 1));
  });

  return (
    <div className="h-[2.5rem] text-whiteness flex justify-center gap-2 mt-10">
      {selectedPage !== 1 && (
        <button
          onClick={() => {
            setSelectedPage((selectedPage) => selectedPage - 1);
          }}
          className="bg-whiteness/5 flex items-center justify-center text-light-gold/70 aspect-square"
        >
          <AiOutlineLeft className="text-4xl" />
        </button>
      )}

      {page.length < 5 &&
        page.map((p) => (
          <button
            id={p}
            key={p}
            className={`text-lg  aspect-square border-[1px] border-light-gold/30 ${
              selectedPage === p
                ? "bg-light-gold/75 text-coal"
                : "bg-transparent"
            }`}
            onClick={() => {
              setSelectedPage(p);
            }}
          >
            {p}
          </button>
        ))}
      {page.length > 4 && selectedPage === 1 && (
        <div className="w-[60%] flex gap-1 ">
          {page.slice(0, 3).map((p) => (
            <button
              id={p}
              key={p}
              className={`w-[20%] text-lg aspect-square border-[1px] border-light-gold/30 ${
                selectedPage === p
                  ? "bg-light-gold/75 text-coal"
                  : "bg-transparent"
              }`}
              onClick={() => {
                setSelectedPage(p);
              }}
            >
              {p}
            </button>
          ))}
          <p
            className={`bg-transparent text-center  text-lg aspect-square border-[1px] w-[20%] border-light-gold/30`}
          >
            ...
          </p>
          <button
            className={`w-[20%] text-lg  aspect-square border-[1px] border-light-gold/30 ${
              selectedPage === page.length
                ? "bg-light-gold/75 text-coal"
                : "bg-transparent"
            }`}
            onClick={() => {
              setSelectedPage(page.length);
            }}
          >
            {page.length}
          </button>
        </div>
      )}
      {page.length > 4 && selectedPage === 2 && (
        <div className="w-[60%] flex gap-1">
          {page.slice(0, 3).map((p) => (
            <button
              id={p}
              key={p}
              className={`w-[20%] text-lg aspect-square border-[1px] border-light-gold/30 ${
                selectedPage === p
                  ? "bg-light-gold/75 text-coal"
                  : "bg-transparent"
              }`}
              onClick={() => {
                setSelectedPage(p);
              }}
            >
              {p}
            </button>
          ))}
          <p
            className={`w-[20%] bg-transparent text-center text-lg  aspect-square border-[1px] border-light-gold/30`}
          >
            ...
          </p>
          <button
            className={`w-[20%] text-lg aspect-square border-[1px] border-light-gold/30 ${
              selectedPage === page.length
                ? "bg-light-gold/75 text-coal"
                : "bg-transparent"
            }`}
            onClick={() => {
              setSelectedPage(page.length);
            }}
          >
            {page.length}
          </button>
        </div>
      )}
      {page.length > 4 && selectedPage === page.length && (
        <div className="w-[60%] flex gap-1">
          <button
            className={`w-[20%] text-lg aspect-square border-[1px] border-light-gold/30 ${
              selectedPage === 1
                ? "bg-light-gold/75 text-coal"
                : "bg-transparent"
            }`}
            onClick={() => {
              setSelectedPage(1);
            }}
          >
            1
          </button>
          <p
            className={`w-[20%] bg-transparent text-center text-lg aspect-square border-[1px] border-light-gold/30`}
          >
            ...
          </p>
          {page.slice(page.length - 3, page.length).map((p) => (
            <button
              id={p}
              key={p}
              className={`w-[20%] text-lg aspect-square border-[1px] border-light-gold/30 ${
                selectedPage === p
                  ? "bg-light-gold/75 text-coal"
                  : "bg-transparent"
              }`}
              onClick={() => {
                setSelectedPage(p);
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}
      {page.length > 4 && selectedPage === page.length - 1 && (
        <div className="w-[60%] flex gap-1">
          <button
            className={` text-lg  aspect-square border-[1px] border-light-gold/30 w-[20%] ${
              selectedPage === 1
                ? "bg-light-gold/75 text-coal"
                : "bg-transparent"
            }`}
            onClick={() => {
              setSelectedPage(1);
            }}
          >
            1
          </button>
          <p
            className={`w-[20%] bg-transparent text-center text-lg  aspect-square border-[1px] border-light-gold/30`}
          >
            ...
          </p>
          {page.slice(page.length - 3, page.length).map((p) => (
            <button
              key={p}
              id={p}
              className={`w-[20%] text-lg  aspect-square border-[1px] border-light-gold/30 ${
                selectedPage === p
                  ? "bg-light-gold/75 text-coal"
                  : "bg-transparent"
              }`}
              onClick={() => {
                setSelectedPage(p);
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}
      {page.length > 4 &&
        selectedPage > 2 &&
        selectedPage < page.length - 1 && (
          <div className="w-[60%] flex gap-1">
            <button
              className={`w-[20%] text-lg  aspect-square border-[1px] border-light-gold/30 ${
                selectedPage === 1
                  ? "bg-light-gold/75 text-coal"
                  : "bg-transparent"
              }`}
              onClick={() => {
                setSelectedPage(1);
              }}
            >
              1
            </button>
            <p
              className={`w-[20%] bg-transparent text-center text-lg  aspect-square  border-[1px] border-light-gold/30`}
            >
              ...
            </p>
            <button
              className={`w-[20%] bg-light-gold/75 text-coal text-lg  aspect-square  border-[1px] border-light-gold/30  `}
            >
              {selectedPage}
            </button>
            <p
              className={`w-[20%] bg-transparent text-center text-lg  aspect-square  border-[1px] border-light-gold/30  `}
            >
              ...
            </p>
            <button
              className={`w-[20%] text-lg  aspect-square border-[1px] border-light-gold/30 ${
                selectedPage === page.length
                  ? "bg-light-gold/75 text-coal"
                  : "bg-transparent"
              }`}
              onClick={() => {
                setSelectedPage(page.length);
              }}
            >
              {page.length}
            </button>
          </div>
        )}

      {selectedPage !== page.length && page.length !== 1 && (
        <button
          onClick={() => {
            setSelectedPage((selectedPage) => selectedPage + 1);
          }}
          className=" bg-whiteness/5 aspect-square flex items-center justify-center"
        >
          <AiOutlineRight className="text-light-gold/70 text-4xl" />
        </button>
      )}
    </div>
  );
}

export default Pagination;
