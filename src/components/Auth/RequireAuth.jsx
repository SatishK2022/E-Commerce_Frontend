import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function RequireAuth({children}) {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  if(!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <>
        {children}
    </>
  )
}

export default RequireAuth