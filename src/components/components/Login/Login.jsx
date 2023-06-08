import React from 'react';
import { FaGofore } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Login = () => {
    const handleRegister = (event) => {

    }
    return (
        <div className='text-center mx-auto my-5'>
            <h1 className=' my-5 text-4xl'>Please login</h1>
            <form className='grid grid-cols-1' onSubmit={handleRegister}>
                <input required type="email" name="email" id="email" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='Enter your Email' />
                <input required type="password" name="password" id="password" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='password' />
                <input className='btn btn-success mx-auto w-full max-w-xs' type="submit" value="Login" />
            </form>
            <button className='btn my-2 flex justify-center items-center mx-auto w-full max-w-xs btn-success text-white'>
                <FaGofore />
                <p>with Login</p>
            </button>
            <Link to='/register' className='btn btn-success mx-auto w-full max-w-xs text-white'>New user ? Please register</Link>
        </div>
    );
};

export default Login;