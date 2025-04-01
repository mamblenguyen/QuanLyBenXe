import { FaEdit } from "react-icons/fa";
import { Trash2 } from "lucide-react";

const busStation = {
    id: "BS12345",
    name: "Bến Xe Miền Tây",
    province: "TP. Hồ Chí Minh",
    address: "395 Kinh Dương Vương, An Lạc, Bình Tân, TP.HCM",
    status: "Đang hoạt động",
    images: [
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
    ],
};

const BusStationDetail = () => {
    return (
        <div className="px-5">
            <div className="flex items-center space-x-5 mb-9">
                <h1 className="text-[20px] font-bold">Thông tin bến xe</h1>
            </div>

            <div className="flex justify-between items-center mb-6">
                <div></div>
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

            <div className="max-w-full rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <div className="bg-blue-500 text-white font-bold text-lg p-3 rounded-tl-lg rounded-tr-lg">
                    Thông tin chung
                </div>

                <div className="grid grid-cols-2 gap-6 p-4 w-full">
                    {/* Cột 1: Thông tin Bến Xe */}
                    <div>
                        <h3 className="font-bold text-blue-400 text-lg mb-2">Thông tin bến xe</h3>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Mã bến xe:</label>
                                <span className="text-sm font-normal">{busStation.id}</span>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Tên bến xe:</label>
                                <span className="text-sm font-normal">{busStation.name}</span>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Tỉnh/Thành phố:</label>
                                <span className="text-sm font-normal">{busStation.province}</span>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Địa chỉ:</label>
                                <span className="text-sm font-normal">{busStation.address}</span>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Trạng thái:</label>
                                <span className={`text-sm font-normal ${busStation.status === "Đang hoạt động" ? "text-green-600" : "text-red-600"}`}>
                                    {busStation.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Cột 2: Hình ảnh bến xe */}
                    <div>
                        <h3 className="font-bold text-blue-400 text-lg mb-2">Hình ảnh bến xe</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {busStation.images.map((image, index) => (
                                <img key={index} src={image} alt={`Hình ${index + 1}`} className="w-full h-24 object-cover rounded-lg border border-gray-300" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusStationDetail;
