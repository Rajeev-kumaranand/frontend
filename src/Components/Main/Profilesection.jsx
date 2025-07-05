import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../Usercontext'
import Editprofile from '../Editprofile'
import { useNavigate } from 'react-router'
import { api } from '../../api'

function Profilesection({showLeftSection , onclick}) {
  const navigate = useNavigate()
  const { user } = useContext(userContext)
  const [username, setUsername] = useState("")
  const [searchedUser, setSearchedUser] = useState(null)
  const [checkSearchUser, setchechSearchUser] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [searchedUserId, setSearchedUserId] = useState("")
  // const [showLeftSection, setShowLeftSection] = useState(null)
  const handlechange = (e) => {
    setUsername(e.target.value)
  }
  useEffect(() => {
    if (searchedUser) {
      console.log(searchedUser)
    }
  }, [searchedUser])

  const handleclick = async (e) => {
    e.preventDefault()
    console.log(username)
    try {
      const res = await api.post("/api/searchuser", { username }, { withCredentials: true })
      console.log(res.data)
      if (res.data.message === "notuser") {
        // setSearchedUser("notuser")
        setchechSearchUser("notexist")
      } else {
        setSearchedUser(res.data.searcheduser)
        setSearchedUserId(res.data.searcheduser._id)
        setchechSearchUser("exist")
      }
    } catch (error) {
      console.log(error)
    }

  }

  const closeSearch = () => {
    setchechSearchUser("")
  }
  const togglevisible = () => {
    setIsVisible(!isVisible)
  }
return (
<div className={`w-full sm:w-1/4 h-screen bg-blue-100 text-black sm:sticky top-0 z-10 px-2 sm:px-0 mt-6 sm:mt-0 ${
    showLeftSection ? 'fixed block' : 'hidden sm:block' } sm:sticky`} >
    {/* ****** Search Box ****** */}
    <form className='bg-gradient-to-r from-blue-200 to-purple-200 rounded-[40px]  mt-5 py-1 w-full sm:w-80 m-auto flex justify-between'>
      <input className='ml-4 outline-none bg-transparent w-full' type="text" placeholder='Search User' onChange={handlechange} />
      <button className='bg-red-400 p-2 rounded-4xl' onClick={handleclick}>
        <img src="search.svg" alt="" />
      </button>
    </form>

    {/* Search User Found */}
    {checkSearchUser === "exist" && (
      <div
        onClick={() => navigate(`/searchedUser/${searchedUserId}`)}
        className={`absolute z-10 bg-white w-[90%] sm:w-80 top-[70px] left-[5%] sm:left-[30px] flex gap-5 items-center p-4 rounded-[50px] transition-opacity duration-300 ${checkSearchUser === "exist" ? "opacity-100" : "opacity-0"}`}
      >
        <div className='h-[70px] w-[70px] rounded-full shadow-zinc-600 shadow-lg overflow-hidden'>
          <img className="h-full w-full object-cover object-center" src={`${import.meta.env.VITE_IMAGE_URL}${searchedUser.profile}`} alt="" />
        </div>
        <div className='relative'>
          <h1 className='font-bold'>{searchedUser.name}</h1>
          <h2 className='text-gray-700'>{searchedUser.username}</h2>
        </div>
        <button className='absolute top-2 right-2 cursor-pointer' onClick={closeSearch}>
          <img src="close.svg" alt="" />
        </button>
      </div>
    )}

    {/* Search User Not Found */}
    {checkSearchUser === "notexist" && (
      <div className='bg-white w-[90%] sm:w-60 top-[70px] left-[5%] sm:left-[50px] absolute z-10 rounded-2xl px-4 py-2 text-red-500 text-xl transition-opacity duration-300 opacity-100'>
        <div>No user found</div>
        <button className='absolute top-3 right-2 cursor-pointer' onClick={closeSearch}>
          <img src="close.svg" alt="" />
        </button>
      </div>
    )}

    {/* Profile Box */}
    <div className='h-fit sm:h-[56vh] bg-white mt-5 m-auto sm:m-10 mb-5 relative rounded-2xl overflow-hidden max-w-full sm:w-auto'>
      <div className='overflow-hidden h-[150px] bg-red-100'>
        <img className='h-full w-full object-cover object-center' src={`${import.meta.env.VITE_IMAGE_URL}${user?.profileCover}`} alt="" />
      </div>
      <div className='absolute top-[100px] left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-[110px] h-[90px] w-[90px] rounded-full shadow-zinc-600 shadow-lg overflow-hidden'>
        <img className="h-full w-full object-cover object-center" src={`${import.meta.env.VITE_IMAGE_URL}${user?.profile}`} alt="" />
      </div>
      <div className='mt-12 flex flex-col justify-center items-center gap-2'>
        <h1 className='font-bold'>{user?.name}</h1>
        <div>{user?.bio}</div>
      </div>
      <div className='mt-7 flex border-y-2 w-60 m-auto border-gray-400'>
        <div className='mt-2 mb-2 w-full flex flex-col justify-center items-center gap-2 border-r-2 border-gray-400'>
          <h1 className='font-bold'>5</h1>
          <div>Follower</div>
        </div>
        <div className='mt-2 mb-2 w-full flex flex-col justify-center items-center gap-2'>
          <h1 className='font-bold'>8</h1>
          <div>Following</div>
        </div>
      </div>
      <div className='flex justify-center items-center mt-2'>
        <button className='text-red-600 font-bold py-1 px-2 cursor-pointer' onClick={togglevisible}>My Profile</button>
      </div>
    </div>

    <h1 className='font-bold text-2xl ml-2 sm:ml-3'>People you may know...</h1>

    {/* Suggested Users */}
    <div className="w-full sm:w-80 flex gap-5 items-center rounded-[50px] ml-2 mt-3 relative">
      <div className='h-[60px] w-[60px] rounded-full shadow-zinc-600 shadow-lg overflow-hidden'>
        <img className="h-full w-full object-cover object-center" src="https://lovethynerd.com/wp-content/uploads/2019/07/WM_1-1200x605.jpg?x82684" alt="" />
      </div>
      <div className='relative'>
        <h1 className='font-bold text-gray-700'>Wanda Maximof</h1>
        <h2 className='text-gray-700'>wanda123</h2>
      </div>
      <button className='absolute top-2 right-2 text-white py-1 px-4 bg-gradient-to-r from-blue-700 to-pink-500 rounded-md'>Follow</button>
    </div>

    <div className="w-full sm:w-80 flex gap-5 items-center rounded-[50px] ml-2 mt-3 relative">
      <div className='h-[60px] w-[60px] rounded-full shadow-zinc-600 shadow-lg overflow-hidden'>
        <img className="h-full w-full object-cover object-center" src="https://wellgroomedgentleman.com/wp-content/uploads/2023/10/Tony_Stark_Beard_with_Quiff_Hairstyle.width-800.jpg" alt="" />
      </div>
      <div className='relative'>
        <h1 className='font-bold text-gray-700'>Tony Stark</h1>
        <h2 className='text-gray-700'>tony_0001</h2>
      </div>
      <button className='absolute top-2 right-2 text-white py-1 px-4 bg-gradient-to-r from-blue-700 to-pink-500 rounded-md'>Follow</button>
    </div>

    {isVisible && <Editprofile onclose={togglevisible} />}
  </div>
)
}
export default Profilesection
