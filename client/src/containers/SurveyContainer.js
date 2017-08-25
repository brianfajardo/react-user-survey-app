import React, { Component } from 'react'

import SurveyForm from '../components/SurveyForm'
import SurveyFormReview from '../components/SurveyFormReview'

class SurveyContainer extends Component {

  constructor() {
    super()
    this.state = { showReview: false }
    this.onSurveySubmit = this.onSurveySubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onSurveySubmit() {
    this.setState({ showReview: true })
  }

  onCancel() {
    this.setState({ showReview: false })
  }

  render() {
    return (
      <div>
        {this.state.showReview
          ? <SurveyFormReview onCancel={this.onCancel} />
          : <SurveyForm onSurveySubmit={this.onSurveySubmit} />
        }
      </div>
    )
  }
}

export default SurveyContainer