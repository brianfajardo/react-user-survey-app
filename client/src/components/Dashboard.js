import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <div className="fixed-action-btn">
      <Link to="/surveys/create" className="btn-floating btn-large blue">
        <i className="large material-icons">add</i>
      </Link>
    </div>
  </div>
)

export default Dashboard