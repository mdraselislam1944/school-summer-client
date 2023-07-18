import React, { useContext } from 'react';
import { FaGofore } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../layout/Providers/AuthProviders';
import { useForm } from 'react-hook-form';
const Login = () => {
    const { register, handleSubmit,reset } = useForm();
    const { signIn,googleLogin,loading } = useContext(AuthContext);
    const onSubmit = (form) => {
        const email=form.email;
        const password=form.password;
        signIn(email, password)
            .then(result => {
                // const user=result.user;
                // console.log(result.user.email);
                // console.log()
                const loggedUser={
                    email:result.user.email,
                }
                alert('login successfully');

                fetch('http://localhost:5000/jwt',{
                    method:"POST",
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(loggedUser)
                })
                .then(res=>res.json())
                .then(result=>{
                    // console.log(result);
                    localStorage.setItem('set-token-for-user',result.token)
                })
                reset();
            })
            .catch(error => {
                alert(error.message);
        });
    }

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
                   }
                })

            })
            .catch(error => {
                console.log(error.message);
                alert(error.message);
            })
    }
    return (
        <div className='text-center mx-auto my-5'>
            <h1 className=' my-5 text-4xl'>Please login</h1>
            <form className='grid grid-cols-1' onSubmit={handleSubmit(onSubmit)}>
                <input required type="email"  {...register("email")} id="email" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='Enter your Email' />
                <input required type="password" {...register("password")} id="password" className='input input-bordered w-full max-w-xs mx-auto my-2' placeholder='password' />
                <input className='btn btn-success mx-auto w-full max-w-xs' type="submit" value="Login" />
            </form>
            <button onClick={handleGoogleSignIn} className='btn my-2 flex justify-center items-center mx-auto w-full max-w-xs btn-success text-white'>
                <FaGofore />
                <p>with Login</p>
            </button>
            <Link to='/register' className='btn btn-success mx-auto w-full max-w-xs text-white'>New user ? Please register</Link>
        </div>
    );
};

export default Login;