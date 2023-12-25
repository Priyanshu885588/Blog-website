import React from "react";
import DarkModeToggle from "../UI/DarkModeToggle";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "./Dropdown";

export const HorizontalNavbar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="w-screen bg-transparent z-50 h-16 sticky top-0 md:h-28 flex justify-center items-center">
      <div className="w-5/6 border-2 flex justify-between bg-transparent h-4/6 text-white backdrop-blur-xl">
        <div className="flex gap-4 border-r-2 h-full p-2 justify-center items-center">
          <DarkModeToggle />
        </div>
        <div className="h-full border-r-2 border-l-2 flex justify-evenly items-center w-1/2 quicksand">
          <Link
            to="/"
            className="dark:text-white hover:text-gray-400 hover:dark:text-gray-600 text-white w-full text-xl md:text-lg text-center"
          >
            Home
          </Link>
          <Link
            to="/blogs"
            className="dark:text-white hover:text-gray-400 hover:dark:text-gray-600 text-white ack w-full text-xl md:text-lg text-center"
          >
            Blogs
          </Link>
          <Link
            to="/add-blog"
            className="dark:text-white hover:text-gray-400 hover:dark:text-gray-600 text-white w-full text-xl md:text-lg text-center"
          >
            Add blogs
          </Link>
        </div>
        <div className="border-l h-full w-30 relative overflow-visible dark:text-white flex justify-center items-center text-black p-2 gap-4 text-lg">
          {userInfo ? (
            <>
              <Dropdown userInfo={userInfo} />
            </>
          ) : (
            <>
              <Link to="/SignIn" className="quicksand hover:text-gray-500 text-white">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
