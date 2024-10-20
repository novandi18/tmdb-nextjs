import { deleteSession, deleteSessionCookie } from "@/api/authApi";
import { ArrowLeftStartOnRectangleIcon, ArrowRightEndOnRectangleIcon, MoonIcon, SunIcon } from "@heroicons/react/16/solid"
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Router from "next/router";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const sessionId = Cookies.get("tmdb_session_id");
    setIsLoggedIn(sessionId != null && sessionId != "");
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleDeleteSession = async () => {
    if (isLoggedIn) {
      if (Cookies.get('tmdb_user_type') == 'user') {
        const response = await deleteSession();
        if (response && response.success) {
          Router.reload();
        }
      } else {
        deleteSessionCookie();
        Router.reload();
      }
    }
  };

  return (
    <nav className="w-full bg-sky-950 flex justify-between py-4 md:px-16 px-4">
      <div className="flex gap-10 items-center">
        <Link href="/" className="text-lg font-medium text-white">TheMovieDB</Link>
        {/* <div className="hidden text-sm gap-6 md:flex text-white">
          <a href="#">Services</a>
          <a href="#">Portofolio</a>
          <a href="#">Contact</a>
        </div> */}
      </div>
      <div className="flex items-center">
        {isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <Link href="/profile" className="text-xs px-4 py-2 rounded-full text-white hover:bg-sky-900 transition duration-150">
              {Cookies.get('tmdb_name')}
            </Link>
            <button type="button" onClick={handleDeleteSession} className="flex gap-2 items-center text-xs px-4 py-2 rounded-full text-white bg-red-500 hover:bg-red-600 transition duration-150">
              <ArrowLeftStartOnRectangleIcon className="w-4 h-4"/>
              <span>Sign out</span>
            </button>
          </div>
        ) : (
          <Link href="/login" className="flex gap-2 items-center text-xs px-4 py-2 rounded-full bg-sky-50 hover:bg-sky-100 transition duration-150">
            <ArrowRightEndOnRectangleIcon className="w-4 h-4"/>
            <span>Sign in</span>
          </Link>
        )}
        <button
            onClick={toggleDarkMode}
            className="ml-4 p-2 bg-sky-900 text-sky-200 rounded-full hover:bg-sky-800 transition-colors duration-300"
          >
            {darkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
          </button>
      </div>
    </nav>
  )
}