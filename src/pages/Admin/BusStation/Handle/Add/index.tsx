import { useState } from "react";

const AddBusStationForm = () => {
    const [formData, setFormData] = useState({
        stationId: "",
        name: "",
        address: "",
        phone: "",
        numberOfRoutes: "",
        openingHours: "",
        closingHours: "",
        images: [] as string[], // Mảng lưu danh sách ảnh
        status: "",
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files: File[] = Array.from(e.target.files);
        const imageUrls = files.map((file: File) => URL.createObjectURL(file));
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...imageUrls],
        }));
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl bg-blue-300 font-bold mb-5 text-center p-3 rounded-t-lg">
                Thêm Bến Xe
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium">Mã Bến Xe</label>
                    <input type="text" name="stationId" value={formData.stationId} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Tên Bến Xe</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Địa Chỉ</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Số Điện Thoại</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Số Tuyến Xe</label>
                    <input type="number" name="numberOfRoutes" value={formData.numberOfRoutes} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Giờ Mở Cửa</label>
                    <input type="time" name="openingHours" value={formData.openingHours} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Giờ Đóng Cửa</label>
                    <input type="time" name="closingHours" value={formData.closingHours} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Hình Ảnh</label>
                    <input
                        type="file"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="w-full border p-2 rounded"
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                        {formData.images.map((img, index) => (
                            <div key={index} className="relative">
                                <img src={img} alt={`Preview ${index}`} className="w-60 h-60 object-cover rounded-lg" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium">Trạng Thái</label>
                    <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded">
                        <option value="">Chọn trạng thái</option>
                        <option value="Hoạt động">Hoạt động</option>
                        <option value="Tạm ngừng">Tạm ngừng</option>
                    </select>
                </div>
                <div className="col-span-2 text-right">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Thêm Bến Xe
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBusStationForm;