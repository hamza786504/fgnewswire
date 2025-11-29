"use client";
import Link from 'next/link';
import { useSidebar } from "../../../context/SidebarContext";
import React, { useState, useRef, useEffect } from 'react'
import {
  FaHome, FaNewspaper, FaCube,
  FaTimes,
  FaUser
} from 'react-icons/fa';

function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  })


  const toggleSubmenu = (menu) => {
    if (activeSubmenu === menu) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(menu);
    }
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`overflow-y-auto min-h-screen text-black w-64 bg-white z-100 flex-shrink-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out fixed md:static pt-4`}
      >
        <div className="p-4 pt-0 px-1">
          {/* Close button for mobile */}
          <div className="px-4 flex justify-between items-center mb-4 md:hidden">
            <h3 className="text-sm uppercase text-gray-400">Menu</h3>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-black"
            >
              <FaTimes size={18} />
            </button>
          </div>

          <div className="hidden md:flex p-4 items-center">
            <span className=" md:inline-block font-semibold text-2xl">FG NewsWire</span>
          </div>

          <nav>
            <ul className="space-y-1">
              <li>
                <Link href="/admin" className="flex items-center px-4 py-2 text-black rounded-md text-sm">
                  <FaHome className="mr-3" />
                  <span>Dashboard</span>
                </Link>
              </li>



              <li>
                <Link href="/admin/package" className="flex items-center px-4 py-2 text-black rounded-md text-sm">
                  <FaCube className="mr-3" />
                  <span>Packages</span>
                </Link>
              </li>
               <li>
                <Link href="/admin/sites" className="flex items-center px-4 py-2 text-black rounded-md text-sm">
                  <FaUser className="mr-3" />
                  <span>Guest Posting Sites</span>
                </Link>
              </li>

<li>
                <Link href="/admin/users" className="flex items-center px-4 py-2 text-black rounded-md text-sm">
                  <FaUser className="mr-3" />
                  <span>Users</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/cradits" className="flex items-center px-4 py-2 text-black rounded-md text-sm">
                  <FaUser className="mr-3" />
                  <span>Cradits</span>
                </Link>
              </li>
             
              {/* <li>
                <Link href="/admin/guest-post" className="flex items-center px-4 py-2 text-black rounded-md text-sm">
                  <FaCube className="mr-3" />
                  <span>Guest Posting</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/pressrooms" className="flex items-center px-4 py-2 text-black rounded-md text-sm">
                  <FaNewspaper className="mr-3" />
                  <span>Press Room</span>
                </Link>
              </li> */}





            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
