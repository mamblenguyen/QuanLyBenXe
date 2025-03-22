import React, { useState, useEffect, useRef } from 'react';
import caretDown from '../../assets/images/caret_down.png';
import caretDownDis from '../../assets/images/caret_down_disable.png';
import { DropdownProps, Option } from './type';


const MultiSelectDropdown: React.FC<DropdownProps> = ({
  options,
  disabled = false,
  icon = 'right',
  width = 'w-full',
  state = 'normal',
  className = '',
  color = '',
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: Option) => {
    if (!disabled) {
      setSelectedOptions((prev) => (prev.some((o) => o.id === option.id) ? prev.filter((o) => o.id !== option.id) : [...prev, option]));
    }
  };

  const handleRemoveOption = (optionId: number) => {
    setSelectedOptions((prev) => prev.filter((o) => o.id !== optionId));
  };

  const filteredOptions = options.filter((option) => option.value.toLowerCase().includes(searchTerm.toLowerCase()));

  const dropdownIcon = disabled ? caretDownDis : caretDown;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${width === 'short' ? 'w-1/4 md:w-32' : ''} ${width} ${className}`} ref={dropdownRef}>
      <div
        className={`flex items-center justify-between px-4 py-2 border rounded-lg 
          ${disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-white cursor-pointer'} 
          ${state === 'error' ? 'border-red-500 text-red-500' : 'border-gray-300'} 
          hover:bg-gray-100 transition-all duration-200
          ${className}`}
        onClick={handleToggleDropdown}
      >
        {icon === 'left' && <img className="w-4 h-4 mr-2" alt="arrow" src={dropdownIcon} />}
        <div className="flex flex-wrap gap-1 items-center w-full">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((o) => (
              <span key={o.id} className={`px-2 py-1 text-sm rounded flex items-center ${color}`}>
                {o.value}
                <button
                  className="ml-2 text-red-500 text-xs font-bold"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveOption(o.id);
                  }}
                >
                  <span className={`bg-white text-black rounded-full py-[1px] px-[3px] text-[12px]`}>✕</span>
                  
                </button>
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-900">Chọn một hoặc nhiều tùy chọn</span>
          )}
        </div>
        {icon === 'right' && <img className="w-4 h-4 ml-2" alt="arrow" src={dropdownIcon} />}
      </div>
      {isOpen && (
        <div className="absolute left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-10 max-h-48 overflow-y-auto">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none"
          />
          {filteredOptions.map((option) => (
            <div
              key={option.id}
              className={`px-4 py-2 text-sm text-gray-900 flex items-center cursor-pointer hover:bg-gray-100 
                ${selectedOptions.some((o) => o.id === option.id) ? 'bg-gray-200' : ''}`}
              onClick={() => handleOptionSelect(option)}
            >
              <input type="checkbox" checked={selectedOptions.some((o) => o.id === option.id)} className="mr-2" readOnly />
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;