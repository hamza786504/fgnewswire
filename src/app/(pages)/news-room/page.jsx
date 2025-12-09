"use client";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BiUser } from 'react-icons/bi';

const blogPosts = [
  {
    id: 1,
    title: "Bitamps Bitcoin Wallet Provides Bitcoin Access Without Surveillance or Sign-Ups",
    location: "New York, United States",
    date: "August 1, 2025",
    description:
      "Bitamp, a web-based open-source Bitcoin wallet, is drawing attention for its privacy-first approach",
    image: "/imgs/blog/1-blog.webp", // Add this image to your /public/imgs/ directory
    comments: "No Comments",
  },
  {
    id: 2,
    title:
      "WeTrade Marks 10th Anniversary with Global Campaign Upgrades and Rewards",
    location: "LIMASSOL, Cyprus",
    date: "August 1, 2025",
    description:
      "The leading financial broker celebrates a decade of excellence with worldwide screen takeovers viewed by millions",
    image: "/imgs/blog/1-blog.webp", // Add this image to your /public/imgs/ directory
    comments: "No Comments",
  },
  {
    id: 3,
    title:
      "Genesy launches CRM partner program with HubSpot Salesforce and Pipedrive experts",
    location: "",
    date: "August 1, 2025",
    description:
      "Genesy today announced the launch of its official CRM Partner Program, enabling certified consultants of HubSpot, Salesforce, and Pipedrive to deploy",
    image: "/imgs/blog/1-blog.webp", // Add this image to your /public/imgs/ directory
    comments: "No Comments",
  },
  {
    id: 4,
    title: "Bitamps Bitcoin Wallet Provides Bitcoin Access Without Surveillance or Sign-Ups",
    location: "New York, United States",
    date: "August 1, 2025",
    description:
      "Bitamp, a web-based open-source Bitcoin wallet, is drawing attention for its privacy-first approach",
    image: "/imgs/blog/1-blog.webp", // Add this image to your /public/imgs/ directory
    comments: "No Comments",
  },
  {
    id: 5,
    title:
      "WeTrade Marks 10th Anniversary with Global Campaign Upgrades and Rewards",
    location: "LIMASSOL, Cyprus",
    date: "August 1, 2025",
    description:
      "The leading financial broker celebrates a decade of excellence with worldwide screen takeovers viewed by millions",
    image: "/imgs/blog/1-blog.webp", // Add this image to your /public/imgs/ directory
    comments: "No Comments",
  },
  {
    id: 6,
    title:
      "Genesy launches CRM partner program with HubSpot Salesforce and Pipedrive experts",
    location: "",
    date: "August 1, 2025",
    description:
      "Genesy today announced the launch of its official CRM Partner Program, enabling certified consultants of HubSpot, Salesforce, and Pipedrive to deploy",
    image: "/imgs/blog/1-blog.webp", // Add this image to your /public/imgs/ directory
    comments: "No Comments",
  },
  {
    id: 7,
    title: "Bitamps Bitcoin Wallet Provides Bitcoin Access Without Surveillance or Sign-Ups",
    location: "New York, United States",
    date: "August 1, 2025",
    description:
      "Bitamp, a web-based open-source Bitcoin wallet, is drawing attention for its privacy-first approach",
    image: "/imgs/blog/1-blog.webp", // Add this image to your /public/imgs/ directory
    comments: "No Comments",
  },
  {
    id: 8,
    title:
      "WeTrade Marks 10th Anniversary with Global Campaign Upgrades and Rewards",
    location: "LIMASSOL, Cyprus",
    date: "August 1, 2025",
    description:
      "The leading financial broker celebrates a decade of excellence with worldwide screen takeovers viewed by millions",
    image: "/imgs/blog/1-blog.webp", // Add this image to your /public/imgs/ directory
    comments: "No Comments",
  },
  {
    id: 9,
    title:
      "Genesy launches CRM partner program with HubSpot Salesforce and Pipedrive experts",
    location: "",
    date: "August 1, 2025",
    description:
      "Genesy today announced the launch of its official CRM Partner Program, enabling certified consultants of HubSpot, Salesforce, and Pipedrive to deploy",
    image: "/imgs/blog/1-blog.webp", // Add this image to your /public/imgs/ directory
    comments: "No Comments",
  },
  {
    id: 10,
    title: "Bitamps Bitcoin Wallet Provides Bitcoin Access Without Surveillance or Sign-Ups",
    location: "New York, United States",
    date: "August 1, 2025",
    description:
      "Bitamp, a web-based open-source Bitcoin wallet, is drawing attention for its privacy-first approach",
    image: "/imgs/blog/1-blog.webp", // Add this image to your /public/imgs/ directory
    comments: "No Comments",
  },
  {
    id: 11,
    title:
      "WeTrade Marks 10th Anniversary with Global Campaign Upgrades and Rewards",
    location: "LIMASSOL, Cyprus",
    date: "August 1, 2025",
    description:
      "The leading financial broker celebrates a decade of excellence with worldwide screen takeovers viewed by millions",
    image: "/imgs/blog/1-blog.webp", // Add this image to your /public/imgs/ directory
    comments: "No Comments",
  }
];

const ITEMS_PER_PAGE = 10;

export default function NewsRoom() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Calculate total pages based on data
  useEffect(() => {
    setTotalPages(Math.ceil(blogPosts.length / ITEMS_PER_PAGE));
  }, []);

  // Update current page when URL changes
  useEffect(() => {
    const page = searchParams.get('page');
    const pageNum = page ? parseInt(page, 10) : 1;

    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    } else if (totalPages > 0) {
      // Redirect to first page if invalid
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      replace(`${pathname}?${params.toString()}`);
    }
  }, [searchParams, totalPages, pathname, replace]);

  // Handle page navigation
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const params = new URLSearchParams(searchParams);
      params.set('page', newPage.toString());
      replace(`${pathname}?${params.toString()}`);
    }
  };

  // Calculate current items to display
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = blogPosts.slice(startIndex, endIndex);

  return (
    <section className="w-full py-16 px-4 md:px-10 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-500 mb-10">
          Latest Press Releases
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-2xl text-gray-400"><BiUser /></span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#12355B] leading-snug mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {post.location && `${post.location}, `}{post.date} — {post.description}
                </p>
                <a
                  href="#"
                  className="text-sm text-[#12355B] font-semibold hover:underline"
                >
                  READ MORE »
                </a>
              </div>
              <div className="px-5 py-3 border-t border-gray-100 text-gray-500 text-xs flex justify-between">
                <span>{post.date}</span>
                <span>{post.comments}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center px-4 py-2 rounded-full transition-all duration-300 ${currentPage === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transform hover:-translate-x-1'
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Previous
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${currentPage === pageNum
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-inner transform scale-105'
                      : 'bg-white hover:bg-blue-100 text-gray-700 border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md'
                    }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center px-4 py-2 rounded-full transition-all duration-300 ${currentPage === totalPages
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transform hover:translate-x-1'
                }`}
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}