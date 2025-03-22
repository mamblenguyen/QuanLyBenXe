import React, { useState } from 'react';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/auth/background-auth.jpg')" }}
    >
      {/* Lớp phủ mờ để nội dung rõ ràng hơn */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div> */}

      {/* Nội dung chính */}

      {/* Logo */}
      <div className="absolute top-10 right-10">
        <img src="/images/auth/logo-big.png" alt="Logo" className="w-24" />
      </div>

      <div className="relative z-10 bg-white p-10 rounded-xl shadow-lg lg:shadow-none w-full max-w-md mx-auto lg:ml-auto lg:mr-24">{children}</div>
    </div>
  );
};

export default AuthLayout;
