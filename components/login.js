import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { motion } from 'framer-motion';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const Router = useRouter();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const response = await fetch('/api/logindts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('Login successful!', userData);
        Router.push('/gets');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Unexpected error during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center mb-20 w-auto h-screen text-white justify-center'>

  
    <h2 className='font-abc text-5xl font-bold mb-20'>Login</h2>
    <motion.div
      id='blocka'
      className='w-96 h-96 flex flex-col rounded-3xl items-center justify-center'
      initial={{ opacity: 0 }} // Initial animation state
      animate={{ opacity: 1 }} // Animation when component is mounted
    >
      <form className='w-96 h-96 flex flex-col items-center justify-center'>
      <h2  className='text-base'>Email:</h2>

      <div className='flex flex-row items-center gap-1 mt-2'> 
      <AiOutlineUser className='text-2xl '/> 
      <input  className='bg-black w-56 h-8 rounded-2xl border-2 border-white mb-2 text-white text-center text-xs  ' placeholder=' Type your email'  type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
    
      <h2 className=' text-base  '>Pasword:</h2>

      <div className='flex flex-row items-center gap-1 mt-2'> 
      <AiOutlineLock className='text-2xl '/> 
      <input  className='bg-black w-56 border-2 border-white  h-8 rounded-2xl text-white text-center text-xs  ' placeholder=' Type your password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

    
        <br />
        <br />
        <motion.button
          className='bg-black w-56 rounded-2xl border-2 border-white'
          type="button"
          onClick={handleLogin}
          whileTap={{ scale: 0.95 }} // Animation when button is tapped
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </motion.button>
        {errorMessage && (
          <p className='text-white font-bold text-sm  mt-4'>{errorMessage}</p>
        )}
    
      </form>
    </motion.div>
  </div>
);
};

export default LoginForm;
