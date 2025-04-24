import React, { useState } from "react";

interface FloorProps {
    level: string;
    bedsPerRow: number[][];
    bookedSeats: number[];
    selectedSeats: number[];
    onToggleSeat: (seat: number) => void;
}

const Floor: React.FC<FloorProps> = ({ level, bedsPerRow, bookedSeats, selectedSeats, onToggleSeat }) => {
    const toggleSeat = (seat: number) => {
        if (bookedSeats.includes(seat)) return;
        onToggleSeat(seat);
    };

    return (
        <div >
            <h3 className="text-lg font-semibold">{level}</h3>
            <div className="flex flex-col gap-2">
                {bedsPerRow.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-2 justify-center">
                        {row.map((bedNumber) => {
                            const isBooked = bookedSeats.includes(bedNumber);
                            const isSelected = selectedSeats.includes(bedNumber);
                            const baseStyle = "w-10 h-10 rounded flex items-center justify-center text-sm font-semibold cursor-pointer";
                            const colorClass = isBooked
                                ? "bg-red-400 text-white cursor-not-allowed"
                                : isSelected
                                    ? "bg-blue-400 text-white"
                                    : "bg-green-200 hover:bg-green-300";

                            return (
                                <div
                                    key={bedNumber}
                                    className={`${baseStyle} ${colorClass}`}
                                    onClick={() => toggleSeat(bedNumber)}
                                >
                                    {bedNumber}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Floor;
