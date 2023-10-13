import React from "react";
// Import Swiper
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper";
// Import Swiper css
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

function LatestPerfumes({ data }) {
  return (
    // MAIN CONTAINER
    <div className="mt-4 md:mt-0 h-max">
      {/* Title */}
      <h4 className="bg-gradient-to-r from-coal via-zinc-800 to-coal py-2 font-semibold text-whiteness text-center text-lg uppercase border-y-[1px] border-light-gold/30 md:text-xl md:py-3">
        Latest perfumes
      </h4>
      {/* SWIPER CONTAINER */}
      <div className="py-4 md:py-0">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          loop={false}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 80,
            modifier: 2.4,
          }}
          breakpoints={{
            1060: {
              slidesPerView: 4,
              coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 0,
                modifier: 0,
              },
            },
            1200: {
              slidesPerView: 5,
              coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 0,
                modifier: 0,
              },
            },
          }}
          navigation={true}
          initialSlide={1}
          modules={[EffectCoverflow, Navigation, Autoplay]}
        >
          {data &&
            data
              .filter((p) => p.attributes.soon !== true)
              .map((g) => {
                return (
                  // Latest parfume
                  <SwiperSlide
                    key={g.id}
                    className="border-x-[1px] border-white/10 md:last:border-r-transparent md:first:border-l-transparent"
                  >
                    <Link
                      to={`/perfumes/${g.attributes.productId}`}
                      className="group relative w-full h-[10rem] bg-gradient-to-b from-silver to-coal my-1 md:my-0 flex flex-col justify-center items-center gap-1 border-whiteness/20 border-[1px] cursor-pointer md:h-[14rem] md:from-coal md:gap-5  md:border-x-0 md:border-t-0 md:border-b-light-gold/30 md:hover:bg-whiteness/5 md:hover:border-[2px] md:hover:border-light-gold/60 md:duration-150"
                    >
                      {/* Perfume Title */}
                      <p className="text-whiteness font-secondary text-center md:text-lg">
                        {g.attributes.title}
                      </p>
                      {/* Perfume Image */}
                      <img
                        src={`https://arabico-strapi.onrender.com${g.attributes.perfume.data.attributes.url}`}
                        className=" h-[5rem] object-contain md:h-[7.5rem] md:group-hover:scale-105 md:duration-150"
                        alt="perfume"
                      />
                      {/* Price - hidden => md > screen sizes */}
                      <p className="absolute w-full bg-coal/80 text-whiteness  text-center py-1 bottom-0 border-t-[1px] border-whiteness/40 md:hidden">
                        ${g.attributes.price}
                      </p>
                    </Link>
                  </SwiperSlide>
                );
              })}
          <div className="swiper-pagination "></div>
        </Swiper>
      </div>
    </div>
  );
}

export default LatestPerfumes;
