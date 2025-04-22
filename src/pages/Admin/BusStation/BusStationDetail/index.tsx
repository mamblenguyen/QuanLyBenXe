import { FaEdit } from "react-icons/fa";
import { RefreshCcw, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "../../../../services/api";
import { showToast } from "../../../../components/Toasted";

interface BusStation {
    id: string,
    name: string,
    province: {
        province_id: number,
        name: string
    },
    address: string,
    status: {
        id: number,
        name: string
    },
    images: string[],
};


const BusStationDetail = () => {


    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();
    const [busStation, setBusStation] = useState<BusStation | null>(null);
    const [loading, setLoading] = useState(true);

    // const statusColor = getStatusColor(busStation.status?.id);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await apiInstance.get(`/api/system/bus-station/detail/${id}`);
            if (response.data.code === 200) {
                setBusStation(response.data.data);

            } else {
                console.error('Error fetching classes:', response.data.message);
            }
        } catch (error) {
            console.error('API Error:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchUser();
    }, []);
    const handleStatusToggle = async (userId: any, currentStatusId: any) => {
        try {
            if (currentStatusId === 1) {
                setLoading(true);
                await apiInstance.put(`/api/system/bus-station/bus-stations/${userId}/soft-delete`);
                showToast("Bến xe được chuyển về không hoạt động!", "success");
            } else {
                // Gọi API khôi phục
                setLoading(true);
                await apiInstance.put(`/api/system/bus-station/bus-stations/${userId}/restore`);
                showToast("Bến xe được khôi phục thành công!", "success");
            }
            fetchUser();
        } catch (error) {
            showToast("Có lỗi đang xảy ra!", "error");
            console.error(error);
        } finally {
            setLoading(false);

        }
    };
    if (!busStation) return <p className="text-center py-5 text-red-500">Không tìm thấy thông tin xe</p>;

    return (
        <div className="px-5">
            <div className="flex items-center space-x-5 mb-9">
                <h1 className="text-[20px] font-bold">Thông tin bến xe</h1>
            </div>

            <div className="flex justify-between items-center mb-6">
                <div></div>
                <div className="flex items-center space-x-2">
                    {busStation?.status.id === 1 ? (
                        <button
                            title="Chuyển về trạng thái không hoạt động"
                            onClick={() => handleStatusToggle(busStation.id, busStation.status.id)}
                            className="text-red-500 w-8 h-8"
                        >
                            <Trash2 size={42} />
                        </button>
                    ) : (
                        <button
                            title="Khôi phục trạng thái hoạt động"
                            onClick={() => handleStatusToggle(busStation.id, busStation.status.id)}
                            className="text-green-500 w-8 h-8"
                        >
                            <RefreshCcw size={42} />
                        </button>
                    )}





                    {/* <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                        <FaEdit size={18} />
                        <span>Chỉnh sửa</span>
                    </button> */}
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
                                <span className="text-sm font-normal">{busStation?.id}</span>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Tên bến xe:</label>
                                <span className="text-sm font-normal">{busStation?.name}</span>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Tỉnh/Thành phố:</label>
                                <span className="text-sm font-normal">{busStation?.province?.name}</span>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Địa chỉ:</label>
                                <span className="text-sm font-normal">{busStation?.address}</span>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Tình trạng:</label>
                                <span
                                    className={
                                        busStation.status.id === 1
                                            ? "text-green-500"
                                            : busStation.status.id === 2
                                                ? "text-yellow-500"
                                                : "text-red-500"
                                    }
                                >
                                    {busStation.status.name}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Cột 2: Hình ảnh bến xe */}
                    {/* <div className="col-span-1 p-4">
                        <h3 className="font-bold text-blue-400 text-lg mb-2">Hình ảnh xe</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {busStation?.images?.map((img, index) => (
                                <div key={index} className="w-full h-28 border rounded-lg overflow-hidden">
                                    <img src={img} alt={`Xe ${index + 1}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default BusStationDetail;
