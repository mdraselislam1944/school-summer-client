import React from 'react';
import logo from '../../../assets/Image/logo.png'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../layout/Providers/AuthProviders';
import { useState } from 'react';
const Headers = () => {
    const {user,logOut}=useContext(AuthContext);
    const [flag,setFlag]=useState(false);
    const handleLogout=()=>{
        logOut()
        .then(res=>res.json())
        .catch(error=>alert("Logout Successfully"))
    }
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
                {
                    user?<div className='flex justify-around items-center gap-4'>
                         <Link to='dashboard/student' className='btn btn-secondary'>Dashboard</Link>
                    <span className='rounded'><img className='h-16 w-16 rounded-full' src={user?.photoURL} alt="" /></span>
                    <button onClick={handleLogout} className='btn btn-primary'>LogOut</button>
                    </div>:<>
                    <Link className='btn btn-primary' to='/login'>Login</Link>
                    </>
                }
            </div>
        </div>
    );
};

export default Headers;