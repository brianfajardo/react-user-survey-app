import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'materialize-css/dist/css/materialize.min.css'

import App from './components/App'
import configureStore from './store/configureStore'

// Dev only axios helpers.
import axios from 'axios'
window.axios = axios

export const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)