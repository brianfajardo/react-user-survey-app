import React from 'react'
import PropTypes from 'prop-types'

const SurveyField = ({ input, label, meta: { touched, error } }) => (
  <div>
    <label htmlFor={label}>{label}</label>
    <input
      {...input}
      id={label}
      style={{ marginBottom: '10px' }}
    />
    <div className="red-text center" style={{ marginBottom: '15px' }}>
      {touched && error}
    </div>
  </div>
)

SurveyField.defaultProps = {
  label: undefined
}

SurveyField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
}

export default SurveyField