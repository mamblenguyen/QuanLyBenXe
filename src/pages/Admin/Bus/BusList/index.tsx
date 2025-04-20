import React, { useEffect, useState } from "react";
import { FaSearch, FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLoading } from "../../../../context/loading";
import apiInstance from "../../../../services/api";
import DeletePopup from "../../../../components/Popup/Delete";
interface Garage {
    id: number;
    name: string;
    tax_code: string;
    address: string;
    phone: string;
}

interface Bus {
    id: string;
    bus_number: string;
    model: {
        id: string,
        name: string,
        capacity: number
    };
    status: {
        id: number,
        name: string
    };
    images: [];
    garage?: Garage | null;
}

const getStatusColor = (statusId: number | null) => {
    let statusColor = '#000';

    switch (statusId) {
        case 1:
            statusColor = 'green';
            break;
        case 2:
            statusColor = 'orange';
            break;
        case 3:
            statusColor = 'red';
            break;
        default:
            statusColor = '#000';
            break;
    }

    return statusColor;
};

const roleMapping: Record<string, string> = {
    Admin: "Quản trị",
    Traffic: "Tài xế",
    Staff: "Nhân viên bán vé",
};

const BusList: React.FC = () => {
    const { setLoading } = useLoading();
    const [buses, setBuses] = useState<Bus[]>([]);
    const [filteredBuses, setFilteredBuses] = useState<Bus[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedBuses, setSelectedBuses] = useState<Bus | null>(null);

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                setLoading(true);
                const response = await apiInstance.get('/api/system/bus/buses');
                if (response.data.code === 200) {
                    setBuses(response.data.data);
                    setFilteredBuses(response.data.data);
                } else {
                    throw new Error("Dữ liệu API không hợp lệ");
                }
            } catch (error) {
                console.error("Lỗi tải danh sách xe buýt:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBuses();
    }, []);

    useEffect(() => {
        const filtered = buses.filter((bus) => {
            const busNumber = bus.bus_number ? bus.bus_number.toLowerCase() : '';
            const busId = bus.id ? bus.id.toString().toLowerCase() : '';
            return (
                busNumber.includes(searchTerm.toLowerCase()) ||
                busId.includes(searchTerm.toLowerCase())
            );
        });
        setFilteredBuses(filtered);
    }, [searchTerm, buses]);

    const handleDeleteClick = (bus: Bus) => {
        setSelectedBuses(bus);
        setIsPopupOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedBuses) return;

        try {
            setLoading(true);
            await apiInstance.delete(`api/system/bus/bus/${selectedBuses.id}`);
            setBuses(buses.filter(bus => bus.id !== selectedBuses.id));
            setFilteredBuses(filteredBuses.filter(bus => bus.id !== selectedBuses.id));
            setIsPopupOpen(false);
        } catch (error) {
            console.error("Error deleting bus:", error);
        } finally {
            setLoading(false);
        }
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
                        <th className="p-3 text-left">Biển số</th>
                        <th className="p-3 text-left">Loại xe</th>
                        <th className="p-3 text-left">Số ghế</th>
                        <th className="p-3 text-left">Trạng thái</th>
                        <th className="p-3 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBuses.length > 0 ? (
                        filteredBuses.map((bus) => {
                            const statusColor = getStatusColor(bus.status?.id);
                            return (
                                <tr key={bus.id} className="border-b border-gray-200">
                                    <td className="p-3">{bus.bus_number}</td>
                                    <td className="p-3">{bus.model?.name}</td>
                                    <td className="p-3">{bus.model?.capacity}</td>
                                    <td className="p-3">
                                        <div
                                            className="inline-flex items-center justify-center px-4 py-2 rounded border gap-2 text-[15px] font-medium whitespace-nowrap"
                                            style={{ color: statusColor, borderColor: statusColor }}
                                        >
                                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor }}></span>
                                            {bus.status?.name}
                                        </div>
                                    </td>
                                    <td className="p-3 text-center">
                                        <div className="flex justify-center gap-3">
                                            <Link to={`detail/${bus.id}`} className="text-blue-500 hover:text-blue-700">
                                                <FaEye size={18} />
                                            </Link>
                                            <Link to={`/admin/bus/edit/${bus.id}`} className="text-yellow-500 hover:text-yellow-700">
                                                <FaEdit size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteClick(bus)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FaTrash size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={5} className="p-3 text-center text-gray-500">
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <DeletePopup
                isOpen={isPopupOpen}
                onCancel={() => setIsPopupOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Xác nhận xóa"
                text={`Bạn có chắc chắn muốn xóa xe ${selectedBuses?.bus_number}?`}
            />
        </div>
    );
};

export default BusList;
