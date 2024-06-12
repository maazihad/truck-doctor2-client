import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/AuthPage/LoginPage';
import RegisterPage from '../pages/AuthPage/RegisterPage';
import Checkout from '../pages/Dashboard/Checkout/Checkout';
import MyBookings from '../pages/Dashboard/MyBookings/MyBookings';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement: (
      <div className='flex h-screen justify-center items-center '>
        <p className='text-3xl font-medium'>something here wrong</p>
      </div>
    ),
    children: [
      {
        path: '/',
        element: <HomePage></HomePage>,
      },
      {
        path: '/login',
        element: <LoginPage></LoginPage>,
      },
      {
        path: '/register',
        element: <RegisterPage></RegisterPage>,
      },
      {
        path: '/checkout/:id',
        element: (
          <PrivateRoute>
            <Checkout></Checkout>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5001/services/${params.id}`),
      },
      {
        path: '/my-bookings',
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
