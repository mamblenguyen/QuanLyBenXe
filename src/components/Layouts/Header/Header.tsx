import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';

const Header: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  // API giả lập
  const mockApi = (): Promise<{ username: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ username: 'My Garage' });
      }, 1000);
    });
  };

  const handleLogin = async () => {
    const userData = await mockApi();
    setUsername(userData.username);
  };

  const handleLogout = () => {
    setUsername(null);
  };

  const handleRegister = () => {
    alert('Tính năng đăng ký đang phát triển!');
  };

  return (
    <header className="flex items-center justify-end bg-white w-full h-[72px]">
      {username ? (
        <div className="flex items-center gap-4">
          <FontAwesomeIcon icon={faCircleUser} className="text-blue-600  -mr-2 w-10 h-10" />
          <span className="text-blue-600 text-[16px] font-bold tracking-[0.24px] mt-[26px] mb-[26px] font-source-sans">{username}</span>
          <div className="w-[1.2px] h-10 bg-[#823b00]"></div>
          <button
            className="text-blue-600 opacity-70 text-[16px] font-normal tracking-[0.24px] mt-[25px] mb-[27px] mr-[64px] font-source-sans"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <button
            className="text-blue-600 text-[16px] font-bold tracking-[0.24px] underline underline-offset-4 mt-[26px] mb-[26px] font-source-sans"
            onClick={handleLogin}
          >
            Đăng nhập
          </button>
          <div className="w-[1.2px] h-10 bg-[#823b00]"></div>
          <button
            className="text-blue-600 text-[16px] font-normal tracking-[0.24px] underline underline-offset-4 mt-[25px] mb-[27px] mr-[64px] font-source-sans"
            onClick={handleRegister}
          >
            Đăng ký
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
