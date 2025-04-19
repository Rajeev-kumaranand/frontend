import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from './Postcontext'
import { userContext } from './Usercontext'
import { api } from '../api'

function SearchedMiddle({ id }) {


    const { getposts } = useContext(PostContext)
    const { user } = useContext(userContext)

    const [post, setPost] = useState([])
    const [searchedUserData, setSearchedUserData] = useState({})


    useEffect(() => {
        const fetchSearchedUser = async () => {
            try {
                let res = await api.post("/api/SearchedUser", { id }, { withCredentials: true })
                setSearchedUserData(res.data.searcheduser)
                setPost(res.data.searcheduser.posts)
            } catch (error) {
            }
        }

        fetchSearchedUser()

    }, [id , post])

    const like = async (id) => {
        try {
          const res = await api.post("/api/like", { id }, { withCredentials: true })
          console.log(res.data)
          getposts()
        } catch (error) {
          console.log(error)
        }
    }

    return (
        <div className='w-2/4 h-full bg-blue-100 text-black'>
            <div className=' w-[95vh] bg-white  h-[70vh] rounded-2xl mt-10 m-auto overflow-hidden relative ' >
                <div className='  h-60 overflow-hidden  ' >
                    <img className=' w-full h-full object-cover object-center ' src={`${import.meta.env.VITE_IMAGE_URL}${searchedUserData.profileCover}`} alt="" />
                </div>
                <div className=' bg-yellow-200 w-25 h-25 rounded-full overflow-hidden absolute top-50 left-72 shadow-2xl ' >
                    <img className=' w-full h-full object-cover object-center ' src={`${import.meta.env.VITE_IMAGE_URL}${searchedUserData?.profile}`} alt="" />
                </div>
                <div className=' w-full flex flex-col items-center mt-20 gap-3 '>
                    <h1 className=' text-2xl font-bold  ' >{searchedUserData.name}</h1>
                    <h1 className='   ' >{searchedUserData.bio}</h1>
                </div>
                <div className=' flex  w-[80vh]  m-auto justify-between mt-5 border-t-2 border-b-2 p-3 border-zinc-500 ' >
                    <div className=' flex flex-col items-center w-full border-r-2 border-zinc-500 ' >
                        <p className='font-bold' >5</p>
                        <p>Following</p>
                    </div>
                    <div className=' flex flex-col items-center w-full border-r-2 border-zinc-500 ' >
                        <p className='font-bold' >10</p>
                        <p>Follower</p>
                    </div>
                    <div className=' flex flex-col items-center w-full ' >
                        <p className='font-bold'>5</p>
                        <p>Post</p>
                    </div>
                </div>
            </div>

           { post.map((post)=> (<div key={post._id} className='p-3 bg-white rounded-2xl w-[90vh] m-auto mt-10 mb-10  ' >
                <div className=' w-[85vh] h-80 rounded-2xl overflow-hidden flex flex-col items-center m-auto ' >
                    <img className='h-full w-full object-cover object-center' src={`${import.meta.env.VITE_IMAGE_URL}${post.postimg}`} alt="" />
                </div>
                <div className=' mt-2 ml-3 text-gray-500 ' > {post.content} </div>

                <div className=' flex justify-between ' >
                    <div className='flex gap-5 mt-4 ' >
                        <button className=' text-blsck ' onClick={() => like(post._id)} > {post.likes.length} <img className='w-7 h-7 inline cursor-pointer ' src={ post.likes.indexOf(user?._id) === -1 ? "/unliked.png" : "/liked.png" } alt="" /></button>
                        <img className='w-7 h-7 cursor-pointer' src="/comment.svg" alt="" />
                        <img className='w-7 h-7 cursor-pointer' src="/share.svg" alt="" />
                    </div>

                </div>
            </div>)) 
            }
                    
        </div>
    )
}

export default SearchedMiddle
