export interface TagItem {
    id: number;
    value: string;
}

export interface TagProps {
    tags: TagItem[];
    selectedTags: TagItem[];
    onTagClick: (tag: TagItem) => void;
}