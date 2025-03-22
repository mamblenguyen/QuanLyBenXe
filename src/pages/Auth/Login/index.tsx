import React, { useState } from 'react';
import { FaUser, FaShieldAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md">
      {/* Tiêu đề */}
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Đăng nhập</h2>

      {/* Form */}
      <form>
        {/* Tên đăng nhập */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Tên đăng nhập</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
              <FaUser />
            </span>

            {/* <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-100 bg-gray-100 rounded-lg focus:bg-white focus:border-black focus:outline-none focus:ring-1 focus:ring-gray-100"
              autoFocus
            /> */}
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-100 bg-gray-100 rounded-lg 
             focus:bg-white focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
              autoFocus
            />
          </div>
        </div>

        {/* Mật khẩu */}
        <div className="mb-4 w-full max-w-[430px] mx-auto">
          <label className="block text-gray-700 font-semibold mb-2">Mật khẩu</label>
          <div className="relative">
            {/* Icon khóa */}
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
              <FaShieldAlt />
            </span>

            {/* Input mật khẩu */}
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full pl-10 pr-4 py-2 border border-gray-100 bg-gray-100 rounded-lg 
             focus:bg-white focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />

            {/* Icon mắt để bật/tắt mật khẩu */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Quên mật khẩu */}
        <div className="text-right mb-4">
          <Link to="/reset-password" className="text-orange-500 text-sm hover:underline">
            Quên mật khẩu?
          </Link>
        </div>

        {/* Nút đăng nhập */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition duration-200"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
