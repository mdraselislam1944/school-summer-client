import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../layout/Providers/AuthProviders';
import swal from 'sweetalert';
const Classes = () => {
    const user = useContext(AuthContext);
    const classData = useLoaderData();
    const handleSelect = (id,filterClass) => {
        fetch(`http://localhost:5000/studentPayment/${user?.user?.email}`)
            .then(res => res.json())
            .then(data => {
                const searchSelected = data.find(data => data.course._id == id);
                if (searchSelected) {
                    swal("Oops", "You already selected! please payment", "Please payment")
                }
                else {
                    const enrollHistory = {
                        _id:id,
                        course: filterClass,
                        email: user?.user?.email,
                        paymentId: null,
                    };
                    fetch('http://localhost:5000/studentPayment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(enrollHistory)
                    })
                        .then(res => res.json())
                        .then(data => {
                            swal({
                                title: "class selected Please pay on your dashboard",
                                text: "You clicked the button!",
                                icon: "success",
                                button: "Aww yiss!",
                              });
                        })
                        .catch(error => console.log(error.message));
                }
            })
    }
    return (
        <div>
            <h1 className='text-center mt-5 text-4xl'>All class in the Foreign language</h1>
            <div className='grid lg:grid-cols-3 lg:ml-20 my-5'>
                {
                    classData.map(data => <div key={data._id} className="card w-96 glass my-4">
                        <div >
                            <figure><img src={data?.image} alt="car!" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Instructor: {data?.name}</h2>
                                <p className='text-xl'>Available Seat: {data.seat}</p>
                                <div className="card-actions justify-end">
                                    <p>Course Fee: ${data.price}</p>
                                    <button onClick={() => handleSelect(data._id,data)} className="btn btn-primary">select now</button>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Classes;