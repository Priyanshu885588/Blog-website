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
      window.location.reload();
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
        <div className="absolute h-full w-full">
          <Loading />
        </div>
      )}
      <div className=" flex justify-center items-center">
        <div
          id="dropdownHoverButton"
          className={`text-white dark:text-black cursor-pointer overflow-hidden quicksand w-20 flex h-8 justify-center items-center gap-1 hover:text-gray-400 font-medium capitalize text-base text-center`}
          onClick={dropdownChange}
        >
          {`${userInfo.name} `}
        </div>

        <div
          id="dropdownHover"
          className={`absolute md:top-16 dark:bg-white bg-gray-800 top-10 ${dropdown} border-2 w-full capitalize lato`}
        >
          <ul className="py-2 text-sm text-gray-100 w-full dark:text-gray-200">
            <li>
              <Link
                to="/profile"
                className="block w-full px-4 py-2 text-white dark:text-black hover:bg-black dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer text-center"
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block px-4 py-2 border-t text-white w-full dark:text-black cursor-pointer hover:bg-black dark:hover:bg-gray-600 dark:hover:text-white text-center"
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
