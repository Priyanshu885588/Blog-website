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
    <div className="w-screen bg-transparent z-50 h-16 sticky top-0 md:h-28 flex justify-center items-center">
      <div className="w-5/6 border-2 flex justify-between items-center bg-transparent h-4/6 text-white backdrop-blur-xl">
        <div className="flex gap-4 border-r-2 h-full p-2 justify-center items-center">
          <DarkModeToggle />
        </div>
        <div className="md:h-full md:bg-transparent md:flex justify-evenly items-center md:w-full quicksand w-32 md:static md:flex-row flex-col hidden">
          <div className="md:h-full md:bg-transparent md:flex justify-evenly items-center md:w-1/2 quicksand w-32 md:static md:flex-row flex-col hidden">
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
          </div>

          <div className="md:h-full md:bg-transparent border-l-2 md:flex justify-evenly items-center md:w-1/2 quicksand md:static md:flex-row flex-col hidden">
            <Link
              to="/add-blog"
              className="dark:text-white hover:text-gray-400 hover:dark:text-gray-600 text-white w-full text-xl md:text-lg text-center"
            >
              Add blogs
            </Link>
            <Link
              to="/userblogs"
              className="dark:text-white hover:text-gray-400 hover:dark:text-gray-600 text-white w-full text-xl md:text-lg text-center"
            >
              Your blogs
            </Link>
          </div>
        </div>
        <div className="md:hidden w-full flex justify-center items-center">
          <button
            onClick={handleTriggerBar}
            type="button"
            className="inline-flex items-center p-1 w-8 h-8 justify-center rounded-full border"
          >
            <svg
              className="w-4 h-4"
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
              <div className="flex flex-col gap-3 absolute bg-gray-900 rounded-b-3xl top-10 left-0 w-full quicksand p-5">
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
                <Link
                  to="/userblogs"
                  className="dark:text-white hover:text-gray-400 hover:dark:text-gray-600 text-white w-full text-xl md:text-lg text-center"
                >
                  Your blogs
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="border-l h-full md:w-48 relative overflow-visible w-32 bg-white text-black flex justify-center items-center p-2 gap-4 text-lg">
          {userInfo ? (
            <>
              <Dropdown userInfo={userInfo} />
            </>
          ) : (
            <>
              <Link
                to="/SignIn"
                className="quicksand hover:text-gray-500 text-black bg-white"
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
