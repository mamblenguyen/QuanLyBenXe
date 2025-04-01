import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface BusModel {
    id: number;
    name: string;
    capacity: number;
}

interface Garage {
    id: number;
    name: string;
    tax_code: string;
    address: string;
    phone: string;
}

interface Bus {
    id: number;
    bus_number: string;
    model: BusModel;
    garage: Garage;
    images: string[];
}

const EditBusForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState<Bus | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    useEffect(() => {
        if (!id) return;

        fetch("/data/Bus.json")
            .then((response) => response.json())
            .then((data) => {
                console.log("Dữ liệu JSON nhận được:", data);
                const selectedBus = data.data.find((bus: Bus) => bus.id === Number(id));

                if (selectedBus) {
                    setFormData({
                        ...selectedBus,
                        model: selectedBus.model ?? { id: 0, name: "", capacity: 0 },
                        garage: selectedBus.garage ?? { id: 0, name: "", tax_code: "", address: "", phone: "" },
                        images: selectedBus.images ?? [],
                    });
                } else {
                    console.error("Không tìm thấy xe với ID:", id);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Lỗi khi tải dữ liệu:", error);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            if (!prev) return null;

            if (name.startsWith("model.")) {
                const field = name.split(".")[1];
                return { ...prev, model: { ...prev.model, [field]: field === "capacity" ? Number(value) : value } };
            }

            if (name.startsWith("garage.")) {
                const field = name.split(".")[1];
                return { ...prev, garage: { ...prev.garage, [field]: value } };
            }

            return { ...prev, [name]: value };
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setNewImages((prev) => [...prev, ...files]);

            const filePreviews = files.map((file) => URL.createObjectURL(file));
            setPreviewImages((prev) => [...prev, ...filePreviews]);
        }
    };

    const handleRemoveOldImage = (index: number) => {
        if (formData) {
            const updatedImages = formData.images.filter((_, i) => i !== index);
            setFormData({ ...formData, images: updatedImages });
        }
    };

    const handleRemoveNewImage = (index: number) => {
        const updatedNewImages = newImages.filter((_, i) => i !== index);
        const updatedPreviewImages = previewImages.filter((_, i) => i !== index);
        setNewImages(updatedNewImages);
        setPreviewImages(updatedPreviewImages);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        console.log("Dữ liệu xe đã chỉnh sửa:", formData);
        console.log("Ảnh mới đã chọn:", newImages);
        alert("Thông tin xe đã được cập nhật!");
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl bg-yellow-300 font-bold mb-5 text-center p-3 rounded-t-lg">
                Chỉnh Sửa Xe
            </h1>

            {loading ? (
                <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
            ) : formData ? (
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                    {/* Biển số xe */}
                    <div>
                        <label className="block text-sm font-medium">Biển Số Xe</label>
                        <input
                            type="text"
                            name="bus_number"
                            value={formData.bus_number}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    {/* Tên xe */}
                    <div>
                        <label className="block text-sm font-medium">Tên Xe</label>
                        <input
                            type="text"
                            name="model.name"
                            value={formData.model.name}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    {/* Sức chứa */}
                    <div>
                        <label className="block text-sm font-medium">Sức Chứa</label>
                        <input
                            type="number"
                            name="model.capacity"
                            value={formData.model.capacity}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    {/* Nhà xe */}
                    <div>
                        <label className="block text-sm font-medium">Tên Nhà Xe</label>
                        <input
                            type="text"
                            name="garage.name"
                            value={formData.garage.name}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    {/* Mã số thuế */}
                    <div>
                        <label className="block text-sm font-medium">Mã Số Thuế</label>
                        <input
                            type="text"
                            name="garage.tax_code"
                            value={formData.garage.tax_code}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* Địa chỉ */}
                    <div>
                        <label className="block text-sm font-medium">Địa Chỉ</label>
                        <input
                            type="text"
                            name="garage.address"
                            value={formData.garage.address}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    {/* Số điện thoại */}
                    <div>
                        <label className="block text-sm font-medium">Số Điện Thoại</label>
                        <input
                            type="text"
                            name="garage.phone"
                            value={formData.garage.phone}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    {/* Ảnh hiện tại */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium">Ảnh Xe Hiện Tại</label>
                        <div className="flex flex-wrap gap-2">
                            {formData.images.map((img, index) => (
                                <div key={index} className="relative">
                                    <img src={img} alt="Ảnh xe" className="w-40 h-40 object-cover border rounded" />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveOldImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                                    >
                                        ❌
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-2 text-right">
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                            Cập Nhật Xe
                        </button>
                    </div>
                </form>
            ) : (
                <p className="text-center text-red-500">Không tìm thấy xe cần chỉnh sửa!</p>
            )}
        </div>
    );
};

export default EditBusForm;
