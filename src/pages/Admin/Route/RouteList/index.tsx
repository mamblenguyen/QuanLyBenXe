import React, { useEffect, useState } from "react";
import { FaSearch, FaEye, FaEdit, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLoading } from "../../../../context/loading";
import apiInstance from "../../../../services/api";
import { getStatusColor } from "../../../../context";
import { showToast } from "../../../../components/Toasted";
import { RefreshCcw } from "lucide-react";
import { Routes } from "../../../../types/type";

const RouteList: React.FC = () => {
    const { setLoading } = useLoading();
    const [routes, setRoutes] = useState<Routes[]>([]);
    const [filteredRoutes, setFilteredRoutes] = useState<Routes[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedRouteId, setExpandedRouteId] = useState<number | null>(null);

    const fetchRoute = async () => {
        try {
            setLoading(true);
            const response = await apiInstance.get('/api/system/route/list');
            if (response.data.code === 200) {
                setRoutes(response.data.data);
                setFilteredRoutes(response.data.data);
            } else {
                throw new Error("Dữ liệu API không hợp lệ");
            }
        } catch (error) {
            console.error("Lỗi tải danh sách xe buýt:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoute();
    }, []);

    useEffect(() => {
        const filtered = routes.filter((bus) => {
            const busNumber = bus.departure_station_id?.name?.toLowerCase() || '';
            const busId = bus.id?.toString().toLowerCase() || '';
            return (
                busNumber.includes(searchTerm.toLowerCase()) ||
                busId.includes(searchTerm.toLowerCase())
            );
        });
        setFilteredRoutes(filtered);
    }, [searchTerm, routes]);

    const handleStatusToggle = async (userId: any, currentStatusId: any) => {
        setLoading(true);
        try {
            if (currentStatusId === 1) {
                await apiInstance.put(`/api/system/route/route/${userId}/soft-delete`);
                showToast("Bến xe được chuyển về không hoạt động!", "success");
            } else {
                await apiInstance.put(`/api/system/route/route/${userId}/restore`);
                showToast("Bến xe được khôi phục thành công!", "success");
            }
            fetchRoute();
        } catch (error) {
            showToast("Tài xế của tuyến này đang chạy tuyến khác!", "error");
        } finally {
            setLoading(false);
        }
    };

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
            fetchRoute();
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



    const toggleCollapse = (routeId: number) => {
        setExpandedRouteId((prev) => (prev === routeId ? null : routeId));
    };

    return (
        <div className="max-w-full p-6 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">Danh sách Xe</h2>
                <Link to="add">
                    <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        <FaPlus size={18} />
                        Thêm Tuyến xe
                    </button>
                </Link>
            </div>

            <div className="flex justify-end mb-4">
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
                        <th className="p-3 text-left">Điểm đi</th>
                        <th className="p-3 text-left">Điểm đến</th>
                        <th className="p-3 text-left">Trạng thái</th>
                        <th className="p-3 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRoutes.length > 0 ? (
                        filteredRoutes.map((route) => (
                            <React.Fragment key={route.id}>

                                <tr className={`${expandedRouteId === route.id ? "bg-gray-200 text-black border-b border-gray-200 cursor-pointer" : " cursor-pointer"}`} onClick={() => toggleCollapse(route.id)}>
                                    <td className="p-3">{route.departure_station_id?.name}</td>
                                    <td className="p-3">{route.arrival_station_id?.name}</td>
                                    <td className="p-2 text-center">
                                        <span
                                            className="inline-flex items-center gap-2 px-2 py-1 rounded border text-sm"
                                            style={{
                                                color: getStatusColor(route.status.id),
                                                borderColor: getStatusColor(route.status.id),
                                            }}
                                        >
                                            <span
                                                className="w-2 h-2 rounded-full"
                                                style={{
                                                    backgroundColor: getStatusColor(route.status.id),
                                                }}
                                            ></span>
                                            {route.status.name || "Không rõ"}
                                        </span>
                                    </td>
                                    <td className="p-3 text-center">
                                        <div className="flex justify-center gap-3">
                                            <Link to={`/admin/route/addSchedule/${route.id}`} className="text-blue-500 hover:text-blue-700">
                                                <FaPlus size={18} title="Thêm chuyến" />
                                            </Link>
                                            <Link to={`/admin/route/edit/${route.id}`} className="text-yellow-500 hover:text-yellow-700">
                                                <FaEdit size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleStatusToggle(route.id, route.status.id)}
                                                className={route.status.id === 1 ? "text-red-500 hover:text-yellow-700" : "text-green-500 hover:text-yellow-700"}
                                            >
                                                <RefreshCcw size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                {expandedRouteId === route.id && (
                                    <tr className="bg-gray-50 border-b">
                                        <td colSpan={4}>
                                            <div className="p-4">
                                                <h4 className="text-gray-600 text-center font-semibold mb-2">Danh sách chuyến của tuyến </h4>
                                                <h4 className="text-red-600 text-center font-semibold mb-2">{route.departure_station_id?.name} - {route.arrival_station_id?.name}</h4>                                                <table className="w-full border border-gray-300">
                                                    <thead className="bg-green-200">
                                                        <tr>
                                                            <th className="p-2 text-left">Giờ xuất phát</th>
                                                            <th className="p-2 text-left">Giờ đến</th>
                                                            <th className="p-2 text-left">Giá vé</th>
                                                            <th className="p-2 text-center">Trạng thái</th>
                                                            <th className="p-2 text-center">Thao tác</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {route.schedule.map((schedule, index) => (
                                                            <tr key={index} className="border-t border-gray-200">
                                                                <td className="p-2">{schedule.departure_time}</td>
                                                                <td className="p-2">{schedule.arrival_time}</td>
                                                                <td className="p-2">{parseFloat(schedule.ticket_price).toLocaleString('vi-VN')} VNĐ</td>
                                                                <td className="p-2 text-center">
                                                                    <span
                                                                        className="inline-flex items-center gap-2 px-2 py-1 rounded border text-sm"
                                                                        style={{
                                                                            color: getStatusColor(schedule.status_id),
                                                                            borderColor: getStatusColor(schedule.status_id),
                                                                        }}
                                                                    >
                                                                        <span
                                                                            className="w-2 h-2 rounded-full"
                                                                            style={{
                                                                                backgroundColor: getStatusColor(schedule.status_id),
                                                                            }}
                                                                        ></span>
                                                                        {schedule.status_name || "Không rõ"}
                                                                    </span>
                                                                </td>
                                                                <div className="flex justify-center gap-3">
                                                                    <Link to={`detail/${schedule.id}`} className="text-blue-500 hover:text-blue-700">
                                                                        <FaEye size={18} />
                                                                    </Link>
                                                                    <Link to={`/admin/route/edit/Schedule/${schedule.id}`} className="text-yellow-500 hover:text-yellow-700">
                                                                        <FaEdit size={18} />
                                                                    </Link>
                                                                    <button
                                                                        onClick={() => handleScheduleStatusToggle(schedule.id, schedule.status_id)}
                                                                        className={schedule.status_id === 1 ? "text-red-500 hover:text-yellow-700" : "text-green-500 hover:text-yellow-700"}
                                                                    >
                                                                        <RefreshCcw size={18} />
                                                                    </button>
                                                                </div>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="p-3 text-center text-gray-500">
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RouteList;
