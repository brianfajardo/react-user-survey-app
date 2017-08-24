import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import HeaderContainer from '../containers/HeaderContainer'
import SurveyContainer from '../containers/SurveyContainer'
import Landing from './Landing'
import Dashboard from './Dashboard'

const App = () => (
  <BrowserRouter>
    <div className="container">
      <HeaderContainer />
      <Route exact path="/" component={Landing} />
      <Route exact path="/surveys" component={Dashboard} />
      <Route path="/surveys/create" component={SurveyContainer} />
    </div>
  </BrowserRouter >
)

export default App