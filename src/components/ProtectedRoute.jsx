import React from 'react'
import { Redirect } from '@reach/router'

const ProtectedRoute = ({ component: Component, ...rest }) => (localStorage.getItem('token') ? (
  <Component {...rest} />
) : (
  <Redirect to="/login" />
))

export default ProtectedRoute
