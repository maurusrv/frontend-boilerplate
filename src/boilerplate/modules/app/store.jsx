// Core
import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

// Root reducer
import reducer from './reducer'

// Root epic
import epic from './epic'


const epicEpicMiddleware = createEpicMiddleware()

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
/* eslint-enable */

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(epicEpicMiddleware)),
)

epicEpicMiddleware.bind(epic)

export default store
