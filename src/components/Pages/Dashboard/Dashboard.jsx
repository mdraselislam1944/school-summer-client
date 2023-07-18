// import React from 'react';
// import { useContext } from 'react';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../layout/Providers/AuthProviders';
// const Dashboard = () => {
//     const navigate = useNavigate();
//     const [student, setStudent] = useState([]);
//     const email = useContext(AuthContext)?.user?.email;
//     useEffect(() => {
//         fetch(`https://summer-school-camp-server-mdraselislam1944.vercel.app/students/${email}`)
//             .then(res => res.json())
//             .then(data => {
//                 setStudent(data[0]?.role)
//             })
//     }, [email])


//     return (
//         <>
//             <div className='flex items-center justify-around lg:mx-10 lg:my-4'>
//                 <div>
//                     <Link to='/' className='btn btn-secondary mx-2'>Home</Link>
//                 </div>
//                 <div>
//                 </div>
//             </div>
//             {
//                 student && <>
//                     {role === 'admin' ?
//                         <div key={'admin'}>
//                             {navigate("/dashboard/admin")}
//                         </div>
//                         :
//                         (student === 'instructor' ? <div key={'instructor'}>
//                             {navigate("/dashboard/instructor")}
//                         </div>
//                             :
//                             <div key="student">
//                                 {navigate("/dashboard/student")}
//                             </div>)}
//                 </>
//             }
//             <Outlet></Outlet>
//         </>
//     );
// };

// export default Dashboard;


import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../layout/Providers/AuthProviders';

const Dashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null); // Initialize student state with null
  const email = useContext(AuthContext)?.user?.email;

  useEffect(() => {
    if (email) { // Ensure email is not null or undefined
      fetch(`https://summer-school-camp-server-mdraselislam1944.vercel.app/students/${email}`)
        .then(res => res.json())
        .then(data => {
          setStudent(data[0]?.role)
        })
        .catch(error => {
          console.error('Error fetching student data:', error);
        });
    }
  }, [email])

  useEffect(() => {
    // Perform any necessary side effects or logic based on the student state change
    if (student) {
      if (student === 'admin') {
        navigate("/dashboard/admin");
      } else if (student === 'instructor') {
        navigate("/dashboard/instructor");
      } else {
        navigate("/dashboard/student");
      }
    }
  }, [student, navigate])
  const navigationButtons = useMemo(() => (
    <>
     <Link to='/' className='btn btn-secondary ms-14 me-4 my-4'>Home</Link>
    </>
  ), []);

  return (
    <>
      {navigationButtons}
      <Outlet></Outlet>
    </>
  );
};

export default Dashboard;























