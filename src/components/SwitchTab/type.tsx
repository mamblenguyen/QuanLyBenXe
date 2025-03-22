export interface TabItem {
    id: number;
    value: string;
  }
  
  export interface SwitchTabProps {
    options: TabItem[];
    selected: TabItem | null;
    onSelect: (tab: TabItem) => void;
  }
  