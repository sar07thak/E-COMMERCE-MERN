import React, { Children, createContext } from 'react'

export const authDatacontext = createContext()

const AuthContext = ({children}) => {
    
    const serverUrl = "https://e-commerce-mern-2-fbu5.onrender.com"

    const value ={
        serverUrl
    }
  return (
    <div>
        <authDatacontext.Provider value={value}>
            {children}
        </authDatacontext.Provider>
    </div>
  )
}

export default AuthContext