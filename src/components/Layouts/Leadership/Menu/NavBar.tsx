import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Bus, Car, Wrench, UserCheck, Ticket, Map } from 'lucide-react';

const NavBar = ({ collapsed, setCollapsed }: any) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const menuItems = [
    { icon: Home, title: 'Tổng quan', link: '/' },
    { icon: Users, title: 'Người dùng', link: '/users' },
    { icon: Bus, title: 'Bến xe', link: '/stations' },
    { icon: Car, title: 'Xe', link: '/vehicles' },
    { icon: Wrench, title: 'Garage', link: '/garages' },
    { icon: UserCheck, title: 'Tài xế', link: '/drivers' },
    { icon: Ticket, title: 'Vé xe', link: '/tickets' },
    { icon: Map, title: 'Tuyến đường', link: '/routes' },
  ];

  const handleMenuClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={`text-black flex flex-col transition-all duration-300 ${collapsed ? 'bg-green-600 text-white w-20' : 'bg-white text-black w-64'}`}>
      <nav className="flex-1 relative">
        {/* Nút thu gọn menu */}
        {!collapsed && (
          <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setCollapsed(true)}>
            <img src="/icon/chevron_duo_left.png" className="w-6 h-6 transition-all duration-300" alt="Collapse" />
          </div>
        )}

        {/* Logo */}
        <div className="flex items-center justify-center my-6">
          <img src={collapsed ? '/icon/logo-small.png' : '/icon/logo-big.png'} alt="logo" className={`transition-all duration-300 ${collapsed ? 'w-12' : 'w-20'} h-auto mt-6 mb-10`} />
        </div>

        {/* Menu */}
        <ul className="flex flex-col mt-4">
          {menuItems.map((item, index) => (
            <li key={index} className="flex flex-col space-y-2 px-4 py-1 rounded-lg transition-all duration-300">
              <Link
                to={item.link}
                className={`flex items-center space-x-4 p-2 rounded-lg transition-all duration-300 ${activeIndex === index ? 'bg-green-200 border-r-4 border-green-300' : 'hover:bg-gray-100 hover:border-r-4 hover:border-green-300'
                  }`}
                onClick={() => handleMenuClick(index)}
              >
                <item.icon className="w-6 h-6" />
                {!collapsed && <span className={`text-sm font-medium transition-all duration-300 ${activeIndex === index ? 'text-green-700' : 'text-black'}`}>{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
