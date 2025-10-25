'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa6';
import { FaChevronDown, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [plansOpen, setPlansOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navItemRef = useRef(null);

  const navLinks = [
    {
      link: "Home",
      href: "/"
    },
    {
      link: "Premium Publications",
      href: "/premium-publications"
    },
        {
      link: "Guest Posting Packages",
      href: "/guest-posting-package"
    },
        {
      link: "Press Release",
      href: "/resellers-plan"
    },
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
        // { name: "Yahoo Finance + Ap News Press Release", href: "/plans/yahoo-finance-ap-news-press-release" },
        { name: "Street Insider PR", href: "/plans/street-insider-pr" },
        { name: "MSN News Press Release", href: "/plans/msn-news-press-release" }
      ]
    },

    {
      link: "News Room",
      href: "/news-room"
    },
    {
      link: "Guidelines",
      href: "/guidelines"
    },
  ];

  // Close dropdown when clicking outside or leaving the dropdown/nav item
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !navItemRef.current.contains(event.target)
      ) {
        setPlansOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center px-4 py-4 lg:px-10">

        {/* Logo */}
        <Link href={"/"} className="text-lg md:text-xl font-semibold tracking-tight text-gray-800 dark:text-white">
          FG Newswire<span className="text-[#a0e527]">.</span>
        </Link>

        {/* Hamburger (Mobile Only) */}
        <button
          onClick={() => setIsOpen(!isOpen)} // Corrected this
          className="block md:hidden text-gray-800 dark:text-white"
          aria-label="Toggle Menu"
        >
          {isOpen === false ? <FaBars className="text-xl" /> : <FaTimes className="text-xl" />}
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
                  <FaChevronDown className={`ml-1 text-xs transition-transform ${plansOpen ? 'transform rotate-180' : ''}`} />
                </button>

                {plansOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
                    onMouseLeave={() => setPlansOpen(false)}
                  >
                    {link.submenu.map((subItem, subKey) => (
                      <Link
                        key={subKey}
                        href={subItem.href}

                        className="p-2 block py-1 hover:bg-green-50 dark:hover:bg-[#1e3a1f]/20 rounded transition"
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
                href={`${link.href.toLocaleLowerCase()}`}
                onClick={() => {
                  setPlansOpen(false);
                }}
                className="text-sm hover:text-[#1e3a1f] transition duration-300"
              >
                {link.link}
              </Link>
            )
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          href="signin"
          className="hidden md:inline-flex ml-6 hover:bg-transparent  bg-[#163316] justify-center uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform"
        >
          Sign In / UP
        </Link>
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
                    <FaChevronDown className={`text-xs transition-transform ${plansOpen ? 'transform rotate-180' : ''}`} />
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
                  href={link.href.toLocaleLowerCase()}
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

            {/* CTA Button for mobile */}
            <Link
              href="/signin"
              className="my-3 mx-3 flex items-center justify-center hover:bg-transparent hover:text-[#163316] bg-[#163316] uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform"
            >
              Sign In / UP
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}