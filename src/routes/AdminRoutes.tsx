import { RouteObject } from 'react-router-dom';
import LayoutWrapper from '../components/Layouts/LayoutWrapper';
import Overview from '../pages/Admin/Overview';
import AdminLayout from '../components/Layouts/Admin/AdminLayout';
import UserList from '../pages/Admin/User/UserList';
import UserDetail from '../pages/Admin/User/UserDetail';
import AddUserForm from '../pages/Admin/User/Handle/Add';
import EditUserForm from '../pages/Admin/User/Handle/Edit';
import BusStationList from '../pages/Admin/BusStation/BuStationList';
import BusStationDetail from '../pages/Admin/BusStation/BusStationDetail';
import AddBusStationForm from '../pages/Admin/BusStation/Handle/Add';
import UpdateBusStationForm from '../pages/Admin/BusStation/Handle/Edit';
import BusList from '../pages/Admin/Bus/BusList';
import BusDetail from '../pages/Admin/Bus/BusDetail';
import AddBusForm from '../pages/Admin/Bus/Handle/Add';
import UpdateBusForm from '../pages/Admin/Bus/Handle/Edit';

const AdminRoutes: RouteObject[] = [
  {
    element: <LayoutWrapper layout={AdminLayout} />,
    children: [
      //User Route
      { path: '/', element: <Overview /> },
      { path: '/users', element: <UserList /> },
      { path: '/users/detail/:id', element: <UserDetail /> },
      { path: '/users/add', element: <AddUserForm /> },
      { path: '/users/edit/:id', element: <EditUserForm initialData={{} as any} onSubmit={() => { }} /> },

      //Bus Station Route
      { path: '/bus-station', element: <BusStationList /> },
      { path: '/bus-station/detail/:id', element: <BusStationDetail /> },
      { path: '/bus-station/add', element: <AddBusStationForm /> },
      { path: '/bus-station/edit/:id', element: <UpdateBusStationForm /> },

      //Bus  Route
      { path: '/bus', element: <BusList /> },
      { path: '/bus/detail/:id', element: <BusDetail /> },
      { path: '/bus/add', element: <AddBusForm /> },
      { path: '/bus/edit/:id', element: <UpdateBusForm /> },
    ],
  },
];

export default AdminRoutes;