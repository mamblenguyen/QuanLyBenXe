import React, { useState, useEffect } from "react";
import caretDown from "../../assets/images/caret_down.png";
import caretDownDis from "../../assets/images/caret_down_disable.png";
import { DropdownProps, Option } from "./type";

const Dropdown: React.FC<DropdownProps> = ({
  options,
  disabled = false,
  icon = "right",
  width = "medium",
  state = "normal",
  value,
  onChange,
  selectedId,
  onClick
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedId) {
      const option = options.find((opt) => opt.id === selectedId);
      if (option) {
        setSelectedOption(option);
      }
    }
  }, [selectedId, options]);

  const handleToggleDropdown = () => {
    if (!disabled) setIsOpen(!isOpen);
    if (onClick) {
      onClick(); // Gọi onClick nếu có
    }
  };

  const handleOptionSelect = (option: Option) => {
    if (!disabled) {
      setSelectedOption(option);
      setIsOpen(false);
      if (onChange) {
        onChange(option);
      }
    }
  };

  const dropdownIcon = disabled ? caretDownDis : caretDown;

  return (
    <div
      className={`relative 
        ${width === "short" ? "w-1/4 md:w-32" : ""}
        ${width === "medium" ? "w-1/2 md:w-48" : ""}
        ${width === "long" ? "w-full md:w-64" : ""}
        ${width !== "short" && width !== "medium" && width !== "long" ? width : ""}
      `}
    >
      <div
        className={`flex items-center justify-between px-4 py-2 border rounded-lg 
          ${disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white cursor-pointer"} 
          ${state === "error" ? "border-red-500 text-red-500" : "border-gray-300"} 
          hover:bg-gray-100 transition-all duration-200
        `}
        onClick={handleToggleDropdown}
      >
        {icon === "left" && (
          <img className="w-4 h-4 mr-2" alt="arrow" src={dropdownIcon} />
        )}
        <span className="text-sm text-gray-900">
          {selectedOption?.value || (options.length > 0 ? options[0].value : "Chọn một tùy chọn")}
        </span>
        {icon === "right" && (
          <img className="w-4 h-4 ml-2" alt="arrow" src={dropdownIcon} />
        )}
      </div>
      {isOpen && (
        <div className="absolute left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-10 max-h-48 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.id}
              className="px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionSelect(option)}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
