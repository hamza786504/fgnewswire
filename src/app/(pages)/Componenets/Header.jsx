'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { FaBars, FaChevronDown, FaTimes, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [plansOpen, setPlansOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [user, setUser] = useState(null);

  const dropdownRef = useRef(null);
  const navItemRef = useRef(null);

  const navLinks = [
    { link: "Home", href: "/" },
    { link: "Premium Publications", href: "/premium-publications" },
    { link: "Guest Posting Packages", href: "/guest-posting-package" },
    { link: "Press Release", href: "/press-release" },
    {
      link: "Plans",
      href: "/plans",
      submenu: [
        { name: "All Plans", href: "/plans/all" },
        { name: "Yahoo Press Release", href: "/plans/yahoo-press-release" },
        { name: "Insider Press Release + Yahoo Finance", href: "/plans/insider-press-release" },
        { name: "Business Insider", href: "/plans/business-insider" },
        { name: "Benzinga PR", href: "/plans/benzinga-pr" },
        { name: "Digital Journal PR", href: "/plans/digital-journal-pr" },
        { name: "Bignewsnetwork PR", href: "/plans/bingnewsnetwork-pr" },
        { name: "AP News (Associated Press) Press Release", href: "/plans/ap-news-press-release" },
        { name: "Khaleejtimes Press Release", href: "/plans/khaleejtimes-press-release" },
        { name: "GulfNews Press Release", href: "/plans/gulfnews-press-release" },
        { name: "Street Insider PR", href: "/plans/street-insider-pr" },
        { name: "MSN News Press Release", href: "/plans/msn-news-press-release" }
      ]
    },
    { link: "News Room", href: "/news-room" },
    { link: "Guidelines", href: "/guidelines" },
  ];

  // ✅ Check login state on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_expiry");
    localStorage.removeItem("user");
    setUser(null);
    setUserDropdown(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !navItemRef.current.contains(event.target)
      ) {
        setPlansOpen(false);
        setUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center px-4 py-4 lg:px-10">
        {/* Logo */}
        <Link href={"/"} className="text-lg md:text-xl font-semibold tracking-tight text-gray-800 dark:text-white">
          FG Newswire<span className="text-[#a0e527]">.</span>
        </Link>

        {/* Hamburger (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block md:hidden text-gray-800 dark:text-white"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-3 lg:space-x-6 text-sm lg:text-base font-medium text-gray-800 dark:text-gray-200">
          {navLinks.map((link, key) => (
            link.link === "Plans" ? (
              <div key={key} className="relative" ref={navItemRef}>
                <button
                  onClick={() => setPlansOpen(!plansOpen)}
                  className="flex text-sm items-center hover:text-[#1e3a1f] transition duration-300"
                >
                  {link.link}
                  <FaChevronDown className={`ml-1 text-xs transition-transform ${plansOpen ? 'rotate-180' : ''}`} />
                </button>

                {plansOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700"
                  >
                    {link.submenu.map((subItem, subKey) => (
                      <Link
                        key={subKey}
                        href={subItem.href}
                        className="block px-4 py-2 hover:bg-green-50 dark:hover:bg-[#1e3a1f]/20 rounded transition"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={key}
                href={link.href.toLowerCase()}
                onClick={() => setPlansOpen(false)}
                className="text-sm hover:text-[#1e3a1f] transition duration-300"
              >
                {link.link}
              </Link>
            )
          ))}

          {/* ✅ Conditional Rendering for User */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <FaUserCircle className="text-2xl text-gray-700 dark:text-gray-200" />
                <span className="text-sm capitalize font-semibold">{user.name}</span>
              </button>

              {userDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm hover:bg-green-50 dark:hover:bg-[#1e3a1f]/20"
                    onClick={() => setUserDropdown(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-[#3d1a1a]"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/signin"
              className="hidden md:inline-flex ml-6 bg-gradient-to-r from-blue-400 to-purple-600 
              hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm 
              font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform"
            >
              Sign In / Up
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute left-0 top-full w-full bg-white dark:bg-gray-900 shadow transition-all duration-300">
          <nav className="flex flex-col text-sm text-gray-700 dark:text-gray-200">
            {navLinks.map((link, key) => (
              link.link === "Plans" ? (
                <div key={key} className="py-2 px-4">
                  <button
                    onClick={() => setPlansOpen(!plansOpen)}
                    className="flex items-center w-full justify-between"
                  >
                    {link.link}
                    <FaChevronDown className={`text-xs transition-transform ${plansOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {plansOpen && (
                    <div className="pl-4 mt-2 space-y-2">
                      {link.submenu.map((subItem, subKey) => (
                        <Link
                          key={subKey}
                          href={subItem.href}
                          onClick={() => {
                            setPlansOpen(false);
                            setIsOpen(false);
                          }}
                          className="block py-1 hover:bg-green-50 dark:hover:bg-[#1e3a1f]/20 rounded transition"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={key}
                  href={link.href.toLowerCase()}
                  onClick={() => {
                    setPlansOpen(false);
                    setIsOpen(false);
                  }}
                  className="py-2 px-4 hover:bg-green-50 dark:hover:bg-[#1e3a1f]/20 rounded transition"
                >
                  {link.link}
                </Link>
              )
            ))}

            {/* ✅ Mobile Auth Section */}
            {user ? (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <p className="px-4 py-2 text-sm font-semibold">{user.name}</p>
                <Link
                  href="/profile"
                  className="px-4 py-2 hover:bg-green-50 dark:hover:bg-[#1e3a1f]/20"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-[#3d1a1a]"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/signin"
                className="my-3 mx-3 flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 
                hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white 
                transition-all duration-300 shadow-lg hover:shadow-xl transform"
              >
                Sign In / Up
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
