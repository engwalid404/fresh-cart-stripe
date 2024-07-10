import React, { useContext } from 'react'
import { authContext } from '../Context/authContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {token }=useContext(authContext)
    if (token === null || localStorage.getItem("token") == null){
        return<Navigate to="/login"/>

    }
    else{ 
      return (
      <>
        {children}
      </>
    )}
 
}

export default ProtectedRoute
