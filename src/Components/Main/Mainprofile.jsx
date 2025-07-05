import React, { useState } from 'react'
import Profilesection from './Profilesection'
import Othersection from './Othersection'
import Profile from './Profile'

function Mainprofile() {

  const [showLeftSection, setShowLeftSection] = useState(false)
  const [showRightSection, setShowRightSection] = useState(false)

  return (
    <>
      <div className='flex  bg-blue-100  ' >
        <div className=' bg-amber-200  h-6 w-full absolute top-0 pb-7 sm:hidden flex justify-between pl-5 pr-5' >
          <div onClick={() => showLeftSection ? setShowLeftSection(false) : setShowLeftSection(true)} >
            <div
              className={`transition-transform duration-300 transform ${showLeftSection ? 'scale-x-[-1]' : ''
                }`}
            >
              &gt;
            </div>
          </div>
          <div onClick={() => setShowRightSection(!showRightSection)}>
            <div
              className={`transition-transform duration-300 transform ${showRightSection ? 'scale-x-[-1]' : ''
                }`}
            >
              &lt;
            </div>
          </div>
        </div>

        <Profilesection showLeftSection={showLeftSection} />

        <Profile />

        <Othersection showRightSection={showRightSection} />
      </div>
    </>
  )
}

export default Mainprofile
