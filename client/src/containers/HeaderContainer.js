import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import StripePayment from '../components/StripePayment'
import * as actions from '../actions'

class HeaderContainer extends Component {

  componentDidMount() {
    this.props.fetchUser()
  }

  renderLogin() {
    const { auth, handleStripeToken } = this.props
    switch (auth) {
      case null:
        break
      case false:
        return <li><a href="/auth/google">Login with Google+</a></li>
      default:
        return [
          <li key="0"><Link to="/dashboard">Dashboard</Link></li>,
          <li key="1">
            <StripePayment handleStripeToken={handleStripeToken} />
          </li>,
          <li key="2">Credits: {auth.credits}</li>,
          <li key="3"><a href="/auth/logout">Logout</a></li>
        ]
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/dashboard' : '/'}
            className="brand-logo left"
          >
            React Surveys
          </Link>
          <ul className="right">
            {this.renderLogin()}
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

HeaderContainer.defaultProps = {
  auth: null
}

HeaderContainer.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  auth: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  handleStripeToken: PropTypes.func.isRequired
}

export default connect(mapStateToProps, actions)(HeaderContainer)