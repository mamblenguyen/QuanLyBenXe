import React from 'react';
import { ButtonProps } from './type';

const Button: React.FC<ButtonProps> = ({
  label, // Nội dung hiển thị trên nút
  size = 'medium', // Kích thước của nút (big, medium, mini), mặc định là 'medium'
  variant = 'solid', // Kiểu dáng của nút (solid, outline, ghost, none), mặc định là 'solid'
  disabled = false, // Trạng thái vô hiệu hóa (true/false), mặc định là false
  icon, // Biểu tượng hiển thị trên nút (nếu có)
  iconPosition = 'left', // Vị trí của biểu tượng ('left' hoặc 'right'), mặc định là 'left'
  onClick, // Hàm xử lý khi người dùng click vào nút
  textColor, // Màu chữ của nút (tùy chỉnh)
  backgroundColor, // Màu nền của nút (tùy chỉnh)
  border, // Viền của nút (tùy chỉnh)
  hoverBackgroundColor, // Màu nền khi hover (tùy chỉnh)
  hoverCursor = 'pointer', // Kiểu con trỏ khi hover, mặc định là 'pointer'
}) => {
  const baseClasses = `inline-flex items-center justify-center font-bold transition-all duration-300 px-4`;

  const sizeClasses = {
    big: 'min-w-[160px] h-[52px] text-[18px] rounded-[8px]',
    medium: 'min-w-[90px] h-[36px] text-[16px] rounded-[4px]',
    mini: 'min-w-[120px] h-[32px] text-[16px] rounded-[4px]',
  };

  const variantClasses = {
    solid: 'bg-[#ff7506] text-white border-none hover:bg-[#e06504]',
    outline: 'bg-transparent text-[#ff7506] border-2 border-[#ff7506] hover:bg-[rgba(255,117,6,0.1)] hover:text-white',
    ghost: 'bg-transparent text-[#ff7506] border-none hover:bg-[rgba(255,117,6,0.1)]',
    none: 'bg-transparent text-inherit border-none',
    disabled: 'bg-[#e0e0e0] text-[#c9c4c0] cursor-not-allowed',
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
