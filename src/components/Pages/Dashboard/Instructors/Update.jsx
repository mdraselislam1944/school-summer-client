import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

const Update = () => {
    const Navigate=useNavigate();
    const description = useLoaderData();
    console.log(description._id)
    const handleUpdateData = (event) => {
        event.preventDefault();
        const form = event.target;
        const updateClass = {
            className: form.name.value,
            seat: form.seat.value,
            price: form.price.value,
            // image: form.image.value,
        };
        if (form.image.value) {
            const imageFile = form.image.files[0];
            const formData = new FormData();
            formData.append('image', imageFile);

            fetch('https://api.imgbb.com/1/upload?key=7a43c068c4477f76ae69e0549062c80e', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    updateClass.image = data.data.display_url;
                    form.reset();
                }
                );
        }
        else {
            updateClass.image = description.image;
            form.reset();
        }

        fetch(`https://summer-school-camp-server.vercel.app/instructors/${description?._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateClass)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('update successfully');
                    form.reset();
                }
                Navigate('/dashboard');
            });
    }

    return (
        <div className='text-center'>
            <div>
                <h1 className='font-bold text-3xl'>Update class Information</h1>
                <form className='grid grid-cols-1' onSubmit={handleUpdateData}>
                    <input defaultValue={description?.className} required type="name" name="name" id="name" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='Enter your class name' />
                    <input type="file" name="image" id="image" className=' w-full max-w-xs mx-auto my-2' />
                    <input defaultValue={description.seat} required type="number" name="seat" id="seat" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='Available seat' />
                    <input defaultValue={description.price} required type="number" name="price" id="price" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='price' />

                    <input className='btn btn-success mx-auto w-full max-w-xs' type="submit" value="Update Class" />
                </form>
            </div>
        </div>
    );
};

export default Update;