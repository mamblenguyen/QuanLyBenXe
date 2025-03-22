import React from 'react';
import arrowL from '../../assets/images/arrow_left.png';
import arrowR from '../../assets/images/arrow_right.png';
import PaginationProps from './type';

const Pagination: React.FC<PaginationProps> = ({ limit, activation, max }) => {
  //Function to render pagination buttons
  const renderPageNumbers = () => {
    const pages = [];

    // If page number is less than 5, show all
    if (max <= 5) {
      for (let i = 1; i <= max; i++) {
        pages.push(
          <button
            key={i}
            className={`px-4 py-2 rounded-full transition duration-200 ${
              activation === i ? 'bg-orange-500 text-white' : 'hover:bg-orange-500 hover:text-white'
            }`}
          >
            {i}
          </button>,
        );
      }
    } else {
      //the number of pages is greater than 5
      if (activation > 2) {
        pages.push(
          <button key={1} className="px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white">
            1
          </button>,
        );
        if (activation > 3) {
          pages.push(
            <span key="dots-left" className="text-2xl">
              ...
            </span>,
          );
        }
      }

      // Show pages around the active page
      for (let i = Math.max(1, activation - 1); i <= Math.min(max, activation + 1); i++) {
        pages.push(
          <button
            key={i}
            className={`px-4 py-2 rounded-full transition duration-200 ${
              activation === i ? 'bg-orange-500 text-white' : 'hover:bg-orange-500 hover:text-white'
            }`}
          >
            {i}
          </button>,
        );
      }

      //The "..." and the last page
      if (activation < max - 2) {
        pages.push(
          <span key="dots-right" className="text-2xl">
            ...
          </span>,
        );
        pages.push(
          <button key={max} className="px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white">
            {max}
          </button>,
        );
      }
    }

    return pages;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <i>Hiển thị</i>
        <div className="border-2 border-orange-500 px-2 py-1 rounded m-2 w-12 "> {limit} </div>
        <i>hàng trong mỗi trang</i>
      </div>

      <div className="flex space-x-2 items-center">
        {/* Previous Page Button*/}
        <button className="px-4 py-2 hover:bg-gray-200 rounded-full" disabled={activation === 1}>
          <img src={arrowL} alt="" className="w-6 h-6" />
        </button>

        {/* Pagination buttons */}
        {renderPageNumbers()}

        {/* Next Page Button */}
        <button className="px-4 py-2 hover:bg-gray-200 rounded-full" disabled={activation === max}>
          <img src={arrowR} alt="" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
