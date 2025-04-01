import { useState } from "react";

const AddBusForm = () => {
    const [formData, setFormData] = useState({
        bus_number: "",
        model_name: "",
        capacity: "",
        garage_name: "",
        tax_code: "",
        address: "",
        phone: "",
        images: [] as string[], // Mảng lưu danh sách ảnh
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files: File[] = Array.from(e.target.files);
        const imageUrls = files.map((file: File) => URL.createObjectURL(file));

        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...imageUrls].slice(0, 6), // Giới hạn tối đa 6 ảnh
        }));
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Dữ liệu xe:", formData);
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl bg-blue-300 font-bold mb-5 text-center p-3 rounded-t-lg">
                Thêm Xe Mới
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium">Biển Số Xe</label>
                    <input type="text" name="bus_number" value={formData.bus_number} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Tên Xe</label>
                    <input type="text" name="model_name" value={formData.model_name} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Sức Chứa</label>
                    <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Nhà Xe</label>
                    <input type="text" name="garage_name" value={formData.garage_name} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Mã Số Thuế</label>
                    <input type="text" name="tax_code" value={formData.tax_code} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Địa Chỉ</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Số Điện Thoại</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Hình Ảnh Xe (Tối đa 6 ảnh)</label>
                    <input type="file" accept="image/*" multiple onChange={handleImageChange} className="w-full border p-2 rounded" />
                    <div className="flex flex-wrap gap-2 mt-2">
                        {formData.images.map((img, index) => (
                            <div key={index} className="relative">
                                <img src={img} alt={`Preview ${index}`} className="w-32 h-32 object-cover rounded-lg" />
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
                <div className="col-span-2 text-right">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Thêm Xe
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBusForm;
