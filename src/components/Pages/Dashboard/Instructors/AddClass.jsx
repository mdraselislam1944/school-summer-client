import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../layout/Providers/AuthProviders';
import swal from 'sweetalert';

const AddClass = () => {
    const user=useContext(AuthContext);

   
    const handleAddClass = (event) => {

        event.preventDefault();
        const form=event.target;

        const addClass = {
            className:form.name.value,
            seat:form.seat.value,
            price:form.price.value,
            name:user?.user?.displayName,
            email:user?.user?.email,
            image: form.image.value,
            discount:form.discount.value,
            status:null,
        };

        const imageFile = form.image.files[0];
        const formData = new FormData();
        formData.append('image', imageFile);

        fetch('https://api.imgbb.com/1/upload?key=7a43c068c4477f76ae69e0549062c80e', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                addClass.image = data.data.display_url;

                fetch('https://summer-school-camp-server.vercel.app/instructors',{
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(addClass)
                   })
                   .then(res=>res.json())
                   .then(data=>{
                    console.log(data);
                    swal("Class added successfully!", "click the button", "ok");
                    form.reset();
                   })
                   .catch(error=>console.log(error.message));
            }
        );
    }
    return (
        <div>
            <div className='text-center mx-auto my-5'>
                <h1 className=' my-5 text-4xl'>Please Add Your class</h1>
                <form className='grid grid-cols-1' onSubmit={handleAddClass}>
                    <input required type="name" name="name" id="name" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='Enter your class name' />
                    <input required type="file" name="image" id="image" className=' w-full max-w-xs mx-auto my-2' />
                    <input required type="number" name="seat" id="seat" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='Available seat' />
                    <input required type="number" name="price" id="price" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='price' />
                    <input required type="number" name="discount" id="discount" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='discount' />
                   
                    <input className='btn btn-success mx-auto w-full max-w-xs' type="submit" value="Add Class" />
                </form>
            </div>
        </div>
    );
};

export default AddClass;