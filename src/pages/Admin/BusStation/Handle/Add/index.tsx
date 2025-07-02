import { useEffect, useState } from "react";
import { useLoading } from "../../../../../context/loading";
import apiInstance from "../../../../../services/api";
import Dropdown from "../../../../../components/Dropdown";
import { showToast } from "../../../../../components/Toasted";
import { useNavigate } from "react-router";

interface Option {
    id: string | number;
    value: string;
}

const AddBusStationForm = () => {
    const { setLoading } = useLoading();
    const navigate = useNavigate();

    const [province, setProvince] = useState<Option[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<Option>();

    const [district, setDistrict] = useState<Option[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<Option>();

    const [ward, setWard] = useState<Option[]>([]);
    const [selectedWard, setSelectedWard] = useState<Option>();

    const [selectedStatus, setSelectedStatus] = useState<Option>();
    const [formData, setFormData] = useState({
        name: "",
        address_number: ""
    });

    const status: Option[] = [
        { id: 1, value: "Đang hoạt động" },
        { id: 2, value: "Đang sửa chữa" },
        { id: 3, value: "Tạm ngưng" },
    ];

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                setLoading(true);
                const response = await apiInstance.get("/api/system/province/province/list");
                if (response.data.code === 200) {
                    const formatted = response.data.data.map((item: any) => ({
                        id: item.id,
                        value: item.name,
                    }));
                    setProvince(formatted);
                }
            } catch (err) {
                console.error("Error fetching provinces:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (!selectedProvince) return;

        const fetchDistricts = async () => {
            try {
                setLoading(true);
                const response = await apiInstance.get(`/api/system/province/district/list/${selectedProvince.id}`);
                if (response.data.code === 200) {
                    const formatted = response.data.data.map((item: any) => ({
                        id: item.id,
                        value: item.name,
                    }));
                    setDistrict(formatted);
                    setSelectedDistrict(undefined); // Reset district and ward
                    setWard([]);
                    setSelectedWard(undefined);
                }
            } catch (err) {
                console.error("Error fetching districts:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDistricts();
    }, [selectedProvince]);

    useEffect(() => {
        if (!selectedDistrict) return;

        const fetchWards = async () => {
            try {
                setLoading(true);
                const response = await apiInstance.get(`/api/system/province/ward/list/${selectedDistrict.id}`);
                if (response.data.code === 200) {
                    const formatted = response.data.data.map((item: any) => ({
                        id: item.id,
                        value: item.name,
                    }));
                    setWard(formatted);
                    setSelectedWard(undefined); // Reset ward
                }
            } catch (err) {
                console.error("Error fetching wards:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchWards();
    }, [selectedDistrict]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("province_id", selectedProvince?.id.toString() ?? "");
        data.append("status_id", selectedStatus?.id.toString() ?? "");
        const address = `${formData.address_number} ${selectedWard?.value} ${selectedDistrict?.value} ${selectedProvince?.value}  `
        data.append("address", address);
        try {
            setLoading(true);
            const response = await apiInstance.post(`/api/system/bus-station/create`, data, {
            });

            if (response.data.code === 201) {
                showToast("Thêm bến xe thành công!", "success");
                navigate("/admin/bus-station");
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
                Thêm Bến Xe Mới
            </h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block mb-1 font-medium">Tên bến</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Trạng thái hoạt động</label>
                    <Dropdown options={status} onChange={setSelectedStatus} width="w-[9/12]" />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Tỉnh/Thành phố</label>
                    <Dropdown options={province} onChange={setSelectedProvince} width="w-[9/12]" />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Quận/Huyện</label>
                    <Dropdown options={district} onChange={setSelectedDistrict} width="w-[9/12]" />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Phường/Xã</label>
                    <Dropdown options={ward} onChange={setSelectedWard} width="w-[9/12]" />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Địa chỉ cụ thể</label>
                    <input
                        type="text"
                        name="address_number"
                        value={formData.address_number}
                        onChange={handleChange}
                        className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                        required
                    />
                </div>
                <div className="md:col-span-2 text-right">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                    >
                        Thêm bến xe
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBusStationForm;
