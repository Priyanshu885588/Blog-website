import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <nav className="w-screen md:w-36 lato h-screen left-0 top-0 flex flex-col items-center justify-center z-10 fixed bg-gray-900">
      <Link
        to="/"
        className="text-white mb-6 hover:text-gray-400 border-b-2"
        onClick={handleLinkClick}
      >
        HOME
      </Link>
      <Link
        to="/blogs"
        className="text-white mb-6 hover:text-gray-400 border-b-2"
        onClick={handleLinkClick}
      >
        BLOGS
      </Link>
      <Link
        to="/add-blog"
        className="text-white mb-6 hover:text-gray-400 border-b-2"
        onClick={handleLinkClick}
      >
        ADD BLOG
      </Link>
    </nav>
  );
};

export default Navbar;
