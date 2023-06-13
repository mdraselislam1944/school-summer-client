import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../layout/Providers/AuthProviders';
import { useState } from 'react';
import { useEffect } from 'react';

const StudentsDashboard = () => {
    const user=useContext(AuthContext);
    const email=user?.user?.email;
    const [student,setStudent]=useState([]);
        useEffect(()=>{
            fetch(`http://localhost:5000/studentPayment/${email}`)
        .then(res=>res.json())
        .then(data=>{
            setStudent(data)
        });
        },[email])
  if(student.length>0){
    student.map(student1=>{
        console.log(student1)
        // student1.paymentId
        // student1.course.image instructor name
    })
  }
    return (
        <div>
            <h1>Student Dashboard {student.length}</h1>
            {
                
            }
        </div>
    );
};

export default StudentsDashboard;