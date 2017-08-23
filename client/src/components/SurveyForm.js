import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

class SurveyForm extends Component {
  render() {
    return <p>Survey Form</p>
  }
}

export default reduxForm({ form: 'survey' })(SurveyForm)