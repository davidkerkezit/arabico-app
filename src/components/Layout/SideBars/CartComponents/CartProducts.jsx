import React, { useContext, useEffect, useRef, useState } from "react";
// CartContext
import { cartContext } from "../../../../store/CartProvider";
// React Router
import { Link } from "react-router-dom";
// React Icons
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

function CartProducts({ totalPrice }) {
  const [increaseProduct, setIncreaseProductId] = useState(null);
  const [decreasseProduct, setDecreasseProductId] = useState(null);
  // Get cart Context
  const { cart, removeProduct, addProduct, decreaseProduct, setShowCart } =
    useContext(cartContext);

  return (
    // Container of added product
    <div className="h-max flex flex-col m-2 gap-2 pb-28 no-scrollbar">
      {cart.length > 0 &&
        cart.map((product) => (
          <Link
            onClick={() => {
              setShowCart("close");
            }}
            to={"perfumes/" + product.perfumeId}
            key={product.id}
            className={`relative h-[6rem] bg-silver/10 font-secondary flex gap-8 px-8 py-2 rounded-lg border-white/20`}
          >
            <img
              src={`http://192.168.1.6:1337${product.imgUrl}`}
              alt=""
              className="w-[2rem] h-[5rem] object-contain"
            />
            <div className="flex flex-col justify-between">
              <div>
                <h4 className="uppercase font-secondary text-base">
                  {product.title.length > 20
                    ? product.title.slice(0, 20) + "..."
                    : product.title}
                </h4>
                <p className="text-whiteness/50">{product.volume}ml</p>
                <p className="text-base font-secondary-headers">
                  ${product.quantity * product.price}
                </p>
              </div>
              <div className="absolute flex flex-row gap-2 top-2 right-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIncreaseProductId(product.id);
                    setTimeout(() => {
                      setIncreaseProductId(null);
                    }, 100);
                    if (product.quantity < 10) {
                      totalPrice.setTotalPrice(
                        totalPrice.totalPrice + product.price
                      );
                    }
                    addProduct({
                      id: product.id,
                      title: product.title,
                    });
                    e.preventDefault();
                  }}
                >
                  <FaAngleUp
                    className={`text-2xl  rounded-md ${
                      increaseProduct === product.id
                        ? "text-light-gold"
                        : "text-light-gold/70"
                    }`}
                  />
                </button>
                <input
                  type="number"
                  className="w-[2rem] text-coal text-center font-headers rounded-md"
                  value={product.quantity}
                  readOnly
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDecreasseProductId(product.id);
                    setTimeout(() => {
                      setDecreasseProductId(null);
                    }, 100);
                    totalPrice.setTotalPrice(
                      totalPrice.totalPrice - product.price
                    );
                    //  +1
                    if (product.quantity !== 0) {
                      decreaseProduct({
                        id: product.id,
                      });
                    }
                    if (product.quantity === 0) {
                      removeProduct(product);
                    }

                    e.preventDefault();
                  }}
                >
                  <FaAngleDown
                    className={`text-2xl rounded-md ${
                      decreasseProduct === product.id
                        ? "text-light-gold"
                        : "text-light-gold/70"
                    }`}
                  />
                </button>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  totalPrice.setTotalPrice(
                    totalPrice.totalPrice - product.price * product.quantity
                  );
                  removeProduct(product);
                }}
                className="absolute bg-whiteness/5 text-white/50 w-max text-xs -top-2 -left-2 p-1 border-[1px] border-light-gold/5 rounded-lg"
              >
                <AiOutlineClose />
              </button>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default CartProducts;
