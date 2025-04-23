import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance from "../../../../../../services/api";
import { showToast } from "../../../../../../components/Toasted";

const AddScheduleForm = () => {
    const navigate = useNavigate();
    const id = useParams();

    // const [stations, setStations] = useState([]);
    // const [garages, setGarages] = useState([]);
    // const [buses, setBuses] = useState([]);
    // const [drivers, setDrivers] = useState([]);
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
            const response = await apiInstance.post(`/api/system/route/createSchedule/${id?.id}`, formData);
            if (response.data.code === 201) {
                showToast("Tạo tuyến đường thành công!", "success");
                navigate("/admin/route");
            } else {
                showToast("Tạo tuyến đường thất bại!", "error");
            }
        } catch (error) {
            showToast("Lỗi khi tạo tuyến đường!", "error");
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Tạo tuyến đường mới</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md">

                <div>
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
                </div>
                <div className="md:col-span-2 flex justify-end">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl">Tạo tuyến</button>
                </div>
            </form>
        </div>
    );
};

export default AddScheduleForm;
