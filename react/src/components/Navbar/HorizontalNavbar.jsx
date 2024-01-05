import React from "react";
import DarkModeToggle from "../UI/DarkModeToggle";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "./Dropdown";

export const HorizontalNavbar = () => {
  const [triggerBar, setTriggerBar] = useState(false);
  const handleTriggerBar = () => {
    setTriggerBar((prev) => !prev);
  };
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="w-screen dark:bg-black primary-color z-50 border-b h-10 border-black dark:border-white md:h-16 sticky top-0 flex justify-center items-center">
      <div className="w-full md:w-5/6 flex justify-between  items-center h-full md:h-full text-white ">
        <div className="gap-4 b h-full hidden md:flex md:w-48 p-2 justify-center items-center">
          <DarkModeToggle />
        </div>
        <div className="md:h-full md:bg-transparent md:flex justify-evenly items-center md:w-full quicksand w-32 md:static md:flex-row flex-col hidden">
          <div className="md:h-full md:bg-transparent md:flex justify-evenly items-center md:w-1/2 quicksand w-32 md:static md:flex-row flex-col hidden">
            <Link
              to="/"
              className="dark:text-white hover:text-gray-600 hover:dark:text-gray-300 text-black w-full text-xl md:text-lg text-center"
            >
              Home
            </Link>
            <Link
              to="/blogs"
              className="dark:text-white hover:text-gray-600 hover:dark:text-gray-300 text-black ack w-full text-xl md:text-lg text-center"
            >
              Blogs
            </Link>
          </div>

          <div className="md:h-full md:bg-transparent md:flex justify-evenly items-center md:w-1/2 quicksand md:static md:flex-row flex-col hidden">
            <Link
              to="/add-blog"
              className="dark:text-white hover:text-gray-600 hover:dark:text-gray-300 text-black w-full text-xl md:text-lg text-center"
            >
              Add blogs
            </Link>
            <Link
              to="/userblogs"
              className="dark:text-white hover:text-gray-600 hover:dark:text-gray-300 text-black w-full text-xl md:text-lg text-center"
            >
              Your blogs
            </Link>
          </div>
        </div>
        <div className="md:hidden w-full flex justify-start ml-1 items-center">
          <button
            onClick={handleTriggerBar}
            type="button"
            className="inline-flex items-center bg-gray-900 p-1 w-8 h-8 justify-center rounded-full"
          >
            <svg
              className="w-4 h-4 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          {triggerBar && (
            <div className="">
              <div className="flex flex-col gap-3 absolute dark:bg-gray-900 primary-color top-10 left-0 w-full quicksand p-5">
                <Link
                  to="/"
                  onClick={handleTriggerBar}
                  className="dark:text-white hover:text-gray-400 hover:dark:text-gray-300 text-black w-full text-xl md:text-lg text-center"
                >
                  Home
                </Link>
                <Link
                  to="/blogs"
                  onClick={handleTriggerBar}
                  className="dark:text-white hover:text-gray-400 hover:dark:text-gray-300 text-black ack w-full text-xl md:text-lg text-center"
                >
                  Blogs
                </Link>
                <Link
                  to="/add-blog"
                  onClick={handleTriggerBar}
                  className="dark:text-white hover:text-gray-400 hover:dark:text-gray-300 text-black w-full text-xl md:text-lg text-center"
                >
                  Add blogs
                </Link>
                <Link
                  to="/userblogs"
                  onClick={handleTriggerBar}
                  className="dark:text-white hover:text-gray-400 hover:dark:text-gray-300 text-black w-full text-xl md:text-lg text-center"
                >
                  Your blogs
                </Link>
                <DarkModeToggle />
              </div>
            </div>
          )}
        </div>
        <div className="border-l h-full md:w-48 relative overflow-visible w-32 dark:bg-gray-100 bg-gray-800 text-white dark:text-white flex justify-center items-center p-2 gap-4 text-lg">
          {userInfo ? (
            <>
              <Dropdown userInfo={userInfo} />
            </>
          ) : (
            <>
              <Link
                to="/SignIn"
                className="quicksand hover:text-gray-500 dark:bg-gray-100 text-white dark:text-black"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
