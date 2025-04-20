export interface Option {
  id: number | string;
  value: string;
}

export interface DropdownProps {
  options: Option[];
  disabled?: boolean;
  icon?: 'left' | 'right';
  width?: 'medium' | 'long' | 'short' | string;
  state?: 'normal' | 'selected' | 'error';
  onChange?: (option: Option) => void;
  value?: string | number; // ✅ thêm vào để hỗ trợ controlled
  selectedId?: string | number | null; // vẫn giữ cho uncontrolled
  onClick?: () => void;
}
