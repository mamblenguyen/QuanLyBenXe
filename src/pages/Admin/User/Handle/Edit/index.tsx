import { useState, useEffect } from "react";
import apiInstance from "../../../../../services/api";
import { showToast } from "../../../../../components/Toasted";
import { useLoading } from "../../../../../context/loading";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

interface Role {
    id: number;
    name: string;
}

interface UserFormData {
    id: string;
    name: string;
    birthday: string;
    gender: string;
    phone: string;
    email: string;
    avatar?: File;
    roles: Role[];
    address: string;
    identity_card: string;
    identity_issue_place: string;
    identity_issue_date: string;
    status_id: string;
    vehicle: string;
    route: string;
    license: string;
    license_issue_date: string;
    license_expiry_date: string;
}

const EditUserForm = () => {
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [errors, setErrors] = useState<any>();
    const [formData, setFormData] = useState<UserFormData>({
        id: "",
        name: "",
        birthday: "",
        gender: "",
        phone: "",
        email: "",
        avatar: undefined,
        roles: [],
        address: "",
        identity_card: "",
        identity_issue_place: "",
        identity_issue_date: "",
        status_id: "",
        vehicle: "",
        route: "",
        license: "",
        license_issue_date: "",
        license_expiry_date: "",
    });

    const roleOptions: Role[] = [
        { id: 1, name: "Admin" },
        { id: 2, name: "Traffic" },
        { id: 3, name: "Staff" },
    ];
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await apiInstance.get(`/api/system/user/users/${id}`);
                const user = response.data.data;
                console.log(user);

                // Mapping roles to {id, name}
                const mappedRoles = user.roles.map((roleId: number) => {
                    const found = roleOptions.find((r) => r.id === roleId);
                    return found ? { id: found.id, name: found.name } : null;
                }).filter((r: Role | null): r is Role => r !== null);

                setFormData({
                    id: user.id,
                    name: user.name || "",
                    birthday: user.birthday || "",
                    gender: user.gender || "",
                    phone: user.phone || "",
                    email: user.email || "",
                    address: user.address || "",
                    avatar: undefined,
                    roles: mappedRoles,
                    identity_card: user.identity_card || "",
                    identity_issue_place: user.identity_issue_place || "",
                    identity_issue_date: user.identity_issue_date || "",
                    status_id: user.status_id || "",
                    vehicle: user.vehicle || "",
                    route: user.route || "",
                    license: user.license || "",
                    license_issue_date: user.license_issue_date || "",
                    license_expiry_date: user.license_expiry_date || "",
                });
                console.log(formData);

            } catch (err) {
                showToast("Không thể tải thông tin người dùng", "error");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUser();
        }
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;

        if (type === "checkbox" && name === "roles") {
            const roleId = roleOptions.find((r) => r.name === value)?.id;
            if (!roleId) return;

            setFormData((prev) => ({
                ...prev,
                roles: checked
                    ? [...prev.roles, { id: roleId, name: value }]
                    : prev.roles.filter((role) => role.id !== roleId),
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                avatar: file,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();

        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("address", formData.address);
        data.append("birthday", formData.birthday);
        data.append("gender", formData.gender);
        data.append("identity_card", formData.identity_card);
        data.append("identity_issue_place", formData.identity_issue_place);
        data.append("identity_issue_date", formData.identity_issue_date);
        data.append("status_id", formData.status_id);
        data.append("vehicle", formData.vehicle);
        data.append("route", formData.route);
        data.append("license", formData.license);
        data.append("license_issue_date", formData.license_issue_date);
        data.append("license_expiry_date", formData.license_expiry_date);

        formData.roles.forEach((role) =>
            data.append("roles[]", String(role.id))
        );

        if (formData.avatar) {
            data.append("avatar", formData.avatar);
        }

        setLoading(true);
        try {
            await apiInstance.post(`/api/system/user/users/${id}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            showToast("Cập nhật người dùng thành công!", "success");
            navigate("/admin/users");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                showToast("Cập nhật người dùng thất bại!", "error");
                if (error.response?.data?.errors) {
                    setErrors(error.response.data.errors);
                }
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-full p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl bg-blue-300 font-bold mb-5 text-center p-3 rounded-t-lg">
                Cập nhật thông tin người dùng
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium">Mã nhân viên</label>
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Họ và tên</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Ngày sinh</label>
                    <input
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Giới tính</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Trạng thái</label>
                    <select
                        name="status_id"
                        value={formData.status_id}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="1">Đang hoạt động</option>
                        <option value="2">Tạm dừng</option>
                        <option value="3">Đã khóa</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Số điện thoại</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Địa chỉ</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Số CCCD</label>
                    <input
                        type="text"
                        name="identity_card"
                        value={formData.identity_card}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Nơi cấp</label>
                    <input
                        type="text"
                        name="identity_issue_place"
                        value={formData.identity_issue_place}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Ngày cấp</label>
                    <input
                        type="date"
                        name="identity_issue_date"
                        value={formData.identity_issue_date}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Ảnh đại diện</label>
                    <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full border p-2 rounded"
                    />
                    {formData.avatar && (
                        <img
                            src={URL.createObjectURL(formData.avatar)}
                            alt="Avatar Preview"
                            className="mt-2 w-20 h-20 object-cover rounded-full"
                        />
                    )}
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium">Vai trò</label>
                    <div className="flex gap-4">
                        {roleOptions.map((role) => (
                            <label key={role.id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="roles"
                                    value={role.name}
                                    checked={formData.roles.some(r => r.id === role.id)}
                                    onChange={handleChange}
                                    className="w-4 h-4"
                                />
                                {role.name === "Admin"
                                    ? "Quản trị"
                                    : role.name === "Traffic"
                                        ? "Tài xế"
                                        : "Nhân viên bán vé"}
                            </label>
                        ))}
                    </div>
                </div>

                {formData.roles.some(r => r.name === "Traffic") && (
                    <>
                        <div>
                            <label className="block text-sm font-medium">Số xe</label>
                            <input
                                type="text"
                                name="vehicle"
                                value={formData.vehicle}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Tuyến xe</label>
                            <input
                                type="text"
                                name="route"
                                value={formData.route}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">GPLX</label>
                            <input
                                type="text"
                                name="license"
                                value={formData.license}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Ngày cấp GPLX</label>
                            <input
                                type="date"
                                name="license_issue_date"
                                value={formData.license_issue_date}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Ngày hết hạn GPLX</label>
                            <input
                                type="date"
                                name="license_expiry_date"
                                value={formData.license_expiry_date}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                    </>
                )}

                <div className="col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded"
                    >
                        Cập nhật
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUserForm;
