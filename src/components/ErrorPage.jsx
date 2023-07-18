import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='text-center bg-sky-300 '>
            <h1 className='py-5'>Page can not found</h1>
            <button className='btn mx-5 mb-4'> <Link to='/'>Home</Link><br /></button>
            <img style={{width:'100vw',height:'85vh'}} src={'https://tse3.mm.bing.net/th?id=OIP.IETjvTQTvCOFM0QmIBdhwgHaDZ&pid=Api&P=0&h=180'} alt="" />
        </div>
    );
};

export default ErrorPage;