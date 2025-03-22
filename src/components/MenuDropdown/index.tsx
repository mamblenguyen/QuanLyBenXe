import { useState, useEffect, useRef } from 'react';
import Update from '../../assets/images/update-icon.png';

interface DropdownOption {
  key: string;
  label: string;
  onClick: (rowId: string | number) => void;
}

interface DropdownMenuProps {
  rowId: string | number;
  options: DropdownOption[];
}

const DropdownMenu = ({ rowId, options }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updatePosition = () => {
    if (buttonRef.current && dropdownRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Kiểm tra xem có đủ chỗ hiển thị menu bên dưới không
      const openAbove = buttonRect.bottom + dropdownRect.height > windowHeight;

      setPosition({
        top: openAbove ? buttonRect.top - dropdownRect.height : buttonRect.bottom,
        left: buttonRect.left + buttonRect.width / 2 - dropdownRect.width / 2,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        updatePosition();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      <button ref={buttonRef} onClick={() => setIsOpen((prev) => !prev)} className="p-1 text-orange-500 hover:bg-orange-50 rounded">
        <img src={Update} alt="" className="w-5 h-5" />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="fixed w-48 bg-white shadow-lg rounded-lg border z-50"
          style={{ top: `${position.top}px`, left: `${position.left}px` }}
        >
          <ul className="px-6 py-4 text-gray-700 ">
            {options.map((option) => (
              <li
                key={option.key}
                onClick={() => {
                  option.onClick(rowId);
                  setIsOpen(false);
                }}
                className=" py-2 hover:bg-gray-100 cursor-pointer text-start border-b-2 border-orange-200 last:border-none"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
