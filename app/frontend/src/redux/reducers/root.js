import { combineReducers } from 'redux'
import sessionReducer from './session'

export default combineReducers({
    // entities:
    session: sessionReducer,
    // errors
    // ui
})
