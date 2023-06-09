import React from 'react';
import logo from '../../../assets/Image/logo.png'
import { Link } from 'react-router-dom';
const Headers = () => {
    return (
        <div className='lg:flex justify-between items-center mx-10'>
            <div>
                <img src={logo}  className='w-32 h-24' alt="" />
            </div>
            <div>
            {/* Home, Instructors,  Classes, Dashboard */}
            <Link className='btn' to='/'>Home</Link>
            <Link to='/instructors' className='lg:mx-5 btn'>Instructors</Link>
            <Link className='btn' to='/class'>Classes</Link>
            </div>
            <div>
            <Link className='btn btn-primary' to='/login'>Login</Link>
            </div>
        </div>
    );
};

export default Headers;