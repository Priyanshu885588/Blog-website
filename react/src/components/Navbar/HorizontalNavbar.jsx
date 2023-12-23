import React from "react";
import DarkModeToggle from "../UI/DarkModeToggle";
import { useState } from "react";
import VerticalNavbar from "../Navbar/VerticalNavbar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "./Dropdown";

export const HorizontalNavbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isNavbarVisible, setNavbarVisibility] = useState(false);

  const toggleNavbar = () => {
    setNavbarVisibility((prevVisibility) => !prevVisibility);
  };
  return (
    <div className="w-screen dark:bg-black z-50 h-16 sticky top-0 md:h-20 flex justify-center items-center">
      {isNavbarVisible && <VerticalNavbar onClose={toggleNavbar} />}
      <div className="w-5/6 border flex justify-between bg-gray-100 dark:bg-slate-950 h-12">
        <div className="flex gap-4 border-r h-full p-2 justify-center items-center">
          <button
            onClick={toggleNavbar}
            className="text-black dark:text-white text-lg bg-transparent transition-all duration-500 ease-in-out "
          >
            {isNavbarVisible ? "≻" : "≺"}
          </button>
          <DarkModeToggle />
        </div>

        <div className="border-l h-full w-30 relative overflow-visible dark:text-white flex justify-center items-center text-black p-2 gap-4 text-lg">
          { userInfo  ? (
            <>
              <Dropdown userInfo={userInfo}/>
            </>
          ) : (
            <>
              <Link to="/SignIn" className="quicksand hover:text-gray-500">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
