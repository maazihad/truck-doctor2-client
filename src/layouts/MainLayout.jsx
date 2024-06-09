import { Outlet } from 'react-router-dom';
import Navbar from '../components/SharedCompo/Navbar/Navbar';
import Footer from '../components/SharedCompo/Footer/Footer';

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className='min-h-[calc(100vh-50px)] max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
