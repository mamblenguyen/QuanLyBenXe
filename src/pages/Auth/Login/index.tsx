import React, { useState } from 'react';
import { FaUser, FaShieldAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { setCookie } from 'cookies-next';
import apiInstance from '../../../services/api';
import { jwtDecode } from 'jwt-decode';

interface LoginResponse {
  data: {
    token: string;
  };
}

interface DecodedToken {
  name: string;
  roles: [];
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { data }: LoginResponse = await apiInstance.post('/api/system/auth/login', {
        name: username,
        password,
      });

      const decodedToken: DecodedToken = jwtDecode(data.token);

      // Set cookies for accessToken, fullname, refreshToken, and role
      setCookie('access_token', data.token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        secure: true,
        sameSite: 'strict',
      });
      setCookie('fullname', decodedToken.name, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        secure: true,
        sameSite: 'strict',
      });
      setCookie('refresh_token', data.token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        secure: true,
        sameSite: 'strict',
      });
      setCookie('user_role', decodedToken.roles, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        secure: true,
        sameSite: 'strict',
      });

      navigate('/');
    } catch (error: any) {
      console.error('Lỗi đăng nhập:', error);
      setError('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Đăng nhập</h2>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <form onSubmit={handleLogin}>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Mật khẩu */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Mật khẩu</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
              <FaShieldAlt />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full pl-10 pr-4 py-2 border border-gray-100 bg-gray-100 rounded-lg 
              focus:bg-white focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
