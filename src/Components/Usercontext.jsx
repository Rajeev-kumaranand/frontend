import axios from 'axios'
import React, {createContext, useEffect, useState } from 'react'
import { api } from '../api'


export const userContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const getuser = async ()=>{
        try {
           const res = await api.get("/api/verify",{withCredentials: true})
            setUser(res.data.user)
        } catch (error) {
            setUser(null)
        }
    }
    useEffect(()=>{ 
        getuser()
    },[])

    return (
        <userContext.Provider value={{ user , getuser }} >
            {children}
        </userContext.Provider>
    )
}