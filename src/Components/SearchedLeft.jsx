import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { api } from '../api'

function SearchedLeft() {

    const navigate = useNavigate()
    const { id } = useParams()
    console.log(id)

    const [username, setUsername] = useState("")
    const [searchedUser, setSearchedUser] = useState(null)
    const [checkSearchUser, setcheckSearchUser] = useState("")
    const [searchedUserId, setSearchedUserId] = useState("")

    const handlechange = (e) => {
        setUsername(e.target.value)
    }

    const handleclick = async (e) => {
        e.preventDefault()
        console.log(username)
        try {
            const res = await api.post("/api/searchuser", { username }, { withCredentials: true })
            console.log(res.data)
            if (res.data.message === "notuser") {
                // setSearchedUser("notuser")
                setcheckSearchUser("notexist")
            } else {
                setSearchedUser(res.data.searcheduser)
                console.log(searchedUserId)
                setSearchedUserId(res.data.searcheduser._id)
                setcheckSearchUser("exist")
            }
        } catch (error) {
            console.log(error)
        }

    }
    const closeSearch = () => {
        setcheckSearchUser("")
    }

    return (
        <div className='w-1/4 h-screen bg-blue-100 text-black sm:sticky sm:block hidden top-0' >
            <form className='bg-gradient-to-r from-blue-200 to-purple-200 rounded-[40px] mt-5 py-1  w-80 m-auto flex justify-between ' action="">
                <input className=' ml-4 outline-none bg-transparent ' type="text" placeholder='Search User' onChange={handlechange} />
                <button className='bg-red-400 p-2 rounded-4xl' onClick={handleclick} >
                    <img src="/search.svg" alt="" />
                </button>
            </form>
            {checkSearchUser === "exist" ? (
                <div onClick={() => navigate(`/searchedUser/${searchedUserId}`, { state: { searchedUserId } })} className={`absolute z-10 bg-white w-80 top-[70px] left-[30px] flex gap-7 items-center p-5 rounded-[50px] transition-opacity duration-300 ${checkSearchUser === "exist" ? "opacity-100" : "opacity-0"} `} >
                    <div className=' h-[70px] w-[70px] rounded-[50%] shadow-zinc-600 shadow-lg overflow-hidden '>
                        <img className="h-full w-full object-cover object-center" src={`${import.meta.env.VITE_IMAGE_URL}${searchedUser.profile}`} alt="" />
                    </div>
                    <div className=' relative ' >
                        <h1 className=' font-bold ' >{searchedUser.name}</h1>
                        <h2 className=' text-gray-700 ' >{searchedUser.username}</h2>
                    </div>
                    <button className=' absolute top[20px] right-[10px] cursor-pointer ' onClick={closeSearch} ><img src="/close.svg" alt="" /></button>
                </div>
            ) : ("")
            }
            {checkSearchUser === "notexist" ? (
                <div className={`bg-white w-60 top-[70px] left-[50px] absolute z-10 rounded-2xl px-4 py-2 text-red-500 text-xl transition-opacity duration-300 ${checkSearchUser === "notexist" ? "opacity-100" : "opacity-0"} `}>
                    <div className=' relative ' >
                        No user found
                    </div>
                    <button className=' absolute  top-3 right-2 cursor-pointer ' onClick={closeSearch} ><img src="/close.svg" alt="" /></button>
                </div>
            ) : (
                <span></span>
            )}

            <div className=' h-[50vh] mt-10 w-[47vh] m-auto rounded-2xl bg-white p-5 ' >
                <h1 className=' text-2xl font-sans font-bold pt-2 mb-5 ' >Persnal Info</h1>
                <h1 className=' text-xl font-sans font-bold mb-3' >Indian</h1>
                <h1 className="text-xl font-sans font-bold mb-3 inline-block">Status</h1>
                <p className="inline font-mono text-gray-800"> Single</p>
                <br />
                <h1 className="text-xl font-sans font-bold mb-3 inline-block">Lives In </h1>
                <p className="inline font-mono text-gray-800"> Delhi</p>
                <br />
                <h1 className="text-xl font-sans font-bold mb-3 inline-block">Country </h1>
                <p className="inline font-mono text-gray-800"> India</p> 
                <div>
                <input type="submit" value="Message" className='py-2 px-5 border-none bg-gradient-to-r from-blue-500 to-blue-300 text-white rounded mt-14 ml-37 ' />
                </div>
            </div>
            <h1 className=' font-bold text-2xl ml-7 mt-5 ' >People you may know...</h1>
            <div className="  w-80 flex gap-5 items-center rounded-[50px] ml-2 mt-3" >
        <div className=' h-[60px] w-[60px] rounded-[50%] shadow-zinc-600 shadow-lg overflow-hidden '>
          <img className="h-full w-full object-cover object-center" src="https://lovethynerd.com/wp-content/uploads/2019/07/WM_1-1200x605.jpg?x82684" alt="" />
        </div>
        <div className=' relative ' >
          <h1 className=' font-bold text-gray-700 ' >Wanda Maximof</h1>
          <h2 className=' text-gray-700 ' >wanda123</h2>
        </div>
        <button className=' absolute top[20px] right-[50px] cursor-pointer text-white m-auto py-1 px-4 bg-gradient-to-r from-blue-700 to-pink-500 rounded-md   '  >Follow</button>
      </div>
      <div className="  w-80 flex gap-5 items-center rounded-[50px] ml-2 mt-3" >
        <div className=' h-[60px] w-[60px] rounded-[50%] shadow-zinc-600 shadow-lg overflow-hidden '>
          <img className="h-full w-full object-cover object-center" src="https://wellgroomedgentleman.com/wp-content/uploads/2023/10/Tony_Stark_Beard_with_Quiff_Hairstyle.width-800.jpg" alt="" />
        </div>
        <div className=' relative ' >
          <h1 className=' font-bold text-gray-700 ' >Tony Stark</h1>
          <h2 className=' text-gray-700 ' >tony_0001</h2>
        </div>
        <button className=' absolute top[20px] right-[50px] cursor-pointer text-white m-auto py-1 px-4 bg-gradient-to-r from-blue-700 to-pink-500 rounded-md   '  >Follow</button>
      </div>
        </div>
    )
}

export default SearchedLeft
