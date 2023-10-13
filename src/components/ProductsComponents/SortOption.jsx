import React from "react";

function SortOption({
  selected,
  title,
  setSortOption,
  sortOption,
  setShowSortOption,
}) {
  return (
    <button
      onClick={() => {
        setSortOption(selected);
        setShowSortOption(false);
      }}
      className={`flex flex-row items-center justify-between py-1 px-2 ${
        sortOption === selected && "bg-silver/40"
      }    w-[10rem] 

`}
    >
      <p>{title}</p>
    </button>
  );
}

export default SortOption;
