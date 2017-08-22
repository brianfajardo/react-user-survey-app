import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import HeaderContainer from '../containers/HeaderContainer'
import Landing from './Landing'

// Dummy components
const Dashboard = () => <h1>Dashboard</h1>
const Survey = () => <h1>Create new survey</h1>

const App = () => (
  <div className="container">
    <BrowserRouter>
      <div>
        <HeaderContainer />
        <Route exact path="/" component={Landing} />
        <Route exact path="/surveys" component={Dashboard} />
        <Route path="/surveys/create" component={Survey} />
      </div>
    </BrowserRouter >
  </div>
)

export default App