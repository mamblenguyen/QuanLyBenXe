import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Camera } from "lucide-react";
import apiInstance from "../../../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom"; // Use 'react-router-dom' instead of 'react-router'
import DeletePopup from "../../../../components/Popup/Delete";
import { showToast } from "../../../../components/Toasted";

const roleMapping: Record<string, string> = {
    Admin: "Quản trị",
    Traffic: "Tài xế",
    Staff: "Nhân viên",
};

const UserDetail = () => {
    const [user, setUser] = useState<any>(null); // State to store user data
    const [loading, setLoading] = useState<boolean>(true); // State for loading status
    const { id } = useParams(); // Destructure the 'id' directly from useParams
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await apiInstance.get(`/api/system/user/users/${id}`);
                if (response.data.code === 200) {
                    setUser(response.data.data);
                } else {
                    console.error('Error fetching user:', response.data.message);
                    showToast("Không thể lấy thông tin người dùng!", "error");
                }
            } catch (error) {
                console.error('API Error:', error);
                showToast("Đã xảy ra lỗi khi lấy thông tin người dùng!", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>; // Display a loading state
    }

    const handleDeleteClick = () => {
        setIsPopupOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            setLoading(true);
            await apiInstance.delete(`/api/system/user/users/${id}`);
            showToast("Xóa người dùng thành công!", "success");
            navigate("/users");
            setIsPopupOpen(false);
        } catch (error: any) {
            if (error.response?.status === 403) {
                showToast("Bạn không có quyền xóa người dùng này!", "error");
            } else {
                console.error("Error deleting user:", error);
                showToast("Đã xảy ra lỗi khi xóa người dùng!", "error");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="px-5">
            <div className="flex items-center space-x-5 mb-9">
                <h1 className="text-[20px] font-bold">Thông tin người dùng</h1>
            </div>

            <div className="flex justify-between items-center mb-6">
                <div></div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleDeleteClick}
                        className="text-red-500 hover:text-red-700 disabled:opacity-50"
                        disabled={loading}
                    >
                        <FaTrash size={18} />
                    </button>
                    <span className="text-gray-400">|</span>
                    <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                        <Link to={`/admin/users/edit/${user.id}`} className="text-yellow-500 hover:text-yellow-700">
                            <span className="font-bold text-white">Chỉnh sửa</span>
                        </Link>
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
                            {/* Optionally uncomment the camera button for profile image update */}
                            {/* <button className="absolute bottom--1 left-1/2 transform -translate-x-1/2 bg-gray-400 text-black p-2 rounded-full shadow-lg">
                                <Camera size={16} />
                            </button> */}
                        </div>
                    </div>

                    {/* 🔹 Cột 2: Thông tin cá nhân */}
                    <div>
                        <h3 className="font-bold text-blue-400 text-lg mb-2">Thông tin cá nhân</h3>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Mã nhân viên:</label>
                                <span title={user.id} className="text-sm font-normal">{user.id.substring(0, 10)}...</span>
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
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Vai trò:</label>
                                <div className="flex space-x-2">
                                    {user.roles.map((role: { id: string, name: string }) => (
                                        <span
                                            key={role.id}
                                            className="bg-blue-200 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
                                        >
                                            {roleMapping[role.name] || role.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <label className="w-32 text-sm font-medium">Tình trạng:</label>
                                <span
                                    className={
                                        user.status.name === "Đang hoạt động"
                                            ? "text-green-500"
                                            : user.status.name === "Tạm dừng"
                                                ? "text-yellow-500"
                                                : "text-red-500"
                                    }
                                >
                                    {user.status.name}
                                </span>
                            </div>

                            {/* 🔸 Show traffic-specific info if the user is a driver */}
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

            <DeletePopup
                isOpen={isPopupOpen}
                onCancel={() => setIsPopupOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Xác nhận xóa"
                text="Bạn có chắc chắn muốn xóa người dùng này?"
            />
        </div>
    );
};

export default UserDetail;
