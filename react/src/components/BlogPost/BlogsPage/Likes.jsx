import React from "react";
import { useState, useEffect } from "react";
import { toggleLike } from "../../services/Api";
import toast, { Toaster } from "react-hot-toast";
export const Likes = ({ postId, likeArray }) => {
  const [userId, setuserId] = useState("");
  const [token, setToken] = useState("");
  const [likeCount, setLikeCount] = useState();
  const [buttonColor, setButtonColor] = useState("");

  useEffect(() => {
    const to = localStorage.getItem("userInfo");
    setLikeCount(likeArray.length);
    if (to) {
      const userObject = JSON.parse(to);
      const tokenValue = userObject.token;
      const userIdValue = userObject._id;
      if (likeArray.includes(userIdValue)) {
        setButtonColor("bg-blue-600 text-white");
      }
      setuserId(userIdValue);
      setToken(tokenValue);
    }
  }, []);

  const fetchData = async () => {
    try {
      const data = await toggleLike({ postId, userId, token });
      const likes = data.likes.length;
      if (data.likes.includes(userId)) {
        setButtonColor("bg-blue-600 text-white");
      } else {
        setButtonColor("");
      }
      setLikeCount(likes);
      // setLikeCount(likes);
    } catch (error) {
      if (!userId) {
        toast.error("Sign in is required");
      } else toast.error(error);
    }
  };
  return (
    <div className="w-16 bg-slate-100 rounded-l-xl h-12 shadow-md flex gap-2 justify-center items-center dark:bg-gray-900">
      <Toaster />
      <button
        type="button"
        className={`text-blue-400 ${buttonColor} border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500`}
        onClick={fetchData}
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 18"
        >
          <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
        </svg>
      </button>
      <p className="text-black dark:text-white text-base">{likeCount}</p>
    </div>
  );
};
