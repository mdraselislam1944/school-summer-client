import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import InstructorsDashboard from './InstructorsDashboard';

const Dashboard = () => {
    return (
        <>
            <div className='flex items-center justify-between lg:mx-10 lg:my-4'>
                <div>
                    <Link to='/' className='btn btn-secondary mx-2'>Home</Link>
                    <Link to='' className='btn btn-secondary mx-5'>Dashboard</Link>
                </div>
                <div>
                <Link to='instructor/addClass' className='btn btn-primary'>Add Class</Link>
                </div>
                <div>
                </div>
            </div>
            <Outlet></Outlet>
        </>
    );
};

export default Dashboard;