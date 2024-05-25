import React, { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [isDarkMode, setDarkMode] = useState(() => {
    // Initialize from local storage or default to false (light mode)
    return JSON.parse(localStorage.getItem("isDarkMode")) || false;
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Save the theme preference to local storage
      localStorage.setItem("isDarkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  useEffect(() => {
    // Update the classList when isDarkMode changes
    document.documentElement.classList.toggle("dark", isDarkMode);
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <button
      className=" md:text-black md:dark:text-white text-white text-lg quicksand"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? "Light" : "Dark"}
    </button>
  );
};

export default React.memo(DarkModeToggle);
