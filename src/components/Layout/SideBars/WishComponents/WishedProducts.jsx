import React from "react";
// React Router
import { Link } from "react-router-dom";
// React Icons
import { FaWindowClose } from "react-icons/fa";
function WishedProducts({ setShowWish, product, removeWishHandler }) {
  return (
    <Link
      onClick={() => setShowWish("close")}
      to={"perfumes/" + product.attributes.productId}
      className="relative h-[4rem] font-secondary bg-silver/10 flex items-center justify-between gap-8 px-2 py-2 border-[1px] border-white/5"
    >
      <div className="flex gap-2 items-center">
        <img
          src={`https://arabico-strapi.onrender.com${product.attributes.perfume.data.attributes.url}`}
          alt="perfume"
          className="w-[1.4rem] h-[3rem] object-contain"
        />

        <h4 className="uppercase text-whiteness ">
          {product.attributes.title}
        </h4>
      </div>
      <div className="text-center  uppercase font-headers ">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removeWishHandler(product.id !== undefined && product.id);
          }}
          className="z-20 absolute top-1 right-1"
        >
          <FaWindowClose className="text-light-gold/50 text-lg" />
        </button>
      </div>
    </Link>
  );
}

export default WishedProducts;
