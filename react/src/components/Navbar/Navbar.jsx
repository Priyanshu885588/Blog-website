import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = React.memo(({ onClose }) => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <nav className="w-screen md:w-48 fixed lato h-screen left-0 top-0 flex flex-col gap-6 items-center flex-wrap justify-center z-30  dark:bg-gray-900 bg-gray-100 transition-all duration-500 ease-in-out border-r-2 dark:border-gray-500 border-gray-300">
      <Link
        to="/"
        className="dark:text-white hover:text-gray-400 hover:dark:text-gray-600 text-black w-full text-center text-xl md:text-lg"
        onClick={handleLinkClick}
      >
        HOME
      </Link>
      <Link
        to="/blogs"
        className="dark:text-white hover:text-gray-400 hover:dark:text-gray-600 text-black w-full text-center text-xl md:text-lg"
        onClick={handleLinkClick}
      >
        BLOGS
      </Link>
      <Link
        to="/add-blog"
        className="dark:text-white hover:text-gray-400 hover:dark:text-gray-600 text-black w-full text-center text-xl md:text-lg"
        onClick={handleLinkClick}
      >
        ADD BLOG
      </Link>
    </nav>
  );
});

export default Navbar;
