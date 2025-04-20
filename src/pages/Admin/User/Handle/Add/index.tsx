import { useState } from "react";
import DatePicker from "../../../../../components/DatePicker";

const AddUserForm = () => {
    // const [date, setDate] = useState<string>('');

    const [formData, setFormData] = useState<{
        id: string;
        name: string;
        birthday: string;
        gender: string;
        phone: string;
        email: string;
        avatar: string;
        roles: string[];
        address: string;
<<<<<<< Updated upstream
        identityCard: string;
        identityIssuePlace: string;
        identityIssueDate: string;
        status: string;
=======
        identity_card: string;
        identity_issue_place: string;
        identity_issue_date: string;
        status_id: string;
>>>>>>> Stashed changes
        vehicle: string;
        route: string;
        license: string;
        licenseIssueDate: string;
        licenseExpiryDate: string;
    }>({
        id: "",
        name: "",
        birthday: "",
        gender: "",
        phone: "",
        email: "",
        avatar: "",
        roles: [],
        address: "",
<<<<<<< Updated upstream
        identityCard: "",
        identityIssuePlace: "",
        identityIssueDate: "",
        status: "",
=======
        identity_card: "",
        identity_issue_place: "",
        identity_issue_date: "",
        status_id: "",
>>>>>>> Stashed changes
        vehicle: "",
        route: "",
        license: "",
        licenseIssueDate: "",
        licenseExpiryDate: "",
    });
    // const handleDateChange = (date: string | null) => {
    //     if (date !== null) {
    //         setDate(date);
    //     }
    // };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;

        if (type === "checkbox") {
            // Xử lý checkbox cho roles
            setFormData(prev => ({
                ...prev,
                roles: checked ? [...prev.roles, value] : prev.roles.filter(role => role !== value)
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
<<<<<<< Updated upstream
        console.log("Submitted Data:", formData);
=======
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
        data.append("status_id", formData.status_id ? formData.status_id : "1");
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
>>>>>>> Stashed changes
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl bg-blue-300 font-bold mb-5 text-center p-3 rounded-t-lg">
                Thêm người dùng
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium">Mã nhân viên</label>
                    <input type="text" name="id" value={formData.id} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Họ và tên</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Ngày sinh</label>
                    {/* <DatePicker onChange={handleDateChange} value={date} className="max-w-full" width="100%" /> */}
                    <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} className="w-full border p-2 rounded" />

                </div>
                <div>
                    <label className="block text-sm font-medium">Giới tính</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border p-2 rounded">
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </div>
                <div>
<<<<<<< Updated upstream
=======
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
                    {/* {errors.status && <div className="text-red-500 text-xs">{errors.status[0]}</div>} */}
                </div>
                {/* Số điện thoại */}
                <div>
>>>>>>> Stashed changes
                    <label className="block text-sm font-medium">Số điện thoại</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Địa chỉ</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Số CCCD</label>
                    <input type="text" name="identityCard" value={formData.identityCard} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Nơi cấp</label>
                    <input type="text" name="identityIssuePlace" value={formData.identityIssuePlace} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Ngày cấp</label>
                    <input type="date" name="identityIssueDate" value={formData.identityIssueDate} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Ảnh đại diện</label>
                    <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setFormData((prev) => ({
                                    ...prev,
                                    avatar: URL.createObjectURL(file),
                                }));
                            }
                        }}
                        className="w-full border p-2 rounded"
                    />
                    {formData.avatar && (
                        <img src={formData.avatar} alt="Avatar Preview" className="mt-2 w-20 h-20 object-cover rounded-full" />
                    )}
                </div>
                {/* Vai trò với checkbox */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium">Vai trò</label>
                    <div className="flex gap-4">
                        {["Admin", "Traffic", "Staff"].map(role => (
                            <label key={role} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="roles"
                                    value={role}
                                    checked={formData.roles.includes(role)}
                                    onChange={handleChange}
                                    className="w-4 h-4"
                                />
                                {role === "Admin" ? "Quản trị" : role === "Traffic" ? "Tài xế" : "Nhân viên bán vé"}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Nếu vai trò là tài xế, hiển thị thông tin thêm */}
                {formData.roles.includes("Traffic") && (
                    <>
                        <div>
                            <label className="block text-sm font-medium">Số xe</label>
                            <input type="text" name="vehicle" value={formData.vehicle} onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Tuyến xe</label>
                            <input type="text" name="route" value={formData.route} onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">GPLX</label>
                            <input type="text" name="license" value={formData.license} onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Ngày cấp GPLX</label>
                            <input type="date" name="licenseIssueDate" value={formData.licenseIssueDate} onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Ngày hết hạn GPLX</label>
                            <input type="date" name="licenseExpiryDate" value={formData.licenseExpiryDate} onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>
                    </>
                )}

                <div className="col-span-2 text-right">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Thêm người dùng
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddUserForm;
