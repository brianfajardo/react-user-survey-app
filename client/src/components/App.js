import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Landing from './Landing'
import HeaderContainer from '../containers/HeaderContainer'
import DashboardContainer from '../containers/DashboardContainer'
import SurveyContainer from '../containers/SurveyContainer'

const App = () => (
  <BrowserRouter>
    <div className="container">
      <HeaderContainer />
      <Route exact path="/" component={Landing} />
      <Route path="/dashboard" component={DashboardContainer} />
      <Route path="/surveys/create" component={SurveyContainer} />
    </div>
  </BrowserRouter >
)

export default App