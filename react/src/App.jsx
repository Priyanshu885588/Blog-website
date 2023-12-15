import "./App.css";
import { useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { BlogPostForm } from "./components/BlogPost/BlogPostForm";
import { BlogPostList } from "./components/BlogPost/BlogsPage/BlogPostList";
import { Home } from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import DarkModeToggle from './components/UI/DarkModeToggle'

function App() {
  const [isNavbarVisible, setNavbarVisibility] = useState(false);

  const toggleNavbar = () => {
    setNavbarVisibility((prevVisibility) => !prevVisibility);
  };
  return (
    <Router>
      <button
        onClick={toggleNavbar}
        className="text-black dark:text-white fixed z-20 p-1 top-1 text-3xl abg-transparent transition-all duration-500 ease-in-out "
      >
        {isNavbarVisible ? "◲" : "◰"}
      </button>
      <DarkModeToggle />
      {isNavbarVisible && <Navbar onClose={toggleNavbar}/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogPostList />} />
        <Route path="/add-blog" element={<BlogPostForm />} />
      </Routes>
    </Router>
  );
}

export default App;
