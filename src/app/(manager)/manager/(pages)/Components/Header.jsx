"use client";
import { useSidebar } from "../../../context/SidebarContext";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaBars,
  FaChevronDown,
  FaEnvelope,
  FaKey,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { BiSearch } from "react-icons/bi";

export default function Header() {
  const { setSidebarOpen } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const dropdownRef = useRef(null);
  const router = useRouter();

  // ✅ Load user name from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        if (parsed.name) {
          setUserName(parsed.name);
        }
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  // ✅ Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_expiry");
    localStorage.removeItem("user");
    router.replace("/manager/signin");
  };

  return (
    <header className="z-80 bg-[#ebecf0] py-4 px-4 flex justify-between items-center">
      {/* Mobile sidebar toggle */}
      <div className="flex items-center md:hidden">
        <button
          className="mr-4 text-gray-700 focus:outline-none"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Search bar */}
      <form className="bg-white flex-1 rounded-sm md:max-w-[300px] w-full">
        <div className="flex">
          <input
            type="text"
            name="search"
            placeholder="Search PressRelease..."
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-700 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <BiSearch size={22} />
          </button>
        </div>
      </form>

      {/* Right side icons */}
      <div className="flex items-center space-x-4">
        <Link
          href="https://dashboard.kingnewswire.com/viewticket"
          className="relative p-2 text-gray-700 hover:text-blue-600"
        >
          <FaEnvelope size={18} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs h-5 w-5 flex items-center justify-center">
            0
          </span>
        </Link>

        {/* User dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-700 rounded-full py-1 pl-1 pr-3 focus:outline-none"
          >
            <img
              src="https://dashboard.kingnewswire.com/assets/no-img.jpg"
              alt="User Profile"
              className="h-6 w-6 rounded-full"
            />
            <span className="hidden text-white md:inline-block text-xs font-medium capitalize">
              {userName || "User"}
            </span>
            <FaChevronDown className="text-white" size={10} />
          </button>

          {/* Dropdown menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 animate-fadeIn">
              <Link
                href="/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <FaUserCircle className="mr-2" /> Profile
              </Link>
              <Link
                href="/profile/password"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <FaKey className="mr-2" /> Change Password
              </Link>
              <div className="border-t my-1"></div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
