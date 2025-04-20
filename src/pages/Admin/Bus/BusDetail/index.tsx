import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { Trash2 } from "lucide-react";
import apiInstance from "../../../../services/api";

interface Bus {
    id: number;
    bus_number: string;
    model: {
        id: number;
        name: string;
        capacity: number;
    };
    garage: {
        id: number;
        name: string;
        tax_code: string;
        address: string;
        phone: string;
    };
    images: string[]; // Thêm danh sách ảnh
    created_at: string;
    updated_at: string;
}

const BusDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();
    const [bus, setBus] = useState<Bus | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await apiInstance.get(`/api/system/bus/bus/${id}`);
                if (response.data.code === 200) {
                    setBus(response.data.data);
                } else {
                    console.error('Error fetching classes:', response.data.message);
                }
            } catch (error) {
                console.error('API Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);
    // useEffect(() => {
    //     const fetchBusDetail = async () => {
    //         try {
    //             const response = await fetch("/data/Bus.json");
    //             if (!response.ok) throw new Error("Không thể tải dữ liệu");

    //             const jsonData = await response.json();
    //             if (jsonData.code === 200 && Array.isArray(jsonData.data)) {
    //                 const selectedBus = jsonData.data.find((b: Bus) => b.id === Number(id));
    //                 if (selectedBus) {
    //                     setBus({
    //                         ...selectedBus,
    //                         images: [
    //                             "/images/bus1.jpg",
    //                             "/images/bus2.jpg",
    //                             "/images/bus3.jpg",
    //                             "/images/bus4.jpg",
    //                             "/images/bus5.jpg",
    //                             "/images/bus6.jpg"
    //                         ] // Thêm mock danh sách ảnh
    //                     });
    //                 } else {
    //                     console.error("Không tìm thấy xe");
    //                 }
    //             } else {
    //                 throw new Error("Dữ liệu API không hợp lệ");
    //             }
    //         } catch (error) {
    //             console.error("Lỗi tải dữ liệu xe:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchBusDetail();
    // }, [id]);

    if (loading) return <p className="text-center py-5">Đang tải...</p>;
    if (!bus) return <p className="text-center py-5 text-red-500">Không tìm thấy thông tin xe</p>;

    return (
        <div className="px-5">
            <div className="flex items-center space-x-5 mb-9">
                <h1 className="text-[20px] font-bold">Thông tin chi tiết xe</h1>
            </div>

            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="text-blue-500 hover:text-blue-700"
                >
                    &larr; Quay lại
                </button>
                <div className="flex items-center space-x-2">
                    <button>
                        <Trash2 className="w-8 h-8 text-red-500" />
                    </button>
                    <span className="text-gray-400">|</span>
                    <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                        <FaEdit size={18} />
                        <span>Chỉnh sửa</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 w-full border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                {/* Cột trái: Thông tin xe */}
                <div className="col-span-2 p-4">
                    <h3 className="font-bold text-blue-400 text-lg mb-2">Thông tin chi tiết</h3>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <label className="w-40 text-sm font-medium">Biển số xe:</label>
                            <span className="text-sm font-normal">{bus.bus_number}</span>
                        </div>
                        <div className="flex items-center">
                            <label className="w-40 text-sm font-medium">Tên xe:</label>
                            <span className="text-sm font-normal">{bus.model.name}</span>
                        </div>
                        <div className="flex items-center">
                            <label className="w-40 text-sm font-medium">Sức chứa:</label>
                            <span className="text-sm font-normal">{bus.model.capacity} ghế</span>
                        </div>
                        <div className="flex items-center">
                            <label className="w-40 text-sm font-medium">Nhà xe:</label>
                            <span className="text-sm font-normal">{bus.garage.name}</span>
                        </div>
                        <div className="flex items-center">
                            <label className="w-40 text-sm font-medium">Mã số thuế:</label>
                            <span className="text-sm font-normal">{bus.garage.tax_code}</span>
                        </div>
                        <div className="flex items-center">
                            <label className="w-40 text-sm font-medium">Địa chỉ nhà xe:</label>
                            <span className="text-sm font-normal">{bus.garage.address}</span>
                        </div>
                        <div className="flex items-center">
                            <label className="w-40 text-sm font-medium">Số điện thoại:</label>
                            <span className="text-sm font-normal">{bus.garage.phone}</span>
                        </div>
                        <div className="flex items-center">
                            <label className="w-40 text-sm font-medium">Ngày tạo:</label>
                            <span className="text-sm font-normal">{bus.created_at}</span>
                        </div>
                        <div className="flex items-center">
                            <label className="w-40 text-sm font-medium">Ngày cập nhật:</label>
                            <span className="text-sm font-normal">{bus.updated_at}</span>
                        </div>
                    </div>
                </div>

                {/* Cột phải: Hình ảnh xe */}
                <div className="col-span-1 p-4">
                    <h3 className="font-bold text-blue-400 text-lg mb-2">Hình ảnh xe</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {bus.images.map((img, index) => (
                            <div key={index} className="w-full h-28 border rounded-lg overflow-hidden">
                                <img src={img} alt={`Xe ${index + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusDetail;
