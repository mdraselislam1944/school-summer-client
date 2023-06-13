import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../layout/Providers/AuthProviders';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudentsDashboard = () => {
    let t=1;
    const user = useContext(AuthContext);
    const email = user?.user?.email;
    const [students, setStudent] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/studentPayment/${email}`)
            .then(res => res.json())
            .then(data => {
                setStudent(data)
            });
    }, [email])
    if (students.length > 0) {
        students.map(student1 => {
            // console.log(student1.course.price)
            
        })
    }

    const handlePayment=(price)=>{

    }



    return (
        <div className='mx-auto lg:ms-20'>
            <h1 className='text-center my-6 text-3xl'>Total Classes added {students?.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Course Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        students.map(student=> <tr key={student._id}>
                            <th>{t++}</th>
                            <td>{student.course.name}</td>
                            <td>{student.paymentId?"Enrolled":"Not pay"}</td>
                            <td>
                               {
                                student.paymentId?<>
                                 <button disabled className='btn btn-info mx-4 '>Payment</button>
                                <button disabled className='btn btn-secondary '>Delete</button>
                                </>:<>
                                <Link to={`/dashboard/payment/${student._id}`}><button onClick={() => handlePayment(student.course.price)} className="btn btn-primary">enroll now</button></Link>
                                <button className='btn btn-secondary '>Delete</button>
                                </>
                               }
                            </td>
                          </tr>)
                       }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentsDashboard;