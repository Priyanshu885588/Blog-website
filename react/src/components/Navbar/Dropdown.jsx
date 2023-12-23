import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import { useDispatch } from "react-redux";

export const Dropdown = ({ userInfo }) => {
  const [dropdown, setDropDown] = useState("hidden");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate('/')
    } catch (error) {
        console.log(error);
    }
  };

  const dropdownChange = () => {
    setDropDown((prev) => (prev === "hidden" ? "block" : "hidden"));
  };

  return (
    <div className="relative inline-block">
      <button
        id="dropdownHoverButton"
        className="text-black dark:text-white quicksand flex justify-center items-center gap-1 hover:text-gray-400 font-medium capitalize text-sm text-center"
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
        className={`absolute -right-2 top-10 ${dropdown} bg-white divide divide-gray-100 rounded-lg shadow dark:bg-gray-700 w-28 capitalize`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownHoverButton"
        >
          <li>
            <Link
              to="/profile"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Profile
            </Link>
          </li>
          <li>
            <p
              onClick={logoutHandler}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Log out
            </p>
          </li>
        </ul>
        <div className="py-2 ">
          <p className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white border-t-2 border-gray-300">
            {userInfo.name}
          </p>
        </div>
      </div>
    </div>
  );
};
