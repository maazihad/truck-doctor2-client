// import axios from 'axios';
// import { useEffect } from 'react';
// import { useState } from 'react';
import useServices from '../../hooks/useServices';
import ServiceCard from './ServiceCard';

const Services = () => {
  const services = useServices(); // custom hook
  // const [services, setServices] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:5001/services')
  //     .then((data) => setServices(data.data))
  //     .catch((error) => console.log(error));
  // }, []);

  return (
    <section className='grid grid-cols-2 md:grid-cols-3 md:gap-5 gap-2 my-5'>
      {services.map((service) => (
        <ServiceCard key={service._id} service={service}></ServiceCard>
      ))}
    </section>
  );
};

export default Services;
