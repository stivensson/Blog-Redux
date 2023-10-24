import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import { SIGN_IN } from '../routes'

const RequireAuthorization = ({ children }) => {
  const { isLogin } = useSelector((state) => state.signIn)
  const location = useLocation()
  const token = localStorage.getItem('currentUser')

  if (!isLogin && !token) {
    return <Navigate to={SIGN_IN} state={{ from: location }} />
  }

  return children
}

export default RequireAuthorization
