import React from "react";
import { Link } from "react-router-dom";

const VerticalNavbar = React.memo(({ onClose }) => {

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <nav className="w-full md:w-32 left-0 md:top-20 top-16 h-screen fixed lato flex flex-col gap-6 items-center flex-wrap justify-center z-30 bg-gray-50 dark:bg-black transition-all duration-500 ease-in-out entry-animation ">
      <Link
        to="/"
        className="dark:text-white hover:text-gray-400 hover:dark:text-gray-600 text-black w-full text-xl md:text-lg text-center"
        onClick={handleLinkClick}
      >
        HOME
      </Link>
      <Link
        to="/blogs"
        className="dark:text-white hover:text-gray-400 hover:dark:text-gray-600 text-black w-full text-xl md:text-lg text-center"
        onClick={handleLinkClick}
      >
        BLOGS
      </Link>
      <Link
        to="/add-blog"
        className="dark:text-white hover:text-gray-400 hover:dark:text-gray-600 text-black w-full text-xl md:text-lg text-center"
        onClick={handleLinkClick}
      >
        ADD BLOG
      </Link>
    </nav>
  );
});

export default VerticalNavbar;
