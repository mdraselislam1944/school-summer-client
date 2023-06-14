import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const AdminDashboard = () => {
    const [instructors, setInstructor] = useState();
    const [users, setUsers] = useState();
    useEffect(() => {
        fetch('https://summer-school-camp-server.vercel.app/instructors')
            .then(res => res.json())
            .then(data => {
                setInstructor(data)
            })
    }, [instructors]);

    useEffect(() => {
        fetch('https://summer-school-camp-server.vercel.app/students')
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })
    }, [users]);

    const handleAdmin = (id, role) => {
        if (role === 'admin') {
          role = 'student';
        } else {
          role = 'admin';
        }
      
        const requestBody = {
          role: role
        };
      
        fetch(`https://summer-school-camp-server.vercel.app/students/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        })
          .then(res => res.json())
          .then(data => {
            if (data.modifiedCount > 0) {
                swal({
                    title: "change",
                    text: "You clicked the button!",
                    icon: "success",
                  });
            }
          });
      }
      const handleInstructor = (id, role) => {
        if (role === 'instructor') {
          role = 'student';
        } else {
          role = 'instructor';
        }
      
        const requestBody = {
          role: role
        };
      
        fetch(`https://summer-school-camp-server.vercel.app/students/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        })
          .then(res => res.json())
          .then(data => {
            if (data.modifiedCount > 0) {
                swal({
                    title: "change",
                    text: "You clicked the button!",
                    icon: "success",
                  });
            }
          });
      }
      const handleApprove=(id,status)=>{
        if(status){
            status=null;
        }
        else{
            status='approved'
        }
        const requestBody = {
            status: status
          };
        
        fetch(`https://summer-school-camp-server.vercel.app/instructor/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    swal({
                        title: 'change',
                        text: "You clicked the button!",
                        icon: "success",
                      });
                }
            });
      }
      
    return (
        <div className='ms-10'>
            <div className='text-center'>
                <h1 className='text-2xl'>Total Instructors</h1>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Numbers</th>
                                <th>className</th>
                                <th>Class Name</th>
                                <th>Email</th>
                                <th>Available seats</th>
                                <th>Price: </th>
                                <th>Action</th>
                                <th></th>
                            </tr>
                        </thead>
                        {
                            instructors?.map(instructor => <tbody key={instructor._id}>
                                <tr>
                                    <th>#</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={instructor.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{instructor.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="">{instructor.className}</span>
                                    </td>
                                    <td>{instructor.email}</td>
                                    <td>10</td>
                                    <td>${instructor.price}</td>
                                    <th>
                                        <button onClick={() => handleApprove(instructor._id,instructor.status)} className="btn btn-accent mx-3">{instructor.status?'Deny':'Approve'}</button>
                                        <Link to={`/dashboard/adminFeedback/${instructor._id}`}><button className="btn btn-info ">feedback</button></Link>
                                    </th>
                                </tr>
                            </tbody>)
                        }
                    </table>
                </div>
            </div>
            {/*show the total register user  */}
            <div>
                <h1 className='text-3xl text-center my-3'>Total User</h1>
                <div className="overflow-x-auto lg:ms-28">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Numbers</th>
                                <th>Photo</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                                <th></th>
                            </tr>
                        </thead>
                        {
                            users?.map(user => <tbody key={user._id}>
                                <tr>
                                    <th>#</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user?.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="">{user.email}</span>
                                    </td>
                                    <td>{user.role}</td>
                                    <th>
                                        <button onClick={() => handleAdmin(user._id, user.role)} className="btn btn-accent mx-2">make {user.role == 'admin' ? 'student' : 'admin'}</button>
                                        <button onClick={() => handleInstructor(user._id,user.role)} className="btn btn-info">make {user.role === 'instructor' ? 'student' : 'instructor'}</button>
                                    </th>
                                </tr>
                            </tbody>)
                        }
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;