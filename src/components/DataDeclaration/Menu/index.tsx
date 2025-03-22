import React from 'react';
import { Option, SidebarProps } from './type';
import { useLocation, useNavigate } from 'react-router-dom';
import Dropdown from '../../Dropdown';

const filter1Options: Option[] = [
  { id: 'all', value: 'THCS' },
  { id: 'option1', value: 'THPT' },
];

const filter2Options: Option[] = [
  { id: 'all', value: '2020-2021' },
  { id: 'option2', value: '2021-2022' },
];

const menuItems = [
  { id: 'academic-year', label: 'Niên khóa' },
  { id: 'subjects', label: 'Môn học' },
  { id: 'classes', label: 'Lớp học' },
  { id: 'departments', label: 'Tổ - bộ môn' },
  { id: 'faculty', label: 'Khoa - khối' },
  { id: 'score-type', label: 'Loại điểm' },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (id: string) => {
    navigate(`/leadership/data-declaration/${id}`);
  };
  const dropdownFilter1 = filter1Options.map((opt) => ({
    id: Number(opt.id),
    value: opt.value,
  }));

  const dropdownFilter2 = filter2Options.map((opt) => ({
    id: Number(opt.id),
    value: opt.value,
  }));
  return (
    <div className="w-70 h-full">
      <div className="bg-[#373839] p-3 rounded-t-xl mb-4">
        <p className="text-sm text-white font-medium mb-3">Đang chọn xem:</p>
        <div className="flex items-center mb-2">
          <label className="text-sm text-white font-medium w-20">Trường :</label>
          <Dropdown options={dropdownFilter1} width="medium" />
        </div>

        <div className="flex items-center">
          <label className="text-sm text-white font-medium w-20">Niên khóa:</label>

          <Dropdown options={dropdownFilter2} width="medium" />
        </div>
      </div>

      <ul className="space-y-3">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            className={`p-3 py-4 mx-8 border border-[#FF7506] rounded-lg cursor-pointer 
              ${location.pathname.includes(item.id) ? 'bg-[#823B00] text-white' : 'bg-[#FFF9F4] text-black hover:bg-[#823B00] hover:text-white'}`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
