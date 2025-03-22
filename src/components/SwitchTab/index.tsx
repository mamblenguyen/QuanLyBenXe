import React from "react";
import { SwitchTabProps, TabItem } from "./type";

const SwitchTab: React.FC<SwitchTabProps> = ({ options, selected, onSelect }) => {
  const handleTabClick = (tab: TabItem) => {
    onSelect(tab);
  };

  return (
    <div className="flex w-96 h-12 rounded-full p-1 bg-gray-200 overflow-hidden">
      {options.map((tab) => (
        <div
          key={tab.id}
          className={`flex-1 flex justify-center items-center h-9 rounded-full px-10 py-1 font-bold cursor-pointer transition-all duration-300 ease-in-out 
          ${selected?.id === tab.id ? "bg-gray-800 text-white" : "bg-gray-200 text-black hover:bg-gray-300"}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab.value}
        </div>
      ))}
    </div>
  );
};

export default SwitchTab;
