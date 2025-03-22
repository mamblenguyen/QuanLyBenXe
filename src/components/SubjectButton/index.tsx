import React from 'react';
import './style.css';
import { ButtonProps } from './type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

/**
 * SubjectButton component renders a customizable button with an optional remove icon.
 *
 * @param {string} label - The text displayed on the button.
 * @param {boolean} [active=true] - Determines if the button is enabled or disabled.
 * @param {boolean} [removable=false] - Indicates whether the button displays a removable "x" icon.
 * @param {'small' | 'large'} [size="medium"] - Specifies the size of the button.
 * @param {() => void} [onRemove] - Callback function triggered when the "x" icon is clicked.
 *
 * @returns {JSX.Element} The rendered button component.
 */
const SubjectButton: React.FC<ButtonProps> = ({ label, active = true, size = 'small', removable = false, onRemove = () => {} }) => {
  const handleRemoveClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();

    if (removable && active) {
      onRemove();
    }
  };

  return (
    <button
      className={`
        inline-flex items-center justify-between
        ${size === 'small' ? 'px-3 py-1 text-sm' : 'px-4 py-2 text-base'}
        rounded-full m-1 outline-none transition-colors duration-300
        ${active ? 'bg-blue-500 text-white cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
      `}
      disabled={!active}
    >
      {label}
      {removable && (
        <span className="ml-2 text-inherit cursor-pointer" onClick={handleRemoveClick}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </span>
      )}
    </button>
  );
};

export default SubjectButton;
