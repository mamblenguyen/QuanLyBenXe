import { RouteObject } from 'react-router-dom';
import LayoutWrapper from '../components/Layouts/LayoutWrapper';
import AuthLayout from '../components/Layouts/Auth/AuthLayout';
import Login from '../pages/Auth/Login';
import ResetPassword from '../pages/Auth/ResetPassword';

const AuthRoutes: RouteObject[] = [
  {
    element: <LayoutWrapper layout={AuthLayout} />,
    children: [
      {
        path: '/',
        element: (
          <div>
            <div>Text or content here</div>
          </div>
        ),
      },
      { path: '/login', element: <Login /> },
      { path: '/reset-password', element: <ResetPassword /> },
    ],
  },
];

export default AuthRoutes;
