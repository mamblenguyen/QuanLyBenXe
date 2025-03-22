import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { StarProps } from './type';

/**
 * Star component renders a star icon with customizable properties.
 *
 * @param {boolean} isSelected - Determines if the star is selected or not.
 * @param {number} [size=60] - The size of the star in pixels.
 * @param {string} [colorSelected="#FFC107"] - The color of the star when selected.
 * @param {string} [colorUnselected="#C9C4C0"] - The color of the star when unselected.
 * @param {object} [position={ top: 20, left: 20 }] - The position of the star with top and left properties.
 * @param {number} position.top - The top position of the star in pixels.
 * @param {number} position.left - The left position of the star in pixels.
 * @param {string} [className=""] - Additional CSS classes to apply to the star.
 * @param {() => void} [handleClick] - Callback function to handle click events.
 *
 * @returns {JSX.Element} The rendered star icon.
 */
const Star: React.FC<StarProps> = ({
  isSelected,
  size = 60,
  colorSelected = 'background-orange-2',
  colorUnselected = 'background-gray',
  position = { top: 20, left: 20 },
  className = '',
  handleClick,
}) => {
  const color = isSelected ? colorSelected : colorUnselected;

  // Define styles as an object to improve readability and maintainability
  const styles = {
    icon: {
      color: color, // Star color based on selection state
      width: `${size}px`, // Set the width of the star
      height: `${size}px`, // Set the height of the star
      position: 'absolute' as const, // Ensure the star is positioned absolutely
      top: `${position.top}px`, // Position from the top
      left: `${position.left}px`, // Position from the left
      transition: 'color 0.3s', // Smooth transition effect when color changes
      cursor: 'pointer', // Indicate the star is clickable
    },
  };

  return (
    <FontAwesomeIcon
      icon={isSelected ? solidStar : regularStar}
      className={`transition-colors ${className}`} // Apply transition effect and additional classes
      style={styles.icon} // Apply inline styles from the styles object
      onClick={handleClick} // Trigger the external click handler
    />
  );
};

export default Star;
