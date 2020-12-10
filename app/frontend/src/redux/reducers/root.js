import { combineReducers } from 'redux'
import entitiesReducer from './entities/entities'
import sessionReducer from './session'
import errorsReducer from './errors/errors'

export default combineReducers({
    entities: entitiesReducer,
    session: sessionReducer,
    errors: errorsReducer,
    // ui
})
