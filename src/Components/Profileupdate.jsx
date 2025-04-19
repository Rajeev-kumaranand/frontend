import React, { useContext } from 'react'
import { userContext } from './Usercontext'

function Profileupdate() {
    const {user} = useContext(userContext)
console.log(user)
  return (
    <div>
      <form className='mt-5' action={`${import.meta.env.VITE_API_URL}/api/picupdate`} method='post' encType="multipart/form-data" >
      <input type="hidden" name='userid' value={user?._id} />
        <input type="file" name="profile" />
        <input type="submit" value="Upload" className='py-2 px-3 border-none bg-red-400 text-black font-bold rounded' />
      </form>
    </div>
  )
}

export default Profileupdate
