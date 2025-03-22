export type InputSize = 'full' | 'small' | 'medium' | 'large';
export type InputBorder = 'red' | 'blue' | 'grey' | 'transparent';
export type InputBackground = 'white' | 'dark grey' | 'light grey';
export type InputType = 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'file';

export interface InputProps {
  // The type of input, can be one of: "text", "password", "email", "number", "search", "tel", or "url". Default is "text".
  type?: InputType;

  // The size of the input, can be: "full", "small", "medium", or "large". Default is "medium".
  size?: InputSize;

  // The border color of the input, can be: "red", "blue", or "grey". Default is "transparent".
  border?: InputBorder;

  // The background color of the input, can be: "white", "dark grey", or "light grey". Default is "white".
  background?: InputBackground;

  // The placeholder text displayed inside the input field, e.g., "Enter your name".
  placeholder?: string;

  // The value of the input, managed using state.
  value: string; // Required

  /** 
  The function that handles input changes.
  Example: When a user enters a keyword in a search input, this function processes the input and returns results. 
    (onChange={(e) => {
      setState(e.target.value);
    }})
  **/
  onChange?: (value: any) => void; // Required

  // An icon displayed inside the input field.
  // Example: To use a search icon, pass `icon={<FaSearch />}`.
  icon?: React.ReactNode;

  // If the input needs to be disabled, simply add the `disabled` attribute.
  disabled?: boolean;

  // The border-radius of the input for rounded corners.
  // The value should be in pixels, e.g., `borderRadius="16px"`.
  borderRadius?: string;
}