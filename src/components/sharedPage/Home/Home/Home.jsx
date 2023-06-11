import React, { useEffect, useState } from 'react';
import Slider from './Slider';
import { Link, useLoaderData } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../layout/Providers/AuthProviders';

const Home = () => {
  const classData = useLoaderData();
  const [instructor, setInstructor] = useState();
  const [discount, setDiscount] = useState();
  const user = useContext(AuthContext);
  const [student, setStudent] = useState([])
  // useEffect(()=>{
  //     fetch(`http://localhost:5000/students/${user?.user?.email}`)
  //     .then((res) => res.json())
  //     .then((data) =>{
  //       console.log(data)
  //       if(data[0]?.id)
  //      {
  //       // console.log(data[0].id)
  //      setStudent(data[0].id)
  //      }
  //     })
  // },[user?.user?.email])
  // const handleEnroll = (id) => {
  //   if (user) {
  //     console.log(student)
  //     const studentEnroll = [...student, id]
  //     console.log(studentEnroll)
  //     const payload = { id: studentEnroll };
  //     fetch(`http://localhost:5000/students/${user.user.email}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => console.log(data))
  //       .catch((error) => console.log(error));
  //   }
  // };
  useEffect(() => {
    fetch('http://localhost:5000/instructors')
      .then(res => res.json())
      .then(data => setInstructor(data));
  }, [])

  useEffect(() => {
    fetch('http://localhost:5000/discountClasses')
      .then(res => res.json())
      .then(data => setDiscount(data));
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
                <p>Course Fee: ${data.price}</p>
                <div className="card-actions justify-end">
                  <button onClick={() => handleEnroll(data?._id)} className="btn btn-primary">Enroll Now</button>
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
                  <button className="btn btn-primary">See Classes</button>
                </div>
              </div>
            </div>
          </div>)
        }
      </div>
      <h1 className='text-center mt-5 text-4xl'>Discount offer of our courses</h1>
      <div className='grid lg:grid-cols-3 lg:ml-20 my-5'>
        {
          discount?.map(discount => <div key={discount._id} className="card w-96 glass my-4">
            <div >
              <figure><img src={discount?.image} alt="car!" /></figure>
              <div className="card-body">
                <h2 className="card-title"> Course Name: {discount?.name}</h2>
                <p className='text-xl'>Instructors: {discount.instructor}</p>
                <p className='text-xl'>Available_seat: {discount.available_seats}</p>
                <div className='flex justify-around items-center'>
                  <p>Course Fee: ${discount.price}</p>
                  <p>Discount: {discount.discount}%</p>
                </div>
                <p className='text-xl'>New Price: ${(discount.price - (discount.discount / 100) * discount.price).toFixed(2)}</p>
                <div className="card-actions justify-end">
                 <Link to={`dashboard/payment/${discount._id}`}><button  className="btn btn-primary">enroll now</button></Link>
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
