import { useState, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaRegCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { vi } from 'date-fns/locale';

const Overview = () => {
  const academicData = [
    { name: '6A1', Gioi: 25, Kha: 15, TrungBinh: 10, Yeu: 5 },
    { name: '6A2', Gioi: 20, Kha: 14, TrungBinh: 12, Yeu: 7 },
    { name: '6A3', Gioi: 22, Kha: 16, TrungBinh: 11, Yeu: 6 },
    { name: '6A4', Gioi: 18, Kha: 12, TrungBinh: 14, Yeu: 8 },
    { name: '6A5', Gioi: 27, Kha: 18, TrungBinh: 9, Yeu: 5 },
    { name: '6A6', Gioi: 23, Kha: 15, TrungBinh: 13, Yeu: 6 },
    { name: '6A7', Gioi: 26, Kha: 17, TrungBinh: 12, Yeu: 4 },
    { name: '6A8', Gioi: 19, Kha: 13, TrungBinh: 15, Yeu: 7 },
  ];

  const studentData = [
    { name: 'Khối 6', value: 1400 },
    { name: 'Khối 7', value: 800 },
    { name: 'Khối 8', value: 1800 },
    { name: 'Khối 9', value: 1000 },
  ];

  const visitData = [
    { date: '31/01', visits: 5000 },
    { date: '01/02', visits: 7500 },
    { date: '02/02', visits: 4000 },
    { date: '03/02', visits: 6000 },
    { date: '04/02', visits: 8000 },
    { date: '05/02', visits: 4500 },
    { date: '06/02', visits: 9000 },
  ];

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  return (
    <div className="ms-10 me-8">
      <h1 className="text-3xl font-bold mb-6">Tổng quan</h1>
      <div className="flex gap-10 mb-3">
        <div className="flex items-center">
          <label className="mr-3 text-gray-700 font-medium">Niên khóa</label>
          <div className="relative border border-black rounded flex items-center">
            <select className="appearance-none bg-transparent pl-3 pr-5 py-1">
              <option value="#">2020-2021</option>
              <option value="#">2021-2022</option>
              <option value="#">2022-2023</option>
            </select>
            <div className="w-px bg-black self-stretch"></div>
            <div className="px-2 cursor-pointer">
              <FaChevronDown className="text-orange-500 w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-400 to-blue-600 px-6 py-3 rounded-lg shadow-lg text-center text-white flex-1">
          <p className="text-4xl font-bold">5000</p>
          <p className="text-lg">Học viên</p>
        </div>
        <div className="bg-gradient-to-r from-orange-400 to-orange-600 px-6 py-3 rounded-lg shadow-lg text-center text-white flex-1">
          <p className="text-4xl font-bold">1500</p>
          <p className="text-lg">Giảng viên</p>
        </div>
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 px-6 py-3 rounded-lg shadow-lg text-center text-white flex-1">
          <p className="text-4xl font-bold">55</p>
          <p className="text-lg">Lớp học</p>
        </div>
      </div>

      <div className="flex gap-6 py-6">
        <div className="bg-white p-4 rounded-lg shadow-[0px_10px_20px_rgba(0,0,0,0.15),0px_-4px_10px_rgba(0,0,0,0.05)] w-3/4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-gray-700 font-medium">Thống kê kết quả học tập</h2>
            <div className="relative border border-black rounded flex items-center">
              <select className="appearance-none bg-transparent pl-3 pr-5 py-1">
                <option value="#">Chọn khối</option>
                <option value="#">Khối 6</option>
                <option value="#">Khối 7</option>
                <option value="#">Khối 8</option>
                <option value="#">Khối 9</option>
              </select>
              <div className="w-px bg-black self-stretch"></div>
              <div className="px-2">
                <FaChevronDown className="text-orange-500 w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="relative">
            <button className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2">
              <FaChevronLeft className="text-orange-500" />
            </button>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={academicData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis interval={1} />
                <Tooltip />
                <CartesianGrid strokeOpacity={0.5} vertical={false} />
                <Legend
                  content={() => (
                    <div style={{ display: 'flex', gap: 40, justifyContent: 'center', marginTop: 10 }}>
                      {[
                        { color: '#C83901', label: 'Giỏi' },
                        { color: '#FF7506', label: 'Khá' },
                        { color: '#FFA75E', label: 'Trung bình' },
                        { color: '#FFD8B8', label: 'Yếu' },
                      ].map(({ color, label }) => (
                        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <div
                            style={{
                              width: 40,
                              height: 15,
                              backgroundColor: color,
                              borderRadius: 8,
                            }}
                          />
                          <span style={{ color: 'black', fontSize: '12px' }}>{label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                />
                <Bar dataKey="Gioi" radius={10} barSize={10} fill="#C83901" name="Giỏi" />
                <Bar dataKey="Kha" radius={10} barSize={10} fill="#FF7506" name="Khá" />
                <Bar dataKey="TrungBinh" radius={10} barSize={10} fill="#FFA75E" name="Trung bình" />
                <Bar dataKey="Yeu" radius={10} barSize={10} fill="#FFD8B8" name="Yếu" />
              </BarChart>
            </ResponsiveContainer>
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2">
              <FaChevronRight className="text-orange-500" />
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-[0px_10px_20px_rgba(0,0,0,0.15),0px_-4px_10px_rgba(0,0,0,0.05)] w-1/4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-gray-700 font-medium">Số lượng học viên</h2>
            <div className="relative border border-black rounded flex items-center">
              <select className="appearance-none bg-transparent pl-3 pr-5 py-1">
                <option value="#">THCS</option>
                <option value="#">THPT</option>
                <option value="#">CH</option>
              </select>
              <div className="w-px bg-black self-stretch"></div>
              <div className="px-2">
                <FaChevronDown className="text-orange-500 w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {studentData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-4">
                  <span>{item.name}</span>
                  <span className="opacity-50">2000</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(item.value / 2000) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-[0px_10px_20px_rgba(0,0,0,0.15),0px_-4px_10px_rgba(0,0,0,0.05)] p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-orange-600 font-semibold">Thống kê lượng truy cập</h2>
          <div className="flex items-center border border-black rounded-md appearance-none bg-transparent pl-2 pr-4 py-1">
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              className="outline-none text-sm w-20 text-center"
              locale={vi}
            />
            <span className="text-gray-500">-</span>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              className="outline-none text-sm w-20 text-center"
              locale={vi}
            />
            <FaRegCalendarAlt className="text-orange-500" />
          </div>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={visitData} margin={{ right: 50 }}>
            <defs>
              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF7506" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.3} />
              </linearGradient>
            </defs>

            <XAxis dataKey="date" padding={{ right: 50 }} />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeOpacity={0.5} />
            <Area type="monotone" dataKey="visits" stroke="#d97706" strokeWidth={2} fill="url(#colorVisits)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;
