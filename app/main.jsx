'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom';
import store from './store'
import { Home } from './components'
// <Provider store={store}>
// </Provider>,

render (
  <Router>
    <Home />
  </Router>,
  document.getElementById('main')
)