import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import SurveyField from '../components/SurveyField'
import validateEmails from '../utils/validateEmails'

const FIELDS = [
  { label: 'Title', name: 'title' },
  { label: 'Subject', name: 'subject' },
  { label: 'Body', name: 'body' },
  { label: 'Recipient list', name: 'emails' }
]

class SurveyForm extends Component {

  renderField() {
    return _.map(FIELDS, ({ label, name }) => (
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
    const { handleSubmit, onSurveySubmit } = this.props
    return (
      <div>
        <h4 className="center">New Survey</h4>
        <form onSubmit={handleSubmit(onSurveySubmit)}>
          {this.renderField()}
          <Link to="/surveys" className="red btn-flat left white-text">
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
  onSurveySubmit: PropTypes.func.isRequired
}

const validate = (values) => {
  const errors = {}
  errors.emails = validateEmails(values.emails || '')
  _.each(FIELDS, ({ name }) => {
    if (!values[name] || values[name] === '') {
      errors[name] = 'Required'
    }
  })
  return errors
}

export default reduxForm({
  validate,
  form: 'survey'
})(SurveyForm)