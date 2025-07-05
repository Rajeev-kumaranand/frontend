import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { api } from '../../api'

function Othersection({showRightSection}) {
    const navigate = useNavigate()
    const logout = async () => {
        try {
          const res = await api.post("/api/logout", {}, { withCredentials: true })
          toast.success("You have been logged out successfully!")
          navigate('/login')
        } catch (error) {
          console.log(error)
        }
      }
      return (
  <div
    className={`w-full sm:w-1/4 h-screen bg-blue-100 text-black  top-0 z-10 px-2 sm:px-0 mt-6 sm:mt-0 ${
      showRightSection ? 'fixed block' : 'hidden sm:block' } sm:sticky`} >
    <div>
      <ul className='flex flex-wrap sm:flex-nowrap gap-6 sm:gap-12 mt-10 ml-3 sm:ml-5'>
        <li><img className='h-10 w-10' src="/home.png" alt="" /></li>
        <li><img className='h-10 w-10' src="/notification.svg" alt="" /></li>
        <li><img className='h-10 w-10' src="/message.svg" alt="" /></li>
        <li className='relative group'>
          <img className='h-10 w-10' src="/setting.svg" alt="" />
          <button
            onClick={logout}
            className='invisible opacity-0 px-5 py-3 bg-red-500 text-white rounded-md absolute top-[35px] right-[15px] hover:bg-red-700 group-hover:opacity-100 group-hover:visible transition-opacity duration-200'
          >
            Logout
          </button>
        </li>
      </ul>

      <div className='bg-white rounded-2xl mt-10 w-full sm:w-80 m-auto p-6'>
        <h1 className='text-2xl sm:text-3xl font-bold'>Trending for you...</h1>
        <h2 className='text-lg font-bold mt-3'>#ChatGpt</h2>
        <h3 className='text-gray-500 text-sm'>200K Shares</h3>
        <h2 className='text-lg font-bold mt-3'>#coder</h2>
        <h3 className='text-gray-500 text-sm'>150K Shares</h3>
        <h2 className='text-lg font-bold mt-3'>#Avengers</h2>
        <h3 className='text-gray-500 text-sm'>140K Shares</h3>
        <h2 className='text-lg font-bold mt-3'>#Anime</h2>
        <h3 className='text-gray-500 text-sm'>100K Shares</h3>
        <h2 className='text-lg font-bold mt-3'>#Tech</h2>
        <h3 className='text-gray-500 text-sm'>50K Shares</h3>
      </div>

      <div className='flex mt-10'>
        <button className='px-10 py-3 text-white m-auto bg-gradient-to-r from-blue-700 to-pink-500 rounded-md'>
          Share
        </button>
      </div>
    </div>
  </div>
)
}

export default Othersection
