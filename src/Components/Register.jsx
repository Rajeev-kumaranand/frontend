import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { userContext } from './Usercontext'
import { PostContext } from './Postcontext'
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast';
import { api } from '../api';


function Register() {
  const navigate = useNavigate()
  const { getuser } = useContext(userContext)
  const { getposts } = useContext(PostContext)
  // const [formdata, setFormdata] = useState({
  //   name: "",
  //   username: "",
  //   email: "",
  //   password: "",
  //   age: ""
  // })
  // const handlechange = (e) => {
  //   setFormdata((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // }

  ///
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  const goToLogin = ()=>{
    navigate('/login')
  }

  ///
  const handleclick = async (data) => {
    try {
      const res = await api.post("/api/register", data, { withCredentials: true });
      navigate('/mainprofile')
      if(res.data.message === "Username already exist"){
        toast.error(res.data.message)
      } else {
      await getuser();
      await getposts();
      toast.success("Account created successfully!")
      navigate('/mainprofile')
      }
    } catch (err) {
      toast.error("Failed to create account")
    }
  };
  return (
    <div className='backdrop-blur-md h-screen pt-20  text-gray-700  ' >
      <div className=' w-[30vw] bg-gradient-to-r from-blue-200 to-pink-200 m-auto rounded-2xl shadow-2xl p-10 ' >
        <form action="" onSubmit={handleSubmit(handleclick)} className='flex flex-col ' >
          <input {...register("name", {
            required: { value: true, message: "required" },
            minLength: { value: 3, message: "min lenght 3" },
          })}
            className='px-3 py-2 outline-none bg-gray-200 w-full mt-5 rounded-md '
            type="text"
            placeholder='Enter name'
          />
          {errors.name && <p className='text-red-500' >{errors.name.message}</p>}
          <input {...register("username", {
            required: { value: true, message: "required" },
            minLength: { value: 3, message: "Min lenght 3" },
          })}
            className='px-3 py-2 outline-none bg-gray-200 w-full mt-5 rounded-md  ' type="text" placeholder='Enter username' name='username' />
          {errors.username && <p className='text-red-500' >{errors.username.message}</p>}
          <input {...register("email", {
            required: { value: true, message: "required" },
          })}
            className='px-3 py-2 outline-none bg-gray-200 w-full mt-5 rounded-md  ' type="email" placeholder='Enter email' name='email' />
          {errors.email && <p className='text-red-500' >{errors.email.message}</p>}
          <input {...register("password", {
            required: { value: true, message: "required" },
          })}
            className='px-3 py-2 outline-none bg-gray-200 w-full mt-5 rounded-md  ' type="password" placeholder='Enter password' name='password' />
          {errors.password && <p className='text-red-500' >{errors.password.message}</p>}
          <input {...register("age", {
            required: { value: true, message: "required" },
          })}
            className='px-3 py-2 outline-none bg-gray-200 w-full mt-5 rounded-md  ' type="number" placeholder='Enter age' name='age' />
          {errors.age && <p className='text-red-500' >{errors.age.message}</p>}
          {/* <input className='px-3 py-2 outline-none bg-red-500 rounded-md ' type="submit" value="Register" /> */}
          <button className=' mt-5 px-30 py-3 text-white m-auto  bg-gradient-to-r from-blue-700 to-pink-500 rounded-md' type='submit' >Create Account</button>
        </form>
      </div>
      <div className='m-auto w-90 flex flex-col items-center mt-10 '>
                <div className='' >OR</div>
                <button className=' mt-5 px-30 py-3 text-white m-auto  bg-gradient-to-r from-blue-700 to-pink-500 rounded-md' onClick={goToLogin}  >Login</button>
                </div>
    </div>
  )
}

export default Register
