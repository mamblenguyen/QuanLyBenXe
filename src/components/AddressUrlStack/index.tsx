import React from 'react';
import './style.css';
import { AddressUrlStackProps } from './type';
import { Link } from 'react-router-dom';

/**
 * AddressUrlStack Component
 * Displays a breadcrumb navigation based on the provided `breadcrumbs` prop.
 * Handles truncation for breadcrumbs longer than 5 items, replacing the middle items with "...".
 *
 * @param {AddressUrlStackProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered breadcrumb navigation.
 */
const AddressUrlStack: React.FC<AddressUrlStackProps> = ({ breadcrumbs, background = 'bg-white' }) => {
  /**
   * Determines if the breadcrumb list should be truncated.
   * Truncation occurs when the breadcrumb length exceeds 5.
   */
  const shouldTruncate = breadcrumbs.length > 5;

  const renderBreadcrumbs = () => {
    if (!shouldTruncate) {
      return breadcrumbs;
    }
    return [
      breadcrumbs[0], // First element
      { name: '...', href: '#' }, // Ellipsis
      ...breadcrumbs.slice(breadcrumbs.length - 2), // Last 2 elements
    ];
  };

  const truncatedBreadcrumbs = renderBreadcrumbs();

  return (
    <div className={background}>
      <div className="container">
        <div className="w-full mb-8">
          <div className="py-2 md:py-5">
            <ul className="flex items-center">
              {truncatedBreadcrumbs.map((breadcrumb, index) => (
                <li key={index} className="flex items-center">
                  {breadcrumb.href ? (
                    <Link
                      to={breadcrumb.href}
                      className={`font-medium text-lg ${breadcrumb.isActive ? 'text-dark font-semibold' : 'text-gray-500 hover:text-primary'}`}
                    >
                      {breadcrumb.name}
                    </Link>
                  ) : (
                    <span className="text-dark text-4xl font-semibold">{breadcrumb.name}</span>
                  )}
                  {index < truncatedBreadcrumbs.length - 1 && (
                    <span className="px-3 text-body-color text-orange-500">
                      <svg
                        width="10"
                        height="16"
                        viewBox="0 0 7 12"
                        className="fill-current"
                        aria-hidden="true"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path d="M0.879233 11.4351C0.808625 11.4351 0.720364 11.3998 0.667408 11.3469C0.543844 11.2233 0.543844 11.0291 0.649756 10.9056L5.09807 6.17483C5.18633 6.08657 5.18633 5.92771 5.09807 5.82179L0.649756 1.09105C0.526192 0.967487 0.543844 0.773315 0.667408 0.649751C0.790972 0.526187 0.985145 0.543839 1.10871 0.667403L5.55702 5.39815C5.85711 5.73353 5.85711 6.26309 5.55702 6.58083L1.10871 11.3292C1.0381 11.3998 0.967493 11.4351 0.879233 11.4351Z" />
                      </svg>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressUrlStack;
