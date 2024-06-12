import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials: true,
});

const useAxiosInstance = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log('Error tracked in the interceptor', error.response);
        if (
          error.response.statusCode === 401 ||
          error.response.statusCode === 403
        ) {
          console.log('Logged out the user');
          logOut()
            .then(() => {
              toast.error('Here is some problem. And redirect to login page.');
              navigate('/login');
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
      },
    );
  }, [logOut, navigate]);

  return axiosInstance;
};

export default useAxiosInstance;
