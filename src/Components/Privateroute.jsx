import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { api } from '../api'

function Privateroute({children}) {

  const navigate = useNavigate()
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    const checkauth = async ()=>{
   try {
    const res = await api.get("/api/verify",{withCredentials: true} )
    setAuth(true)
   } catch (error) {
    setAuth(false)
   }
  }
  checkauth()
  }, [])

    
  if(auth === true) return children;
  if(auth === false) return <Navigate to="/login" replace />
}

export default Privateroute
