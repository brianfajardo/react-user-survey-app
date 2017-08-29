import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchSurveys } from '../actions/'
import SurveyList from '../components/SurveyList'

class DashboardContainer extends Component {

  componentDidMount() {
    this.props.fetchSurveys()
  }

  renderGetStartedMessage() {
    const { surveys, auth: { credits } } = this.props
    if (surveys.length === 0 && credits === 0) {
      return (
        <div>
          <h2>{"Let's"} get you started!</h2>
          <p className="center">
            First purchase credits. Once credits have been added,
            click on the blue button to create a new survey.
          </p>
        </div>
      )
    } else if (surveys.length === 0 && credits === 5) {
      return <p>Click the blue button!</p>
    }
    return null
  }

  renderButton() {
    return (
      <div className="fixed-action-btn">
        <Link to="/surveys/create" className="btn-floating btn-large blue">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    )
  }

  render() {
    const {
      auth,
      surveys
    } = this.props
    return (
      <div className="center">
        <h5>Dashboard</h5>
        <div >
          {auth && this.renderGetStartedMessage()}
        </div>
        <SurveyList surveys={surveys} />
        {auth && auth.credits > 0 && this.renderButton()}
      </div>
    )
  }
}

const mapStateToProps = ({ auth, surveys }) => ({ auth, surveys })

DashboardContainer.defaultProps = {
  auth: null,
  surveys: PropTypes.array
}

DashboardContainer.propTypes = {
  fetchSurveys: PropTypes.func.isRequired,
  auth: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  surveys: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    subject: PropTypes.string,
    body: PropTypes.string,
    yes: PropTypes.number,
    no: PropTypes.number,
    latestResponse: PropTypes.string,
  }))
}

export default connect(mapStateToProps, { fetchSurveys })(DashboardContainer)