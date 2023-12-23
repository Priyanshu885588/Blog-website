import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import { Loading } from "../UI/Loading";

export const Dropdown = ({ userInfo }) => {
  const [dropdown, setDropDown] = useState("hidden");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall, { isLoading }] = useLogoutMutation();

  const logoutHandler = async () => {
    dropdownChange();
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const dropdownChange = () => {
    setDropDown((prev) => (prev === "hidden" ? "block" : "hidden"));
  };

  return (
    <>
      {isLoading && (
        <div className="h-full w-full">
          <Loading />
        </div>
      )}
      <div className="relative inline-block">
        <button
          id="dropdownHoverButton"
          className={`text-black overflow-hidden dark:text-white quicksand flex justify-center items-center gap-1 hover:text-gray-400 font-medium capitalize text-sm text-center`}
          type="button"
          onClick={dropdownChange}
        >
          {`${userInfo.name} `}
          <img
            className="w-3 h-3"
            src="https://img.icons8.com/ios/50/expand-arrow--v1.png"
            alt="expand-arrow--v1"
          />
        </button>

        <div
          id="dropdownHover"
          className={`absolute -right-2 top-10 ${dropdown} bg-white divide divide-gray-100 rounded-lg shadow dark:bg-gray-700 w-36 capitalize`}
        >
          <ul className="py-2 text-sm text-gray-700 w-full dark:text-gray-200">
            <li>
              <Link
                to="/profile"
                className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer text-center"
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block px-4 py-2 w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-center"
              >
                Log out
              </button>
            </li>
          </ul>
          <div className="py-2 ">
            <p className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white border-t-2 border-gray-300">
              {userInfo.name}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
