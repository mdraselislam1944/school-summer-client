import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../layout/Providers/AuthProviders';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';



const InstructorsDashboard = () => {
    const [instructors, setInstructor] = useState();
    const user = useContext(AuthContext);
    useEffect(() => {
        fetch(`https://summer-school-camp-server.vercel.app/instructor/${user?.user?.email}`)
            .then(res => res.json())
            .then(data => setInstructor(data));
    }, [user])
    const handleDelete=(id)=>{
        swal({
            title: "Are you delete?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                fetch(`https://summer-school-camp-server.vercel.app/instructors/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    setInstructor(instructors?.filter(instructor=>instructor._id!==id));
                    console.log(data);
                    if (data.deletedCount > 0) {
                        // alert('delete successful');
                    }
                })
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your imaginary file is safe!");
            }
          });
    }
    return (
        <div className='text-center'>
            <h1 className='text-2xl'>Instructor Dashboard</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Numbers</th>
                            <th>className</th>
                            <th>Status</th>
                            <th>Enrolled students</th>
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
                                <td>10</td>
                                <th>
                                    <Link to={`instructor/${instructor._id}`}><button className="btn btn-info me-4">Update</button></Link>
                                    <button onClick={()=>handleDelete(instructor._id)} className="btn btn-accent">Delete</button>
                                </th>
                            </tr>
                        </tbody>)
                    }
                </table>
            </div>
        </div>
    );
};

export default InstructorsDashboard;