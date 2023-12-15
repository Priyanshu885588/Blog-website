import React from "react";
import { Link, useNavigate } from "react-router-dom";
import DarkModeToggle from "../UI/DarkModeToggle";


const Navbar = React.memo (({ onClose }) => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <nav className="w-screen md:w-36 lato h-screen left-0 top-0 flex flex-col gap-6 items-center flex-wrap justify-center z-10 fixed dark:bg-gray-900 bg-slate-300 transition-all duration-500 ease-in-out">
      <Link
        to="/"
        className="dark:text-white hover:text-gray-400 hover:dark:text-gray-600 text-black w-full text-center"
        onClick={handleLinkClick}
      >
        HOME
      </Link>
      <Link
        to="/blogs"
        className="dark:text-white hover:text-gray-400 hover:dark:text-gray-600 text-black w-full text-center"
        onClick={handleLinkClick}
      >
        BLOGS
      </Link>
      <Link
        to="/add-blog"
        className="dark:text-white hover:text-gray-400 hover:dark:text-gray-600 text-black w-full text-center"
        onClick={handleLinkClick}
      >
        ADD BLOG
      </Link>
      <DarkModeToggle />
    </nav>
  );
});

export default Navbar;
