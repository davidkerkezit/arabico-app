import React, { useEffect, useRef, useState } from "react";
// Axios
import axios from "axios";
// React Icons
import { BsPatchCheckFill } from "react-icons/bs";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLogin,
} from "react-icons/ai";
import { setToken } from "../../helpers";
import { API } from "../../constant";
function Signup({ registration }) {
  // Registration information
  const name = useRef("");
  const username = useRef("");
  const email = useRef("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Show password state
  const [registerShowPassword, setRegisterShowPassword] = useState(false);
  // VALIDATION
  const [nameValidation, setNameValidation] = useState("");
  const [usernameValidation, setUsernameValidation] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [emailValidation, setEmailValidation] = useState("");
  const [matchingUsernameValidation, setMatchingUsernameValidation] =
    useState("");
  // Successful registration
  const [successfulRegistration, setSuccessfulRegistration] = useState("");
  // Registration Handler
  const registerHandler = async (e) => {
    e.preventDefault();
    const resUser = await fetch(
      `https://arabico-strapi.onrender.com/api/arabicousers?populate=*&filters[username][$eq]=${username}`
    );
    const userData = await resUser.json();
    setMatchingUsernameValidation(userData.data.length !== 0);
    if (
      nameValidation &&
      usernameValidation &&
      passwordValidation &&
      confirmationPassword &&
      emailValidation &&
      userData.data.length === 0
    ) {
      setSuccessfulRegistration(true);

      axios.post(`https://arabico-strapi.onrender.com/api/arabicousers/`, {
        data: {
          name: name.current.value,
          username: username.current.value,
          password: password,
          email: email.current.value,
        },
      });
      registration("login");
    } else {
      setSuccessfulRegistration(false);
      registration("");
    }
  };
  //
  //
  //
  //
  const onFinish = async () => {
    const response = await fetch(`${API}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    setToken(data.jwt);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <form
      className="flex flex-col gap-4 my-4 mx-4 md:items-center "
      onSubmit={registerHandler}
    >
      {matchingUsernameValidation === false && (
        <div className=" border-red-500/20 text-center rounded-lg border-[1px] mx-4 animate-shake">
          <p className="text-red-400 font-secondary px-10 py-2">
            <span className="text-secondary font-bold tracking-wide">
              Error:
            </span>
            Username already exist.
          </p>
        </div>
      )}
      <div className="relative">
        <label
          className={`absolute 
          } font-secondary bottom-7 left-3 bg-coal text-sm px-2  ${
            !nameValidation && successfulRegistration === false
              ? "text-red-500/90 animate-shake"
              : "text-whiteness/70"
          }   `}
        >
          {!nameValidation && successfulRegistration === false
            ? "first letter of the name must be capitalized"
            : "name"}
        </label>
        <input
          ref={name}
          required
          onChange={(e) => {
            /^[A-Z]/.test(e.target.value)
              ? setNameValidation(true)
              : setNameValidation(false);
          }}
          type="text"
          className="w-full text-sm font-secondary text-white py-2  px-4 rounded-lg bg-transparent border-[1px] border-whiteness/30 focus:outline-none focus:border-light-gold md:w-[31rem] xl:w-[38rem]"
        />
      </div>
      <div className="relative">
        <label
          className={`absolute ${
            !emailValidation && successfulRegistration === false
              ? "text-red-500/90 animate-shake"
              : "text-whiteness/70"
          } left-3 font-secondary bottom-7  text-sm   bg-coal px-2   `}
        >
          {!emailValidation && successfulRegistration === false
            ? "entered email is not valid"
            : "email"}
        </label>
        <input
          ref={email}
          onChange={(e) => {
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
              e.target.value
            )
              ? setEmailValidation(true)
              : setEmailValidation(false);
          }}
          type="email"
          className="w-full text-sm font-secondary text-white py-2  px-4 rounded-lg bg-transparent border-[1px] border-whiteness/30 focus:outline-none focus:border-light-gold md:w-[31rem] xl:w-[38rem]"
        />
      </div>
      <div className="relative">
        <label
          className={`absolute left-3 font-secondary bottom-7 text-sm ${
            !usernameValidation && successfulRegistration === false
              ? "text-red-500/90 animate-shake"
              : "text-whiteness/70"
          } bg-coal px-2 `}
        >
          {!usernameValidation && successfulRegistration === false
            ? "username must be longer than 8"
            : "username"}
        </label>
        <input
          ref={username}
          onChange={(e) => {
            e.target.value.length > 8
              ? setUsernameValidation(true)
              : setUsernameValidation(false);
          }}
          type="text"
          className="w-full text-sm font-secondary text-white py-2  px-4 rounded-lg bg-transparent border-[1px] border-whiteness/30 focus:outline-none focus:border-light-gold md:w-[31rem] xl:w-[38rem]"
        />
      </div>
      <div className="relative">
        <label
          className={`absolute left-3 font-secondary text-sm bottom-7 ${
            !passwordValidation && successfulRegistration === false
              ? "text-red-500/90 animate-shake"
              : "text-whiteness/70"
          } bg-coal px-2  `}
        >
          {!passwordValidation && successfulRegistration === false
            ? "password must be longer than 8"
            : "password"}
        </label>
        <input
          onChange={(e) => {
            e.target.value.length > 8
              ? setPasswordValidation(true)
              : setPasswordValidation(false);
            e.target.value === confirmPassword
              ? setConfirmationPassword(true)
              : setConfirmationPassword(false);
            setPassword(e.target.value);
          }}
          type={!registerShowPassword ? "password" : "text"}
          className="w-full text-sm font-secondary text-white py-2  px-4 rounded-lg bg-transparent border-[1px] border-whiteness/30 focus:outline-none focus:border-light-gold md:w-[31rem] xl:w-[38rem]"
        />
        <div className="absolute text-white right-3 top-[10px]">
          {!registerShowPassword ? (
            <AiOutlineEye
              className="text-lg text-gray-200/70 cursor-pointer"
              onClick={() => setRegisterShowPassword(true)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="text-lg text-light-gold/80 cursor-pointer "
              onClick={() => setRegisterShowPassword(false)}
            />
          )}
        </div>
      </div>
      <div className="relative">
        <label
          className={`absolute text-sm  font-secondary ${
            !confirmationPassword && successfulRegistration === false
              ? "text-red-500/90 animate-shake"
              : "text-whiteness/70"
          } bottom-7 w-max left-3 bg-coal px-2 `}
        >
          {!confirmationPassword && successfulRegistration === false
            ? "confirmation password doesn't match"
            : "confirmation password"}
        </label>
        <input
          onChange={(e) => {
            password === e.target.value && e.target.value !== ""
              ? setConfirmationPassword(true)
              : setConfirmationPassword(false);
            setConfirmPassword(e.target.value);
          }}
          type="text"
          className="w-full text-sm font-secondary text-white py-2  px-4 rounded-lg bg-transparent border-[1px] border-whiteness/30 focus:outline-none focus:border-light-gold md:w-[31rem] xl:w-[38rem]"
        />
        {confirmationPassword && (
          <BsPatchCheckFill className="absolute right-3 top-[10px] text-green-500" />
        )}
      </div>

      <button
        className="w-max bg-coal/60 text-sm flex items-center gap-1 pl-3 mx-auto  mt-2 border-[1px] border-light-gold/90 rounded-l-full rounded-r-full"
        onClick={registerHandler}
      >
        {" "}
        <p className="font-secondary text-whiteness px-4 md:px-6">Sign Up</p>
        <div className="bg-light-gold text-coal p-2 m-[2px] rounded-full ">
          <AiOutlineLogin />
        </div>
      </button>
    </form>
  );
}

export default Signup;
