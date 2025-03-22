import { useRoutes } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import AdminRoutes from './AdminRoutes';


const BaseRoutes = () => {
  const routes = [...AdminRoutes, ...AuthRoutes];
  return useRoutes(routes);
};

export default BaseRoutes;
