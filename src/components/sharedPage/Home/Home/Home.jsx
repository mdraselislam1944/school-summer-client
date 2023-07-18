import React, { useEffect, useState } from 'react';
import Slider from './Slider';
import { Link, useLoaderData } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../layout/Providers/AuthProviders';

const Home = () => {
  const classData = useLoaderData();
  // console.log(classData)
  const [instructor, setInstructor] = useState();
  const [discount, setDiscount] = useState();
  const user = useContext(AuthContext);
  const [student, setStudent] = useState([])
  useEffect(() => {
    fetch('https://summer-school-camp-server-mdraselislam1944.vercel.app/popularInstructor')
      .then(res => res.json())
      .then(data => setInstructor(data));
  }, [])

  useEffect(() => {
    fetch('https://summer-school-camp-server-mdraselislam1944.vercel.app/discount')
      .then(res => res.json())
      .then(data => {
        const filterData=data.filter(data=>data.status!==null);
        setDiscount(filterData)
      });
  }, [])
  const handleSelect = (id,filterClass) => {
    fetch(` https://summer-school-camp-server-mdraselislam1944.vercel.app/studentPayment/${user?.user?.email}`)
        .then(res => res.json())
        .then(data => {
            const searchSelected = data.find(data => data.course._id == id);
            if (searchSelected) {
                swal("Oops", "You already selected! please payment", "Please payment")
            }
            else {
                const enrollHistory = {
                    id:id,
                    course: filterClass,
                    email: user?.user?.email,
                    paymentId: null,
                };
                fetch(' https://summer-school-camp-server-mdraselislam1944.vercel.app/studentPayment', {
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
    <div data-theme={"dark"}>
      <Slider />
      <h1 className='text-center mt-5 text-4xl'>Popular Classes of our courses</h1>
      <div className='grid lg:grid-cols-3 lg:ml-20 my-5'>
        {
          classData.map(data => <div key={data._id} className="card w-96 glass my-4">
            <div >
              <figure><img src={data?.image} alt="car!" /></figure>
              <div className="card-body">
                <h2 className="card-title">Course Name: {data?.className}</h2>
                <p className='text-xl'>Instructor:{data.name}</p>
                <p>Course Fee: ${data.price}</p>
                <div className="card-actions justify-end">
                  <button disabled onClick={() => handleEnroll(data?._id)} className="btn btn-primary">select Now</button>
                  {/* <Link to={`dashboard/payment/${data?._id}`}><button  className="btn btn-primary">enroll now</button></Link> */}
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
                <h2 className="card-title"> Course Name: {discount?.className}</h2>
                <p className='text-xl'>Instructors: {discount.name}</p>
                <p className='text-xl'>Available_seat:{discount?.seat}</p>
                <div className='flex justify-around items-center'>
                  <p>Course Fee: ${discount.price}</p>
                  <p>Discount: {discount.discount}%</p>
                </div>
                <p className='text-xl'>New Price: ${(discount.price - (discount.discount / 100) * discount.price).toFixed(2)}</p>
                <div className="card-actions justify-end">
                <button onClick={() => handleSelect(discount._id,discount)} className="btn btn-primary">select now</button>
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
