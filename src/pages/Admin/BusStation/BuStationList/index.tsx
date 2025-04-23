import React, { useEffect, useState } from "react";
import { FaSearch, FaEye, FaEdit, FaTrash, FaUserPlus, FaTrashRestore } from "react-icons/fa";
import { Link } from "react-router-dom";
import apiInstance from "../../../../services/api";
import { useLoading } from "../../../../context/loading";
import { ArchiveRestore, RefreshCcw } from "lucide-react";
import { showToast } from "../../../../components/Toasted";
import { BusStation } from "../../../../types/type";
import { getStatusColor } from "../../../../context";


const BusStationList: React.FC = () => {
    const { setLoading } = useLoading();
    const [busStation, setBusStation] = useState<BusStation[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<BusStation[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const fetchBusStation = async () => {
        try {
            setLoading(true);
            const response = await apiInstance.get('/api/system/bus-station/list');
            if (response.data.code === 200) {
                setBusStation(response.data.data);
                setFilteredUsers(response.data.data);
            } else {
                throw new Error("Dữ liệu API không hợp lệ");
            }
        } catch (error) {
            console.error("Lỗi tải danh sách người dùng:", error);
        } finally {
            setLoading(false);

        }
    };
    useEffect(() => {


        fetchBusStation();
    }, []);

    useEffect(() => {
        const filtered = busStation.filter((bus) => {
            const busNumber = bus?.name ? bus?.name.toLowerCase() : '';
            const busId = bus.id ? bus.id.toString().toLowerCase() : '';
            return (
                busNumber.includes(searchTerm.toLowerCase()) ||
                busId.includes(searchTerm.toLowerCase())
            );
        });
    }, [searchTerm, busStation]);

    const handleView = (id: string) => {
        console.log("Xem chi tiết user:", id);
    };

    const handleEdit = (id: string) => {
        console.log("Chỉnh sửa user:", id);
    };

    const handleDelete = (id: string) => {
        console.log("Xóa user:", id);
    };
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
            fetchBusStation();

            // Reload lại danh sách nếu cần (gọi lại API hoặc cập nhật state)
        } catch (error) {
            showToast("Có lỗi đang xảy ra!", "error");
            console.error(error);
        } finally {
            setLoading(false);

        }
    };
    return (
        <div className="max-w-full p-6 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">Danh sách Bến Xe</h2>
                <Link to={`add`} className="text-blue-500 hover:text-blue-700">
                    <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        <FaUserPlus size={18} />
                        Thêm Bến Xe
                    </button>
                </Link>

            </div>

            <div className="flex justify-end items-center mb-4">
                <div className="relative w-64">
                    <input
                        type="text"
                        placeholder="Tìm kiếm bến xe"
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
                        <th className="p-3 text-left">Tên bến xe</th>
                        <th className="p-3 text-left">Tỉnh thành</th>
                        <th className="p-3 text-left">Địa chỉ </th>
                        <th className="p-3 text-left">Trạng thái </th>

                        <th className="p-3 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>


                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => {
                            const statusColor = getStatusColor(user?.status?.id);
                            return (
                                <tr key={user.id} className="border-b border-gray-200">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{user?.name}</td>
                                    <td className="p-3">{user?.province?.name} </td>
                                    <td className="p-3">{user?.address} </td>
                                    <td className="p-3">
                                        <div
                                            className="inline-flex items-center justify-center px-4 py-2 rounded border gap-2 text-[15px] font-medium whitespace-nowrap"
                                            style={{ color: statusColor, borderColor: statusColor }}
                                        >
                                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor }}></span>
                                            {user.status?.name}
                                        </div>
                                    </td>
                                    <td className="p-3 text-center">
                                        <div className="flex justify-center gap-3">
                                            <Link to={`detail/${user.id}`} className="text-blue-500 hover:text-blue-700">
                                                <FaEye size={18} />
                                            </Link>
                                            {user?.status.id === 1 ? (
                                                <button
                                                    title="Chuyển về trạng thái không hoạt động"
                                                    onClick={() => handleStatusToggle(user.id, user.status.id)}
                                                    className="text-red-500 hover:text-yellow-700"
                                                >
                                                    <RefreshCcw size={18} />
                                                </button>
                                            ) : (
                                                <button
                                                    title="Khôi phục trạng thái hoạt động"
                                                    onClick={() => handleStatusToggle(user.id, user.status.id)}
                                                    className="text-green-500 hover:text-yellow-700"
                                                >
                                                    <RefreshCcw size={18} />
                                                </button>
                                            )}

                                            {/* <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700">
                                                <FaTrash size={18} />
                                            </button> */}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td colSpan={6} className="p-3 text-center text-gray-500">
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BusStationList;
