import React from "react";
import DarkModeToggle from "../UI/DarkModeToggle";
import { useState } from "react";
import  VerticalNavbar  from "../Navbar/VerticalNavbar"
import { Hamburgerblack } from "../../assets/Hamburgerblack";

export const HorizontalNavbar = () => {
    const [isNavbarVisible, setNavbarVisibility] = useState(false);

    const toggleNavbar = () => {
      setNavbarVisibility((prevVisibility) => !prevVisibility);
    };
  return (
    <div className="w-screen dark:bg-black z-50 h-16 sticky top-0 md:h-20 flex justify-center items-center">
        {isNavbarVisible && <VerticalNavbar onClose={toggleNavbar} />}
      <div className="w-5/6 light-border flex gap-4 p-2 bg-gray-100 dark:bg-slate-900">
        <button
          onClick={toggleNavbar}
          className="text-black dark:text-white text-lg bg-transparent transition-all duration-500 ease-in-out "
        >
          {isNavbarVisible?"≻":"≺"}
        </button>
        <DarkModeToggle />
      </div>
    </div>
  );
};
