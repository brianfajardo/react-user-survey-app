import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../actions'

class HeaderContainer extends Component {

  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo left">React Surveys</a>
          <ul className="right">
            <li><a href="/auth/google">Login with Google+</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}

HeaderContainer.propTypes = {
  fetchUser: PropTypes.func.isRequired
}

export default connect(null, actions)(HeaderContainer)