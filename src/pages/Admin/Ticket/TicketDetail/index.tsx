import { FaEdit } from "react-icons/fa";
import { RefreshCcw, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "../../../../services/api";
import { showToast } from "../../../../components/Toasted";
import { OneSchedule } from "../../../../types/type";
import Button from "../../../../components/Button";


const TicketDetail = () => {


    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();
    const [routes, setRoutes] = useState<OneSchedule | null>(null);
    const [loading, setLoading] = useState(true);

    // const statusColor = getStatusColor(routes.status?.id);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await apiInstance.get(`/api/system/tickets/detail/${id}`);
            if (response.data.code === 200) {
                setRoutes(response.data.data);

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

    const handleScheduleStatusToggle = async (userId: any, currentStatusId: any) => {
        setLoading(true);
        try {
            if (currentStatusId === 1) {
                await apiInstance.put(`/api/system/route/route/${userId}/soft-delete-schedule`);
                showToast("Chuyến được chuyển về không hoạt động!", "success");
                console.log('đây là xóa chuyến ', { userId });

            } else {
                await apiInstance.put(`/api/system/route/route/${userId}/restore-schedule`);
                showToast("Chuyến được khôi phục thành công!", "success");
                console.log('đây là khôi phục chuyến ', { userId });
            }
            fetchUser();
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 403) {
                    showToast("Tuyến đường đang bị vô hiệu hóa không thể khôi phục chuyến!", "error");
                } else if (status === 409) {
                    showToast("Không thể thực hiện hành động vì trạng thái chuyến không cho phép!", "error");
                } else {
                    showToast("Đã xảy ra lỗi không xác định!", "error");
                }
            } else {
                showToast("Không thể kết nối đến máy chủ!", "error");
            }
        } finally {
            setLoading(false);
        }
    };
    if (!routes) return <p className="text-center py-5 text-red-500">Không tìm thấy thông tin xe</p>;

    return (
        <div className="px-6 py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Chi tiết tuyến xe</h1>
                <div className="flex gap-2">
                    {routes?.schedule.status_id === 1 ? (
                        <button
                            title="Chuyển về trạng thái không hoạt động"
                            onClick={() => handleScheduleStatusToggle(routes.schedule.id, routes.schedule.status_id)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition"
                        >
                            <Trash2 size={20} />
                        </button>
                    ) : (
                        <button
                            title="Khôi phục trạng thái hoạt động"
                            onClick={() => handleScheduleStatusToggle(routes.schedule.id, routes.schedule.status_id)}
                            className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-full transition"
                        >
                            <RefreshCcw color="green" size={20} />
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-white shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-lg font-semibold px-6 py-4">
                    Thông tin tuyến xe
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <span className="w-40 font-medium text-gray-700">Mã tuyến:</span>
                            <span className="text-gray-800">{routes.schedule.id}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-40 font-medium text-gray-700">Tuyến đường:</span>
                            <span className="text-gray-800">
                                {routes?.departure_station_id?.name} → {routes?.arrival_station_id?.name}
                            </span>
                        </div>

                        <div className="flex items-center">
                            <span className="w-40 font-medium text-gray-700">Thời gian khởi hành:</span>
                            <span className="text-gray-800">{routes?.schedule?.departure_time}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-40 font-medium text-gray-700">Thời gian đến:</span>
                            <span className="text-gray-800">{routes?.schedule?.arrival_time}</span>
                        </div>
                        <div className="flex justify-center items-center">
                            <Button
                                label={'Đặt vé'}
                                size='big'
                                variant='outline'
                                onClick={() => {
                                    navigate(`/admin/tickets/book/${routes?.schedule?.id}`) // Thay bằng đường dẫn bạn muốn
                                }}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center">
                            <span className="w-40 font-medium text-gray-700">Giá vé:</span>
                            <span className="text-red-600 font-bold">{routes?.schedule?.ticket_price} VND</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-40 font-medium text-gray-700">Trạng thái:</span>
                            <span
                                className={`font-semibold ${routes?.schedule.status_id === 1
                                    ? "text-green-500"
                                    : routes?.status.id === 2
                                        ? "text-yellow-500"
                                        : "text-red-500"
                                    }`}
                            >
                                {routes?.schedule.status_name}
                            </span>
                        </div>
                        <div className="flex items-start">
                            <div className="border border-gray-300 rounded-xl w-[100%] p-4 shadow-sm bg-white">
                                <span className="block text-sm font-medium text-gray-600 mb-2">Tài xế</span>
                                <div className="text-red-600 font-semibold">
                                    <span className="mr-2">Tên:</span> {routes?.driver_id.name}
                                </div>
                                <div className="text-red-600 font-semibold">
                                    <span className="mr-2">SĐT:</span> {routes?.driver_id.phone}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col mt-4">
                            <span className="text-sm text-gray-400">Trạng thái có thể là: Đang hoạt động, Bảo trì hoặc Dừng</span>
                        </div>
                    </div>

                </div>
                <div className="p-8">
                    <span className="font-bold text-gray-700">Tuyến đường cụ thể:</span>
                    <span className="text-gray-800">
                        <span className="font-bold border border-green-700 p-2 text-red-600">{routes?.departure_station_id?.address} </span>
                        <span className="font-extrabold text-2xl text-red-600">  →  </span>

                        <span className="font-bold border border-green-700 p-2 text-red-600">{routes?.arrival_station_id?.address} </span>
                    </span>
                </div>
            </div>
        </div>



    );
};

export default TicketDetail;
