import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/Home/HomePage';

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
    ],
  },
]);

export default router;
