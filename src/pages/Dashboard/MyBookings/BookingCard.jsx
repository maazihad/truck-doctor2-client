import { TiDelete } from 'react-icons/ti';

const BookingCard = ({
  booking,
  handleDeleteBooking,
  handleBookingConfirm,
}) => {
  return (
    <table className='min-w-full bg-white rounded-lg shadow-md'>
      <tbody>
        <tr className='border-b'>
          <td className='p-4'>
            <button
              onClick={() => handleDeleteBooking(booking._id)}
              className='text-red-500 hover:text-red-700 focus:outline-none'
            >
              <TiDelete size={35}></TiDelete>
            </button>
          </td>
          <td className='p-4'>
            <img
              src={booking?.img}
              alt='Product'
              className='w-24 h-24 object-cover avatar'
            />
          </td>
          <td className='p-4'>
            <h3 className='text-xl font-bold text-gray-800'>
              {booking?.title}
            </h3>
          </td>
          <td className='p-4'>
            <p className='text-gray-700'>
              <strong>Price:</strong> {booking?.price}
            </p>
          </td>
          <td className='p-4'>
            <p className='text-gray-700'>
              <strong>Date:</strong> {new Date(booking?.date).toLocaleString()}
            </p>
          </td>
          <td className='p-4'>
            {booking.status === 'confirm' ? (
              <span className='text-purple-500 font-medium'>
                C o n f i r m e d
              </span>
            ) : (
              <button
                onClick={() => handleBookingConfirm(booking._id)}
                className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300'
              >
                please confirm
              </button>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BookingCard;
