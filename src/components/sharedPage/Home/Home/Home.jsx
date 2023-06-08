import React, { useEffect, useState } from 'react';
import Slider from './Slider';
import { useLoaderData } from 'react-router-dom';
const Home = () => {
  const classData = useLoaderData();
  const [instructor, setInstructor] = useState();
  useEffect(() => {
    fetch('http://localhost:5000/instructors')
      .then(res => res.json())
      .then(data => setInstructor(data))
  }, [])
  return (
    <div>
      <Slider />
      <h1 className='text-center mt-5 text-4xl'>Popular Classes of our courses</h1>
      <div className='grid lg:grid-cols-3 lg:ml-20 my-5'>
        {
          classData.map(data => <div key={data._id} className="card w-96 glass my-4">
            <div >
              <figure><img src={data?.image} alt="car!" /></figure>
              <div className="card-body">
                <h2 className="card-title">{data?.name}</h2>
                <p className='text-xl'>Available Seat:{data.available_seats}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Enroll Now</button>
                </div>
              </div>
            </div>
          </div>)
        }
      </div>
      <h1 className='text-center mt-5 text-4xl'>Popular Instructors of our courses</h1>
      <div className='grid lg:grid-cols-3 lg:ml-20 my-5'>
        {
          instructor?.map(instructor => <div key={instructor._id} className="card w-96 glass my-4">
            <div >
              <figure><img src={instructor?.image} alt="car!" /></figure>
              <div className="card-body">
                <h2 className="card-title">{instructor?.name}</h2>
                <p className='text-xl'>Email: {instructor?.email}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Contract Now</button>
                </div>
              </div>
            </div>
          </div>)
        }
      </div>
    </div>
  );
};

export default Home;