import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import DatePickerProps from './type';
import Img from '../../assets/images/datePickerImg/u_calendar-alt.png';
import shapeR from '../../assets/images/datePickerImg/shapeR.png';
import shapeL from '../../assets/images/datePickerImg/shapeL.png';

const DatePicker: React.FC<DatePickerProps> = ({
  value, // value of datePicker
  onChange, // value when changed
  placeholder = 'Chọn ngày', // Display the placeholder
  className = '', // class css
  width = '647px', // Default value for width
  height = '40px', // Default value for height
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const daysContainerRef = useRef<HTMLDivElement>(null);
  const datepickerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (daysContainerRef.current) {
      renderCalendar();
    }
  }, [currentDate, isCalendarOpen]);

  const renderCalendar = () => {
    if (!daysContainerRef.current) return;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // First day of the month
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Number of days in current month
    const daysInPrevMonth = new Date(year, month, 0).getDate(); // Number of days in last month

    const daysContainer = daysContainerRef.current;
    daysContainer.innerHTML = '';

    // Render the days of the previous month
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'flex items-center justify-center h-10 w-10 rounded-lg cursor-pointer text-gray-400 hover:bg-blue-100 transition-colors';
      dayDiv.textContent = (daysInPrevMonth - i).toString();
      dayDiv.addEventListener('click', () => {
        const selectedDate = new Date(year, month - 1, daysInPrevMonth - i); // Day of last month
        const selectedDateValue = `${selectedDate.getDate().toString().padStart(2, '0')}/${(selectedDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${selectedDate.getFullYear()}`;
        onChange(selectedDateValue);
        daysContainer.querySelectorAll('div').forEach((d) => d.classList.remove('bg-blue-500', 'text-white'));
        dayDiv.classList.add('bg-blue-500', 'text-white');
      });
      daysContainer.appendChild(dayDiv);
    }

    // Render the days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'flex items-center justify-center h-10 w-10 rounded-lg cursor-pointer hover:bg-blue-100  transition-colors';
      dayDiv.textContent = i.toString();
      dayDiv.addEventListener('click', () => {
        const selectedDateValue = `${i.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`;
        onChange(selectedDateValue);
        daysContainer.querySelectorAll('div').forEach((d) => d.classList.remove('bg-blue-500', 'text-white'));
        dayDiv.classList.add('bg-blue-500', 'text-white');
      });
      daysContainer.appendChild(dayDiv);
    }

    // Render the days of the next month
    const totalDays = firstDayOfMonth + daysInMonth;
    const remainingDays = 35 - totalDays;
    for (let i = 1; i <= remainingDays; i++) {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'flex items-center justify-center h-10 w-10 rounded-lg cursor-pointer text-gray-400 hover:bg-blue-100  transition-colors';
      dayDiv.textContent = i.toString();
      dayDiv.addEventListener('click', () => {
        const selectedDate = new Date(year, month + 1, i); // Day of next month
        const selectedDateValue = `${selectedDate.getDate().toString().padStart(2, '0')}/${(selectedDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${selectedDate.getFullYear()}`;
        onChange(selectedDateValue);
        daysContainer.querySelectorAll('div').forEach((d) => d.classList.remove('bg-blue-500', 'text-white'));
        dayDiv.classList.add('bg-blue-500', 'text-white');
      });
      daysContainer.appendChild(dayDiv);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleApply = () => {
    setIsCalendarOpen(false);
  };

  const handleToggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
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

  const formatDateString = (date: Date) => {
    const month = date.toLocaleDateString('vi-VN', { month: 'long' });
    const year = date.getFullYear();
    return `Tháng ${month.split(' ')[1]}, ${year}`;
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Style functions
  const styles = {
    container: {
      maxWidth: width,
      height: height,
    },
  };

  return (
    <div className={`relative ${className}`} style={styles.container}>
      {/* Input field */}
      <input
        id="datepicker"
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
        value={value || ''}
        readOnly
        onClick={handleToggleCalendar}
      />
      {/* Calendar icon */}
      <div className="absolute right-3 transform -translate-y-1/2 cursor-pointer border-l border-gray-300 border-black-text top-[21px]">
        <img src={Img} alt="calendar" id="toggleDatepicker" onClick={handleToggleCalendar} className="h-[40px]" />
      </div>

      {/* Calendar dropdown */}
      {isCalendarOpen && (
        <div ref={datepickerContainerRef} className="absolute z-10 mt-2 bg-white border rounded-lg shadow-lg w-full max-w-[375px] text-[16px]">
          {/* Month navigation */}
          <div className="flex items-center justify-between p-4">
            <button onClick={handlePrevMonth} className="p-2 rounded-ful">
              <img src={shapeL} alt="Shape Left" className="w-2 h-3" />
            </button>
            <span className="font-bold text-gray-900">{formatDateString(currentDate)}</span>
            <button onClick={handleNextMonth} className="p-2 rounded-ful">
              <img src={shapeR} alt="Shape Right" className="w-2 h-3" />
            </button>
          </div>

          {/* Days of the week */}
          <div className="grid grid-cols-7  font-bold text-center p-2 ">
            {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
              <div key={day} className="text-blue-600">
                {day}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div ref={daysContainerRef} className="grid grid-cols-7 text-center p-2"></div>

          {/* Actions */}
          <div className="flex justify-center p-4">
            <button onClick={handleApply} className="w-[90px] h-[40px] bg-orange-500 rounded-[5px] text-white font-medium transition-colors">
              Chọn
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
