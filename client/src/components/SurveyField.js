import React from 'react'
import PropTypes from 'prop-types'

const SurveyField = (props) => {
  const {
    input,
    label,
    meta: { active, touched, error }
  } = props
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        {...input}
        id={label}
        style={{ marginBottom: '10px' }}
      />
      <div className="red-text center" style={{ marginBottom: '15px' }}>
        {!active && touched && error}
      </div>
    </div>
  )
}

SurveyField.defaultProps = {
  label: undefined
}

SurveyField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
}

export default SurveyField