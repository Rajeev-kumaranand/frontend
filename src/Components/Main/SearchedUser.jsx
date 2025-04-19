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
      <SearchedLeft/>
      <SearchedMiddle id={id} />
      <Othersection/>
    </div>
    </>
  )
}

export default SearchedUser

