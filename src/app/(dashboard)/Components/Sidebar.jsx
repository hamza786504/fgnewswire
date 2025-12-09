"use client";
import Link from 'next/link';
import { useSidebar } from '../context/SidebarContext';
import React, { useState, useRef, useEffect } from 'react'
import {
  FaHome, FaNewspaper, FaChartBar, FaBuilding, FaCube,
  FaWallet, FaTicketAlt, FaGift, FaCreditCard, FaBalanceScale,
  FaTimes, FaChevronDown
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
        className={`overflow-y-auto text-black w-64 bg-white z-100 flex-shrink-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out fixed md:static pt-4`}
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
                <Link href="/dashboard" className="flex items-center px-4 py-2 text-black rounded-md text-sm">
                  <FaHome className="mr-3" />
                  <span>Dashboard</span>
                </Link>
              </li>

              <li>
                <button
                  onClick={() => toggleSubmenu('press')}
                  className="flex items-center justify-between w-full px-4 py-2 text-black rounded-md"
                >
                  <div className="flex items-center justify-start">
                    <FaNewspaper className="mr-3" />
                    <span className='text-sm text-start'>Manage Press Release</span>
                  </div>
                  <FaChevronDown className={`text-xs transition-transform ${activeSubmenu === 'press' ? 'rotate-180' : ''}`} />
                </button>

                {activeSubmenu === 'press' && (
                  <ul className="ml-8 mt-1 space-y-1">
                    <li>
                      <Link href="/dashboard/pressrelease" className="block px-4 py-2 text-black rounded-md text-sm">
                        View Press Release
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/pressrelease/create" className="block px-4 py-2 text-black rounded-md text-sm">
                        Add Press Release
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <button
                  onClick={() => toggleSubmenu('guest')}
                  className="flex items-center justify-between w-full px-4 py-2 text-black rounded-md"
                >
                  <div className="flex items-center">
                    <FaNewspaper className="mr-3" />
                    <span className='text-start text-sm'>Guest Posts</span>
                  </div>
                  <FaChevronDown className={`text-xs transition-transform ${activeSubmenu === 'guest' ? 'rotate-180' : ''}`} />
                </button>

                {activeSubmenu === 'guest' && (
                  <ul className="ml-8 mt-1 space-y-1">
                    <li>
                      <Link href="/dashboard/guest-post" className="block px-4 py-2 text-black rounded-md text-sm">
                        View All Guest Posts
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/guest-post/create" className="block px-4 py-2 text-black rounded-md text-sm">
                        Create New Guest Post
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Link href="/dashboard/reports" className="flex items-center px-4 py-2 text-black rounded-md text-sm">
                  <FaChartBar className="mr-3" />
                  <span>Reports</span>
                </Link>
              </li>

              <li>
                <button
                  onClick={() => toggleSubmenu('company')}
                  className="flex items-center justify-between w-full px-4 py-2 text-black rounded-md text-sm"
                >
                  <div className="flex items-center">
                    <FaBuilding className="mr-3" />
                    <span>Manage Company</span>
                  </div>
                  <FaChevronDown className={`text-xs transition-transform ${activeSubmenu === 'company' ? 'rotate-180' : ''}`} />
                </button>

                {activeSubmenu === 'company' && (
                  <ul className="ml-8 mt-1 space-y-1">
                    <li>
                      <Link href="/dashboard/company" className="block px-4 py-2 text-black rounded-md text-sm">
                        View Companies
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/company/create" className="block px-4 py-2 text-black rounded-md text-sm">
                        Add Company
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Link href="/dashboard/package" className="flex items-center px-4 py-2 text-black rounded-md text-sm">
                  <FaCube className="mr-3" />
                  <span>Packages</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/guest-post-package" className="flex items-center px-4 py-2 text-black rounded-md text-sm">
                  <FaCube className="mr-3" />
                  <span>Guest Posting Package</span>
                </Link>
              </li>

              <li>
                <Link href="/dashboard/transaction" className="flex items-center px-4 py-2 text-black rounded-md text-sm">
                  <FaWallet className="mr-3" />
                  <span>My Transaction</span>
                </Link>
              </li>

              <li>
                <Link href="/dashboard/pressrooms" className="flex items-center px-4 py-2 text-black rounded-md text-sm">
                  <FaNewspaper className="mr-3" />
                  <span>Press Room</span>
                </Link>
              </li>

              <li>
                <Link href="/dashboard/balance" className="flex items-center px-4 py-2 text-black rounded-md text-sm">
                  <FaBalanceScale className="mr-3" />
                  <span>PR Balance</span>
                </Link>
              </li>

              <li>
                <Link href="/dashboard/guest-post-credit" className="flex items-center px-4 py-2 text-black rounded-md text-sm">
                  <FaCreditCard className="mr-3" />
                  <span>Guest Posting Credit</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
