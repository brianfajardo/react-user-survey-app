import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'

import surveyFields from '../constants/surveyFields'

const SurveyFormReview = (props) => {

  const {
    form: { values },
    submitSurvey,
    onCancel,
    history
  } = props

  const renderReviewFields = _.map(surveyFields, ({ label, name }) => (
    <div key={name} style={{ marginBottom: '30px' }}>
      <label>{label}</label>
      <div>{values[name]}</div>
    </div>
  ))

  return (
    <div>
      <h4 className="center">Review</h4>
      <p className="center">Please confirm your entries.</p>
      {renderReviewFields}
      <button onClick={onCancel} className="red btn-flat left white-text">
        <i className="material-icons left">arrow_back</i>
        Back
      </button>
      <button
        onClick={() => submitSurvey(values, history)}
        className="green btn-flat right white-text"
      >
        Submit
        <i className="material-icons right">email</i>
      </button>
    </div>
  )
}

SurveyFormReview.propTypes = {
  form: PropTypes.object.isRequired,
  submitSurvey: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(SurveyFormReview)