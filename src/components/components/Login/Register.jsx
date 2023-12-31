import React from 'react';
import { useContext } from 'react';
import { FaGofore } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../layout/Providers/AuthProviders';
import { FaSpinner } from "react-icons/fa";
import { useForm } from 'react-hook-form';

const Register = () => {
    const { createUser, googleLogin, updateProfileDetail, loading } = useContext(AuthContext);
    const { register, handleSubmit,reset } = useForm();
    const handleGoogleSignIn = () => {
        googleLogin()
            .then(result => {
                const student = {
                    email: result.user.email,
                    image: result.user.photoURL,
                    role: 'student',
                }
                fetch('https://summer-school-camp-server.vercel.app/students')
                .then(res=>res.json())
                .then(data=>{
                    const email=data.find(data=>data.email===result.user.email);
                   if(!email){
                    fetch('students', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(student)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            alert('added successfully');
                        })
                        .catch(error => console.log(error.message));
                   }
                })

            })
            .catch(error => {
                console.log(error.message);
                alert(error.message);
            })
    }
    const onSubmit = (form) => {
        const register = {
            name: form.name,
            email: form.email,
            password: form.password,
            image: form.image
        };

        // Access the image file from the form input
        const imageFile = form.image[0];
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
                createUser(register.email, register.password)
                    .then(result => {
                        reset();
                        updateProfileDetail(register.name, register.image)
                            .then(result => {
                            }).catch((error) => {
                                console.log(error.message);
                            });
                        // navigate('/login');
                        const student = {
                            email: register.email,
                            image: register.image,
                            role: 'student',
                        }
                        fetch('https://summer-school-camp-server.vercel.app/students', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(student)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data);
                                alert('added successfully');
                            })
                            .catch(error => console.log(error.message));

                    })
                    .catch(error => {
                        alert(error.message);
                        console.log(error.message);
                    })

            })
            .catch((error) => {
                console.error('Error uploading image:', error);
                // Handle the error condition
            });
    }
    return (
        <div className='text-center mx-auto my-5'>
            <h1 className=' my-5 text-4xl'>Please register</h1>
            <form className='grid grid-cols-1' onSubmit={handleSubmit(onSubmit)}>
                <input required type="name" {...register("name")} id="name" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='Enter your name' />
                <input required type="email" {...register("email")} id="email" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='Enter your Email' />
                <input required type="password" {...register("password")} id="password" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='password' />
                <input required type="file" {...register("image")} id="image" className=' w-full max-w-xs mx-auto my-2' />
                {
                    loading ? <span className='btn btn-success mx-auto w-full max-w-xs'><FaSpinner></FaSpinner></span> : <input className='btn btn-success mx-auto w-full max-w-xs' type="submit" value="register" />
                }
            </form>
            <button onClick={handleGoogleSignIn} className='btn my-2 flex justify-center items-center mx-auto w-full max-w-xs btn-success text-white'>
                <FaGofore />
                <p>with Login</p>
            </button>
            <Link to='/login' className='btn btn-success mx-auto w-full max-w-xs text-white'>Already registered ? Please login</Link>
        </div>
    );
};

export default Register;