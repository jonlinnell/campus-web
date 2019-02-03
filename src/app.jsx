import React from 'react'
import { render } from 'react-dom'
import { Router } from '@reach/router'

import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'

const Home = () => <div>Hello I am Home</div>

const Dash = () => <div>Hello I am Dash</div>

const App = () => (
  <Router>
    <Home path="/" />
    <ProtectedRoute component={Dash} path="/dashboard" />
    <Login path="/login" />
  </Router>
)

render(<App />, document.getElementById('root'))
