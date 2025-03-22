type DatePickerProps = {
  value: string | null; // value of datePicker
  onChange: (date: string | null) => void; // value when changed
  placeholder?: string; // Display the placeholder
  className?: string; // class css
  width?: string; // value for width
  height?: string; // value for height
};

export default DatePickerProps;
