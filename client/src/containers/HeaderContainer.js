import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../actions'

class HeaderContainer extends Component {

  componentDidMount() {
    this.props.fetchUser()
  }

  renderLogin() {
    switch (this.props.auth) {
      case null:
        break
      case false:
        return <a href="/auth/google">Sign in with Google+</a>
      default:
        return <a>Logout</a>
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo left">React Surveys</a>
          <ul className="right">
            <li>{this.renderLogin()}</li>
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

HeaderContainer.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  auth: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ])
}

HeaderContainer.defaultProps = {
  auth: null
}

export default connect(mapStateToProps, actions)(HeaderContainer)