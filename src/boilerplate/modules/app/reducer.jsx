// Core
import reduceReducers from 'reduce-reducers'

// State shape
const initialState = {}

// Initial reducer
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    default: return state
  }
}

export default reduceReducers(
  appReducer,
)
