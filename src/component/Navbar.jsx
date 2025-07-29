import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.theme === "dark" ||
        (!localStorage.theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
      )
    }
    return false;

  })
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.theme === "dark"
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.theme === "light"


    }
  })
  return (
    <nav className="bg-white dark:bg-gray-900 dark:border dark:border-b-white shadow px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to={'/'} className="text-4xl font-medium text-blue-500 dark:text-white">
          Gallery
        </Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className=" cursor-pointer text-blue-400 text-xl  dark:text-white focus:outline-none"
        >
          <i className={`fas ${darkMode ? 'fa-moon' : 'fa-sun'}`}></i>
        </button>
      </div>
    </nav>
  );
}
