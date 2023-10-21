import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const RequireAuthorization = ({ children }) => {
  const { isLogin } = useSelector((state) => state.signIn)
  const location = useLocation()

  if (!isLogin) {
    return <Navigate to="/sign-in" state={{ from: location }} />
  }

  return children
}

export default RequireAuthorization
