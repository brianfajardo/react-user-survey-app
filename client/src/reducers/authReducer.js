import { FETCH_USER } from '../constants/actionTypes'

// Three states of auth:
// 1. Default null state; component re-render is idle in whether user is already auth'd or not.
// 2. action.payload returns truthy; user is auth'd.
// 3. action.payload returns falsey; user is unauth'd.

const authReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false
    default:
      return state
  }
}

export default authReducer