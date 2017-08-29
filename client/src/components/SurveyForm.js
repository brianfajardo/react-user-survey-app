import React, { Component } from 'react'
import { reduxForm, Field, reset } from 'redux-form'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import SurveyField from '../components/SurveyField'
import validateEmails from '../utils/validateEmails'
import surveyFields from '../constants/surveyFields'
import { store } from '../'

// Customizable survey fields found in constants folder.

class SurveyForm extends Component {

  renderField() {
    return _.map(surveyFields, ({ label, name }) => (
      <Field
        type="text"
        label={label}
        key={label}
        name={name}
        component={SurveyField}
      />
    ))
  }

  render() {
    const { handleSubmit, onSurveyNext } = this.props
    return (
      <div>
        <h4 className="center">New Survey</h4>
        <form onSubmit={handleSubmit(onSurveyNext)}>
          {this.renderField()}
          <Link
            to="/dashboard"
            onClick={() => store.dispatch(reset('survey'))}
            className="red btn-flat left white-text"
          >
            Cancel
          </Link>
          <button type="submit" className="blue btn-flat right white-text">
            Review
            <i className="material-icons right">arrow_forward</i>
          </button>
        </form>
      </div>
    )
  }
}

SurveyForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSurveyNext: PropTypes.func.isRequired
}

const validate = (values) => {
  const errors = {}
  errors.recipients = validateEmails(values.recipients || '')
  _.each(surveyFields, ({ name }) => {
    if (!values[name] || values[name] === '') {
      errors[name] = 'Required'
    }
  })
  return errors
}

export default reduxForm({
  validate,
  form: 'survey',
  destroyOnUnmount: false
})(SurveyForm)