// Interface for the props of the NavBar component
export interface NavbarProps {
  // Prop that determines the collapsed state of the navigation bar
  collapsed: boolean;
  // Prop to update the collapsed state of the navigation bar
  setCollapsed: (value: boolean) => void;
}

// Interface for the menu items
export interface MenuItem {
  // Path to the default icon
  default: string;
  // Path to the icon when the navigation bar is collapsed
  collapsed: string;
  // Path to the icon when the menu item is selected
  selected: string;
  // Title of the menu item
  title: string;
  // Link for the menu item
  link: string;
  // Submenu items (optional) for the menu item
  subMenu?: {
    // Title of the submenu item
    title: string;
    // Link for the submenu item
    link: string;
  }[];
}
