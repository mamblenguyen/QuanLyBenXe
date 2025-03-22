export type StarProps = {
  isSelected: boolean; 
  size?: number; 
  colorSelected?: string; 
  colorUnselected?: string; 
  position?: { top: number; left: number };
  className?: string; 
  handleClick?: () => void;
};
