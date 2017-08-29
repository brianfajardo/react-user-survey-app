import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const SurveyList = ({ surveys }) => {

  const renderSurveys = _.map(surveys,
    ({ _id, title, body, dateSent, yes, no, latestResponse }) => (
      <div key={_id} className="card">
        <div className="card-content">
          <span className="card-title">{title}</span>
          <p>{body}</p>
          <p className="left">
            Sent on: {new Date(dateSent).toLocaleDateString()}
          </p>
          {latestResponse
            ? <p className="right"> Latest response: {new Date(latestResponse).toLocaleDateString()}</p>
            : null}
        </div>
        <div className="card-action center">
          <a>Yes: {yes}</a>
          <a>No: {no}</a>
        </div>
      </div>
    ))
    .reverse()

  return (
    <div>
      {renderSurveys}
    </div>
  )
}

SurveyList.defaultProps = { surveys: PropTypes.array }

SurveyList.propTypes = {
  surveys: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    subject: PropTypes.string,
    body: PropTypes.string,
    yes: PropTypes.number,
    no: PropTypes.number,
    latestResponse: PropTypes.string,
  }))
}

export default SurveyList