import React, { useEffect, useState } from "react";
import { FaSearch, FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Model {
    id: number;
    name: string;
    capacity: number;
}

interface Garage {
    id: number;
    name: string;
    tax_code: string;
    address: string;
    phone: string;
}

interface Bus {
    id: number;
    bus_number: string;
    model: Model;
    garage: Garage;
    created_at: string;
}

const BusList: React.FC = () => {
    const [buses, setBuses] = useState<Bus[]>([]);
    const [filteredBuses, setFilteredBuses] = useState<Bus[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const response = await fetch("/data/bus.json");
                if (!response.ok) throw new Error("Không thể tải dữ liệu");
                const jsonData = await response.json();

                if (jsonData.code === 200 && Array.isArray(jsonData.data)) {
                    setBuses(jsonData.data);
                    setFilteredBuses(jsonData.data);
                } else {
                    throw new Error("Dữ liệu API không hợp lệ");
                }
            } catch (error) {
                console.error("Lỗi tải danh sách xe buýt:", error);
            }
        };

        fetchBuses();
    }, []);

    useEffect(() => {
        const filtered = buses.filter((bus) =>
            bus.bus_number.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBuses(filtered);
    }, [searchTerm, buses]);

    const handleDelete = (id: number) => {
        console.log("Xóa xe buýt:", id);
    };

    return (
        <div className="max-w-full p-6 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">Danh sách Xe </h2>
                <Link to="add" className="text-blue-500 hover:text-blue-700">
                    <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        <FaPlus size={18} />
                        Thêm Xe

                    </button>
                </Link>
            </div>

            <div className="flex justify-end items-center mb-4">
                <div className="relative w-64">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo số xe"
                        className="pl-10 pr-4 py-2 rounded-3xl bg-gray-100 w-full focus:outline-none text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
            </div>

            <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="p-3 text-left">STT</th>
                        <th className="p-3 text-left">Số xe</th>
                        <th className="p-3 text-left">Loại xe</th>
                        <th className="p-3 text-left">Sức chứa</th>
                        <th className="p-3 text-left">Nhà xe</th>
                        <th className="p-3 text-left">Địa chỉ nhà xe</th>
                        <th className="p-3 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBuses.length > 0 ? (
                        filteredBuses.map((bus, index) => (
                            <tr key={bus.id} className="border-b border-gray-200">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{bus.bus_number}</td>
                                <td className="p-3">{bus.model.name}</td>
                                <td className="p-3">{bus.model.capacity}</td>
                                <td className="p-3">{bus.garage.name}</td>
                                <td className="p-3">{bus.garage.address}</td>
                                <td className="p-3 text-center">
                                    <div className="flex justify-center gap-3">
                                        <Link to={`detail/${bus.id}`} className="text-blue-500 hover:text-blue-700">
                                            <FaEye size={18} />
                                        </Link>
                                        <Link to={`edit/${bus.id}`} className="text-yellow-500 hover:text-yellow-700">
                                            <FaEdit size={18} />
                                        </Link>
                                        <button onClick={() => handleDelete(bus.id)} className="text-red-500 hover:text-red-700">
                                            <FaTrash size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="p-3 text-center text-gray-500">
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BusList;
