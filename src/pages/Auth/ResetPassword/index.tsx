import React, { useState } from 'react';
import { FaUser, FaKey, FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [verificationCode, setVerificationCode] = useState('');

  return (
    <div className="w-full max-w-md">
      {/* Tiêu đề */}
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Cấp lại mật khẩu</h2>

      {/* Form */}
      <form>
        {/* Tên đăng nhập */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Tên đăng nhập</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
              <FaUser />
            </span>

            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-100 bg-gray-100 rounded-lg 
             focus:bg-white focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
              autoFocus
            />
            
          </div>
        </div>

        {/* Mã xác thực */}
        <div className="mb-4 w-full max-w-[430px] mx-auto">
          <label className="block text-gray-700 font-semibold mb-2">Mã xác thực</label>
          <div className="relative">
            {/* Icon khóa */}
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
              <FaKey />
            </span>

            {/* Input mã xác thực */}
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className={`w-full pl-10 pr-10 py-2 border border-gray-100 bg-gray-100 rounded-lg 
             focus:bg-white focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300`}
            />
          </div>
        </div>

        {/* Quay lại trang chủ */}
        <div className="text-right mb-4">
          <Link to="/login" className="text-orange-500 text-sm hover:underline flex items-center gap-1 justify-end">
            <FaChevronLeft className="mt-[2px]" size={14} />
            Quay lại trang chủ
          </Link>
        </div>

        {/* Nút cấp lại mật khẩu */}
        <button
          type="submit"
          disabled={!verificationCode}
          className={`w-full text-white font-semibold py-2 rounded-lg transition duration-200 ${
            verificationCode ? 'bg-gradient-to-r from-orange-400 to-orange-600 hover:opacity-90' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Cấp lại mật khẩu
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
