import { useNavigate, useRoutes } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import AdminRoutes from './AdminRoutes';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

const BaseRoutes = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      const role = await getCookie('user_role');
      if (role) {
        const decodedRole = JSON.parse(decodeURIComponent(role));
        if (decodedRole.includes('Admin') || decodedRole.includes('Staff') || decodedRole.includes('Traffic')) {
          setUserRole(decodedRole);
        }
      } else {
        navigate('/login');
      }
    };

    fetchRole();
  }, [navigate]);

  useEffect(() => {
    if (userRole) {
      const currentPath = window.location.pathname;

      if (userRole.includes('Staff') && !currentPath.startsWith('/admin')) {
        navigate('/');
      } else if (userRole.includes('User') && !currentPath.startsWith('/user')) {
        navigate('/');
      }
    }
  }, [userRole, navigate]);

  const getRoutes = () => {
    if (!userRole) {
      return AuthRoutes;
    }

    if (userRole.includes('Admin') || userRole.includes('Traffic')) {
      return AdminRoutes;
    } else if (userRole.includes('User')) {
      return AuthRoutes;
    } else {
      navigate('/');
      return [];
    }
  };

  const routes = getRoutes();

  return useRoutes(routes);
};

export default BaseRoutes;
