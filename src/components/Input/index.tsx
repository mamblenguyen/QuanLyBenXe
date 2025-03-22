import React from 'react';
import { InputWrapper, IconWrapper, StyledInput } from './style';
import { InputProps } from './type';

const Input: React.FC<InputProps> = ({
  type = 'text', // Loại input, có thể là: "text", "password", "email", "number", "search", "tel", hoặc "url". Mặc định là "text".
  size = 'medium', // Kích thước của input, có thể là: "full", "small", "medium", hoặc "large". Mặc định là "medium".
  border = 'transparent', // Màu viền của input, có thể là: "red", "blue", "grey", hoặc "transparent". Mặc định là "transparent".
  background = 'white', // Màu nền của input, có thể là: "white", "dark grey", hoặc "light grey". Mặc định là "white".
  placeholder = '', // Văn bản gợi ý hiển thị trong ô nhập liệu, ví dụ: "Nhập tên của bạn".
  value, // Giá trị của ô nhập liệu, được quản lý bằng state (bắt buộc).
  onChange, // Hàm xử lý khi giá trị trong ô nhập liệu thay đổi.
  icon = false, // Biểu tượng hiển thị trong ô nhập liệu. Ví dụ: có thể truyền `icon={<FaSearch />}`.
  disabled = false, // Trạng thái vô hiệu hóa input, nếu true thì không thể chỉnh sửa.
  borderRadius = '', // Độ bo tròn của viền input, giá trị có thể là số pixel, ví dụ: "16px".
}) => {
  return (
    <InputWrapper $size={size} $border={border} $borderRadius={borderRadius}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <StyledInput
        type={type}
        placeholder={placeholder}
        $background={background}
        value={value}
        $hasIcon={!!icon}
        onChange={onChange}
        className={disabled ? 'disabled' : ''}
        $borderRadius={borderRadius}
      />
    </InputWrapper>
  );
};

export default Input;