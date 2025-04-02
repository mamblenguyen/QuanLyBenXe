import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Camera, Trash2 } from "lucide-react";
import apiInstance from "../../../../services/api";
import { useParams } from "react-router";

const roleMapping: Record<string, string> = {
    Admin: "Quản trị",
    Traffic: "Tài xế",
    Staff: "Nhân viên",
};

const UserDetail = () => {
    const [user, setUser] = useState<any>(null); // State to store user data
    const [loading, setLoading] = useState<boolean>(true); // State for loading status
    const id = useParams();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await apiInstance.get(`/api/system/user/users/${id?.id}`);
                if (response.data.code === 200) {
                    setUser(response.data.data);
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

    if (loading) {
        return <div>Loading...</div>; // Display a loading state
    }

    return (
        <div className="px-5">
            <div className="flex items-center space-x-5 mb-9">
                <h1 className="text-[20px] font-bold">Thông tin người dùng</h1>
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

                <div className="grid grid-cols-3 gap-6 p-4 w-full">
                    {/* 🔹 Cột 1: Ảnh đại diện */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-36 h-36">
                            <img
                                src={user.avatar || "https://via.placeholder.com/150"} // Fallback to placeholder if avatar is missing
                                alt="Người dùng"
                                className="w-full h-full rounded-full border-2 border-gray-300"
                            />
                            <button className="absolute bottom--1 left-1/2 transform -translate-x-1/2 bg-gray-400 text-black p-2 rounded-full shadow-lg">
                                <Camera size={16} />
                            </button>
                        </div>
                    </div>

                    {/* 🔹 Cột 2: Thông tin cá nhân */}
                    <div>
                        <h3 className="font-bold text-blue-400 text-lg mb-2">Thông tin cá nhân</h3>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Mã nhân viên:</label>
                                <span title={user.id} className="text-sm font-normal">{(user.id.substring(0, 10))}...</span>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Họ và tên:</label>
                                <span className="text-sm font-normal">{user.name}</span>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Ngày sinh:</label>
                                <span className="text-sm font-normal">{user.birthday}</span>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Giới tính:</label>
                                <span className="text-sm font-normal">{user.gender}</span>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Địa chỉ:</label>
                                <span className="text-sm font-normal">{user.address}</span>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Số CCCD:</label>
                                <span className="text-sm font-normal">{user.identity_card}</span>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Nơi cấp:</label>
                                <span className="text-sm font-normal">{user.identity_issue_place}</span>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Ngày cấp:</label>
                                <span className="text-sm font-normal">{user.identity_issue_date}</span>
                            </div>
                        </div>
                    </div>

                    {/* 🔹 Cột 3: Thông tin công việc */}
                    <div>
                        <h3 className="font-bold text-blue-400 text-lg mb-2">Thông tin công việc</h3>
                        <div className="space-y-2">
                            {/* 🔸 Hiển thị vai trò trong Badge */}
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Vai trò:</label>
                                <div className="flex space-x-2">
                                    {user.roles.map((role: { name: string }) => (
                                        <span
                                            key={role.name}
                                            className="bg-blue-200 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
                                        >
                                            {roleMapping[role.name]}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Tình trạng:</label>
                                <div className="flex space-x-2">
                                    <span
                                        className={
                                            user.status === "Đang hoạt động"
                                                ? "text-green-500"
                                                : user.status === "Tạm dừng"
                                                    ? "text-yellow-500"
                                                    : "text-gray-500"
                                        }
                                    >
                                        {user.status}
                                    </span>
                                </div>
                            </div>

                            {/* 🔸 Nếu có vai trò Tài xế thì hiển thị thông tin liên quan */}
                            {user.roles.some((role: { name: string }) => role.name === "Traffic") && (
                                <>
                                    <div className="flex items-center">
                                        <label className="w-32 text-sm font-medium">Số xe:</label>
                                        <span className="text-sm font-normal">Xe Cũ</span>
                                    </div>
                                    <div className="flex items-center">
                                        <label className="w-32 text-sm font-medium">Tuyến xe:</label>
                                        <span className="text-sm font-normal">A - B</span>
                                    </div>
                                    <div className="flex items-center">
                                        <label className="w-32 text-sm font-medium">GPLX:</label>
                                        <span className="text-sm font-normal">{user.license}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <label className="w-32 text-sm font-medium">Ngày cấp GPLX:</label>
                                        <span className="text-sm font-normal">{user.license_issue_date}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <label className="w-32 text-sm font-medium">Ngày hết hạn GPLX:</label>
                                        <span className="text-sm font-normal">{user.license_expiry_date}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
