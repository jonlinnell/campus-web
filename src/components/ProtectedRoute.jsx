import React from 'react'
import { Redirect } from '@reach/router'

import { withAuthContext } from '../lib/authContext'

const ProtectedRoute = ({ component: Component, authorised, ...rest }) => {
  if (authorised) {
    return <Component {...rest} />
  }

  return <Redirect to="/login" noThrow />
}

export default withAuthContext(ProtectedRoute)
