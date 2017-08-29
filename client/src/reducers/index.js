import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import auth from './authReducer'
import surveys from './surveysReducer'

const rootReducer = combineReducers({
  auth,
  form,
  surveys
})

export default rootReducer