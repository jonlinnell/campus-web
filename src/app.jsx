import React from 'react'
import { render } from 'react-dom'
import { Router } from '@reach/router'
import CssBaseline from '@material-ui/core/CssBaseline'

import Login from './components/views/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './components/views/Dashboard'

import { AuthProvider } from './lib/authContext'

const Home = () => <div>Hello I am Home</div>

const App = () => (
  <AuthProvider>
    <CssBaseline />
    <Router>
      <Home path="/" />
      <ProtectedRoute component={Dashboard} path="/dashboard" />
      <Login path="/login" />
    </Router>
  </AuthProvider>
)

render(<App />, document.getElementById('root'))
