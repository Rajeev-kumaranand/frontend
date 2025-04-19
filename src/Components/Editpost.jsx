import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { PostContext } from './Postcontext';
import { api } from '../api';

function Editpost({ onclose, postid, postcontent, postimg }) {

  const navigate = useNavigate()
  const { getposts } = useContext(PostContext)
  // const id = useParams();
  const [content, setContent] = useState(postcontent)
  const [image, setImage] = useState(null)
  // const fetchpost = async () => {
  //   try {
  //     const res = await axios.post("http://localhost:3000/api/editpost", { id }, { withCredentials: true })
  //     setContent(res.data.post.content)
  //   } catch (error) {

  //   }
  // }
  // useEffect(() => {
  //   fetchpost()
  // }, [id])
  useEffect(()=>{
    console.log(image)
  },[image])

  const handleclick = async (e) => {
    e.preventDefault()


    try {

      const formData = new FormData()

      formData.append('content', content)
      formData.append('postid', postid)

      if (image) {
        formData.append('updatedPost', image)
      } 

      const res = await api.post("/api/updatepost", formData, { headers: { 'Content-Type': 'multipart/form-data', }, withCredentials: true })
      setImage(null)
      onclose()
      getposts()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=' backdrop-blur-md fixed top-0  w-[100vw] h-[100vw] rounded-2xl inset-0 z-20  ' >
      <div className='w-[50vw] bg-white rounded-2xl shadow-2xl m-auto mt-20 p-10 ' >
        <form className='mt-5' action="" onSubmit={handleclick} encType="multipart/form-data" >
          <textarea className=' block mb-5 px-3 py-2 resize-none w-full outline-none border-2 border-zinc-600 bg-transparent rounded-md ' onChange={(e) => setContent(e.target.value)} value={content} placeholder='Enter Content' name='content'></textarea>
          <div className=' w-[85vh] h-80 rounded-2xl overflow-hidden flex flex-col items-center m-auto mb-5 ' >
            <img className='h-full w-full object-cover object-center' src={postimg} alt="" />
          </div>
          <div className=' flex justify-between w-150 m-auto ' >
          <label htmlFor="file-upload" className="cursor-pointer relative inline-block ">
            <img src="photoUpload.svg" alt="Upload Icon" className="w-7 h-7 inline " /> <span>{image === null ? "Update" : "Selected"}</span>
            <input className='absolute inset-0 w-full h-full opacity-0 cursor-pointer ' id="file-upload" type="file" name='updatedPost' onChange={(e) =>  setImage(e.target.files[0])} />
          </label>

          <input type="submit" value="Update" className='py-2 px-3 border-none bg-gradient-to-r from-green-500 to-green-300 text-white rounded' />
          </div>
        </form>
      </div>
      <button className=' absolute top-25 right-100 cursor-pointer' onClick={onclose} ><img src="close.svg" alt="" /></button>
    </div>
  )
}

export default Editpost
