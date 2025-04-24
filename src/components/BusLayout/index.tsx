import React from "react";
import Floor from "./Floor";

interface BusLayoutProps {
    type: number;
    selectedSeats: number[];
    setSelectedSeats: React.Dispatch<React.SetStateAction<number[]>>;
    bookedSeats: number[];
}

interface FloorLayout {
    level: string;
    bedsPerRow: number[][];
}

const busLayouts: Record<string, { name: string; floors: FloorLayout[] }> = {
    "1": {
        name: "Xe giường nằm 45 chỗ",
        floors: [
            {
                level: "Tầng dưới",
                bedsPerRow: [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9],
                    [10, 11, 12],
                    [13, 14, 15],
                    [16, 17, 18, 19, 20],
                ],
            },
            {
                level: "Tầng trên",
                bedsPerRow: [
                    [21, 22, 23],
                    [24, 25, 26],
                    [27, 28, 29],
                    [30, 31, 32],
                    [33, 34, 35],
                    [36, 37, 38, 39, 40],
                ],
            },
        ],
    },
    "2": {
        name: "Xe giường nằm 34 chỗ",
        floors: [
            {
                level: "Tầng dưới",
                bedsPerRow: [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9],
                    [10, 11, 12],
                    [13, 14, 15],
                    [16, 17, 18, 19],
                ],
            },
            {
                level: "Tầng trên",
                bedsPerRow: [
                    [20, 21, 22],
                    [23, 24, 25],
                    [26, 27, 28],
                    [29, 30, 31],
                    [32, 33, 34],
                ],
            },
        ],
    },
    "3": {
        name: "Xe giường nằm VIP 22 phòng",
        floors: [
            {
                level: "Tầng dưới",
                bedsPerRow: [
                    [1, 2],
                    [3, 4],
                    [5, 6],
                    [7, 8],
                    [9, 10],
                    [11],
                ],
            },
            {
                level: "Tầng trên",
                bedsPerRow: [
                    [12, 13],
                    [14, 15],
                    [16, 17],
                    [18, 19],
                    [20, 21],
                    [22],
                ],
            },
        ],
    },
};

const BusLayout: React.FC<BusLayoutProps> = ({ type, selectedSeats, setSelectedSeats, bookedSeats }) => {
    const layout = busLayouts[type];
    if (!layout) return <p>Không tìm thấy loại xe</p>;

    return (
        <div className="bg-white p-2 rounded shadow-md w-full max-w-2xl">
            {layout.floors.map((floor, index) => (
                <Floor
                    key={index}
                    level={floor.level}
                    bedsPerRow={floor.bedsPerRow}
                    bookedSeats={bookedSeats}
                    selectedSeats={selectedSeats}
                    onToggleSeat={(seatNumber) => {
                        const isSelected = selectedSeats.includes(seatNumber);
                        const newSelected = isSelected
                            ? selectedSeats.filter((s) => s !== seatNumber)
                            : [...selectedSeats, seatNumber];
                        setSelectedSeats(newSelected);
                    }}
                />
            ))}
        </div>
    );
};

export default BusLayout;
