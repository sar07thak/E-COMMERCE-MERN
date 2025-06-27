import React, { createContext } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { authdataContext } from './AuthContext'
import axios from 'axios'
import { useEffect } from 'react'

export const userDataContext = createContext()


const UserContext = ({children}) => {
    const { serverUrl } = useContext(authdataContext)
    const [userData , setuserData] = useState("");

    
    const getCurrentUser = async () => {
        try{
            let result = await axios.get(`${serverUrl}/user/getCurrentUser`,{ withCredentials: true });

            setuserData(result.data);
            console.log("hi ")
            console.log(result.data);
        }catch(err){
            setuserData(null);
            console.log(err);
        }
    }

    useEffect(()=>{
        getCurrentUser();
    },[])
    let value = {
        userData , setuserData , getCurrentUser
    }

  return (
        <div>
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    </div>
  )
}

export default UserContext