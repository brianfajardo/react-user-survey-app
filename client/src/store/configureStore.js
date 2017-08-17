import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import rootReducer from '../reducers'

const middleware = applyMiddleware(reduxThunk)
const configureStore = initialState => createStore(rootReducer, initialState, middleware)

export default configureStore