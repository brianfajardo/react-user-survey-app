import axios from 'axios'

import { FETCH_USER, SUBMIT_SURVEY } from '../constants/actionTypes'

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/auth/current_user')
  const userData = res.data
  dispatch({ type: FETCH_USER, payload: userData })
}

export const handleStripeToken = token => async (dispatch) => {
  const res = await axios.post('/payments/stripe', token)
  const userData = res.data
  dispatch({ type: FETCH_USER, payload: userData })
}

export const submitSurvey = (values) => {
  console.log('* values *', values)
  return { type: SUBMIT_SURVEY }
}