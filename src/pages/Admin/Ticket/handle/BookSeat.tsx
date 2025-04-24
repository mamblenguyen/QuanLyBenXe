import { useEffect, useState } from "react";
import BusLayout from "../../../../components/BusLayout";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../../../context/loading";
import { Routes } from "../../../../types/type";
import apiInstance from "../../../../services/api";
import DatePicker from "../../../../components/DatePicker";
import { parse, isValid, format } from 'date-fns';
import { showToast } from "../../../../components/Toasted";

const BookSeat = () => {
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const [routes, setRoutes] = useState<Routes[]>([]);
    const [schedule, setSchedule] = useState<Routes[]>([]);
    const [busModelId, setBusModelId] = useState<string | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(() => {
        const today = new Date();
        return format(today, 'yyyy-MM-dd');
    }); const [bookedSeats, setBookedSeats] = useState<[]>([]);
    const [formData, setFormData] = useState({
        schedule_id: "",
        full_name: "",
        phone_number: "",
        email: "",
        pickup_point: "",
        dropoff_point: "",
        seat_number: selectedSeats,
        route_id: "",
        date: "",
    });

    const fetchRoute = async () => {
        try {
            setLoading(true);
            const response = await apiInstance.get('/api/system/route/list/action');
            if (response.data.code === 200) {
                setRoutes(response.data.data);
            } else {
                throw new Error("Dữ liệu API không hợp lệ");
            }
        } catch (error) {
            console.error("Lỗi tải danh sách tuyến:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSchedule = async () => {
        try {
            setLoading(true);
            const response = await apiInstance.get(`/api/system/route/detail/${formData.route_id}/status`);
            if (response.data.code === 200) {
                setSchedule(response.data.data.schedule);
            } else {
                throw new Error("Dữ liệu API không hợp lệ");
            }
        } catch (error) {
            console.error("Lỗi tải danh sách chuyến:", error);
        } finally {
            setLoading(false);
        }
    };
    const fetchBookedSeats = async () => {
        try {
            setLoading(true);
            const response = await apiInstance.get(`/api/system/tickets/routes/${formData.schedule_id}/seat-availability/${selectedDate}`);
            setBookedSeats(response.data.booked_seats);
        } catch (error) {
            console.error("Lỗi tải danh sách chuyến:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchRoute();
    }, []);

    useEffect(() => {
        if (formData.route_id) {
            fetchSchedule();
        }
    }, [formData.route_id]);
    useEffect(() => {
        fetchBookedSeats();
    }, [selectedDate]);


    const numericId = busModelId ? parseInt(busModelId, 10) : undefined;

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            seat_number: selectedSeats,
            date: selectedDate
        }));
    }, [selectedSeats]);
    const handleDateChange = (date: string | null) => {
        if (date) {
            // Parse theo định dạng dd/MM/yyyy
            const parsedDate = parse(date, 'dd/MM/yyyy', new Date());

            if (isValid(parsedDate)) {
                const formattedDate = format(parsedDate, 'yyyy-MM-dd');
                setSelectedDate(formattedDate);
            } else {
                console.error('Invalid date:', date);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    console.log(formData);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await apiInstance.post("/api/system/tickets/book", formData);
            showToast("Đặt vé thành công!", "success");
            navigate("/admin/tickets");
        } catch (error: any) {
            showToast("Xin vui lòng điền đầy đủ thông tin  !", "error");
        }
    };


    const isReady = formData.route_id && formData.schedule_id && numericId !== undefined && !isNaN(numericId);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <div className="w-2/3 p-2 items-center">
                <div className="flex">
                    {/* Tuyến đi */}
                    <div className="w-1/2 p-2">
                        <label className="block font-medium text-gray-700">Tuyến đi</label>
                        <select
                            name="route_id"
                            onChange={handleChange}
                            value={formData.route_id}
                            required
                            className="w-full border px-3 py-2 rounded-md"
                        >
                            <option value="">Chọn bến đi</option>
                            {routes.map((r: any) => (
                                <option key={r.id} value={r.id}>
                                    {r.departure_station_id.name} - {r.arrival_station_id.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Chuyến */}
                    <div className="w-1/2 p-2">
                        <label className="block font-medium text-gray-700">Chuyến</label>
                        <select
                            name="schedule_id"
                            onChange={(e) => {
                                const selectedOption = e.target.options[e.target.selectedIndex];
                                const busModel = selectedOption.getAttribute('data-busmodel');
                                const priceTicket = selectedOption.getAttribute('data-price');

                                const value = e.target.value;

                                setFormData((prev) => ({
                                    ...prev,
                                    schedule_id: value,
                                }));
                                if (priceTicket !== null) {
                                    setPrice(Number(priceTicket));
                                }
                                if (busModel !== null) {
                                    setBusModelId(busModel);
                                }
                            }}
                            value={formData.schedule_id}
                            required
                            className="w-full border px-3 py-2 rounded-md"
                        >
                            <option value="">Chọn chuyến</option>
                            {schedule.map((r: any) => (
                                <option
                                    key={r.id}
                                    value={r.id}
                                    data-busmodel={r.bus_model_id}
                                    data-price={r.ticket_price}
                                >
                                    {r.departure_time} - {r.arrival_time}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="block text-sm font-semibold">Ngày</label>
                        <DatePicker
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </div>
                </div>

                {/* Chỉ hiển thị phần chọn ghế khi người dùng đã chọn đầy đủ tuyến và chuyến */}
                {!isReady ? (
                    <div className="mt-4 text-red-500">Vui lòng chọn đầy đủ tuyến đi và chuyến xe</div>
                ) : (
                    <BusLayout
                        type={numericId}
                        selectedSeats={selectedSeats}
                        setSelectedSeats={setSelectedSeats}
                        bookedSeats={bookedSeats} // You can dynamically fetch this later
                    />
                )}
            </div>

            {/* Form bên phải */}
            <div className="w-1/3 bg-white p-4 rounded shadow-md">
                <h1 className="text-2xl font-bold">Thông tin đặt vé</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold">Họ và tên</label>
                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Nhập họ tên"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Số điện thoại</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Nhập số điện thoại"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Nhập email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Điểm đón</label>
                        <input
                            type="text"
                            name="pickup_point"
                            value={formData.pickup_point}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Nhập điểm đón"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold">Điểm trả</label>
                        <input
                            type="text"
                            name="dropoff_point"
                            value={formData.dropoff_point}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Nhập điểm trả"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold">Số ghế</label>
                        <div className="flex gap-2 flex-wrap">
                            {selectedSeats.length > 0 ? (
                                selectedSeats.map(seat => (
                                    <div key={seat} className="px-3 py-1 bg-blue-400 text-white rounded">
                                        {seat}
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500">Chưa chọn ghế nào</div>
                            )}
                        </div>
                        <h2 className="text-lg font-semibold">
                            Số ghế đã đặt:
                            <span className="text-red-500 ps-3">{selectedSeats.length}</span>
                        </h2>
                        <h2 className="text-lg font-semibold">
                            Giá vé:
                            <span className="text-red-500 ps-3">{selectedSeats.length * (price ?? 0)}</span>
                        </h2>
                    </div>

                    <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded mt-4">
                        Đặt vé
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookSeat;
