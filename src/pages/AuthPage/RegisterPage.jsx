import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const RegisterPage = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };
    console.log(newUser);

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        navigate(from, { replace: true });
        toast.success('Successfully registered.');
      })
      .catch((err) => {
        console.log(err.message);
        toast.error('Already registered.');
      });
  };
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>
        <form onSubmit={handleRegister}>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='name'>
              Name
            </label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
              placeholder='Enter your name'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='email'>
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 mb-2' htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
              placeholder='Enter your password'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200'
          >
            Register
          </button>
        </form>
        <div className='mt-6 text-center'>
          <p>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-600 hover:underline'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
