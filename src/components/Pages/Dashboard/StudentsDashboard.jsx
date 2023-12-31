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
        fetch(`https://summer-school-camp-server.vercel.app/studentPayment/${email}`)
            .then(res => res.json())
            .then(data => {
                setStudent(data)
            });
    }, [email])
    console.log(students)
    const handleDeleteClass=(id)=>{
  
        swal({
            title: "Are you delete?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                fetch(` https://summer-school-camp-server-mdraselislam1944.vercel.app/studentPayment/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    setStudent(students?.filter(student=>student._id!==id));
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
                                <Link to={`/dashboard/payment/${student._id}`}><button className="btn btn-primary mx-4">enroll now</button></Link>
                                <button onClick={()=>handleDeleteClass(student._id)} className='btn btn-secondary '>Delete</button>
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