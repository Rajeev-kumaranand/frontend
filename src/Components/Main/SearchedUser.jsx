import React from 'react'
import SearchedLeft from '../SearchedLeft'
import SearchedMiddle from '../SearchedMiddle'
import Othersection from './Othersection'
import { useParams } from 'react-router'

function SearchedUser() {

  const {id} = useParams()
  console.log(id)

  return (
    <>
    <div className='flex  bg-blue-100  ' >
      
      {/* <div className='hidden' > */}
      <SearchedLeft/>  
      {/* </div> */}
      <SearchedMiddle id={id} />
      
      {/* <div className='hidden' > */}
      <Othersection/> 
      {/* </div> */}
    </div>
    </>
  )
}

export default SearchedUser

