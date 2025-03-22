import React from "react";
import { TagProps, TagItem } from "./type";

const Tags: React.FC<TagProps> = ({ tags, selectedTags, onTagClick }) => {
    return (
        <div className="flex gap-2">
        {tags.map((tag: TagItem) => {
            const isSelected = selectedTags.some((t) => t.id === tag.id);
            return (
                <div
                    key={tag.id}
                    className={`w-48 h-10 inline-flex items-center justify-center px-12 py-2 rounded-full font-bold text-lg cursor-pointer transition-all duration-300 
                    ${isSelected ? "bg-gray-800 text-white" : "bg-gray-200 opacity-50 hover:opacity-100"}`}
                    onClick={() => onTagClick(tag)}
                >
                    {tag.value}
                </div>
            );
        })}
    </div>
    );
};

export default Tags;
