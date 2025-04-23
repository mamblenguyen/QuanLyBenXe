import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../../../../../services/api";
import { showToast } from "../../../../../../components/Toasted";
import { useLoading } from "../../../../../../context/loading";

const AddRouteForm = () => {
    const navigate = useNavigate();
    const { setLoading } = useLoading();
    const [stations, setStations] = useState([]);
    const [garages, setGarages] = useState([]);
    const [buses, setBuses] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [formData, setFormData] = useState({
        departure_station_id: "",
        arrival_station_id: "",
        garage_id: "",
        departure_time: "",
        arrival_time: "",
        ticket_price: "",
        bus_id: "",
        driver_id: "",
        route_status_id: 1,
    });

    useEffect(() => {
        // Fetch dữ liệu cho dropdown
        const fetchDropdownData = async () => {
            try {
                setLoading(true);

                const [stationRes, busRes, driRes] = await Promise.all([
                    apiInstance.get("/api/system/bus-station/list/status"),
                    apiInstance.get("/api/system/bus/buses"),
                    apiInstance.get("/api/system/user/list/driver"),
                ]);
                setStations(stationRes.data.data);
                setBuses(busRes.data.data);
                setDrivers(driRes.data.data);
            } catch (error) {
                showToast("Lỗi khi tải dữ liệu dropdown!", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchDropdownData();
    }, []);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await apiInstance.post("/api/system/route/create", formData);
            if (response.data.code === 201) {
                showToast("Tạo tuyến đường thành công!", "success");
                navigate("/admin/route");
            } else {
                showToast("Tạo tuyến đường thất bại!", "error");
            }
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                if (status === 409) {
                    showToast("Tuyến đường này đã tồn tại!", "error");
                } else {
                    showToast("Đã xảy ra lỗi không xác định!", "error");
                }
            } else {
                showToast("Không thể kết nối đến máy chủ!", "error");
            }
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Tạo tuyến đường mới</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md">
                <div>
                    <label className="block font-medium text-gray-700">Bến đi</label>
                    <select name="departure_station_id" onChange={handleChange} value={formData.departure_station_id} required className="w-full border px-3 py-2 rounded-md">
                        <option value="">Chọn bến đi</option>
                        {stations.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Bến đến</label>
                    <select name="arrival_station_id" onChange={handleChange} value={formData.arrival_station_id} required className="w-full border px-3 py-2 rounded-md">
                        <option value="">Chọn bến đến</option>
                        {stations.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Xe</label>
                    <select name="bus_id" onChange={handleChange} value={formData.bus_id} required className="w-full border px-3 py-2 rounded-md">
                        <option value="">Chọn xe</option>
                        {buses.map((b: any) => <option key={b.id} value={b.id}>{b.bus_number} - {b.model.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Tài xế</label>
                    <select
                        name="driver_id"
                        onChange={handleChange}
                        value={formData.driver_id}
                        required
                        className="w-full border px-3 py-2 rounded-md"
                    >
                        {drivers === null || drivers.length === 0 ? (
                            <option disabled value="">Hiện tại không có tài xế</option>
                        ) : (
                            <>
                                <option value="">Chọn tài xế</option>
                                {drivers.map((d: any) => (
                                    <option key={d.id} value={d.id}>
                                        {d.name}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                </div>

                {/* <div>
                    <label className="block font-medium text-gray-700">Giá vé</label>
                    <input type="number" name="ticket_price" onChange={handleChange} value={formData.ticket_price} required className="w-full border px-3 py-2 rounded-md" />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Giờ khởi hành</label>
                    <input type="time" name="departure_time" onChange={handleChange} value={formData.departure_time} required className="w-full border px-3 py-2 rounded-md" />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">Giờ đến</label>
                    <input type="time" name="arrival_time" onChange={handleChange} value={formData.arrival_time} required className="w-full border px-3 py-2 rounded-md" />
                </div> */}
                <div className="md:col-span-2 flex justify-end">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl">Tạo tuyến</button>
                </div>
            </form>
        </div>
    );
};

export default AddRouteForm;
