import React from 'react'
import PropTypes from 'prop-types'

const SurveyFormReview = ({ onCancel }) => (
  <div>
    <h4 className="center">Review</h4>
    <p>Please confirm your entries</p>
    <button
      onClick={onCancel}
      className="red btn-flat left white-text"
    >
      <i className="material-icons left">arrow_back</i>
      Back
    </button>
    <button className="green btn-flat right white-text">
      Submit
    </button>
  </div>
)

SurveyFormReview.propTypes = {
  onCancel: PropTypes.func.isRequired
}

export default SurveyFormReview