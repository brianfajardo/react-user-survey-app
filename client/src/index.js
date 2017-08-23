import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'materialize-css/dist/css/materialize.min.css'

// Temporary test code to access the backend route.
import axios from 'axios'
window.axios = axios

import App from './components/App'
import configureStore from './store/configureStore'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)