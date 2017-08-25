import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import SurveyForm from '../components/SurveyForm'
import SurveyFormReview from '../components/SurveyFormReview'
import * as actions from '../actions'

class SurveyContainer extends Component {

  constructor() {
    super()
    this.state = { showReview: false }
    this.onSurveyNext = this.onSurveyNext.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onSurveyNext() {
    this.setState({ showReview: true })
  }

  onCancel() {
    this.setState({ showReview: false })
  }

  render() {
    const { form, submitSurvey } = this.props
    return (
      <div>
        {this.state.showReview
          ? <SurveyFormReview
            form={form}
            onCancel={this.onCancel}
            submitSurvey={submitSurvey}
          />
          : <SurveyForm onSurveyNext={this.onSurveyNext} />
        }
      </div>
    )
  }
}

const mapStateToProps = ({ form: { survey } }) => ({ form: survey })

SurveyContainer.propTypes = {
  form: PropTypes.object,
  submitSurvey: PropTypes.func.isRequired
}

export default connect(mapStateToProps, actions)(SurveyContainer)