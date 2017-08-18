import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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
        return <a href="/api/logout">Logout</a>
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="brand-logo left"
          >
            React Surveys
          </Link>
          <ul className="right">
            {this.props.auth && <li><a>Add Credits</a></li>}
            <li>{this.renderLogin()}</li>
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
    PropTypes.string
  ])
}

export default connect(mapStateToProps, actions)(HeaderContainer)