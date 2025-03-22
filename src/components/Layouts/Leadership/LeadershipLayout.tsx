import React, { useState } from 'react';
import Navbar from './Menu/NavBar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import backgroundImage from '../../../assets/images/leadershipbg.jpg';
interface LeadershipLayoutProps {
  children?: React.ReactNode;
}
const LeadershipLayout = ({ children }: LeadershipLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Content */}
        <main
          className="flex-1 pb-8 pe-6 ps-10"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default LeadershipLayout;
