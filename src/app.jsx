import React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'

const Test = styled.h1`
  color: red;
`

const App = () => (
  <Test>Hello I am a test</Test>
)

render(<App />, document.getElementById('root'))
