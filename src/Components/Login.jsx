import { api } from '../api';
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { userContext } from './Usercontext'
import { PostContext } from './Postcontext'
import toast from 'react-hot-toast'

function Login() {

    const navigate = useNavigate()
    const { getuser } = useContext(userContext)
    const { getposts } = useContext(PostContext)
    const [userlogin, setUserlogin] = useState({
        username: "",
        password: ""
    })
    const handlechange = (e) => {
        setUserlogin((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const goToCreateAccount = () => {
        navigate('/') 
    }
    const handleclick = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post("/api/login", userlogin, { withCredentials: true })
           if(res.data.message === "Login success") {
            await getuser();
            await getposts();
            navigate('/mainprofile')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error(res.message)
            console.error("Registration error:", err);
        }
    }
    return (
  <div className='text-gray-700 bg-[url("https://img.freepik.com/free-photo/colorful-circles-background_53876-88844.jpg?w=360")] bg-cover bg-center bg-no-repeat h-screen'>
    <div className='backdrop-blur-md h-screen pt-20 px-4'>
      <div className='w-full sm:w-[30vw] bg-gradient-to-r from-blue-200 to-pink-200 m-auto rounded-2xl shadow-2xl p-6 sm:p-10'>
        <form onSubmit={handleclick} className='flex flex-col'>
          <input
            className='px-3 py-2 outline-none bg-gray-200 w-full mt-5 rounded-md'
            onChange={handlechange}
            type='text'
            placeholder='Enter username'
            name='username'
          />
          <input
            className='px-3 py-2 outline-none bg-gray-200 w-full mt-5 rounded-md'
            onChange={handlechange}
            type='password'
            placeholder='Enter password'
            name='password'
          />
          <button
            className='mt-5 px-10 py-3 text-white m-auto bg-gradient-to-r from-blue-700 to-pink-500 rounded-md'
            type='submit'
          >
            Login
          </button>
        </form>
      </div>

      <div className='m-auto w-full sm:w-90 flex flex-col items-center mt-10 px-4'>
        <div>OR</div>
        <button
          className='mt-5 px-10 py-3 text-white m-auto bg-gradient-to-r from-blue-700 to-pink-500 rounded-md'
          onClick={goToCreateAccount}
        >
          Create Account
        </button>
      </div>
    </div>
  </div>
);

}

export default Login
