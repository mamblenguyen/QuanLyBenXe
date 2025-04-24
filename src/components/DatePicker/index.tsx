import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import DatePickerProps from './type';
import Img from '../../assets/images/datePickerImg/u_calendar-alt.png';
import shapeR from '../../assets/images/datePickerImg/shapeR.png';
import shapeL from '../../assets/images/datePickerImg/shapeL.png';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Chọn ngày',
  className = '',
  width = '647px',
  height = '40px',
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const daysContainerRef = useRef<HTMLDivElement>(null);
  const datepickerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    renderCalendar();
  }, [currentDate, isCalendarOpen]);

  const formatDateValue = (date: Date) =>
    `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;

  const handleSelectDate = (date: Date, dayDiv: HTMLDivElement) => {
    const daysContainer = daysContainerRef.current;
    if (daysContainer) {
      onChange(formatDateValue(date));
      daysContainer.querySelectorAll('div').forEach((d) => d.classList.remove('bg-blue-500', 'text-white'));
      dayDiv.classList.add('bg-blue-500', 'text-white');
    }
    setIsCalendarOpen(false);
  };

  const renderCalendar = () => {
    const daysContainer = daysContainerRef.current;
    if (!daysContainer) return;

    daysContainer.innerHTML = '';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const totalCells = 42;

    for (let i = 0; i < totalCells; i++) {
      const dayDiv = document.createElement('div');
      let date: Date;
      if (i < firstDay) {
        const day = daysInPrevMonth - firstDay + i + 1;
        date = new Date(year, month - 1, day);
        dayDiv.className =
          'flex items-center justify-center h-10 w-10 rounded-lg cursor-pointer text-gray-400 hover:bg-blue-100 transition-colors';
        dayDiv.textContent = `${day}`;
      } else if (i < firstDay + daysInMonth) {
        const day = i - firstDay + 1;
        date = new Date(year, month, day);
        dayDiv.className =
          'flex items-center justify-center h-10 w-10 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors';
        dayDiv.textContent = `${day}`;
      } else {
        const day = i - (firstDay + daysInMonth) + 1;
        date = new Date(year, month + 1, day);
        dayDiv.className =
          'flex items-center justify-center h-10 w-10 rounded-lg cursor-pointer text-gray-400 hover:bg-blue-100 transition-colors';
        dayDiv.textContent = `${day}`;
      }

      dayDiv.addEventListener('click', () => handleSelectDate(date, dayDiv));
      daysContainer.appendChild(dayDiv);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleToggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      datepickerContainerRef.current &&
      !datepickerContainerRef.current.contains(event.target as Node) &&
      (event.target as HTMLElement).id !== 'datepicker' &&
      (event.target as HTMLElement).id !== 'toggleDatepicker'
    ) {
      setIsCalendarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const formatDateHeader = (date: Date) =>
    `Tháng ${date.toLocaleDateString('vi-VN', { month: 'long' }).split(' ')[1]}, ${date.getFullYear()}`;

  return (
    <div className={`relative ${className}`} style={{ maxWidth: width, height }}>
      {/* Input */}
      <input
        id="datepicker"
        type="text"
        value={value || ''}
        readOnly
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
        onClick={handleToggleCalendar}
      />

      {/* Calendar icon */}


      <div className="absolute right-3 transform -translate-y-1/2 cursor-pointer border-l border-gray-300 top-[21px]">
        <div
          id="toggleDatepicker"
          onClick={handleToggleCalendar}
          className="h-[40px] flex items-center px-2"
        >
          <Calendar size={24} color='blue' />
        </div>
      </div>



      {/* Calendar dropdown */}
      {isCalendarOpen && (
        <div
          ref={datepickerContainerRef}
          className="absolute z-10 mt-2 bg-white border rounded-lg shadow-lg w-full max-w-[375px] text-[16px]"
        >
          {/* Month navigation */}
          <div className="flex items-center justify-between p-4">
            <button onClick={handlePrevMonth} className="p-2 rounded-full">
              <ChevronLeft className="w-4 h-4" color='red' />
            </button>
            <span className="font-bold text-gray-900">{formatDateHeader(currentDate)}</span>
            <button onClick={handleNextMonth} className="p-2 rounded-full">
              <ChevronRight className="w-4 h-4" color='red' />
            </button>
          </div>
          {/* Days of the week */}
          <div className="grid grid-cols-7 font-bold text-center p-2">
            {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
              <div key={day} className="text-blue-600">
                {day}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div ref={daysContainerRef} className="grid grid-cols-7 text-center p-2"></div>

          {/* Actions */}
          {/* <div className="flex justify-center p-4">
              <button
                onClick={() => setIsCalendarOpen(false)}
                className="w-[90px] h-[40px] bg-blue-500 rounded-[5px] text-white font-medium transition-colors"
              >
                Chọn
              </button>
            </div> */}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
