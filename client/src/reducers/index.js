import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import { authReducer as auth } from './authReducer'
import { surveysReducer as surveys } from './surveysReducer'

const rootReducer = combineReducers({
  auth,
  form,
  surveys
})

export default rootReducer