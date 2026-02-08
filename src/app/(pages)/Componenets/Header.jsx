'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import {
  FaBars,
  FaChevronDown,
  FaTimes,
  FaUserCircle,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [desktopPlansOpen, setDesktopPlansOpen] = useState(false);
  const [mobilePlansOpen, setMobilePlansOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const dropdownRef = useRef(null);
  const navItemRef = useRef(null);

  const navLinks = [
    { link: 'Home', href: '/' },
    { link: 'Guest Posting Packages', href: '/guest-posting-package' },
    { link: 'Press Release', href: '/press-release' },
    { link: 'Plans', href: '/plans' },
    { link: 'News Room', href: '/news-room' },
    { link: 'Guidelines', href: '/guidelines' },
  ];

  /* ================= FETCH PACKAGES ================= */
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch(
          'https://api.glassworld06.com/api/packages'
        );
        const data = await res.json();

        const filtered = data
          .filter(
            (d) =>
              d.type === 'press_release' &&
              !['basic', 'standard', 'premium'].includes(
                d.name.toLowerCase()
              )
          )
          .map((pkg) => ({
            name: pkg.name,
            href: `/plans/${pkg.slug}`,
          }));

        setPackages(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  /* ================= USER ================= */
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setUserDropdown(false);
    setIsOpen(false);
  };

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !navItemRef.current.contains(e.target)
      ) {
        setDesktopPlansOpen(false);
        setUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center px-4 py-4 lg:px-10">
        <Link href="/" className="text-xl font-semibold">
          <img src="/imgs/logo.png" style={{width: "100px"}} alt="logo" />
        </Link>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* ================= DESKTOP MENU ================= */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((item, i) =>
            item.link === 'Plans' ? (
              <div key={i} className="relative" ref={navItemRef}>
                <button
                  onClick={() =>
                    setDesktopPlansOpen(!desktopPlansOpen)
                  }
                  className="flex items-center gap-1"
                >
                  Plans <FaChevronDown />
                </button>

                {desktopPlansOpen && !loading && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-full mt-2 w-64 bg-white shadow rounded"
                  >
                    {packages.map((pkg, k) => (
                      <Link
                        key={k}
                        href={pkg.href}
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() =>
                          setDesktopPlansOpen(false)
                        }
                      >
                        {pkg.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={i} href={item.href}>
                {item.link}
              </Link>
            )
          )}
          <Link
                href="/dashboard/signin"
                className="px-4 text-center bg-linear-to-r from-blue-500 to-purple-700 text-white py-2 rounded-3xl"
              >
                Sign In / Up
              </Link>
        </nav>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isOpen && (
        <div className="md:hidden bg-white shadow">
          <nav className="flex flex-col">
            {navLinks.map((item, i) =>
              item.link === 'Plans' ? (
                <div key={i} className="px-4 py-2">
                  <button
                    onClick={() =>
                      setMobilePlansOpen(!mobilePlansOpen)
                    }
                    className="flex justify-between w-full"
                  >
                    Plans <FaChevronDown />
                  </button>

                  {mobilePlansOpen && (
                    <div className="pl-4 mt-2 space-y-2">
                      {packages.map((pkg, k) => (
                        <Link
                          key={k}
                          href={pkg.href}
                          className="block py-1"
                          onClick={() => {
                            setMobilePlansOpen(false);
                            setIsOpen(false);
                          }}
                        >
                          {pkg.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={i}
                  href={item.href}
                  className="px-4 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.link}
                </Link>
              )
            )}

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-left text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/dashboard/signin"
                className="m-4 text-center bg-linear-to-r from-blue-500 to-purple-700 text-white py-2 rounded"
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
