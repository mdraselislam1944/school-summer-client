import React from 'react';
import Slider from './Slider';
import { useLoaderData } from 'react-router-dom';
const Home = () => {
  const classData = useLoaderData();
  console.log(classData);
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
                <p className='text-2xl'>Available Seat:{data.available_seats}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Enroll Now</button>
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