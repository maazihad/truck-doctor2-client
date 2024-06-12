import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const ServiceCard = ({ service }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className='w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out'>
      <img
        className='md:w-96 w-full h-48 object-cover'
        src={service.img}
        alt={service.title}
      />
      <div className='p-4'>
        <h2 className='text-lg font-semibold text-gray-800'>{service.title}</h2>

        <div className='mt-3 flex items-center justify-between'>
          <span className='text-gray-900 font-bold'>${service.price}</span>

          <Link to={`/checkout/${service._id}`}>
            <button className='px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded hover:bg-blue-700 transition-colors duration-300 ease-in-out'>
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
