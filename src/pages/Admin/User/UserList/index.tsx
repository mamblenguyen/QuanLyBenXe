import React, { useEffect, useState } from "react";
import { FaSearch, FaEye, FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Role {
    id: number;
    name: string;
}

interface Garage {
    id: number;
    name: string;
    tax_code: string;
    address: string;
    phone: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    created_at: string;
    roles: Role[];
    garage?: Garage | null;
}

const roleMapping: Record<string, string> = {
    Admin: "Quản trị",
    Traffic: "Tài xế",
    Staff: "Nhân viên bán vé",
};

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/data/users.json");
                if (!response.ok) throw new Error("Không thể tải dữ liệu");
                const jsonData = await response.json();

                if (jsonData.code === 200 && Array.isArray(jsonData.data)) {
                    setUsers(jsonData.data);
                    setFilteredUsers(jsonData.data);
                } else {
                    throw new Error("Dữ liệu API không hợp lệ");
                }
            } catch (error) {
                console.error("Lỗi tải danh sách người dùng:", error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const filtered = users.filter(
            (user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, users]);

    const handleView = (id: string) => {
        console.log("Xem chi tiết user:", id);
    };

    const handleEdit = (id: string) => {
        console.log("Chỉnh sửa user:", id);
    };

    const handleDelete = (id: string) => {
        console.log("Xóa user:", id);
    };

    return (
        <div className="max-w-full p-6 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">Danh sách người dùng</h2>
                <Link to={`add`} className="text-blue-500 hover:text-blue-700">
                    <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        <FaUserPlus size={18} />
                        Thêm User
                    </button>
                </Link>

            </div>

            <div className="flex justify-end items-center mb-4">
                <div className="relative w-64">
                    <input
                        type="text"
                        placeholder="Tìm kiếm người dùng"
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
                        <th className="p-3 text-left">Tên</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Vai trò</th>
                        <th className="p-3 text-left">Nhà xe</th>
                        <th className="p-3 text-left">Số điện thoại</th>
                        <th className="p-3 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <tr key={user.id} className="border-b border-gray-200">
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">
                                    <div className="flex flex-wrap gap-1">
                                        {user.roles.map((role) => (
                                            <span
                                                key={role.id}
                                                className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs font-medium"
                                            >
                                                {roleMapping[role.name] || role.name}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="p-3">{user.garage ? user.garage.name : "Không có"}</td>
                                <td className="p-3">{user.garage ? user.garage.phone : "Không có"}</td>
                                <td className="p-3 text-center">
                                    <div className="flex justify-center gap-3">
                                        <Link to={`detail/${user.id}`} className="text-blue-500 hover:text-blue-700">
                                            <FaEye size={18} />
                                        </Link>
                                        <Link to={`/users/edit/${user.id}`} className="text-yellow-500 hover:text-yellow-700">
                                            <FaEdit size={18} />
                                        </Link>
                                        <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700">
                                            <FaTrash size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
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

export default UserList;
