import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../layout/Providers/AuthProviders';
import { useState } from 'react';
import { useEffect } from 'react';

const StudentsDashboard = () => {
    const user=useContext(AuthContext);
    console.log(user?.user?.email);
    const [student,setStudent]=useState();
    if(user){
       useEffect(()=>{
        fetch('http://localhost:5000/students/')
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setStudent(data)
        });
       },[])
     
    }
    return (
        <div>
            <h1>Student Dashboard</h1>
        </div>
    );
};

export default StudentsDashboard;