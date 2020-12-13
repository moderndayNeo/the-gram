import { createStore, applyMiddleware } from 'redux'
import thunk from './thunk'
import rootReducer from '../reducers/root_reducer'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middlewares = [thunk]

if (process.env.NODE_ENV !== 'production') {
    const { logger } = require('redux-logger')
    middlewares.push(logger)
}

const configureStore = (preloadedState = {}) =>
    createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(...middlewares)
        // composeEnhancers(applyMiddleware(...middlewares))
    )

export default configureStore


// "homepage":"/public/packs",
// package json