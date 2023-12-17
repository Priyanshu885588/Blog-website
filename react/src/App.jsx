import "./App.css";
import { useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { BlogPostForm } from "./components/BlogPost/BlogPostForm";
import { BlogPostList } from "./components/BlogPost/BlogsPage/BlogPostList";
import { Home } from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import DarkModeToggle from "./components/UI/DarkModeToggle";
import { Hamburgerblack } from "./assets/Hamburgerblack";

function App() {
  const [isNavbarVisible, setNavbarVisibility] = useState(false);

  const toggleNavbar = () => {
    setNavbarVisibility((prevVisibility) => !prevVisibility);
  };
  return (
    <Router>
      <div className="w-screen bg-gray-50 dark:bg-black z-20 h-10 fixed"></div>
      <button
        onClick={toggleNavbar}
        className="text-black dark:text-white fixed z-40 p-1 top-1 text-3xl bg-transparent transition-all duration-500 ease-in-out "
      >
        <Hamburgerblack />
      </button>
      <DarkModeToggle />
      {isNavbarVisible && <Navbar onClose={toggleNavbar} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogPostList />} />
        <Route path="/add-blog" element={<BlogPostForm />} />
      </Routes>
    </Router>
  );
}

export default App;
