import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./Usercontext";
import { api } from "../api";

export const PostContext = createContext()

export const PostProvider = ({children}) => {
    const [alllpost, setAlllpost] = useState([])
    const { user } = useContext(userContext)

    const getposts = async ()=>{
        try {
            const res = await api.post("/api/getposts",{}, { withCredentials: true })
            setAlllpost(res.data.user.posts)
        } catch (error) {
            console.log(error , "ERRRRR")
        }
    }
    useEffect(() => {
        if (user?._id) {
          setAlllpost([]); // Clear old posts immediately
          getposts();
        }
      }, [user]);
   

    return (
       <PostContext.Provider value={{ alllpost , setAlllpost , getposts}} >
        {children}
       </PostContext.Provider>
    )

}