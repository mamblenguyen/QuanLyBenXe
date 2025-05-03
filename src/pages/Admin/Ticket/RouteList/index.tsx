import React, { useEffect, useState } from "react";
import { FaSearch, FaEye, FaEdit, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLoading } from "../../../../context/loading";
import apiInstance from "../../../../services/api";
import { getStatusColor } from "../../../../context";
import { showToast } from "../../../../components/Toasted";
import { RefreshCcw } from "lucide-react";
import { Routes, Ticket } from "../../../../types/type";
import { formatDate } from "../../../../utils/FormatDate";

const TicketRouteList: React.FC = () => {
    const { setLoading } = useLoading();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [filteredTicket, setFilteredTicket] = useState<Ticket[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedRouteId, setExpandedRouteId] = useState<number | null>(null);

    const fetchRoute = async () => {
        try {
            setLoading(true);
            const response = await apiInstance.get('/api/system/tickets/list');
            if (response.data.code === 200) {
                setTickets(response.data.data);
                setFilteredTicket(response.data.data);
            } else {
                throw new Error("Dữ liệu API không hợp lệ");
            }
        } catch (error) {
            console.error("Lỗi tải danh sách vé:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoute();
    }, []);

    useEffect(() => {
        const filtered = tickets.filter((ticket) => {
            // Create a lowercase version of the ticket fields you want to filter on
            const customerName = ticket.name?.toLowerCase() || '';
            const phoneNumber = ticket.phone?.toLowerCase() || '';
            const ticketId = ticket.id?.toString().toLowerCase() || '';
            const busNumber = ticket.date?.toLowerCase() || '';

            // Check if any of these fields match the search term
            return (
                customerName.includes(searchTerm.toLowerCase()) ||
                phoneNumber.includes(searchTerm.toLowerCase()) ||
                ticketId.includes(searchTerm.toLowerCase()) ||
                busNumber.includes(searchTerm.toLowerCase())
            );
        });
        setFilteredTicket(filtered);
    }, [searchTerm, tickets]);

    return (
        <div className="max-w-full p-6 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">Danh sách các chuyến đặt vé</h2>
                <Link to="book">
                    <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        <FaPlus size={18} />
                        Đặt vé
                    </button>
                </Link>
            </div>

            <div className="flex justify-end mb-4">
                <div className="relative w-64">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên người đặt, số điện thoại, số vé"
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
                        <th className="p-3 text-left">Người đặt</th>
                        <th className="p-3 text-left">Số điện thoại</th>
                        <th className="p-3 text-left">Ngày đặt</th>
                        <th className="p-3 text-left">Số lượng vé</th>
                        <th className="p-3 text-left">Trạng thái</th>
                        <th className="p-3 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTicket.length > 0 ? (
                        filteredTicket.map((ticket) => (
                            <tr key={ticket.id} className="text-black border-b border-gray-200 cursor-pointer">
                                <td className="p-3">{ticket.name}</td>
                                <td className="p-3">{ticket.phone}</td>
                                <td className="p-3">{formatDate(ticket.date)}</td>
                                <td className="p-3">{ticket.ticket_seat.length}</td>
                                <td className="p-2">
                                    <span
                                        className="inline-flex items-center gap-2 px-2 py-1 rounded border text-sm"
                                        style={{
                                            color: getStatusColor(1),
                                            borderColor: getStatusColor(1),
                                        }}
                                    >
                                        <span
                                            className="w-2 h-2 rounded-full"
                                            style={{
                                                backgroundColor: getStatusColor(1),
                                            }}
                                        ></span>
                                        {'Đã thanh toán'}
                                    </span>
                                </td>
                                <td className="p-3 text-center">
                                    <div className="flex justify-center gap-3">
                                        <Link to={`/admin/tickets/detail/${ticket.id}`} className="text-blue-500 hover:text-blue-700">
                                            <FaEye size={18} title="Chi tiết vé" />
                                        </Link>
                                        <Link to={`/admin/tickets/edit/${ticket.id}`} className="text-yellow-500 hover:text-yellow-700">
                                            <FaEdit size={18} />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center p-4">
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TicketRouteList;
