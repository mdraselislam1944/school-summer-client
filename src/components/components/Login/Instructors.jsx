import React from 'react';
import { useLoaderData } from 'react-router-dom';
const Instructors = () => {
    const instructors = useLoaderData();
    console.log(instructors)
    return (
        <div>
            <h1 className='text-center mt-5 text-4xl'>Instructors of our courses</h1>
            <div className='grid lg:grid-cols-3 lg:ml-20 my-5'>
                {
                    instructors?.map(instructor => <div key={instructor._id} className="card w-96 glass my-4">
                        <div >
                            <figure><img src={instructor?.image} alt="car!" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{instructor?.name}</h2>
                                <p className='text-xl'>Email: {instructor?.email}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">See Classes</button>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Instructors;