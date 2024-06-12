import axios from 'axios';
import { useEffect, useState } from 'react';

const useServices = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5001/services`)
      .then((res) => setServices(res.data))
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return services;
};

export default useServices;
