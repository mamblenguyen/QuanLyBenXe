import React from "react";

interface BedProps {
    label: string;
}

const Bed: React.FC<BedProps> = ({ label }) => {
    return (
        <div className="w-10 h-16 border border-gray-400 bg-green-200 text-center text-xs flex items-center justify-center rounded">
            {label}
        </div>
    );
};

export default Bed;
