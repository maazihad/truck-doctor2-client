import { useContext, useState } from 'react';
import { CiMenuBurger } from 'react-icons/ci';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../providers/AuthProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success('Successfully Logging out.');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const navItems = (
    <>
      <li>
        <NavLink
          to='/'
          className='text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
        >
          Home
        </NavLink>
      </li>
      {user?.email ? (
        <>
          <button
            onClick={() => handleLogOut()}
            className=' text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium  duration-300 ease-in-out'
          >
            Log Out
          </button>
          <li>
            <NavLink
              to='/my-bookings'
              className='text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
            >
              My Bookings
            </NavLink>
          </li>
        </>
      ) : (
        <li>
          <NavLink
            to='/login'
            className='text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
          >
            Login
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to='/register'
          className='text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
        >
          Register
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className='bg-blue-600'>
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='relative flex items-center justify-between h-16'>
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
            <button
              type='button'
              className='inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-controls='mobile-menu'
              aria-expanded={isOpen}
              onClick={toggleMenu}
            >
              <span className='sr-only'>Open main menu</span>
              {isOpen ? <MdOutlineRestaurantMenu /> : <CiMenuBurger />}
            </button>
          </div>
          <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='flex-shrink-0'>
              <h1 className='text-white text-xl font-bold'>Brand</h1>
            </div>
            <div className='hidden sm:block sm:ml-6'>
              <ul className='flex space-x-4 items-center'>{navItems}</ul>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}
        id='mobile-menu'
      >
        <ul className='px-2 pt-2 pb-3 space-y-1'>{navItems}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
