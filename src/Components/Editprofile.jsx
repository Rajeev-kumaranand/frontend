import React, { useContext, useEffect, useState } from 'react'
import { userContext } from './Usercontext'
import axios from 'axios'
import { redirect, useNavigate } from 'react-router'
import { api } from '../api'



function Editprofile({ onclose }) {

    const navigate = useNavigate()
    const { user, getuser } = useContext(userContext)
    const [updateddata, setUpdatedata] = useState({
        name: "",
        username: "",
        bio: "",
        city: "",
        country: ""
    })
    useEffect(() => {
        if (user) {
            setUpdatedata({
                name: user.name || '',
                username: user.username || '',
                bio: user.bio || '',
                city: user.city || '',
                country: user.country || '',
            });
        }
    }, [user]);
    const [profileCover, setProfileCover] = useState(null)
    const [profilePic, setProfilePic] = useState(null)

    const handlechange = (e) => {
        setUpdatedata((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }
    const handleclick = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', updateddata.name);
        formData.append('username', updateddata.username);
        formData.append('bio', updateddata.bio);
        formData.append('city', updateddata.city);
        formData.append('country', updateddata.country);
        if (profileCover) formData.append('profileCover', profileCover)
        if (profilePic) formData.append('profilePic', profilePic)
        try {
            const res = await api.post("/api/updateProfile", formData, { headers: { 'Content-Type': 'multipart/form-data', }, withCredentials: true })
            console.log(res.data)
            getuser()
            onclose()

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="backdrop-blur-md fixed top-0  w-full h-screen isolate rounded-4xl z-50 " >
            <div className=' bg-white rounded-2xl text-black w-[50vw] p-10 m-auto mt-20 shadow-2xl relative ' >
                <h1 className=' text-2xl font-bold w-50 m-auto mt-12 mb-10 ' >Update Your info</h1>
                <form action="" encType="multipart/form-data">
                    <div className=' flex justify-between ' >
                        <input className=' bg-gray-200 outline-none py-2 px-3 rounded-md w-80 ' onChange={handlechange} type="text" value={updateddata.name} name='name' placeholder='Name' />
                        <input className=' bg-gray-200 outline-none py-2 px-3 rounded-md w-80 ' onChange={handlechange} type="text" value={updateddata.username} name='username' placeholder='Username' />
                    </div>
                    <textarea className=' bg-gray-200 outline-none py-2 px-3 rounded-md w-full resize-none mt-5 ' onChange={handlechange} value={updateddata.bio} name="bio" placeholder='Bio...' id=""></textarea>
                    <div className=' flex justify-between mt-5 ' >
                        <input className=' bg-gray-200 outline-none py-2 px-3 rounded-md w-80 ' onChange={handlechange} value={updateddata.city} type="text" name='city' placeholder='City' />
                        <input className=' bg-gray-200 outline-none py-2 px-3 rounded-md w-80 ' onChange={handlechange} value={updateddata.country} type="text" name='country' placeholder='Country' />
                    </div>
                    <div className=' flex justify-between mt-8 ' >
                        <label htmlFor="profileCover-upload" className="cursor-pointer overflow-hidden ">
                            <img src="profileCoverIcon.png" alt="Upload Icon" className="w-7 h-7 inline " /> <span>{profileCover === null ? "Profile Cover" : "Selected"}</span>                           
                        </label>
                        <label htmlFor="profile-upload" className="cursor-pointer overflow-hidden ">
                            <img src="profileIcon.png" alt="Upload Icon" className="w-7 h-7 inline " /> <span>{profilePic === null ? "Profile Upload" : "Selected"}</span>                           
                        </label>
                        <input id="profileCover-upload" className=' hidden ' onChange={(e) => setProfileCover(e.target.files[0])} type="file" name='profileCover' />
                        <input id='profile-upload' className=' hidden ' onChange={(e) => setProfilePic(e.target.files[0])} type="file" name='profilePic' />
                    </div>

                    <div className=' flex mt-10 ' >
                        <button className=' cursor-pointer px-30 py-3 text-white m-auto  bg-gradient-to-r from-blue-700 to-pink-500 rounded-md ' onClick={handleclick} type='submit' > Update </button>
                    </div>
                </form>

            </div>
            <button className=' absolute top-25 right-100 cursor-pointer' onClick={onclose} ><img src="close.svg" alt="" /></button>
        </div>
    )
}

export default Editprofile
