import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../Usercontext'
import axios from 'axios'
import { PostContext } from '../Postcontext'
import { Link, useNavigate } from 'react-router-dom';
import Editpost from '../Editpost';
import toast from 'react-hot-toast';
import { api } from '../../api';


function Profile() {
  const navigate = useNavigate()
  const { user } = useContext(userContext)
  const [post, setPost] = useState({ content: "" });
  const [image, setImage] = useState(null);

  const { alllpost, getposts } = useContext(PostContext);
  const [updatePostCompVis, setUpdatePostCompVis] = useState(false)
  const [editPostId, setEditPostId] = useState("")
  const [postContent, setPostContent] = useState("")
  const [sendPostImg, setSendPostImg] = useState("")

  const togglePostComp = () => {
    setUpdatePostCompVis(!updatePostCompVis)
  }

  // useEffect(() => {
  //   if (user) {
  //     setPost(prev => ({ ...prev, user: user._id }));
  //   }
  // }, [user]);

  const handlechange = (e) => {
    setPost((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleClick = async (e) => {
    e.preventDefault()

    if( image === null ) {
      toast.error("Please Select photo")
      return
    } else {
    const formData = new FormData();
    formData.append('content', post.content);
    formData.append('post', image);
    formData.append('user', user?._id);
    console.log(formData)
    try {
      const res = await api.post("/api/post", formData, { headers: { 'Content-Type': 'multipart/form-data', }, withCredentials: true, })
      setImage(null)
      console.log('Post uploaded:', res.data);
      setPost((prev) => ({
        ...prev,
        content: "",
      }));
      getposts()
    } catch (error) {
      console.log(error)
    }
  }
  }
  const Deletepost = async (postid) => {
    try {
      const res = await api.post("/api/deletepost", { postid }, { withCredentials: true })
      console.log("deleted")
      getposts()
    } catch (error) {
      console.log(error)
    }
  }
  const logout = async () => {
    try {
      const res = await api.post("/api/logout", {}, { withCredentials: true })
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }
  const like = async (id) => {
    try {
      const res = await api.post("/api/like", { id }, { withCredentials: true })
      getposts()
    } catch (error) {
      console.log(error)
    }
  }
  return (
  <div className='w-full sm:w-2/4 h-full bg-blue-100 text-black px-2 mt-6 sm:mt-0 '>
    <div className='flex flex-col sm:flex-row bg-white rounded-2xl mt-5 w-full m-auto'>
      <div className='h-16 w-16 sm:h-15 sm:w-15 rounded-[50%] overflow-hidden mt-5 sm:mt-10 sm:ml-5 mx-auto sm:mx-0'>
        <img
          className='h-full w-full object-cover object-center'
          src={`${import.meta.env.VITE_IMAGE_URL}${user?.profile}`}
          alt="Profile"
        />
      </div>

      <form className='mt-6 sm:mt-10 w-full sm:w-auto sm:m-auto' onSubmit={handleClick} encType="multipart/form-data">
        <textarea
          className='w-full sm:w-[80vh] h-24 border-none block mb-5 px-3 py-2 resize-none outline-none bg-gradient-to-r from-blue-200 to-purple-200 rounded-md'
          onChange={handlechange}
          value={post.content}
          placeholder='Enter Content'
          name='content'
        ></textarea>

        <div className='flex flex-wrap justify-between items-center gap-3 mb-5'>
          <label htmlFor="file-upload" className="cursor-pointer overflow-hidden flex items-center gap-1">
            <img src="photoUpload.svg" alt="Upload Icon" className="w-6 h-6" /> <span>{image === null ? "Photo" : "Selected"}</span>
          </label>
          <label htmlFor="file-upload" className="cursor-pointer overflow-hidden flex items-center gap-1">
            <img src="videoUpload.svg" alt="Upload Icon" className="w-6 h-6" /> <span>Video</span>
          </label>
          <input id="file-upload" type="file" name='post' className="hidden" onChange={(e) => setImage(e.target.files[0])} />
          <input type="submit" value="POST" className='cursor-pointer py-2 px-4 bg-red-400 text-black font-bold rounded' />
        </div>
      </form>
    </div>

    <div className='flex flex-col items-center gap-10 mt-10 mb-10'>
      {alllpost.map((post) => (
        <div key={post._id} className='p-3 bg-white rounded-2xl w-full sm:w-[90vh]'>
          <div className='w-full sm:w-[85vh] h-60 sm:h-80 rounded-2xl overflow-hidden flex flex-col items-center m-auto'>
            <img
              className='h-full w-full object-cover object-center'
              src={`${import.meta.env.VITE_IMAGE_URL}${post.postimg}`}
              alt=""
            />
          </div>
          <div className='mt-2 ml-2 sm:ml-3 text-gray-500'>{post.content}</div>

          <div className='flex justify-between items-center mt-4 px-2'>
            <div className='flex gap-4'>
              <button className='text-black' onClick={() => like(post?._id)}>
                {post.likes.length}
                <img className='w-6 h-6 inline ml-1 cursor-pointer' src={post.likes.indexOf(user?._id) === -1 ? "unliked.png" : "liked.png"} alt="" />
              </button>
              <img className='w-6 h-6 cursor-pointer' src="comment.svg" alt="" />
              <img className='w-6 h-6 cursor-pointer' src="share.svg" alt="" />
            </div>

            <div className='relative inline-block group'>
              <button><img className='w-6 h-6 cursor-pointer' src="threedot.svg" alt="" /></button>
              <div className="absolute right-0 top-5 hidden mt-2 w-32 bg-white border border-gray-300 rounded-lg shadow-lg group-hover:block z-10">
                <ul className="text-sm">
                  <li>
                    <button
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        togglePostComp();
                        setEditPostId(post?._id);
                        setPostContent(post?.content);
                        setSendPostImg(`${import.meta.env.VITE_IMAGE_URL}${post.postimg}`);
                      }}
                    >
                      Edit
                    </button>
                  </li>
                  <li>
                    <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => Deletepost(post._id)}>
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )).reverse()}
    </div>

    {updatePostCompVis && (
      <Editpost
        onclose={togglePostComp}
        postid={editPostId}
        postcontent={postContent}
        postimg={sendPostImg}
      />
    )}
  </div>
)
}

export default Profile

