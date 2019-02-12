import React from 'react'
import { Redirect } from '@reach/router'

import { withAuthContext } from '../lib/authContext'

const ProtectedRoute = ({ component: Component, authorised, ...rest }) => (
  localStorage.getItem('token')
    ? <Component {...rest} />
    : <Redirect to="/login" noThrow />
)

export default withAuthContext(ProtectedRoute)
