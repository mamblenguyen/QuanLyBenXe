import { RouteObject } from 'react-router-dom';
import LayoutWrapper from '../components/Layouts/LayoutWrapper';
import Overview from '../pages/Admin/Overview';
import AdminLayout from '../components/Layouts/Admin/AdminLayout';
import UserList from '../pages/Admin/User/UserList';
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
import UserDetail from '../pages/Admin/User/UserDetail';
import RouteList from '../pages/Admin/Route/RouteList';
import RoutesDetail from '../pages/Admin/Route/RouteDetail';
import AddRouteForm from '../pages/Admin/Route/Handle/Route/Add';
import AddScheduleForm from '../pages/Admin/Route/Handle/Schedule/Add';
import EditRouteForm from '../pages/Admin/Route/Handle/Route/Edit';
import EditScheduleForm from '../pages/Admin/Route/Handle/Schedule/Edit';
import TicketRouteList from '../pages/Admin/Ticket/RouteList';
import TicketDetail from '../pages/Admin/Ticket/TicketDetail';
import BookSeat from '../pages/Admin/Ticket/handle/BookSeat';

const AdminRoutes: RouteObject[] = [
  {
    element: <LayoutWrapper layout={AdminLayout} />,
    children: [
      //User Route
      { path: '/', element: <Overview /> },
      { path: '/admin/users', element: <UserList /> },
      { path: '/admin/users/detail/:id', element: <UserDetail /> },
      { path: '/admin/users/add', element: <AddUserForm /> },
      { path: '/admin/users/edit/:id', element: <EditUserForm /> },

      //Bus Station Route
      { path: '/admin/bus-station', element: <BusStationList /> },
      { path: '/admin/bus-station/detail/:id', element: <BusStationDetail /> },
      { path: '/admin/bus-station/add', element: <AddBusStationForm /> },
      { path: '/admin/bus-station/edit/:id', element: <UpdateBusStationForm /> },

      //Bus Route
      { path: '/admin/bus', element: <BusList /> },
      { path: '/admin/bus/detail/:id', element: <BusDetail /> },
      { path: '/admin/bus/add', element: <AddBusForm /> },
      { path: '/admin/bus/edit/:id', element: <UpdateBusForm /> },

      //Routes Route
      { path: '/admin/route', element: <RouteList /> },
      { path: '/admin/route/detail/:id', element: <RoutesDetail /> },
      { path: '/admin/route/add', element: <AddRouteForm /> },
      { path: '/admin/route/addSchedule/:id', element: <AddScheduleForm /> },
      { path: '/admin/route/edit/:id', element: <EditRouteForm /> },
      { path: '/admin/route/edit/Schedule/:id', element: <EditScheduleForm /> },

      //Ticket Route
      { path: '/admin/tickets', element: <TicketRouteList /> },
      { path: '/admin/tickets/detail/:id', element: <TicketDetail /> },
      { path: '/admin/tickets/book/', element: <BookSeat /> },


    ],
  },
];

export default AdminRoutes;