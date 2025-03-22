import { RouteObject } from 'react-router-dom';
import LeadershipLayout from '../components/Layouts/Leadership/LeadershipLayout';
import LayoutWrapper from '../components/Layouts/LayoutWrapper';
import Overview from '../pages/Admin/Overview';

const AdminRoutes: RouteObject[] = [
  {
    element: <LayoutWrapper layout={LeadershipLayout} />,
    children: [
      { path: '/', element: <Overview /> },
    ],
  },
];

export default AdminRoutes;