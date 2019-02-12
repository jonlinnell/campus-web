import React from 'react'
import { render } from 'react-dom'
import { Router } from '@reach/router'
import CssBaseline from '@material-ui/core/CssBaseline'

import Login from './components/views/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './components/views/Dashboard'

const Home = () => <div>Hello I am Home</div>

const App = () => (
  <CssBaseline>
    <Router>
      <Home path="/" />
      <ProtectedRoute component={Dashboard} path="/dashboard" />
      <Login path="/login" />
    </Router>
  </CssBaseline>
)

render(<App />, document.getElementById('root'))
