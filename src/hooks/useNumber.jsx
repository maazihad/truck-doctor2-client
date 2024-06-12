import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const useNumber = () => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    axios.get('/number.com').then((res) => setNumber(res.data));
  }, []);
  return number;
};

export default useNumber;
