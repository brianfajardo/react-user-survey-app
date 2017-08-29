import axios from 'axios'
import { reset } from 'redux-form'

import { FETCH_USER, FETCH_SURVEYS } from '../constants/actionTypes'

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/auth/current_user')
  const userData = res.data
  dispatch({ type: FETCH_USER, payload: userData })
}

export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get('/surveys')
  const surveys = res.data
  dispatch({ type: FETCH_SURVEYS, payload: surveys })
}

export const handleStripeToken = token => async (dispatch) => {
  const res = await axios.post('/payments/stripe', token)
  const userData = res.data
  dispatch({ type: FETCH_USER, payload: userData })
}

export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post('/surveys/new', values)
  const userData = res.data
  history.push('/dashboard')
  dispatch(reset('survey'))
  dispatch({ type: FETCH_USER, payload: userData })
}
