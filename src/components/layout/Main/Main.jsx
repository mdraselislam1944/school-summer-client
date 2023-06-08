import React from 'react';
import Headers from '../../sharedPage/Headers/Headers';
import { Outlet } from 'react-router-dom';
import Footer from '../../sharedPage/Footer/Footer';

const Main = () => {
    return (
       <>
       <Headers></Headers>
       <Outlet></Outlet>
       <Footer></Footer>
       </>
    );
};

export default Main;