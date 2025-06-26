import React, { Children, createContext } from 'react'

export const authDatacontext = createContext()

const AuthContext = ({children}) => {
    
    const serverUrl = "http://localhost:4000"

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