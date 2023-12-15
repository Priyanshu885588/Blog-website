import React from 'react';
import { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    // Apply dark mode to the entire document
    console.log(11);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <button
      className="text-black dark:text-white bg-gray-900 dark:bg-gray-500 p- rounded-full absolute top-3 right-2"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? '🌞' : '🌙'}
    </button>
  );
};

export default React.memo(DarkModeToggle);
