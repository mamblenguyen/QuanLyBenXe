import React from 'react';
import { Outlet } from 'react-router-dom';

interface LayoutWrapperProps {
  layout: React.ComponentType<{ children: React.ReactNode }>;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ layout: Layout }) => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default LayoutWrapper;
