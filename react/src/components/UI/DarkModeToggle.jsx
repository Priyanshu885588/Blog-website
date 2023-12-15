import { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    // Apply dark mode to the entire document
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <button
      className="text-black dark:text-white bg-gray-200 dark:bg-gray-800 p-2 rounded"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
