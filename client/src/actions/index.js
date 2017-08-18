import axios from 'axios'

import { FETCH_USER } from '../constants/ACTION_TYPES'

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user')
  const user = res.data.googleID
  dispatch({ type: FETCH_USER, payload: user })
}

export const handleStripeToken = token => async (dispatch) => {
  const res = await axios.post('/api/stripe', token)
  const { credits } = res.data
  dispatch({ type: FETCH_USER, payload: credits })
}