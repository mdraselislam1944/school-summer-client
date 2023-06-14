import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
const AdminFeedBack = () => {
    const data=useLoaderData();
    const navigate=useNavigate();
    console.log(data._id)
    const handleFeedback=(event)=>{
        event.preventDefault();
        const form=event.target;
        const feedback=form.feedback.value;
        const requestBody = {
            feedback: feedback
          };
        
        fetch(`https://summer-school-camp-server.vercel.app/feedback/${data._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount >0) {
                    swal({
                        title: 'Feedback sent',
                        text: "You clicked the button!",
                        icon: "success",
                      });
                      navigate('/dashboard/admin');
                }
                else{
                    swal({
                        title: 'you also sent previous data',
                        text: "You clicked the button!",
                        icon: "success",
                      });
                      navigate('/dashboard/admin');
                }
            });
    }
    return (
        <div>
            <h1 className='text-center text-3xl'>Please take status of this class</h1>
            <form className='grid grid-cols-1' onSubmit={handleFeedback}>
                <input required type="text" name="feedback" id="feedback" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='write feedback here' />
                <input className='btn btn-success mx-auto w-full max-w-xs' type="submit" value="submit" />
            </form>
        </div>
    );
};

export default AdminFeedBack;