import React from 'react';
import { ButtonProps } from './type';

const Button: React.FC<ButtonProps> = ({
  label, // Nội dung hiển thị trên nút
  size = 'medium', // Kích thước của nút
  variant = 'solid', // Kiểu dáng của nút
  disabled = false, // Trạng thái vô hiệu hóa
  icon, // Biểu tượng
  iconPosition = 'left', // Vị trí của biểu tượng ('left' hoặc 'right')
  onClick, // Sự kiện click
  textColor, // Màu chữ
  backgroundColor, // Màu nền
  border, // Viền
  hoverBackgroundColor, // Màu nền khi hover
  hoverCursor = 'pointer', // Kiểu con trỏ khi hover
}) => {
  const baseClasses = `inline-flex items-center justify-center font-bold transition-all duration-300 px-4`;

  const sizeClasses = {
    big: 'min-w-[160px] h-[52px] text-[18px] rounded-[8px]',
    medium: 'min-w-[90px] h-[36px] text-[16px] rounded-[4px]',
    mini: 'min-w-[120px] h-[32px] text-[16px] rounded-[4px]',
  };

  const variantClasses = {
    solid: 'bg-[#1D4ED8] text-white border-none hover:bg-[#2563EB]',
    outline: 'bg-transparent text-[#1D4ED8] border-2 border-[#1D4ED8] hover:bg-[rgba(29,78,216,0.1)] hover:text-[#1D4ED8]',
    ghost: 'bg-transparent text-[#1D4ED8] border-none hover:bg-[rgba(29,78,216,0.1)]',
    none: 'bg-transparent text-inherit border-none',
    disabled: 'bg-[#E0E0E0] text-[#A0A0A0] cursor-not-allowed',
  };

  const customStyles = {
    color: textColor,
    backgroundColor,
    border,
    cursor: hoverCursor,
  } as React.CSSProperties;

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[disabled ? 'disabled' : variant]}`}
      onClick={onClick}
      disabled={disabled}
      style={customStyles}
    >
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {label && <span>{label}</span>}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
