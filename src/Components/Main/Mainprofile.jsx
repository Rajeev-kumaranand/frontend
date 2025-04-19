import React from 'react'
import Profilesection from './Profilesection'
import Othersection from './Othersection'
import Profile from './Profile'

function Mainprofile() {
  return (
    <>
    <div className='flex  bg-blue-100  ' >
      <Profilesection/>
      <Profile/>
      <Othersection/>
    </div>
    </>
  )
}

export default Mainprofile
