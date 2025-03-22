export interface Option {
  id: string;
  value: string;
}
export interface SidebarProps {
  setSelectedContent: (content: string) => void;
  selectedContent: string;
}
