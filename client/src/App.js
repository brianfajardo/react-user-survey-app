import React from 'react'
import logo from './logo.svg'
import './App.css'

const App = () => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>React Survey Feedback</h2>
    </div>
    <a className="App-intro" href="/auth/google">
      Sign in with Google
    </a>
  </div>
)

export default App
