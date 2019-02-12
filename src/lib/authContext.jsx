import React, { Component } from 'react'
import { navigate } from '@reach/router'

import {
  whoami,
  login as apiLogin,
} from './api'

const userShape = {
  _id: null,
  givenName: '',
  permissions: [],
  username: '',
}

const authErrorShape = {
  type: '',
  hasError: false,
  message: '',
}

const AuthContext = React.createContext()

export class AuthProvider extends Component {
  state = {
    authError: authErrorShape,
    authorised: false,
    user: userShape,
  }

  componentDidMount() {
    // This is bad. Fix this.
    whoami((error, user) => {
      this.setState({
        authorised: true,
        user,
      })
    })
  }

  login = (credentials, location) => apiLogin(
    credentials,
    (error, data) => {
      if (error) {
        this.setState({
          authorised: false,
          authError: {
            type: error.data.type || 'general',
            hasError: true,
            message: error.data.message || 'general error',
          },
        })
      } else {
        const { authorised, token } = data

        localStorage.setItem('token', token)

        whoami((whoamiError, user) => {
          this.setState({
            authorised,
            authError: authErrorShape,
            user,
          })

          navigate(location || '/dashboard')
        })
      }
    },
  )

  logout = () => {
    localStorage.removeItem('token')

    this.setState({
      authError: authErrorShape,
      authorised: false,
      user: userShape,
    })

    navigate('/')
  }

  render() {
    const { authorised, user, authError } = this.state
    const { children } = this.props

    return (
      <AuthContext.Provider
        value={{
          authError,
          authorised,
          login: this.login,
          logout: this.logout,
          user,
        }}
      >
        { children }
      </AuthContext.Provider>
    )
  }
}

export const AuthConsumer = AuthContext.Consumer

export const withAuthContext = Comp => props => (
  <AuthConsumer>
    {({
      authError,
      authorised,
      login,
      logout,
      sessionResume,
      user,
    }) => (
      <Comp
        {...props}
        authError={authError}
        authorised={authorised}
        login={login}
        logout={logout}
        sessionResume={sessionResume}
        user={user}
      />
    )}
  </AuthConsumer>
)

export default AuthContext
