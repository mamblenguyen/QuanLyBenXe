/**
 * Represents a single breadcrumb item.
 * @property {string} name - The display name of the breadcrumb.
 * @property {string} [href] - The URL the breadcrumb links to (optional).
 * @property {boolean} [isActive] - Indicates if the breadcrumb is currently active (optional).
 */
export type Breadcrumb = {
  name: string;
  href?: string;
  isActive?: boolean;
};



/**
 * Props for the AddressUrlStack component.
 * @property {Breadcrumb[]} breadcrumbs - An array of breadcrumb items to display in the navigation.
 */
export type AddressUrlStackProps = {
  breadcrumbs: Breadcrumb[];
  background?: string
};
