export interface Option {
  id: number;
  value: string;
}

export interface DropdownProps {
  options: Option[];
  disabled?: boolean;
  icon?: 'left' | 'right';
  width?: 'medium' | 'long' | 'short' | string;
  state?: 'normal' | 'selected' | 'error';
  className?: string;
  color?: string;
}
