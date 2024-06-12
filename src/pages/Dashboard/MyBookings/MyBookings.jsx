import { useContext, useEffect, useState } from 'react';
import BookingCard from './BookingCard';
import axios from 'axios';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosInstance from '../../../hooks/useAxiosInstance';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxiosInstance();
  const [bookings, setBookings] = useState([]);
  const url = `/bookings?email=${user?.email}`;
  useEffect(() => {
    // auth step - 8
    axiosInstance
      .get(url) // যদি fetch দিয়ে করলে {credetials: include} দিতে হবে
      .then((data) => setBookings(data.data))
      .catch((err) => console.log(err.message));
  }, [url, axiosInstance]);

  const handleDeleteBooking = (id) => {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5001/bookings/${id}`).then((data) => {
          if (data.data.deletedCount > 0) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
            const remaining = bookings.filter((booking) => booking._id !== id);
            setBookings(remaining);
          }
        });
      }
    });
  };

  const handleBookingConfirm = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5001/bookings/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'confirm' }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              Swal.fire({
                title: 'Updated!',
                text: 'Your file has been updated.',
                icon: 'success',
              });

              //খুবই বেজাইল্যা জিনিস।
              const remaining = bookings.filter(
                (booking) => booking._id !== id,
              );
              const updated = bookings.find((booking) => booking._id === id);
              updated.status = 'confirm';
              const newBookingsList = [updated, ...remaining];
              setBookings(newBookingsList);
            }
          });
      }
    });
  };

  return (
    <div>
      <div>Total Bookings : {bookings.length}</div>

      <div>
        {bookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            handleDeleteBooking={handleDeleteBooking}
            handleBookingConfirm={handleBookingConfirm}
          ></BookingCard>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;

// fetch(`http://localhost:5001/bookings/${id}`, {
//   method: 'PATCH',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ status: 'confirm' }),
// })
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });
