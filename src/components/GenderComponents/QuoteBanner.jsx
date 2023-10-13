function QuoteBanner({ data }) {
  return (
    <div className="relative  w-full flex flex-col py-2 overflow-hidden md:py-0 ">
      {/* Banner IMG */}
      <img
        src={data.imageUrl}
        alt="banner"
        className="w-[100%] h-[12rem] object-cover gray opacity-20 md:h-[20rem]"
      />
      {/* Absolute Container -> quote text and writer */}
      <div className="absolute w-[90%] h-full flex flex-col items-end justify-center gap-2 mx-auto left-0 right-0 rounded-md sm:items-center">
        <p className="font-quotes text-whiteness text-lg px-4 rounded-xl p-2 drop-shadow-xl">
          {/* Quote text */}
          <span className="font-apostrophes text-3xl text-light-gold">"</span>
          {data.quote}
          <span className="font-apostrophes text-3xl text-light-gold">,,</span>
        </p>
        {/* Quote Writer */}
        <p className="text-xl font-secondary px-4 rounded-md text-whiteness drop-shadow-xl">
          <span>-by </span>
          {data.writer}
        </p>
      </div>
    </div>
  );
}

export default QuoteBanner;
