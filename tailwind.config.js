module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      ss: "650px",
      sm: "810px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },

    extend: {
      dropShadow: {
        "3xl": "100px 35px 35px rgba(400, 0, 0)",
      },
      fontFamily: {
        logo: ["Rowdies", "cursive"],
        headers: ["Poppins", "sans-serif"],
        primary: ["Aldrich", "sans-serif"],
        secondary: ["Rajdhani", "sans-serif"],
        "secondary-headers": ["Rowdies", "cursive"],
        quotes: ["Elsie Swash Caps", "cursive"],
        apostrophes: ["Space Grotesk", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      dropShadow: {
        "3xl": "0 2px 2px black",
      },
      // My color palette
      colors: {
        "dark-gold": "#404040",
        "light-gold": "#F2C254",
        coal: "#161616",
        gold: "#201E1A",
        orangine: "#CD9A4B",
        "light-dark": "#1A1915",
        darkness: "#0E0C07",
        whiteness: "#EAEAEA",
        silver: "#404040",
      },
      // -mt-[20rem]
      keyframes: {
        openMobileNav: {
          "0%": { "margin-left": "-100%" },
          "50%": { "margin-left": "-50%" },
          "100%": { "margin-left": "0%" },
        },
        showComments: {
          from: { "margin-top": "-20rem", display: "hidden" },

          to: { "margin-top": "4rem", display: "block" },
        },
        hideComments: {
          from: { "margin-top": "4rem", display: "hidden" },

          to: { "margin-top": "-20rem", display: "block" },
        },
        commentsHeaderShow: {
          from: { height: "4rem" },

          to: { height: "100vh" },
        },
        commentsHeaderHide: {
          from: { height: "100vh" },

          to: { height: "4rem" },
        },
        closeMobileNav: {
          "0%": { "margin-left": "0%" },
          "50%": { "margin-left": "-50%" },
          "100%": { "margin-left": "-100%" },
        },
        openMobileCart: {
          "0%": { "margin-left": "100%" },
          "50%": { "margin-left": "50%" },
          "100%": { "margin-left": "0%" },
        },
        closeMobileCart: {
          "0%": { "margin-left": "0%" },
          "50%": { "margin-left": "50%" },
          "100%": { "margin-left": "100%" },
        },
        openMDCart: {
          from: { "margin-right": "-40%" },

          to: { "margin-right": "max-content" },
        },
        closeMDCart: {
          from: { "margin-right": "max-content" },

          to: { "margin-right": "-40%" },
        },
        emptyCartPrimary: {
          "0%": { "margin-right": "150%", transform: "rotate(-30deg)" },
          "50%": { "margin-right": "75%", transform: "rotate(-30deg)" },
          "90%": { "margin-right": "0%", transform: "rotate(-30deg)" },
          "100%": { "margin-right": "0%", transform: "rotate(0)" },
        },
        emptyCartSecondary: {
          "0%": { "margin-right": "0%", transform: "rotate(-30deg)" },
          "90%": { "margin-right": "5%", transform: "rotate(-30deg)" },
          "100%": { "margin-right": "10%" },
        },
        delayAnimation: {
          "0%": {
            "margin-left": "-25%",
            "letter-spacing": "normal",
            opacity: "0.2",
          },
          "50%": {
            "margin-left": "0",
            "letter-spacing": ".4rem",
            opacity: "0.5",
          },
          "80%": {
            "margin-left": "2%",
            "letter-spacing": ".2rem",
            opacity: "0.8",
          },
          "100%": {
            "margin-left": "0%",
            "letter-spacing": "normal",
            opacity: "1",
          },
        },
        Loading: {
          "0%": { transform: "rotate(0)" },
          "50%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        open: {
          "0%": { "margin-left": "0%" },
          "50%": { "margin-left": "-50%" },
          "100%": { "margin-left": "-100%" },
        },
        close: {
          from: { "margin-bottom": "-100%" },

          to: { "margin-bottom": "0%" },
        },
        //
        //
        //
        opacityAnimation: {
          "0%": { opacity: "0" },
          "50%": { opacity: "0.7" },
          "100%": { opacity: "1" },
        },
        opacity: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },

        leftSlide: {
          "0%": {
            transform: "scaleX(0)",
            "transform-origin": "center left",
            opacity: "0",
          },
          "50%": {
            transform: "scaleX(0.4)",
            "transform-origin": "left center",
          },
          "100%": {
            transform: "scaleX(1)",
            "transform-origin": "left center",
            opacity: "1",
          },
        },
        rightSlide: {
          "0%": {
            transform: "scaleX(0)",
            "transform-origin": "center right",
            opacity: "0",
          },
          "50%": {
            transform: "scaleX(0.4)",
            "transform-origin": "center right",
          },
          "100%": {
            transform: "scaleX(1)",
            "transform-origin": "center right",
            opacity: "1",
          },
        },
        topSlide: {
          from: { top: "-10rem", opacity: "0" },
          to: { top: "-2rem", opacity: "1" },
        },
        noResultSearchAnimation: {
          //top-[5rem] left-[4rem] right-0 bottom-0
          "0%": { top: "5rem", left: "4rem", right: 0, bottom: 0 },
          "25%": { top: "5rem", left: "4rem", right: "1rem", bottom: 0 },
          "50%": { top: "4rem", left: "4rem", right: "1rem", bottom: 0 },
          "75%": { top: "4rem", left: "4rem", right: 0, bottom: 0 },
          // "100%": { bottom: 0 },
        },
        Loading: {
          "100%": { transform: "rotate(360deg)" },
        },
        removeFromCart: {
          from: { "margin-left": "0rem" },

          to: { "margin-left": "-50rem" },
        },
        authInputsAnimation: {
          from: { left: "10px" },

          to: { left: "calc(100% - 130px)" },
        },
        back: {
          from: { left: "calc(100% - 90px); " },

          to: { left: "10px" },
        },
        shake: {
          "30%": { transform: "scale(1.1)" },
          "40%": { transform: "rotate(-3deg) scale(1.05)" },
          "50%": { transform: "rotate(3deg) scale(1.05)" },
          "70%": { transform: "rotate(0deg) scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        confirmPasswordInputAnimation: {
          from: { left: "0px" },

          to: { left: "calc(100% - 150px); " },
        },
        flyPlane: {
          "0%": {
            bottom: "8rem",
            right: "20rem",
            transform: "rotate(30deg)",
            opacity: "0",
          },
          "10%": {
            bottom: "8rem",
            right: "18rem",
            transform: "rotate(40deg)",
            opacity: "0.5",
          },
          "20%": {
            bottom: "8rem",
            right: "16rem",
            transform: "rotate(50deg)",
            opacity: "1",
          },
          "30%": {
            bottom: "8rem",
            right: "14rem",
            transform: "rotate(60deg)",
            opacity: "1",
          },
          "40%": {
            bottom: "8rem",
            right: "12rem",
            transform: "rotate(65deg)",
            opacity: "1",
          },
          "50%": {
            bottom: "8rem",
            right: "10rem",
            transform: "rotate(70deg)",
            opacity: "1",
          },
          "60%": {
            bottom: "7rem",
            right: "8rem",
            transform: "rotate(75deg)",
            opacity: "1",
          },
          "70%": {
            bottom: "6rem",
            right: "6rem",
            transform: "rotate(80deg)",
            opacity: "1",
          },
          "80%": {
            bottom: "5rem",
            right: "4rem",
            transform: "rotate(85deg)",
            opacity: "0.7",
          },
          "90%": {
            bottom: "4rem",
            right: "2rem",
            transform: "rotate(90deg)",
            opacity: ".5",
          },

          "100%": {
            bottom: "2rem",
            right: "-1rem",
            transform: "rotate(95deg)",
            opacity: "0",
          },
        },
        addedToCart: {
          "0%": { width: "10%" },
          "50%": { width: "100%" },
          "100%": { width: "10%" },
        },
        heartCut: {
          from: { width: "0" },

          to: { width: "11.5rem" },
        },
      },
      animation: {
        heartCut: "heartCut .4s  forwards linear",
        addedToCart: "addedToCart .2s  forwards linear",
        opacity: "opacity 1s  forwards linear",
        flyPlane: "flyPlane 1.6s linear forwards",
        shake: "shake .4s ease forwards",
        back: "back .2s forwards ease-out",
        authInputsAnimation: "authInputsAnimation .2s forwards ease-out",
        confirmPasswordInputAnimation:
          "confirmPasswordInputAnimation .2s forwards ease-out",
        removeFromCart: "removeFromCart .4s forwards linear",
        Loading: "Loading 4s infinite linear",
        opacityAnimation: "opacityAnimation .4s forwards linear",
        leftSlide: "leftSlide .6s forwards linear",
        rightSlide: "rightSlide .6s forwards linear",
        topSlide: "topSlide .6s forwards ease",
        noResultSearchAnimation: "noResultSearchAnimation 1s 10 linear",
        //
        //
        close: "close .4s forwards",
        open: "close 1s reverse",
        emptyCartSecondary: "emptyCartSecondary 1s  forwards",
        commentsHeaderHide: "commentsHeaderHide .5s  forwards",
        commentsHeaderShow: "commentsHeaderShow 1s  forwards",
        showComments: "showComments 1s  forwards",
        hideComments: "hideComments 1s  forwards",
        emptyCartPrimary: "emptyCartPrimary .5s  forwards",
        delayAnimation: "delayAnimation .8s  forwards",
        openMobileNav: "openMobileNav .2s  forwards",
        closeMobileNav: "closeMobileNav .2s  forwards",
        openMobileCart: "openMobileCart .2s  forwards linear",
        closeMobileCart: "closeMobileCart .3s  forwards linear",
        openMDCart: "openMDCart .2s  forwards linear",
        closeMDCart: "closeMDCart .3s  forwards linear",
        Loading: "Loading .3s ease-in infinite ",
      },
    },
  },
  plugins: [],
};
