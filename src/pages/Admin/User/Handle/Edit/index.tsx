import { useState, useEffect } from "react";
import axios from "axios";
import apiInstance from "../../../../../services/api";
import { useNavigate, useParams } from "react-router";
import { useLoading } from "../../../../../context/loading";
import { showToast } from "../../../../../components/Toasted";

interface UserFormData {
    name: string;
    birthday: string;
    gender: string;
    phone: string;
    email: string;
    avatar?: File | undefined;
    roles: { id: number }[]; // Chỉ chứa object với id
    address: string;
    identity_card: string;
    identity_issue_place: string;
    identity_issue_date: string;
    status: string;
    vehicle: string;
    route: string;
    license: string;
    license_issue_date: string;
    license_expiry_date: string;
}

const EditUserForm = () => {
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const userId = useParams();
    const [formData, setFormData] = useState<UserFormData>({
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
        status: "",
        vehicle: "",
        route: "",
        license: "",
        license_issue_date: "",
        license_expiry_date: "",
    });

    const [errors, setErrors] = useState<any>({});
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const response = await apiInstance.get(`/api/system/user/users/${userId.id}`);
                const user = response.data.data;
                setFormData({
                    ...user,
                    roles: user.roles || [],
                });

                if (user.avatar) {
                    setPreviewImage(user.avatar); // Nếu có ảnh đại diện, hiển thị xem trước
                }

            } catch (error) {
                console.error("Error fetching user data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, checked } = e.target as HTMLInputElement;

        if (name === "roles") {
            setFormData((prev) => {
                // Đảm bảo prev.roles luôn là mảng chứa object { id: number }
                const updatedRoles = checked
                    ? [...prev.roles, { id: Number(value) }] // Thêm object có id
                    : prev.roles.filter((role) => role.id !== Number(value)); // Xóa object có id tương ứng

                return { ...prev, roles: updatedRoles };
            });
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };


    console.log(formData.roles);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({ ...prev, avatar: file }));
            setPreviewImage(URL.createObjectURL(file)); // Lưu URL ảnh xem trước
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
        data.append("status", formData.status);
        data.append("vehicle", formData.vehicle);
        data.append("route", formData.route);
        data.append("license", formData.license);
        data.append("license_issue_date", formData.license_issue_date);
        data.append("license_expiry_date", formData.license_expiry_date);

        formData.roles.forEach((role) => data.append("roles[]", String(role.id)));

        // Thêm ảnh vào form nếu có file
        if (formData.avatar) {
            data.append("avatar", formData.avatar);
        }
        setLoading(true);

        try {
            const response = await apiInstance.post(`/api/system/user/users/${userId.id}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            showToast("Cập nhật người dùng thành công!", "success");
            navigate("/admin/users");
            setErrors({});
        } catch (error) {
            if (axios.isAxiosError(error)) {
                showToast("Cập nhật người dùng thất bại!", "error");
                const response = error.response;
                if (response && response.data && response.data.errors) {
                    const errorMessages = response.data.errors;
                    setErrors(errorMessages); // Lưu các lỗi trả về từ API
                } else {
                    setErrors({ general: "Lỗi không xác định từ máy chủ." });
                }
            } else {
                setErrors({ general: "Lỗi kết nối hoặc yêu cầu không thành công." });
            }
        } finally {
            setLoading(false);

        }
    };
    const isDriver = formData.roles.some((role) => role.id === 2);

    return (
        <div className="p-5">
            <h1 className="text-2xl bg-blue-300 font-bold mb-5 text-center p-3 rounded-t-lg">
                Chỉnh sửa người dùng
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6" encType="multipart/form-data">
                {/* Name */}
                <div className="mb-4 col-span-1">
                    <label className="block text-sm font-medium">Họ và tên</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                    {errors.name && <div className="text-red-500 text-xs">{errors.name[0]}</div>}
                </div>

                {/* Birthday */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Ngày sinh</label>
                    <input
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                    {errors.birthday && <div className="text-red-500 text-xs">{errors.birthday[0]}</div>}
                </div>

                {/* Gender */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Giới tính</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>

                {/* Phone */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Số điện thoại</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                    {errors.phone && <div className="text-red-500 text-xs">{errors.phone[0]}</div>}
                </div>

                {/* Email */}
                <div className="mb-4 col-span-1">
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                    {errors.email && <div className="text-red-500 text-xs">{errors.email[0]}</div>}
                </div>
                <div className="mb-4 col-span-1">
                    <label className="block text-sm font-medium">CMND/CCCD</label>
                    <input
                        type="text"
                        name="identity_card"
                        value={formData.identity_card}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                    {errors.identity_card && <div className="text-red-500 text-xs">{errors.identity_card[0]}</div>}
                </div>
                <div className="mb-4 col-span-1">
                    <label className="block text-sm font-medium">Ngày cấp CMND/CCCD</label>
                    <input
                        type="date"
                        name="identity_issue_date"
                        value={formData.identity_issue_date}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                    {errors.identity_issue_date && <div className="text-red-500 text-xs">{errors.identity_issue_date[0]}</div>}
                </div>
                <div className="mb-4 col-span-1">
                    <label className="block text-sm font-medium">Nơi cấp CMND/CCCD</label>
                    <input
                        type="text"
                        name="identity_issue_place"
                        value={formData.identity_issue_place}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                    {errors.identity_issue_place && <div className="text-red-500 text-xs">{errors.identity_issue_place[0]}</div>}
                </div>
                <div className="mb-4 col-span-1">
                    <label className="block text-sm font-medium">Địa chỉ</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                    {errors.address && <div className="text-red-500 text-xs">{errors.address[0]}</div>}

                </div>

                {/* Avatar */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Ảnh đại diện</label>
                    <input
                        type="file"
                        name="avatar"
                        onChange={handleFileChange}
                        className="w-full border p-2 rounded"
                    />
                    {previewImage && <img src={previewImage} alt="Avatar Preview" className="mt-2 w-20 h-20" />}
                </div>

                {/* Roles */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium">Vai trò</label>
                    <div className="flex gap-4">
                        {[
                            { label: "Quản trị", value: "1" },
                            { label: "Tài xế", value: "2" },
                            { label: "Nhân viên bán vé", value: "3" },
                        ].map(({ label, value }) => (
                            <label key={value} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="roles"
                                    value={value}
                                    checked={formData.roles.some((role) => role.id === Number(value))} // So sánh đúng kiểu dữ liệu
                                    onChange={handleChange}
                                    className="w-4 h-4"
                                />
                                {label}
                            </label>
                        ))}
                    </div>
                    {errors.roles && <div className="text-red-500 text-xs">{errors.roles[0]}</div>}
                </div>
                {/* Nếu là tài xế thì hiển thị thêm các trường giấy phép */}
                {isDriver && (
                    <>
                        <div>
                            <label className="block text-sm font-medium">Giấy phép lái xe</label>
                            <input
                                type="text"
                                name="license"
                                value={formData.license}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                            {errors.license && <div className="text-red-500 text-xs">{errors.license[0]}</div>}
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
                            {errors.license_issue_date && <div className="text-red-500 text-xs">{errors.license_issue_date[0]}</div>}
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
                            {errors.license_expiry_date && <div className="text-red-500 text-xs">{errors.license_expiry_date[0]}</div>}
                        </div>
                    </>
                )}


                {/* Address */}


                {/* Show driving license fields if role includes "driver" */}


                {/* Status */}
                <div className="mb-4 col-span-2">
                    <label className="block text-sm font-medium">Trạng thái</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="Đang hoạt động">Đang hoạt động</option>
                        <option value="Tạm dừng">Tạm dừng</option>
                        <option value="Đã khóa">Đã khóa</option>
                    </select>
                </div>

                {/* Submit */}
                <div className="col-span-2 flex justify-center mt-6">
                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">
                        Cập nhật người dùng
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUserForm;
