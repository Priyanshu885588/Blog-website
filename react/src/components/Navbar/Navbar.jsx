import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <nav className="w-screen md:w-36 lato h-screen left-0 top-0 flex flex-col items-center justify-center z-10 fixed dark:bg-gray-900 bg-slate-300">
      <Link
        to="/"
        className="dark:text-white mb-6 hover:text-gray-400 border-b-2 text-black"
        onClick={handleLinkClick}
      >
        HOME
      </Link>
      <Link
        to="/blogs"
        className="dark:text-white mb-6 hover:text-gray-400 border-b-2 text-black"
        onClick={handleLinkClick}
      >
        BLOGS
      </Link>
      <Link
        to="/add-blog"
        className="dark:text-white mb-6 hover:text-gray-400 border-b-2 text-black"
        onClick={handleLinkClick}
      >
        ADD BLOG
      </Link>
    </nav>
  );
};

export default Navbar;
