import React from 'react';
import { FaGofore } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Register = () => {
    const handleRegister = (event) => {
        event.preventDefault();
        const form = event.target;
        const register = {
            name: form.name.value,
            email: form.email.value,
            password: form.password.value,
            image: form.image.value
        };

        // Access the image file from the form input
        const imageFile = form.image.files[0];
        // Create a new FormData object
        const formData = new FormData();
        formData.append('image', imageFile);

        // Make an API request to ImageBB or any other endpoint here
        // Replace 'YOUR_API_KEY' with your actual API key
        fetch('https://api.imgbb.com/1/upload?key=7a43c068c4477f76ae69e0549062c80e', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                register.image = data.data.display_url;
                console.log(register)
            })
            .catch((error) => {
                console.error('Error uploading image:', error);
                // Handle the error condition
            });
    }
    return (
        <div className='text-center mx-auto my-5'>
            <h1 className=' my-5 text-4xl'>Please register</h1>
            <form className='grid grid-cols-1' onSubmit={handleRegister}>
                <input required type="name" name="name" id="name" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='Enter your name' />
                <input required type="email" name="email" id="email" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='Enter your Email' />
                <input required type="password" name="password" id="password" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='password' />
                <input required type="file" name="image" id="image" className=' w-full max-w-xs mx-auto my-2' />
                <input className='btn btn-success mx-auto w-full max-w-xs' type="submit" value="Register" />
            </form>
            <button className='btn my-2 flex justify-center items-center mx-auto w-full max-w-xs btn-success text-white'>
                <FaGofore />
                <p>with Login</p>
            </button>
            <Link to='/login' className='btn btn-success mx-auto w-full max-w-xs text-white'>Already registered ? Please login</Link>
        </div>
    );
};

export default Register;