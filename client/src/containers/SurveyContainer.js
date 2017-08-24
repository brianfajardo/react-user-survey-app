import React, { Component } from 'react'
// import { reduxForm, Field } from 'redux-form'

import SurveyForm from '../components/SurveyForm'
// import SurveyFormReview from '../components/SurveyFormReview'

class SurveyContainer extends Component {
  render() {
    return (
      <div>
        <h4 className="center">New Survey</h4>
        <SurveyForm />
      </div>
    )
  }
}

export default SurveyContainer