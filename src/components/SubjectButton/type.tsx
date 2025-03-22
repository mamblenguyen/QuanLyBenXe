export type ButtonProps = {
  label: string;
  active?: boolean;
  size?: 'small' | 'large';
  removable?: boolean;
  onRemove?: () => void;
};
