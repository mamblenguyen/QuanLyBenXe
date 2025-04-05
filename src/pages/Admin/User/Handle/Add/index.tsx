import { useState } from "react";
import axios from "axios";
import apiInstance from "../../../../../services/api";
import { useLoading } from "../../../../../context/loading";
import { showToast } from '../../../../../components/Toasted';
import { useNavigate } from "react-router";

const AddUserForm = () => {
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<{
        name: string;
        birthday: string;
        gender: string;
        phone: string;
        email: string;
        avatar?: File;
        roles: string[];
        address: string;
        identity_card: string;
        identity_issue_place: string;
        identity_issue_date: string;
        status: string;
        vehicle: string;
        route: string;
        license: string;
        licenseIssueDate: string;
        licenseExpiryDate: string;
    }>({
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
        licenseIssueDate: "",
        licenseExpiryDate: "",
    });

    const [errors, setErrors] = useState<any>({});
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;

        if (name === "roles") {
            setFormData(prev => ({
                ...prev,
                roles: checked
                    ? [...prev.roles, value]
                    : prev.roles.filter(role => role !== value),
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, avatar: file }));
            setPreviewImage(URL.createObjectURL(file)); // Lưu URL ảnh xem trước
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("password", "123456789"); // Cần xử lý nhập mật khẩu an toàn hơn
        data.append("phone", formData.phone);
        data.append("address", formData.address);
        data.append("birthday", formData.birthday);
        data.append("gender", formData.gender);
        data.append("identity_card", formData.identity_card);
        data.append("identity_issue_place", formData.identity_issue_place);
        data.append("identity_issue_date", formData.identity_issue_date);
        data.append("status", formData.status ? formData.status : 'Đang hoạt động');
        data.append("license", formData.license);
        data.append("license_issue_date", formData.licenseIssueDate);
        data.append("license_expiry_date", formData.licenseExpiryDate);
        formData.roles.forEach(role => data.append("roles[]", role));

        if (formData.avatar) {
            data.append("avatar", formData.avatar);
        }
        console.log(formData);
        setLoading(true);

        try {
            const response = await apiInstance.post(`/api/system/user/users`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            showToast("Tạo người dùng thành công!", "success");
            navigate("/admin/users");
            setErrors({});
        } catch (error) {
            if (axios.isAxiosError(error)) {
                showToast("Lỗi khi tạo môn học!", "error");

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

    const isDriver = formData.roles.includes("2"); // Kiểm tra xem người dùng có chọn "Tài xế" không

    return (
        <div className="p-5">
            <h1 className="text-2xl bg-blue-300 font-bold mb-5 text-center p-3 rounded-t-lg">
                Thêm người dùng
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6" encType="multipart/form-data">
                {/* Họ và tên */}
                <div>
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

                {/* Ngày sinh */}
                <div>
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

                {/* Giới tính */}
                <div>
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
                    {errors.gender && <div className="text-red-500 text-xs">{errors.gender[0]}</div>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Giới tính</label>
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
                    {/* {errors.status && <div className="text-red-500 text-xs">{errors.status[0]}</div>} */}
                </div>
                {/* Số điện thoại */}
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                {/* Ảnh đại diện */}
                <div>
                    <label className="block text-sm font-medium">Ảnh đại diện</label>
                    <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full border p-2 rounded"
                    />
                    {errors.avatar && <div className="text-red-500 text-xs">{errors.avatar[0]}</div>}
                    {previewImage && (
                        <img
                            src={previewImage}
                            alt="Avatar Preview"
                            className="mt-2 w-20 h-20 object-cover rounded-full"
                        />
                    )}
                </div>

                {/* Vai trò */}
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
                                    checked={formData.roles.includes(value)}
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
                                name="licenseIssueDate"
                                value={formData.licenseIssueDate}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                            {errors.licenseIssueDate && <div className="text-red-500 text-xs">{errors.licenseIssueDate[0]}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Ngày hết hạn GPLX</label>
                            <input
                                type="date"
                                name="licenseExpiryDate"
                                value={formData.licenseExpiryDate}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                            {errors.licenseExpiryDate && <div className="text-red-500 text-xs">{errors.licenseExpiryDate[0]}</div>}
                        </div>
                    </>
                )}

                <div className="col-span-2 text-center">
                    <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded">
                        Thêm người dùng
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddUserForm;
