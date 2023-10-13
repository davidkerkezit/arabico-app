import React, { useEffect, useRef, useState } from "react";
import { LuPackageOpen, LuPackageCheck } from "react-icons/lu";
import { FaRegPaperPlane } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { LiaTelegramPlane } from "react-icons/lia";
import { LuDelete } from "react-icons/lu";
import emailjs from "@emailjs/browser";
import { useContext } from "react";
import { cartContext } from "../store/CartProvider";
import Back from "../components/Back";
import { useNavigate } from "react-router-dom";
import CartProducts from "../components/Layout/SideBars/CartComponents/CartProducts";
function Delivery() {
  const navigate = useNavigate();
  const [packageAnimation, setPackageAnimation] = useState(false);

  const [order, setOrder] = useState({});
  const [orderList, setOrderList] = useState([]);
  const { cart, showCart } = useContext(cartContext);
  const [successfullOrder, setSuccessfullOrder] = useState(false);
  const [nameValidation, setNameValidation] = useState("");
  const [surnameValidation, setSurnameValidation] = useState("");
  const [adressValidation, setAdressValidation] = useState("");
  const [cityValidation, setCityValidation] = useState("");
  const [phoneNumberValidation, setPhoneNumberValidation] = useState("");
  const [finishOrder, setFinishOrder] = useState("");
  const [validation, setValidation] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setPackageAnimation(true);
    }, 1500);
  }, []);
  const [triggerCancel, setTriggerCancel] = useState(false);
  const [triggerFinish, setTriggerFinish] = useState(false);
  const name = useRef("");
  const surname = useRef("");
  const adress = useRef("");
  const city = useRef("");
  const phoneNumber = useRef("");

  useEffect(() => {
    setOrderList([]);
    cart.forEach((element) => {
      setOrderList((orderList) => [
        ...orderList,
        { perfume: element.title, quantity: element.quantity },
      ]);
    });
  }, [cart, showCart]);

  const sendEmail = (e) => {
    e.preventDefault();
    setTriggerFinish(true);

    setTimeout(() => {
      setTriggerFinish(false);
    }, 100);
    if (
      nameValidation &&
      surnameValidation &&
      adressValidation & cityValidation &&
      phoneNumberValidation
    ) {
      setFinishOrder(true);
      emailjs
        .send(
          "service_0r9c91x",
          "template_4xkwbez",
          {
            name: name.current.value,
            surname: surname.current.value,
            adress: adress.current.value,
            city: city.current.value,
            phone: phoneNumber.current.state.formattedNumber,
            order: JSON.stringify(orderList),
          },
          "cfFCnfnZ246s2yN-m"
        )
        .then(
          function (response) {
       
          },
          function (error) {
      
          }
        );
    } else {
      setFinishOrder(false);
    }
  };
  useEffect(() => {
    cart.length === 0 && navigate("/");
  }, [cart]);
  return (
    <div className="md:mt-[3.2rem]">
      <Back />
      {finishOrder ? (
        <div className="w-full h-[30rem]  relative ">
          <div className="flex flex-col justify-center items-center gap-2 pt-20">
            {" "}
            <h1 className="font-secondary text-light-gold text-2xl animate-opacity  ">
              Order successfully completed.
            </h1>
            <p className="font-secondary text-whiteness/75 text-lg animate-opacity ">
              Thank you. Arabico Team
            </p>
          </div>

          <FaRegPaperPlane className="text-[2rem] text-light-gold/80 absolute top-0 left-0 bottom-[8rem] my-auto right-[20rem] mx-auto animate-flyPlane " />
          <LuPackageOpen
            className={`text-[5rem] text-whiteness/25 absolute top-0 left-0 right-0 bottom-0 mx-auto my-auto ${
              packageAnimation && "hidden"
            }`}
          />
          <LuPackageCheck
            className={`text-[5rem] text-light-gold/60 absolute top-0 left-0 right-0 bottom-0 mx-auto my-auto scale-110 ${
              !packageAnimation && "hidden"
            }`}
          />
        </div>
      ) : (
        <div className="">
          {" "}
          <h4 className="text-whiteness logo-secondary-headers font-semibold uppercase text-center my-6 text-lg py-2  bg-gradient-to-r from-coal via-zinc-800 to-coal  border-y-[1px] border-light-gold/30">
            Order Information
          </h4>
          {cart.length > 0 && (
            <div className="md:flex flex flex-col-reverse md:flex-row md:justify-center md:gap-20">
              <form className="flex flex-col mx-4 gap-4 md:w-1/3  md:mt-20 ">
                <div className="flex flex-col">
                  {" "}
                  <label
                    className="text-whiteness/50  font-secondary"
                    htmlFor=""
                  >
                    Name{" "}
                    {!nameValidation && finishOrder === false && (
                      <span className="text-red-500 ">
                        (first letter of the name must be capitalized)
                      </span>
                    )}
                  </label>
                  <input
                    ref={name}
                    onChange={(e) => {
                      /^[A-Z]/.test(e.target.value)
                        ? setNameValidation(true)
                        : setNameValidation(false);
                    }}
                    type="text"
                    className="text-whiteness  outline-none font-secondary text-xl rounded-none bg-transparent border-b-[1px] border-whiteness/10"
                  />{" "}
                </div>
                <div className="flex flex-col">
                  {" "}
                  <label
                    className="text-whiteness/50  font-secondary"
                    htmlFor=""
                  >
                    Surname{" "}
                    {!surnameValidation && finishOrder === false && (
                      <span className="text-red-500 ">
                        (enter your surname)
                      </span>
                    )}
                  </label>
                  <input
                    ref={surname}
                    onChange={(e) => {
                      e.target.value.length > 0
                        ? setSurnameValidation(true)
                        : setSurnameValidation(false);
                    }}
                    type="text"
                    className="text-whiteness outline-none font-secondary text-xl rounded-none bg-transparent border-b-[1px] border-whiteness/10"
                  />{" "}
                </div>
                <div className="flex flex-col">
                  {" "}
                  <label
                    className="text-whiteness/50  font-secondary"
                    htmlFor=""
                  >
                    Adress{" "}
                    {!adressValidation && finishOrder === false && (
                      <span className="text-red-500 ">(enter your adress)</span>
                    )}
                  </label>
                  <input
                    ref={adress}
                    onChange={(e) => {
                      e.target.value.length > 0
                        ? setAdressValidation(true)
                        : setAdressValidation(false);
                    }}
                    type="text"
                    className="text-whiteness outline-none font-secondary text-xl rounded-none bg-transparent border-b-[1px] border-whiteness/10"
                  />{" "}
                </div>
                <div className="flex flex-col">
                  {" "}
                  <label
                    className="text-whiteness/50  font-secondary"
                    htmlFor=""
                  >
                    City{" "}
                    {!cityValidation && finishOrder === false && (
                      <span className="text-red-500 ">
                        (enter the name of your city)
                      </span>
                    )}
                  </label>
                  <input
                    ref={city}
                    onChange={(e) => {
                      e.target.value.length > 0
                        ? setCityValidation(true)
                        : setCityValidation(false);
                    }}
                    type="text"
                    className="text-whiteness  outline-none font-secondary text-xl rounded-none bg-transparent border-b-[1px] border-whiteness/10"
                  />{" "}
                </div>
                <div className="flex flex-col">
                  {" "}
                  <label
                    className={`text-whiteness/50  font-secondary `}
                    htmlFor=""
                  >
                    Phone{" "}
                    {!phoneNumberValidation && finishOrder === false && (
                      <span className={`text-red-500 animate-bounce`}>
                        (wrong phone number)
                      </span>
                    )}
                  </label>
                  <PhoneInput
                    name="phone"
                    disableDropdown
                    countryCodeEditable={false}
                    country={"rs"}
                    ref={phoneNumber}
                    onChange={(e) =>
                      e !== undefined && e.length > 7
                        ? setPhoneNumberValidation(true)
                        : setPhoneNumberValidation(false)
                    }
                    buttonClass="noHover"
                    buttonStyle={{
                      background: "transparent",
                      border: "transparent",
                    }}
                    inputStyle={{
                      background: "transparent",
                      width: "100%",
                      color: "white",
                      border: "transparent",
                      "border-bottom": "rgba(255, 255, 255, 0.11) 1px solid",
                      "border-radius": "0",
                    }}
                    searchStyle={{
                      background: "rgba(255, 255, 255, 0.11)",
                      color: "white",
                    }}
                  />
                </div>
                <div className="flex  mx-2  gap-2 mt-4     mb-14">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setTriggerCancel(true);

                      setTimeout(() => {
                        setTriggerCancel(false);
                      }, 100);
                      navigate("/");
                    }}
                    className={`bg-coal/60  pl-3 border-[1px] border-light-gold/30 justify-between mx-auto items  w-[50%]  text-sm  duration-100 flex items-center gap-1  ${
                      triggerCancel
                        ? "bg-light-gold/5 border-light-gold/50"
                        : "bg-coal/60 border-silver/90"
                    }  `}
                  >
                    <p className="font-secondary text-lg text-whiteness ">
                      Cancel
                    </p>
                    <div className="bg-silver text-xl p-1 m-[2px]   text-light-gold/90">
                      <LuDelete />
                    </div>
                  </button>
                  <button
                    onClick={sendEmail}
                    className={`bg-coal/60  pl-3 border-[1px] border-light-gold/30  mx-auto items justify-between  w-[50%]  text-sm  duration-100 flex items-center gap-1  ${
                      triggerFinish
                        ? "bg-light-gold/5 border-light-gold/50"
                        : "bg-coal/60 border-silver/90"
                    }   `}
                  >
                    <p className="font-secondary text-whiteness text-lg ">
                      Finish
                    </p>
                    <div className="  m-[2px] text-xl p-1 text-coal bg-light-gold/80">
                      <LiaTelegramPlane />
                    </div>
                  </button>
                </div>
              </form>
              <div className="flex md:flex flex-col w-[80%] md:mx-4 mx-auto bg-transparent border-transparent mb-6 md:w-1/3 md:bg-silver/50 border-[1px] md:border-light-gold/40 p-4 h-max gap-1 ">
                <h4 className="text-xl font-thin mb-5 text-whiteness">
                  Your order:
                </h4>
                {cart.map((product) => (
                  <div>
                    <h4 className="font-secondary md:text-xl text-whiteness border-[1px] border-light-gold/25 text-base ">
                      <span className="bg-light-gold/40 px-2 ">
                        {product.quantity}x
                      </span>{" "}
                      {product.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Delivery;
