import { FaEdit } from "react-icons/fa";
import { RefreshCcw, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "../../../../services/api";
import { showToast } from "../../../../components/Toasted";
import { Ticket } from "../../../../types/type";
import Button from "../../../../components/Button";
import { formatCurrency, formatDate } from "../../../../utils/FormatDate";

const TicketDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchTicket = async () => {
        try {
            setLoading(true);
            const response = await apiInstance.get(`/api/system/tickets/detail/${id}`);
            if (response.data.code === 200) {
                setTicket(response.data.data);
            } else {
                console.error("Error fetching ticket:", response.data.message);
            }
        } catch (error) {
            console.error("API Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTicket();
    }, []);

    const handleScheduleStatusToggle = async (userId: any, currentStatusId: any) => {
        setLoading(true);
        try {
            if (currentStatusId === 1) {
                await apiInstance.put(`/api/system/route/route/${userId}/soft-delete-schedule`);
                showToast("Chuyến được chuyển về không hoạt động!", "success");
            } else {
                await apiInstance.put(`/api/system/route/route/${userId}/restore-schedule`);
                showToast("Chuyến được khôi phục thành công!", "success");
            }
            fetchTicket();
        } catch (error: any) {
            const status = error.response?.status;
            if (status === 403) {
                showToast("Tuyến đường đang bị vô hiệu hóa không thể khôi phục chuyến!", "error");
            } else if (status === 409) {
                showToast("Không thể thực hiện hành động vì trạng thái chuyến không cho phép!", "error");
            } else {
                showToast("Đã xảy ra lỗi không xác định!", "error");
            }
        } finally {
            setLoading(false);
        }
    };

    if (!ticket) return <p className="text-center py-5 text-red-500">Không tìm thấy thông tin vé</p>;

    return (
        <div className="px-6 py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Chi tiết vé xe</h1>
                <div className="flex gap-2">
                    {ticket?.status_id === 1 ? (
                        <button
                            title="Chuyển về trạng thái không hoạt động"
                            onClick={() => handleScheduleStatusToggle(ticket.id, ticket.status_id)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition"
                        >
                            <Trash2 size={20} />
                        </button>
                    ) : (
                        <button
                            title="Khôi phục trạng thái hoạt động"
                            onClick={() => handleScheduleStatusToggle(ticket.id, ticket.status_id)}
                            className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-full transition"
                        >
                            <RefreshCcw size={20} />
                        </button>
                    )}
                </div>
            </div>

            {ticket.ticket_seat.map((seat, index) => (
                <div
                    key={index}
                    className="bg-white shadow-xl border border-gray-200 rounded-2xl overflow-hidden mb-8"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-lg font-semibold px-6 py-4">
                        Vé số {index + 1} - Ghế: {seat}
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <span className="w-40 font-medium text-gray-700">Tên hành khách:</span>
                                <span className="text-gray-800">{ticket.name}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-40 font-medium text-gray-700">SĐT:</span>
                                <span className="text-gray-800">{ticket.phone}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-40 font-medium text-gray-700">Tuyến:</span>
                                <span className="text-gray-800">
                                    {ticket.depart_station} → {ticket.arrival_station}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-40 font-medium text-gray-700">Thời gian:</span>
                                <span className="text-gray-800">
                                    {ticket.depart_time} → {ticket.arrival_time}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center">
                                <span className="w-40 font-medium text-gray-700">Ngày đi:</span>
                                <span className="text-gray-800">{formatDate(ticket.date)}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-40 font-medium text-gray-700">Biển số xe:</span>
                                <span className="text-gray-800">{ticket.bus_number}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-40 font-medium text-gray-700">Loại xe:</span>
                                <span className="text-gray-800">{ticket.bus_model}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-40 font-medium text-gray-700">Giá vé:</span>
                                <td className="text-red-600 font-bold">{parseFloat(ticket.ticket_price).toLocaleString('vi-VN')} VND</td>
                            </div>

                            <div className="flex flex-col mt-4">
                                <span className="text-sm text-gray-400">Xin vui lòng có mặt trước điểm đón hoặc bến xe trước 15p</span>
                            </div>
                            {/* <div className="flex items-center">
                                <span className="w-40 font-medium text-gray-700">Trạng thái:</span>
                                <span
                                    className={`font-semibold ${ticket.status_id === 1
                                        ? "text-green-500"
                                        : ticket.status_id === 2
                                            ? "text-yellow-500"
                                            : "text-red-500"
                                        }`}
                                >
                                    {ticket.status_name}
                                </span>
                            </div> */}
                        </div>
                    </div>

                    <div className="p-6">
                        <span className="font-bold text-gray-700">Tuyến đường cụ thể:</span>
                        <div className="mt-2">
                            <span className="inline-block border border-green-700 px-3 py-1 rounded text-red-600">
                                {ticket.depart_adress}
                            </span>
                            <span className="mx-3 font-bold text-2xl text-red-600">→</span>
                            <span className="inline-block border border-green-700 px-3 py-1 rounded text-red-600">
                                {ticket.arrival_adress}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TicketDetail;
