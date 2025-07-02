import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, CartesianGrid,
} from 'recharts';
import { FaRegCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { vi } from 'date-fns/locale';
import apiInstance from '../../../services/api';

const Overview = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date('2025/01/01'));
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalRoutes, setTotalRoutes] = useState<number>(0);
  const [totalSchedules, setTotalSchedules] = useState<number>(0);
  const [busStatusData, setBusStatusData] = useState<any[]>([]);
  const [totalBuses, setTotalBuses] = useState<number>(0);
  const [revenuePerDay, setRevenuePerDay] = useState<any[]>([]);

  const garageId = 1; // hoặc lấy từ session/user context nếu cần

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        // Doanh thu tháng
        const revenueRes = await apiInstance.get('/api/system/tickets/revenue', {
          params: { range: 'month' },
        });
        if (revenueRes.data.code === 200) {
          setTotalRevenue(Number(revenueRes.data.data.revenue));
        }

        // Tuyến & chuyến
        const routeRes = await apiInstance.get('/api/system/route/statistic');
        if (routeRes.data.code === 200) {
          setTotalRoutes(routeRes.data.data.totalRoutes);
          setTotalSchedules(routeRes.data.data.totalSchedules);
        }

        // Trạng thái xe
        const busStatsRes = await apiInstance.get('/api/system/bus/bus/stats/by-status');
        if (busStatsRes.data.code === 200) {
          setBusStatusData(busStatsRes.data.data.data);
          setTotalBuses(busStatsRes.data.data.totalBus);
        }
      } catch (error) {
        console.error("Lỗi tải dữ liệu tổng quan:", error);
      }
    };

    fetchOverviewData();
  }, []);

  useEffect(() => {
    const fetchRevenueChart = async () => {
      if (!startDate || !endDate) return;

      const formattedStart = startDate.toISOString().split('T')[0];
      const formattedEnd = endDate.toISOString().split('T')[0];

      try {
        const res = await apiInstance.get('/api/system/tickets/revenue-by-date', {
          params: {
            start_date: formattedStart,
            end_date: formattedEnd
          },
        });
        if (res.data.code === 200) {
          setRevenuePerDay(res.data.data); // [{ date: '25/06', revenue: 500000 }]
        }
      } catch (error) {
        console.error('Lỗi lấy doanh thu biểu đồ:', error);
      }
    };

    fetchRevenueChart();
  }, [startDate, endDate]);

  return (
    <div className="ms-10 me-8">
      <h1 className="text-3xl font-bold mb-6">Tổng quan nhà xe</h1>

      {/* Tổng hợp nhanh */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-r from-green-400 to-green-600 px-6 py-4 rounded-lg shadow-lg text-white text-center">
          <p className="text-4xl font-bold">{totalRevenue.toLocaleString('vi-VN')}₫</p>
          <p className="text-lg">Tổng doanh thu tháng</p>
        </div>
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 px-6 py-4 rounded-lg shadow-lg text-white text-center">
          <p className="text-4xl font-bold">{totalRoutes}</p>
          <p className="text-lg">Tổng số tuyến</p>
        </div>
        <div className="bg-gradient-to-r from-rose-400 to-red-600 px-6 py-4 rounded-lg shadow-lg text-white text-center">
          <p className="text-4xl font-bold">{totalSchedules}</p>
          <p className="text-lg">Tổng số chuyến</p>
        </div>
        <div className="bg-gradient-to-r from-gray-400 to-black px-6 py-4 rounded-lg shadow-lg text-white text-center">
          <p className="text-4xl font-bold">{totalBuses}</p>
          <p className="text-lg">Tổng số xe</p>
        </div>
      </div>

      {/* Biểu đồ doanh thu */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-blue-600 font-semibold">Biểu đồ doanh thu</h2>
          <div className="flex items-center border border-black rounded-md px-2 py-1">
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              className="outline-none text-sm w-24 text-center"
              locale={vi}
            />
            <span className="mx-2 text-gray-600">-</span>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              className="outline-none text-sm w-24 text-center"
              locale={vi}
            />
            <FaRegCalendarAlt className="text-blue-500 ml-2" />
          </div>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={revenuePerDay}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#007BFF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(value) => `${value / 1_000_000}tr`} />
            <Tooltip formatter={(value: number) => `${value.toLocaleString('vi-VN')}₫`} />
            <CartesianGrid strokeOpacity={0.5} />
            <Area type="monotone" dataKey="revenue" stroke="#007BFF" strokeWidth={2} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Trạng thái xe */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-gray-700 font-medium mb-4">Trạng thái xe</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={busStatusData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number) => `${value} xe`} />
            <Bar dataKey="total" fill="#007BFF" barSize={40} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;
