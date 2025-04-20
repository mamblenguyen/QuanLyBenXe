import { useEffect, useState } from "react";
import { useLoading } from "../../../../../context/loading";
import apiInstance from "../../../../../services/api";
import Dropdown from "../../../../../components/Dropdown";
import { showToast } from "../../../../../components/Toasted";
import { useNavigate, useParams } from "react-router";

interface Option {
    id: string | number;
    value: string;
}
interface OptionBusModel {
    id: string | number;
    value: string;
    capacity?: number;
}

const EditBusForm = () => {
    const { id } = useParams(); // Lấy id xe từ URL
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const [busModels, setBusModel] = useState<OptionBusModel[]>([]);
    const [selectedBusModel, setSelectedBusModel] = useState<OptionBusModel>();
    const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const [formData, setFormData] = useState({
        bus_number: "",
        model_id: "",
        status_id: "",
        images: [] as string[],
    });

    const status: Option[] = [
        { id: 1, value: "Đang hoạt động" },
        { id: 2, value: "Đang sửa chữa" },
        { id: 3, value: "Tạm ngưng" },
    ];

    // Lấy thông tin xe cần sửa
    useEffect(() => {
        const fetchBusData = async () => {
            try {
                setLoading(true);
                const res = await apiInstance.get(`/api/system/bus/bus/${id}`);
                const bus = res.data.data;
                setFormData({
                    bus_number: bus.bus_number,
                    model_id: bus.model_id,
                    status_id: bus.status_id,
                    images: bus.images || [],
                });

                setSelectedBusModel({
                    id: bus.model.id,
                    value: bus.model.name,
                    capacity: bus.model.capacity,
                });

                const matchedStatus = status.find((s) => s.id === bus.status.id);
                console.log(matchedStatus);

                setSelectedStatus(matchedStatus || null);

            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu xe:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBusData();
    }, [id]);

    // Dropdown bus model
    useEffect(() => {
        const dropdownBusModel = async () => {
            try {
                setLoading(true);
                const response = await apiInstance.get("/api/system/bus/listBusModel");
                const formattedData = response.data.data.map((item: any) => ({
                    id: item.id,
                    value: item.name,
                    capacity: item.capacity,
                }));
                setBusModel(formattedData);
            } catch (error) {
                console.error("API Error:", error);
            } finally {
                setLoading(false);
            }
        };
        dropdownBusModel();
    }, []);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files: File[] = Array.from(e.target.files).slice(0, 6);
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setImageFiles((prev) => [...prev, ...files].slice(0, 6));
        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...imageUrls].slice(0, 6),
        }));
    };

    const removeImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
        setImageFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append("bus_number", formData.bus_number);
        data.append("model_id", selectedBusModel?.id.toString() ?? "");
        data.append("status_id", selectedStatus?.id.toString() ?? "");
        imageFiles.forEach((file) => {
            data.append("images[]", file);
        });

        try {
            setLoading(true);
            const response = await apiInstance.post(
                `/api/system/bus/bus/${id}`,
                data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (response.data.code === 200) {
                showToast("Cập nhật xe thành công!", "success");
                navigate("/admin/bus");
            } else {
                showToast("Có lỗi xảy ra!", "error");
            }
        } catch (error) {
            console.error("API Error:", error);
            showToast("Lỗi kết nối API", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
                Chỉnh Sửa Xe
            </h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block mb-1 font-medium">Biển Số Xe</label>
                    <input
                        type="text"
                        name="bus_number"
                        value={formData.bus_number}
                        onChange={handleChange}
                        className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Trạng thái hoạt động</label>
                    <Dropdown options={status} onChange={setSelectedStatus} selectedId={selectedStatus?.id} />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Chọn Loại Xe</label>
                    <Dropdown options={busModels} onChange={setSelectedBusModel} selectedId={selectedBusModel?.id} />
                    <label className="block mb-1 font-medium">Số lượng ghế: {selectedBusModel?.capacity}</label>
                </div>

                <div className="md:col-span-2">
                    <label className="block mb-1 font-medium">Hình ảnh xe (Tối đa 6 ảnh)</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="w-full border p-2 rounded"
                    />
                    <div className="flex flex-wrap gap-3 mt-4">
                        {formData.images.map((img, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={img}
                                    alt={`Preview ${index}`}
                                    className="w-32 h-32 object-cover rounded-lg border"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-2 text-right">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                    >
                        Cập Nhật Xe
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBusForm;
