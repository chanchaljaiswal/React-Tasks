import React from 'react';
import { FaChevronRight } from 'react-icons/fa';


/**
 * Pagination component that handles pagination for a list of posts.
 * Allows navigation through pages and displays page numbers dynamically.
 *
 * @param {Object} props - Component props.
 * @param {number} props.totalPosts - The total number of posts to paginate.
 * @param {number} props.postsPerPage - The number of posts displayed per page.
 * @param {Function} props.paginate - Function to call when a new page is selected.
 * @param {number} props.currentPage - The currently active page.
 *
 * @returns {JSX.Element} The rendered pagination component.
 */
const Pagination = ({ totalPosts, postsPerPage, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const startPage = Math.max(currentPage - 1, 1);
  const endPage = Math.min(currentPage + 1, totalPages); 

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center my-6">
      <ul className="flex space-x-2">
        {/* Previous Button */}
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-400"
            >
              &#8249;
            </button>
          </li>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`${
                currentPage === number
                  ? 'bg-white text-black border border-gray-300'
                  : 'bg-gray-300 text-white'
              } w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-gray-400`}
            >
              {number}
            </button>
          </li>
        ))}

        {/* Next Button */}
        {currentPage < totalPages && (
          <li>
            <button
              onClick={() => paginate(currentPage + 1)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-400"
            >
              <FaChevronRight />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
